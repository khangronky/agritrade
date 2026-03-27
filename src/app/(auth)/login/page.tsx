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
      <div className="rounded-xl border border-[#d0e6af] bg-white p-6 shadow-[0_12px_24px_rgba(127,181,44,0.12)]">
        <div className="space-y-4">
          <div className="mx-auto h-8 w-1/2 rounded bg-[#edf7de]" />
          <div className="mx-auto h-4 w-3/4 rounded bg-[#edf7de]" />
          <div className="space-y-2">
            <div className="h-4 w-16 rounded bg-[#edf7de]" />
            <div className="h-10 rounded bg-[#edf7de]" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 rounded bg-[#edf7de]" />
            <div className="h-10 rounded bg-[#edf7de]" />
          </div>
          <div className="h-10 rounded bg-[#e7f7cd]" />
        </div>
      </div>
    </div>
  );
}
