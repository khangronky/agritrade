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
    <div className="mt-auto flex flex-col gap-3 border-emerald-100 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-slate-500 text-sm">
        {step === 1
          ? 'You can update these fields later from your account settings.'
          : 'Role-specific details are validated in the dialog and the completion state is saved immediately.'}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        {step === 2 && (
          <Button
            type="button"
            variant="outline"
            className="border-slate-200 bg-white"
            onClick={onBack}
            disabled={isSavingStep || isCompleting}
          >
            Back
          </Button>
        )}
        {step === 1 ? (
          <Button
            type="button"
            onClick={onContinue}
            disabled={isSavingStep}
            className="bg-emerald-600 text-white hover:bg-emerald-700"
          >
            {isSavingStep ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Continue'
            )}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onFinish}
            disabled={isCompleting}
            className="bg-slate-950 text-white hover:bg-slate-800"
          >
            {isCompleting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
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
