import { redirect } from 'next/navigation';
import DashboardSidebar from '@/components/dashboard-sidebar';
import { OnboardingDialog } from '@/components/onboarding/dialog';
import { SettingsDialog } from '@/components/settings-dialog';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import type { OnboardingStatus } from '@/lib/api/auth';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: onboardingUser, error: onboardingError } = await supabase
    .from('users')
    .select('*, user_profile(full_name)')
    .eq('id', user.id)
    .single();

  if (onboardingError || !onboardingUser) {
    throw new Error(onboardingError?.message ?? 'Failed to load onboarding');
  }

  const initialOnboardingData: OnboardingStatus = {
    id: onboardingUser.id,
    email: onboardingUser.email,
    full_name: onboardingUser.user_profile?.full_name ?? null,
    username: onboardingUser.username,
    role: onboardingUser.role as OnboardingStatus['role'],
    onboarding_status:
      onboardingUser.onboarding_status as OnboardingStatus['onboarding_status'],
    onboarding_step: onboardingUser.onboarding_step,
    onboarding_completed_at: onboardingUser.onboarding_completed_at,
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />

        <main className="relative flex-1 overflow-auto">
          <header className="fixed top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="px-6 py-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <div
                  className="text-muted-foreground text-sm"
                  suppressHydrationWarning
                >
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>
          </header>

          <div className="p-6 pt-16">{children}</div>
        </main>

        <SettingsDialog />
        <OnboardingDialog initialData={initialOnboardingData} />
      </div>
    </SidebarProvider>
  );
}
