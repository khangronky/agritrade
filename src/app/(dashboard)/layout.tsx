import { redirect } from 'next/navigation';
import { OnboardingDialog } from '@/components/onboarding/dialog';
import Sidebar from '@/components/Sidebar';
import { SettingsDialog } from '@/components/settings-dialog';
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
    .select(
      'id, email, full_name, role, onboarding_status, onboarding_step, onboarding_completed_at'
    )
    .eq('id', user.id)
    .single();

  if (onboardingError || !onboardingUser) {
    throw new Error(onboardingError?.message ?? 'Failed to load onboarding');
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
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

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>

      <SettingsDialog />
      <OnboardingDialog initialData={onboardingUser as OnboardingStatus} />
    </div>
  );
}
