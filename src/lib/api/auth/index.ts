import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '@/lib/api';

export const authKeys = {
  me: ['auth', 'me'] as const,
  onboarding: ['auth', 'onboarding'] as const,
};

export type OnboardingRole = 'farmer' | 'trader';

// Types
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
}

interface VerifyOtpRequest {
  email: string;
  otp: string;
}

interface ForgotPasswordRequest {
  email: string;
}

interface VerifyRecoveryOtpRequest {
  email: string;
  otp: string;
}

interface ResetPasswordRequest {
  password: string;
}

interface UpdateProfileRequest {
  full_name: string;
  username: string | null;
}

interface UpdateOnboardingRequest {
  full_name?: string;
  role?: OnboardingRole;
  onboarding_step?: number;
}

interface CompleteOnboardingRequest {
  full_name: string;
  role: OnboardingRole;
}

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

interface AuthResponse {
  message: string;
  requiresVerification?: boolean;
  user?: {
    id: string;
    email: string;
  };
}

interface CurrentUser {
  id: string;
  email: string;
  full_name: string | null;
  username: string | null;
  role: OnboardingRole | null;
  onboarding_status: 'pending' | 'completed';
  onboarding_step: number;
  onboarding_completed_at: string | null;
}

export interface OnboardingStatus {
  id: string;
  email: string;
  full_name: string | null;
  username?: string | null;
  role: OnboardingRole | null;
  onboarding_status: 'pending' | 'completed';
  onboarding_step: number;
  onboarding_completed_at: string | null;
}

interface UsernameAvailabilityResponse {
  available: boolean;
  username: string;
}

// Mutations
export function useLoginMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginRequest) =>
      fetcher<AuthResponse>('/auth/login', { method: 'POST', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (data: RegisterRequest) =>
      fetcher<AuthResponse>('/auth/register', { method: 'POST', body: data }),
  });
}

export function useVerifyOtpMutation() {
  return useMutation({
    mutationFn: (data: VerifyOtpRequest) =>
      fetcher<AuthResponse>('/auth/otp/verify', { method: 'POST', body: data }),
  });
}

export function useResendOtpMutation() {
  return useMutation({
    mutationFn: (data: { email: string }) =>
      fetcher<AuthResponse>('/auth/otp/resend', { method: 'POST', body: data }),
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      fetcher<AuthResponse>('/auth/password-reset', {
        method: 'POST',
        body: data,
      }),
  });
}

export function useVerifyRecoveryOtpMutation() {
  return useMutation({
    mutationFn: (data: VerifyRecoveryOtpRequest) =>
      fetcher<AuthResponse>('/auth/password-reset/verify', {
        method: 'POST',
        body: data,
      }),
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) =>
      fetcher<AuthResponse>('/auth/password-reset/update', {
        method: 'POST',
        body: data,
      }),
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProfileRequest) =>
      fetcher<CurrentUser>('/auth/me', { method: 'PATCH', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me });
    },
  });
}

export function useChangePasswordMutation() {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) =>
      fetcher<AuthResponse>('/auth/password/change', {
        method: 'POST',
        body: data,
      }),
  });
}

export async function checkUsernameAvailability(username: string) {
  return fetcher<UsernameAvailabilityResponse>(
    `/auth/username-availability?username=${encodeURIComponent(username)}`
  );
}

export function useUpdateOnboardingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateOnboardingRequest) =>
      fetcher<OnboardingStatus>('/auth/onboarding', {
        method: 'PATCH',
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.onboarding });
      queryClient.invalidateQueries({ queryKey: authKeys.me });
    },
  });
}

export function useCompleteOnboardingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CompleteOnboardingRequest) =>
      fetcher<AuthResponse>('/auth/onboarding/complete', {
        method: 'POST',
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.onboarding });
      queryClient.invalidateQueries({ queryKey: authKeys.me });
    },
  });
}

// Queries
export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: () => fetcher<CurrentUser>('/auth/me'),
  });
}

export function useOnboardingStatusQuery(initialData?: OnboardingStatus) {
  return useQuery({
    queryKey: authKeys.onboarding,
    queryFn: () => fetcher<OnboardingStatus>('/auth/onboarding'),
    initialData,
  });
}
