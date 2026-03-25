import type { UseFormReturn } from 'react-hook-form';
import type { OnboardingStatus } from '@/lib/api/auth';
import type { OnboardingProfileSchema } from '@/lib/schema/onboarding';

export type OnboardingForm = UseFormReturn<OnboardingProfileSchema>;

export type OnboardingStepProps = {
  form: OnboardingForm;
  onboarding: OnboardingStatus;
};
