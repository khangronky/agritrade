'use client';

import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Forum', href: '/' },
];

type NavbarProps = {
  user: {
    email: string | null;
    fullName: string | null;
  } | null;
};

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function Navbar({ user }: NavbarProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const supabase = createClient();
  const isLoggedIn = Boolean(user?.email);
  const displayName = user?.fullName || user?.email || 'User';

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const isItemActive = (item: (typeof navItems)[number]) => {
    if (item.label === 'Forum') {
      return pathname.startsWith('/forum');
    }

    if (item.href === '/') {
      return pathname === '/';
    }

    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  const renderDesktopAuth = () => {
    if (!isLoggedIn) {
      return (
        <>
          <Button
            asChild
            className="bg-brand-lime font-semibold text-zinc-950 hover:bg-brand-lime/80"
          >
            <Link href="/login">Sign In</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="bg-background text-slate-800 hover:bg-background/80"
          >
            <Link href="/register">Sign Up</Link>
          </Button>
        </>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-10 gap-2 px-2 text-slate-800 hover:bg-white/80 hover:text-slate-900"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-emerald-100 text-slate-800">
                {getInitials(displayName)}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="truncate">
            {displayName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <LayoutDashboard className="size-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="size-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="size-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <header className="fixed top-0 z-30 w-full backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/branding.png"
            alt="AgriTrade"
            width={140}
            height={40}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = isItemActive(item);

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative font-semibold text-sm transition-colors',
                  isActive
                    ? 'text-emerald-700'
                    : 'text-slate-800 hover:text-emerald-600'
                )}
              >
                {item.label}
                <span
                  className={cn(
                    '-bottom-1.5 pointer-events-none absolute left-0 h-0.5 w-full rounded-full bg-emerald-600 transition-opacity duration-200',
                    isActive ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {renderDesktopAuth()}
        </div>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Breadcrumb className="md:hidden">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 border-slate-300 bg-white/80 px-2 text-slate-800 hover:bg-white hover:text-slate-900"
                  >
                    <Menu className="size-4" />
                  </Button>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </SheetTrigger>
          <SheetContent side="right" aria-describedby="Mobile navigation menu">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>

            <nav className="mt-3 flex flex-col gap-1 px-4">
              {navItems.map((item) => {
                const isActive = isItemActive(item);

                return (
                  <SheetClose asChild key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'rounded-md px-3 py-2 text-sm transition-colors',
                        isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'hover:bg-zinc-800 hover:text-zinc-50'
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                );
              })}
            </nav>

            <div className="mt-auto flex flex-col gap-2 px-4 pb-6">
              {!isLoggedIn ? (
                <>
                  <SheetClose asChild>
                    <Button
                      asChild
                      className="bg-brand-lime font-semibold text-zinc-950 hover:bg-brand-lime/80"
                    >
                      <Link href="/login">Sign In</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="outline"
                      className="bg-background text-slate-800 hover:bg-background/80"
                    >
                      <Link href="/register">Sign Up</Link>
                    </Button>
                  </SheetClose>
                </>
              ) : (
                <>
                  <SheetClose asChild>
                    <Button asChild variant="default" className="text-zinc-100">
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                  </SheetClose>
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                    className="text-zinc-100"
                  >
                    Log out
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
