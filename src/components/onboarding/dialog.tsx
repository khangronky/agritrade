'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import {
  type OnboardingStatus,
  useCompleteOnboardingMutation,
  useOnboardingStatusQuery,
  useUpdateOnboardingMutation,
} from '@/lib/api/auth';
import {
  type OnboardingProfileSchema,
  onboardingProfileSchema,
} from '@/lib/schema/onboarding';
import { OnboardingActions } from './actions';
import { BasicInfoStep } from './basic-info-step';
import { CompletionStep } from './completion-step';
import { getStepFromStatus, TOTAL_STEPS } from './constants';
import { OnboardingHeader } from './header';
import { RoleStep } from './role-step';
import { OnboardingSidebar } from './sidebar';

export function OnboardingDialog({
  initialData,
}: {
  initialData: OnboardingStatus;
}) {
  const router = useRouter();
  const [step, setStep] = useState(getStepFromStatus(initialData));
  const [showCompletionStep, setShowCompletionStep] = useState(false);
  const onboardingQuery = useOnboardingStatusQuery(initialData);
  const updateOnboarding = useUpdateOnboardingMutation();
  const completeOnboarding = useCompleteOnboardingMutation();

  const onboarding = onboardingQuery.data ?? initialData;
  const isAlreadyCompleted = onboarding.onboarding_status === 'completed';
  const isOpen = showCompletionStep || !isAlreadyCompleted;

  const form = useForm<OnboardingProfileSchema>({
    resolver: zodResolver(onboardingProfileSchema),
    defaultValues: {
      full_name: onboarding.full_name ?? '',
      role: onboarding.role ?? 'farmer',
      farmer_crops: '',
      farmer_area_m2: '',
      farmer_estimated_productivity: '',
      farmer_harvest_day: '',
      farmer_harvest_month: '',
      farmer_harvest_year: '',
      trader_company: '',
      trader_crop_types: '',
      trader_weights: '',
      trader_export_markets: '',
    },
  });

  const isSavingStep = updateOnboarding.isPending;
  const isCompleting = completeOnboarding.isPending;

  useEffect(() => {
    form.reset((currentValues) => ({
      ...currentValues,
      full_name: onboarding.full_name ?? currentValues.full_name,
      role: onboarding.role ?? currentValues.role,
    }));

    if (!showCompletionStep) {
      setStep(getStepFromStatus(onboarding));
    }
  }, [form, onboarding, showCompletionStep]);

  const progressValue = useMemo(() => {
    if (showCompletionStep) {
      return 100;
    }

    return Math.round((step / TOTAL_STEPS) * 100);
  }, [showCompletionStep, step]);

  const handleStepOne = async () => {
    const isValid = await form.trigger('full_name');
    if (!isValid) {
      return;
    }

    try {
      await updateOnboarding.mutateAsync({
        full_name: form.getValues('full_name'),
        onboarding_step: 2,
      });
      setStep(2);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to save onboarding progress'
      );
    }
  };

  const handleStepTwo = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      return;
    }

    const values = form.getValues();

    try {
      await completeOnboarding.mutateAsync({
        full_name: values.full_name,
        role: values.role,
      });
      setShowCompletionStep(true);
      setStep(3);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to complete onboarding'
      );
    }
  };

  const handleFinish = () => {
    setShowCompletionStep(false);
    router.refresh();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => undefined}>
      <DialogContent
        className="flex h-[calc(100dvh-2rem)] max-h-[calc(100dvh-2rem)] flex-col overflow-hidden border-emerald-950/60 bg-[linear-gradient(180deg,rgba(8,19,17,0.98),rgba(11,27,24,0.98))] p-0 shadow-[0_30px_80px_rgba(3,8,14,0.55)] sm:max-w-4xl"
        onEscapeKeyDown={(event: KeyboardEvent) => event.preventDefault()}
        onInteractOutside={(event: Event) => event.preventDefault()}
        showCloseButton={false}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Complete your onboarding</DialogTitle>
          <DialogDescription>
            Finish your account setup before entering the dashboard.
          </DialogDescription>
        </DialogHeader>

        <div className="grid min-h-0 flex-1 lg:grid-cols-[280px_1fr]">
          <OnboardingSidebar
            progressValue={progressValue}
            step={step}
            showCompletionStep={showCompletionStep}
          />

          <div className="flex min-h-0 flex-col overflow-hidden bg-[radial-gradient(circle_at_top,rgba(52,211,153,0.08),transparent_32%),linear-gradient(180deg,rgba(10,22,20,0.96),rgba(7,16,15,0.98))]">
            <OnboardingHeader
              onboarding={onboarding}
              step={step}
              showCompletionStep={showCompletionStep}
            />

            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 text-slate-100 lg:px-8">
              {showCompletionStep ? (
                <div className="flex h-full flex-col justify-between gap-6">
                  <CompletionStep form={form} />

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleFinish}
                      className="inline-flex h-10 items-center justify-center rounded-md bg-emerald-500 px-6 font-medium text-slate-950 text-sm transition-colors hover:bg-emerald-400"
                    >
                      Continue to dashboard
                    </button>
                  </div>
                </div>
              ) : (
                <Form {...form}>
                  <form className="flex h-full flex-col gap-6">
                    {step === 1 && (
                      <BasicInfoStep form={form} onboarding={onboarding} />
                    )}

                    {step === 2 && (
                      <RoleStep form={form} onboarding={onboarding} />
                    )}

                    <OnboardingActions
                      step={step}
                      isSavingStep={isSavingStep}
                      isCompleting={isCompleting}
                      onBack={() => setStep(1)}
                      onContinue={handleStepOne}
                      onFinish={handleStepTwo}
                    />
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
