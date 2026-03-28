import { NextResponse } from 'next/server';
import {
  ALLOWED_IMAGE_MIME_TYPES,
  AVATAR_BUCKET,
  buildStorageObjectPath,
  isAvatarPathOwnedByUser,
  MAX_UPLOAD_SIZE_BYTES,
  sanitizeStoragePath,
} from '@/lib/storage';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

const ALLOWED_BUCKETS = new Set([AVATAR_BUCKET]);

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const bucket = String(formData.get('bucket') ?? '').trim();
    const rawPath = String(formData.get('path') ?? '').trim();
    const file = formData.get('file');

    if (!ALLOWED_BUCKETS.has(bucket)) {
      return NextResponse.json({ error: 'Invalid bucket' }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    if (
      !ALLOWED_IMAGE_MIME_TYPES.includes(
        file.type as (typeof ALLOWED_IMAGE_MIME_TYPES)[number]
      )
    ) {
      return NextResponse.json(
        { error: 'Unsupported file type' },
        { status: 400 }
      );
    }

    if (file.size > MAX_UPLOAD_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    const sanitizedPath = sanitizeStoragePath(rawPath);

    if (!sanitizedPath) {
      return NextResponse.json(
        { error: 'Invalid upload path' },
        { status: 400 }
      );
    }

    if (
      bucket === AVATAR_BUCKET &&
      !isAvatarPathOwnedByUser(user.id, sanitizedPath)
    ) {
      return NextResponse.json(
        { error: 'You can only upload to your own avatar folder' },
        { status: 403 }
      );
    }

    const objectPath = buildStorageObjectPath(sanitizedPath, file.name);
    const fileBytes = new Uint8Array(await file.arrayBuffer());

    const { error } = await supabase.storage
      .from(bucket)
      .upload(objectPath, fileBytes, {
        contentType: file.type,
        upsert: false,
        cacheControl: '3600',
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(objectPath);

    return NextResponse.json({
      bucket,
      path: objectPath,
      publicUrl: data.publicUrl,
    });
  } catch (error) {
    console.error('Storage upload error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
