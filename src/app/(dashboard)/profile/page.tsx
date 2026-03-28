import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return notFound();

  const { data: profileUser } = await supabase
    .from('users')
    .select('username')
    .eq('id', user.id)
    .single();

  if (!profileUser?.username) return notFound();

  redirect(`/profile/${profileUser.username}`);
}
