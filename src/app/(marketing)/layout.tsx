import { Navbar } from '@/components/navbar';
import { SiteFooter } from '@/components/site-footer';
import { createClient } from '@/lib/supabase/server';

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userData } = await supabase
    .from('user_full_view')
    .select('*')
    .eq('user_id', user?.id || '')
    .single();

  return (
    <div className="relative min-h-screen">
      <Navbar
        user={
          userData
            ? {
                email: userData.email || '',
                fullName: userData.full_name || '',
                username: userData.username || '',
                avatarUrl: userData.avatar_url || null,
              }
            : null
        }
      />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
