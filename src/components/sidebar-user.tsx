'use client';

import {
  ChevronsUpDown,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSidebar } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCurrentUser } from '@/lib/api/auth';
import { createClient } from '@/lib/supabase/client';
import { useSettingsDialogStore } from '@/stores/settings-dialog.store';
import { getInitials } from '@/utils/name-helper';

export function SidebarUser() {
  const isMobile = useIsMobile();
  const { state } = useSidebar();
  const sidebarOpen = isMobile || state === 'expanded';

  const router = useRouter();
  const supabase = createClient();

  const { data: user, isLoading } = useCurrentUser();
  const openSettingsDialog = useSettingsDialogStore(
    (state) => state.openDialog
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  if (isLoading || !user) {
    return <Skeleton className="h-12" />;
  }

  const displayName = user.full_name || user.username;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="lg"
          className="h-fit border-t bg-card py-2.5 text-accent-foreground hover:bg-accent"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            {user.avatar_url ? (
              <AvatarImage src={user.avatar_url} alt={displayName} />
            ) : null}
            <AvatarFallback className="rounded-lg bg-sidebar-primary! text-sidebar-primary-foreground">
              {getInitials(displayName)}
            </AvatarFallback>
          </Avatar>
          {sidebarOpen && (
            <>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayName}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={isMobile ? 'bottom' : 'right'}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              {user.avatar_url ? (
                <AvatarImage src={user.avatar_url} alt={displayName} />
              ) : null}
              <AvatarFallback className="rounded-lg">
                {getInitials(displayName)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{displayName}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="size-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openSettingsDialog('user')}>
          <Settings />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
