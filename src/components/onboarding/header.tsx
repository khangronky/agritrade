import { Badge } from '@/components/ui/badge';
import type { OnboardingStatus } from '@/lib/api/auth';
import { STEP_COPY, TOTAL_STEPS } from './constants';

type OnboardingHeaderProps = {
  onboarding: OnboardingStatus;
  step: number;
  showCompletionStep: boolean;
};

export function OnboardingHeader({
  onboarding,
  step,
  showCompletionStep,
}: OnboardingHeaderProps) {
  return (
    <div className="shrink-0 border-emerald-950/40 border-b bg-black/10 px-6 py-5 lg:px-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-medium text-emerald-300 text-sm">
            Step {showCompletionStep ? 3 : step} of {TOTAL_STEPS}
          </p>
          <h3 className="mt-1 font-semibold text-2xl text-slate-50">
            {showCompletionStep
              ? 'You are ready to trade'
              : STEP_COPY[step - 1]?.title}
          </h3>
          <p className="mt-2 max-w-2xl text-slate-300 text-sm">
            {showCompletionStep
              ? 'Your onboarding status has been saved. You can now enter the workspace and start exploring the marketplace.'
              : STEP_COPY[step - 1]?.description}
          </p>
        </div>
        <Badge
          variant="outline"
          className="border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-200"
        >
          {onboarding.email}
        </Badge>
      </div>
    </div>
  );
}
