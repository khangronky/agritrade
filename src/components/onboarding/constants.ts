import type { LucideIcon } from 'lucide-react';
import { CircleCheckBig, Handshake, UserRound } from 'lucide-react';
import type { OnboardingStatus } from '@/lib/api/auth';

export const TOTAL_STEPS = 3;

export type OnboardingStepItem = {
  id: 1 | 2 | 3;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const STEP_COPY: OnboardingStepItem[] = [
  {
    id: 1,
    title: 'Basic information',
    description: 'Set the core account details we show across your workspace.',
    icon: UserRound,
  },
  {
    id: 2,
    title: 'Choose role',
    description: 'Tailor the marketplace to how you operate today.',
    icon: Handshake,
  },
  {
    id: 3,
    title: 'All set',
    description: 'Your onboarding is complete and your workspace is ready.',
    icon: CircleCheckBig,
  },
];

export function getStepFromStatus(status?: OnboardingStatus) {
  if (!status) {
    return 1;
  }

  if (status.onboarding_status === 'completed') {
    return 3;
  }

  return Math.min(Math.max(status.onboarding_step ?? 1, 1), 2);
}
