import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { STEP_COPY } from './constants';

type OnboardingSidebarProps = {
  progressValue: number;
  step: number;
  showCompletionStep: boolean;
};

export function OnboardingSidebar({
  progressValue,
  step,
  showCompletionStep,
}: OnboardingSidebarProps) {
  return (
    <aside className="flex min-h-0 flex-col justify-between overflow-y-auto border-emerald-100 border-b bg-[radial-gradient(circle_at_top,#dff7d7,transparent_48%),linear-gradient(180deg,#133127,#10271f)] p-6 text-white lg:border-r lg:border-b-0">
      <div className="mb-4 space-y-6">
        <Badge className="w-fit bg-white/12 px-3 py-1 text-white hover:bg-white/12">
          New account setup
        </Badge>
        <div className="space-y-2">
          <h2 className="font-semibold text-2xl leading-tight">
            Build your AgriTrade profile in three quick steps.
          </h2>
          <p className="text-sm text-white/72">
            We use this setup to shape the marketplace around how you buy or
            sell agricultural products.
          </p>
        </div>
        <Progress
          value={progressValue}
          className="bg-white/15 **:data-[slot=progress-indicator]:bg-lime-300"
        />
        <div className="space-y-3">
          {STEP_COPY.map((item) => {
            const Icon = item.icon;
            const active = showCompletionStep
              ? item.id === 3
              : item.id === step;
            const completed = showCompletionStep
              ? item.id <= 3
              : item.id < step;

            return (
              <div
                key={item.id}
                className={cn(
                  'rounded-2xl border px-4 py-3 transition-colors',
                  active || completed
                    ? 'border-lime-300/70 bg-white/12'
                    : 'border-white/10 bg-white/5'
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'flex size-10 items-center justify-center rounded-full border',
                      active || completed
                        ? 'border-lime-300/60 bg-lime-300/15 text-lime-200'
                        : 'border-white/12 bg-white/8 text-white/70'
                    )}
                  >
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Step {item.id}</p>
                    <p className="text-sm text-white/72">{item.title}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="hidden rounded-2xl border border-white/10 bg-white/6 p-4 text-sm text-white/72 lg:block">
        Your role-specific crop details are validated in the UI now and can be
        wired into dedicated database tables later without reworking the
        onboarding flow.
      </div>
    </aside>
  );
}
