import type { Metadata } from 'next';
import { Suspense } from 'react';
import { LoginForm } from './form';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your AgriTrade account',
};

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFormSkeleton />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginFormSkeleton() {
  return (
    <div className="w-full max-w-md animate-pulse">
      <div className="rounded-xl border border-green-200/70 bg-white/90 p-6 shadow-[0_20px_48px_rgba(5,46,22,0.12)]">
        <div className="space-y-4">
          <div className="mx-auto h-8 w-1/2 rounded bg-green-200/70" />
          <div className="mx-auto h-4 w-3/4 rounded bg-green-100/80" />
          <div className="space-y-2">
            <div className="h-4 w-16 rounded bg-green-200/70" />
            <div className="h-10 rounded bg-green-100/80" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 rounded bg-green-200/70" />
            <div className="h-10 rounded bg-green-100/80" />
          </div>
          <div className="h-10 rounded bg-green-200/75" />
        </div>
      </div>
    </div>
  );
}
