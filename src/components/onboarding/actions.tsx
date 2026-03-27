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
    <div className="mt-auto flex flex-col gap-3 border-emerald-950/40 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-slate-400 text-sm">
        {step === 1
          ? 'You can update these fields later from your account settings.'
          : 'Role-specific details are validated in the dialog and the completion state is saved immediately.'}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        {step === 2 && (
          <Button
            type="button"
            variant="outline"
            className="border-slate-700 bg-slate-950/50 text-slate-100 hover:bg-slate-900"
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
            className="bg-emerald-500 text-slate-950 hover:bg-emerald-400"
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
            className="bg-amber-500 text-slate-950 hover:bg-amber-400"
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
