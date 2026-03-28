'use client';

import {
  ClipboardList,
  FolderKanban,
  Handshake,
  LayoutDashboard,
  MessagesSquare,
  Package2,
  Store,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Sidebar as SidebarShell,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavUser } from './nav-user';

const navigation = [
  {
    href: '/dashboard',
    name: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/product-folio',
    name: 'Product Folio',
    icon: FolderKanban,
  },
  {
    href: '/marketplace',
    name: 'Marketplace',
    icon: Store,
  },
  {
    href: '/products',
    name: 'Products',
    icon: Package2,
  },
  {
    href: '/deals',
    name: 'Deals',
    icon: Handshake,
  },
  {
    href: '/orders',
    name: 'Orders',
    icon: ClipboardList,
  },
  {
    href: '/chats',
    name: 'Chats',
    icon: MessagesSquare,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isMobile, state } = useSidebar();
  const sidebarOpen = isMobile || state === 'expanded';

  return (
    <SidebarShell collapsible="icon" className="border-r">
      <SidebarHeader className="gap-0 border-b px-2 py-4">
        <div className="flex items-center justify-between gap-6">
          {sidebarOpen && (
            <div className="flex flex-1 items-center">
              <Link href="/">
                <Image
                  src="/branding.png"
                  alt="Logo"
                  width={1000}
                  height={100}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </Link>
            </div>
          )}
          <SidebarTrigger className={!sidebarOpen ? 'mx-auto' : ''} />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.name}
                >
                  <Link href={item.href}>
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="font-medium text-sm">{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-0">
        <NavUser />
      </SidebarFooter>
    </SidebarShell>
  );
}
