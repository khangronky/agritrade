import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type OnboardingActionsProps = {
  step: number;
  isSavingStep: boolean;
  isCompleting: boolean;
  onBack: () => void;
  onContinue: () => void;
  onFinish: () => void;
};

export function OnboardingActions({
  step,
  isSavingStep,
  isCompleting,
  onBack,
  onContinue,
  onFinish,
}: OnboardingActionsProps) {
  return (
    <div className="flex flex-col gap-3 border-border border-t py-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-muted-foreground text-sm">
        {step === 1
          ? 'You can update these fields later from your account settings.'
          : 'Role-specific details are validated in the dialog and the completion state is saved immediately.'}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        {step === 2 && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isSavingStep || isCompleting}
          >
            Back
          </Button>
        )}
        {step === 1 ? (
          <Button type="button" onClick={onContinue} disabled={isSavingStep}>
            {isSavingStep ? (
              <>
                <Loader2 className="animate-spin" data-icon="inline-start" />
                Saving...
              </>
            ) : (
              'Continue'
            )}
          </Button>
        ) : (
          <Button type="button" onClick={onFinish} disabled={isCompleting}>
            {isCompleting ? (
              <>
                <Loader2 className="animate-spin" data-icon="inline-start" />
                Finishing...
              </>
            ) : (
              'Finish onboarding'
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
