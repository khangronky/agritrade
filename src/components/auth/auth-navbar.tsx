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
            className="gap-2 rounded-full border border-lime-200 bg-white/90 text-lime-700 shadow-sm backdrop-blur-sm transition-colors hover:border-lime-300 hover:bg-lime-50 hover:text-lime-950"
          >
            <ArrowLeft className="h-4 w-4" />
            {isLoginPage ? 'Home' : 'Back to Login'}
          </Button>
        </Link>
      </div>
    </nav>
  );
}
