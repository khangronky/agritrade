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
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  const supabase = createClient();
  const isLoggedIn = Boolean(user?.email);
  const displayName = user?.fullName || user?.email || 'User';

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const renderDesktopAuth = () => {
    if (!isLoggedIn) {
      return (
        <>
          <Button
            asChild
            className="bg-brand-lime font-semibold text-zinc-950 hover:bg-brand-lime/90"
          >
            <Link href="/login">Sign In</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-emerald-300 bg-white/80 text-slate-800 hover:bg-white hover:text-slate-900"
          >
            <Link href="/signup">Sign Up</Link>
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
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-semibold text-slate-800 text-sm transition-colors hover:text-emerald-600"
            >
              {item.label}
            </Link>
          ))}
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
              {navItems.map((item) => (
                <SheetClose asChild key={item.label}>
                  <Link
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-zinc-800 hover:text-zinc-50"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-2 px-4 pb-6">
              {!isLoggedIn ? (
                <>
                  <SheetClose asChild>
                    <Button
                      asChild
                      className="w-full bg-brand-lime font-semibold text-zinc-950 hover:bg-brand-lime/90"
                    >
                      <Link href="/login">Sign In</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-zinc-700 bg-transparent text-zinc-800 hover:bg-zinc-800 hover:text-zinc-50"
                    >
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </SheetClose>
                </>
              ) : (
                <>
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full bg-zinc-800 text-zinc-50 hover:bg-zinc-900 hover:text-zinc-100"
                    >
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                  </SheetClose>
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                    className="w-full text-zinc-100 hover:text-zinc-50"
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
