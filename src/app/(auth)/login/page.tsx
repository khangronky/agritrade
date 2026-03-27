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
      <div className="rounded-xl border border-lime-200 bg-white p-6 shadow-md">
        <div className="space-y-4">
          <div className="mx-auto h-8 w-1/2 rounded bg-lime-100" />
          <div className="mx-auto h-4 w-3/4 rounded bg-lime-100" />
          <div className="space-y-2">
            <div className="h-4 w-16 rounded bg-lime-100" />
            <div className="h-10 rounded bg-lime-100" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 rounded bg-lime-100" />
            <div className="h-10 rounded bg-lime-100" />
          </div>
          <div className="h-10 rounded bg-lime-100" />
        </div>
      </div>
    </div>
  );
}
