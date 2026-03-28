import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  AVATAR_BUCKET,
  extractStorageObjectFromPublicUrl,
  getAvatarBasePath,
  isAvatarPathOwnedByUser,
} from '@/lib/storage';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

function nullableTrimmedString(maxLength: number) {
  return z.preprocess((value) => {
    if (typeof value !== 'string') {
      return value;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }, z.string().max(maxLength).nullable());
}

const profileDetailsUpdateSchema = z
  .object({
    full_name: z
      .string()
      .trim()
      .min(1, 'Display name is required')
      .max(100, 'Display name must be 100 characters or fewer'),
    bio: nullableTrimmedString(500),
    phone_number: nullableTrimmedString(30),
    address: nullableTrimmedString(200),
    dob: z.preprocess(
      (value) => {
        if (typeof value !== 'string') {
          return value;
        }

        const trimmed = value.trim();
        return trimmed.length > 0 ? trimmed : null;
      },
      z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be YYYY-MM-DD')
        .nullable()
    ),
    avatar_url: z.preprocess((value) => {
      if (typeof value !== 'string') {
        return value;
      }

      const trimmed = value.trim();
      return trimmed.length > 0 ? trimmed : null;
    }, z.url('Avatar URL must be a valid URL').nullable()),
    avatar_upload: z
      .object({
        bucket: z.literal(AVATAR_BUCKET),
        path: z.string().min(1).max(300),
      })
      .nullable()
      .optional(),
    remove_avatar: z.boolean().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.avatar_upload && !value.avatar_url) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['avatar_url'],
        message: 'Avatar URL is required after uploading an image',
      });
    }
  });

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const parsed = profileDetailsUpdateSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid request payload' },
        { status: 400 }
      );
    }

    const payload = parsed.data;
    const removeAvatar = payload.remove_avatar ?? false;

    if (
      payload.avatar_upload &&
      !isAvatarPathOwnedByUser(user.id, payload.avatar_upload.path)
    ) {
      return NextResponse.json(
        { error: 'Uploaded avatar path does not belong to the current user' },
        { status: 403 }
      );
    }

    const { data: currentProfile, error: currentProfileError } = await supabase
      .from('user_profile')
      .select('avatar_url')
      .eq('user_id', user.id)
      .single();

    if (currentProfileError) {
      if (payload.avatar_upload) {
        await supabase.storage
          .from(payload.avatar_upload.bucket)
          .remove([payload.avatar_upload.path]);
      }

      return NextResponse.json(
        { error: currentProfileError.message },
        { status: 500 }
      );
    }

    const nextAvatarUrl = removeAvatar ? null : payload.avatar_url;
    const nextAvatarUpload = removeAvatar
      ? null
      : (payload.avatar_upload ?? null);

    const { error: updateError } = await supabase
      .from('user_profile')
      .update({
        full_name: payload.full_name,
        bio: payload.bio,
        phone_number: payload.phone_number,
        address: payload.address,
        dob: payload.dob,
        avatar_url: nextAvatarUrl,
      })
      .eq('user_id', user.id);

    if (updateError) {
      if (nextAvatarUpload) {
        await supabase.storage
          .from(nextAvatarUpload.bucket)
          .remove([nextAvatarUpload.path]);
      }

      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    const currentAvatarObject = extractStorageObjectFromPublicUrl(
      currentProfile.avatar_url
    );

    const shouldDeleteCurrentAvatar =
      currentAvatarObject &&
      currentAvatarObject.bucket === AVATAR_BUCKET &&
      isAvatarPathOwnedByUser(user.id, currentAvatarObject.path) &&
      currentAvatarObject.path.startsWith(`${getAvatarBasePath(user.id)}/`) &&
      ((removeAvatar && currentProfile.avatar_url) ||
        (nextAvatarUpload &&
          currentAvatarObject.path !== nextAvatarUpload.path));

    if (shouldDeleteCurrentAvatar) {
      const { error: deleteError } = await supabase.storage
        .from(currentAvatarObject.bucket)
        .remove([currentAvatarObject.path]);

      if (deleteError) {
        console.error('Avatar cleanup error:', deleteError);
      }
    }

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
