import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { STEP_COPY, TOTAL_STEPS } from './constants';

type OnboardingHeaderProps = {
  onboardingEmail: string;
  progressValue: number;
  step: number;
  showCompletionStep: boolean;
};

export function OnboardingHeader({
  onboardingEmail,
  progressValue,
  step,
  showCompletionStep,
}: OnboardingHeaderProps) {
  const currentStep = showCompletionStep ? 3 : step;

  return (
    <div className="basis-[30%] border-border border-b bg-muted/20 px-6 py-4 lg:px-8">
      <div className="flex h-full flex-col justify-between gap-3">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="secondary" className="px-3 py-1">
            New account setup
          </Badge>
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary/10 px-3 py-1 text-foreground"
          >
            {onboardingEmail}
          </Badge>
        </div>

        <div>
          <p className="font-medium text-primary text-xs">
            Step {currentStep} of {TOTAL_STEPS}
          </p>
          <h3 className="mt-1 font-semibold text-foreground text-lg leading-tight">
            {showCompletionStep
              ? 'You are ready to trade'
              : STEP_COPY[step - 1]?.title}
          </h3>
          <p className="mt-1 max-w-3xl text-muted-foreground text-xs">
            {showCompletionStep
              ? 'Your onboarding is complete. Continue to enter your workspace and start exploring the marketplace.'
              : STEP_COPY[step - 1]?.description}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Progress
            value={progressValue}
            className="h-1.5 bg-muted **:data-[slot=progress-indicator]:bg-primary"
          />
          <div className="grid grid-cols-3 gap-2">
            {STEP_COPY.map((item) => {
              const Icon = item.icon;
              const active = currentStep === item.id;
              const completed = currentStep > item.id;

              return (
                <div
                  key={item.id}
                  className={cn(
                    'flex items-center gap-2 rounded-xl border px-2 py-1.5 transition-colors',
                    active || completed
                      ? 'border-primary/50 bg-primary/10'
                      : 'border-border bg-background/70'
                  )}
                >
                  <div
                    className={cn(
                      'flex size-7 items-center justify-center rounded-full border',
                      active || completed
                        ? 'border-primary/40 bg-primary/15 text-primary'
                        : 'border-border bg-muted/70 text-muted-foreground'
                    )}
                  >
                    <Icon className="size-3.5" />
                  </div>
                  <div className="min-w-0 text-xs">
                    <p className="truncate font-medium text-foreground leading-tight">
                      Step {item.id}
                    </p>
                    <p className="truncate text-muted-foreground leading-tight">
                      {item.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
