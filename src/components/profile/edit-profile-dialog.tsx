'use client';

import { CalendarDays, Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FetchError } from '@/lib/api';
import {
  AVATAR_BUCKET,
  getAvatarBasePath,
  MAX_UPLOAD_SIZE_BYTES,
} from '@/lib/storage';
import { cn } from '@/lib/utils';

interface EditProfileDialogProps {
  profile: {
    user_id: string;
    full_name: string | null;
    username: string | null;
    email: string | null;
    avatar_url: string | null;
    bio: string | null;
    phone_number: string | null;
    address: string | null;
    dob: string | null;
  };
}

interface UploadAvatarResult {
  bucket: string;
  path: string;
  publicUrl: string;
}

function getInitials(value: string | null | undefined) {
  const source = value?.trim();

  if (!source) {
    return 'AT';
  }

  return source
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function EditProfileDialog({ profile }: EditProfileDialogProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [fullName, setFullName] = useState(profile.full_name ?? '');
  const [bio, setBio] = useState(profile.bio ?? '');
  const [phoneNumber, setPhoneNumber] = useState(profile.phone_number ?? '');
  const [address, setAddress] = useState(profile.address ?? '');
  const [dob, setDob] = useState(profile.dob ?? '');
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url ?? null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(
    null
  );
  const [removeAvatar, setRemoveAvatar] = useState(false);

  useEffect(() => {
    if (!open) {
      setFullName(profile.full_name ?? '');
      setBio(profile.bio ?? '');
      setPhoneNumber(profile.phone_number ?? '');
      setAddress(profile.address ?? '');
      setDob(profile.dob ?? '');
      setAvatarUrl(profile.avatar_url ?? null);
      setAvatarPreviewUrl(null);
      setSelectedAvatarFile(null);
      setRemoveAvatar(false);
    }
  }, [open, profile]);

  useEffect(() => {
    return () => {
      if (avatarPreviewUrl) {
        URL.revokeObjectURL(avatarPreviewUrl);
      }
    };
  }, [avatarPreviewUrl]);

  const displayedAvatarUrl =
    avatarPreviewUrl ?? (removeAvatar ? null : avatarUrl);
  const hasVisibleAvatar = Boolean(displayedAvatarUrl);

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const nextFile = event.target.files?.[0];

    if (!nextFile) {
      return;
    }

    if (!nextFile.type.startsWith('image/')) {
      toast.error('Please choose an image file');
      event.target.value = '';
      return;
    }

    if (nextFile.size > MAX_UPLOAD_SIZE_BYTES) {
      toast.error('Image must be 5MB or smaller');
      event.target.value = '';
      return;
    }

    if (avatarPreviewUrl) {
      URL.revokeObjectURL(avatarPreviewUrl);
    }

    setSelectedAvatarFile(nextFile);
    setAvatarPreviewUrl(URL.createObjectURL(nextFile));
    setRemoveAvatar(false);
    event.target.value = '';
  };

  const handleRemoveAvatar = () => {
    if (avatarPreviewUrl) {
      URL.revokeObjectURL(avatarPreviewUrl);
    }

    setAvatarPreviewUrl(null);
    setSelectedAvatarFile(null);
    setAvatarUrl(null);
    setRemoveAvatar(true);
  };

  const uploadAvatarIfNeeded = async (): Promise<UploadAvatarResult | null> => {
    if (!selectedAvatarFile) {
      return null;
    }

    const formData = new FormData();
    formData.append('bucket', AVATAR_BUCKET);
    formData.append('path', getAvatarBasePath(profile.user_id));
    formData.append('file', selectedAvatarFile);

    const response = await fetch('/api/storage/upload', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new FetchError(
        typeof data?.error === 'string' ? data.error : 'Avatar upload failed',
        response.status,
        data
      );
    }

    return data as UploadAvatarResult;
  };

  const handleSave = async () => {
    if (!fullName.trim()) {
      toast.error('Display name is required');
      return;
    }

    setIsSaving(true);

    try {
      const uploadedAvatar = await uploadAvatarIfNeeded();
      const response = await fetch('/api/profile/me', {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: fullName,
          bio,
          phone_number: phoneNumber,
          address,
          dob,
          avatar_url: removeAvatar
            ? null
            : (uploadedAvatar?.publicUrl ?? avatarUrl),
          avatar_upload: uploadedAvatar
            ? {
                bucket: uploadedAvatar.bucket,
                path: uploadedAvatar.path,
              }
            : null,
          remove_avatar: removeAvatar,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new FetchError(
          typeof data?.error === 'string'
            ? data.error
            : 'Profile update failed',
          response.status,
          data
        );
      }

      toast.success('Profile updated successfully');
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update profile'
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Pencil data-icon="inline-start" />
        Edit Profile
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Update the details shown on your public profile card.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border bg-muted/30 p-6">
              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:text-left">
                <div className="relative">
                  <Avatar className="size-28 border-4 border-background shadow-lg">
                    {displayedAvatarUrl ? (
                      <AvatarImage src={displayedAvatarUrl} alt={fullName} />
                    ) : null}
                    <AvatarFallback className="bg-secondary font-semibold text-lg text-secondary-foreground">
                      {getInitials(
                        fullName || profile.username || profile.email
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <Button
                    type="button"
                    size="icon"
                    className="absolute -top-1 -right-1 rounded-full shadow-md"
                    onClick={handleOpenFilePicker}
                    aria-label={
                      hasVisibleAvatar ? 'Change avatar' : 'Add avatar'
                    }
                  >
                    {hasVisibleAvatar ? <Pencil /> : <Plus />}
                  </Button>

                  {hasVisibleAvatar ? (
                    <Button
                      type="button"
                      size="icon"
                      variant="secondary"
                      className="absolute -right-1 -bottom-1 rounded-full shadow-md"
                      onClick={handleRemoveAvatar}
                      aria-label="Remove avatar"
                    >
                      <Trash2 />
                    </Button>
                  ) : null}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    className="hidden"
                    onChange={handleAvatarFileChange}
                  />
                </div>

                <div className="flex flex-1 flex-col gap-1">
                  <p className="font-medium text-base text-foreground">
                    {fullName.trim() || 'Your profile'}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {selectedAvatarFile
                      ? `${selectedAvatarFile.name} selected`
                      : hasVisibleAvatar
                        ? 'Your avatar updates when you save the form.'
                        : 'Choose a profile photo to personalize your card.'}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    PNG, JPG, WEBP, or GIF up to 5MB.
                  </p>
                </div>
              </div>
            </div>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="full-name">Display name</FieldLabel>
                <Input
                  id="full-name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Your full name"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="bio">Bio</FieldLabel>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  placeholder="Tell buyers and sellers what you focus on."
                />
                <FieldDescription>
                  Keep it concise and useful for marketplace visitors.
                </FieldDescription>
              </Field>

              <FieldGroup className="md:grid md:grid-cols-2 md:gap-4 md:*:w-full">
                <Field>
                  <FieldLabel htmlFor="phone-number">Phone number</FieldLabel>
                  <Input
                    id="phone-number"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    placeholder="+84 000 000 000"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="dob">Date of birth</FieldLabel>
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="dob"
                      type="date"
                      value={dob}
                      onChange={(event) => setDob(event.target.value)}
                      className="pl-10"
                    />
                  </div>
                </Field>
              </FieldGroup>

              <Field>
                <FieldLabel htmlFor="address">Address</FieldLabel>
                <Input
                  id="address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="City, province, or trading hub"
                />
              </Field>
            </FieldGroup>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <Loader2
                  className={cn('animate-spin')}
                  data-icon="inline-start"
                />
              ) : null}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
