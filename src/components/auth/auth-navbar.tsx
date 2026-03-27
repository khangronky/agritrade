'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function AuthNavbar() {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <nav className="absolute top-0 right-0 left-0 z-10 p-4">
      <div className="flex items-center justify-between">
        <Link href={isLoginPage ? '/' : '/login'}>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 rounded-full border border-[#d3e9b4] bg-white/90 text-[#365608] shadow-sm backdrop-blur-sm transition-colors hover:border-[#b8da84] hover:bg-[#f5f8ef] hover:text-[#2a4305]"
          >
            <ArrowLeft className="h-4 w-4" />
            {isLoginPage ? 'Home' : 'Back to Login'}
          </Button>
        </Link>
      </div>
    </nav>
  );
}
