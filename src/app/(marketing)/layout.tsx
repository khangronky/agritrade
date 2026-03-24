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

  return (
    <div className="relative min-h-screen bg-background">
      <Navbar
        user={
          user
            ? {
                email: user.email ?? null,
                fullName: user.user_metadata?.full_name ?? null,
              }
            : null
        }
      />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
