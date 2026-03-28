import {
  AtSign,
  CalendarRange,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import type { ElementType } from 'react';
import { EditProfileDialog } from '@/components/profile/edit-profile-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/lib/supabase/server';
import { getInitials } from '@/utils/name-helper';

function formatDate(value: string | null) {
  if (!value) {
    return 'Not provided';
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Not provided';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(parsedDate);
}

function ProfileDetail({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border bg-background/80 p-4 backdrop-blur-sm">
      <div className="rounded-full bg-secondary p-2 text-secondary-foreground">
        <Icon className="size-4" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-muted-foreground text-xs uppercase tracking-[0.24em]">
          {label}
        </p>
        <p className="truncate font-medium text-foreground text-sm">{value}</p>
      </div>
    </div>
  );
}

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  const { data: user } = await supabase
    .from('user_full_view')
    .select('*')
    .eq('username', username)
    .single();

  if (!user?.user_id || !user.email || !user.username) return notFound();

  const isOwner = authUser?.id === user.user_id;
  const displayName = user.full_name ?? user.username;
  const joinedDate = formatDate(user.created_at);
  const birthDate = formatDate(user.dob);

  return (
    <div className="flex flex-col gap-6 pb-8">
      <section className="overflow-hidden rounded-[2rem] border bg-card shadow-sm">
        <div className="relative h-52 bg-[radial-gradient(circle_at_top_left,rgba(217,217,119,0.7),transparent_30%),linear-gradient(135deg,rgba(147,200,63,0.28),rgba(255,255,255,0)_42%),linear-gradient(180deg,rgba(58,101,63,0.86),rgba(22,52,40,0.96))]">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_30%,rgba(0,0,0,0.18)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,rgba(8,18,15,0)_0%,rgba(8,18,15,0.32)_100%)]" />
        </div>

        <div className="relative px-6 py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <Avatar className="size-28 border-4 border-background shadow-xl sm:size-36">
                {user.avatar_url ? (
                  <AvatarImage src={user.avatar_url} alt={displayName} />
                ) : null}
                <AvatarFallback className="bg-secondary font-semibold text-2xl text-secondary-foreground">
                  {getInitials(user.full_name || user.username)}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {user.role && <Badge>{user.role}</Badge>}
                  <span className="text-muted-foreground text-sm">
                    Member since {joinedDate}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold text-3xl text-foreground tracking-tight">
                    {displayName}
                  </h1>
                  <p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
                    {user.bio ??
                      'Building a trusted agricultural profile with clear contact details and marketplace-ready information.'}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 text-muted-foreground text-sm">
                  <span className="inline-flex items-center gap-2">
                    <AtSign className="size-4" />
                    {user.username}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Mail className="size-4" />
                    {user.email}
                  </span>
                </div>
              </div>
            </div>

            {isOwner ? (
              <EditProfileDialog
                profile={{
                  user_id: user.user_id,
                  full_name: user.full_name,
                  username: user.username,
                  email: user.email,
                  avatar_url: user.avatar_url,
                  bio: user.bio,
                  phone_number: user.phone_number,
                  address: user.address,
                  dob: user.dob,
                }}
              />
            ) : null}
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.9fr)]">
        <Card className="overflow-hidden border-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(244,248,239,0.95))] shadow-sm ring-1 ring-border/70">
          <CardHeader className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <UserRound className="size-4" />
              </div>
              <div className="flex flex-col gap-1">
                <CardTitle>Profile overview</CardTitle>
                <CardDescription>
                  A concise snapshot of who this member is and how to reach
                  them.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="grid gap-4 md:grid-cols-2">
              <ProfileDetail
                icon={Phone}
                label="Phone"
                value={user.phone_number ?? 'Not provided'}
              />
              <ProfileDetail
                icon={MapPin}
                label="Address"
                value={user.address ?? 'Not provided'}
              />
              <ProfileDetail
                icon={CalendarRange}
                label="Date of birth"
                value={birthDate}
              />
              <ProfileDetail
                icon={ShieldCheck}
                label="Onboarding"
                value={
                  user.role
                    ? 'Completed and active'
                    : 'Profile setup in progress'
                }
              />
            </div>

            <Separator />

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)]">
              <div className="flex flex-col gap-3 rounded-3xl bg-card p-5 shadow-sm ring-1 ring-border/60">
                <p className="text-muted-foreground text-xs uppercase tracking-[0.26em]">
                  About
                </p>
                <p className="text-foreground text-sm leading-7">
                  {user.bio ??
                    'This member has not added a detailed biography yet. Use the contact information alongside their marketplace activity to learn more about their focus areas.'}
                </p>
              </div>

              <div className="flex flex-col gap-3 rounded-3xl bg-[linear-gradient(180deg,rgba(147,200,63,0.16),rgba(147,200,63,0.05))] p-5 shadow-sm ring-1 ring-border/60">
                <p className="text-muted-foreground text-xs uppercase tracking-[0.26em]">
                  Credentials
                </p>
                <div className="flex flex-col gap-3 text-foreground text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">Role</span>
                    <span className="font-medium capitalize">
                      {user.role ?? 'Pending'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">Username</span>
                    <span className="font-medium">@{user.username}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">Joined</span>
                    <span className="font-medium">{joinedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(243,247,242,0.98))] shadow-sm ring-1 ring-border/70">
          <CardHeader>
            <CardTitle>Quick facts</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="rounded-2xl border bg-background/85 p-4">
              <p className="text-muted-foreground text-xs uppercase tracking-[0.24em]">
                Contact email
              </p>
              <p className="mt-2 font-medium text-sm">{user.email}</p>
            </div>
            <div className="rounded-2xl border bg-background/85 p-4">
              <p className="text-muted-foreground text-xs uppercase tracking-[0.24em]">
                Display name
              </p>
              <p className="mt-2 font-medium text-sm">{displayName}</p>
            </div>
            <div className="rounded-2xl border bg-background/85 p-4">
              <p className="text-muted-foreground text-xs uppercase tracking-[0.24em]">
                Address visibility
              </p>
              <p className="mt-2 text-foreground text-sm leading-6">
                {user.address ??
                  'No address published yet. Add one from the edit dialog to help other members understand your base of operations.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
