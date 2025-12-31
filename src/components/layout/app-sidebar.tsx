'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  Calendar,
  PenSquare,
  Inbox,
  AtSign,
  BarChart2,
  Megaphone,
  CheckSquare,
  Library,
  Settings,
  Flame,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/hooks/use-user';
import type { UserRole } from '@/lib/types';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';

type MenuItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  roles: UserRole[];
  badge?: number;
};

const menuItems: MenuItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['Admin', 'Manager', 'Editor'] },
  { href: '/accounts', label: 'Social Accounts', icon: Users, roles: ['Admin', 'Manager'] },
  { href: '/planner', label: 'Content Planner', icon: Calendar, roles: ['Admin', 'Manager', 'Editor'] },
  { href: '/content-creation', label: 'Post Composer', icon: PenSquare, roles: ['Admin', 'Manager', 'Editor'] },
  { href: '/ai-content-creator', label: 'AI Content Creator', icon: Sparkles, roles: ['Admin', 'Manager', 'Editor'] },
  { href: '/risk-check', label: 'AI Risk Check', icon: ShieldCheck, roles: ['Admin', 'Manager', 'Editor'] },
  { href: '/inbox', label: 'Inbox', icon: Inbox, roles: ['Admin', 'Manager', 'Editor'], badge: 5 },
  { href: '/mentions', label: 'Mentions', icon: AtSign, roles: ['Admin', 'Manager', 'Editor'] },
  { href: '/analytics', label: 'Analytics', icon: BarChart2, roles: ['Admin', 'Manager'] },
  { href: '/campaigns', label: 'Campaigns', icon: Megaphone, roles: ['Admin', 'Manager'] },
  { href: '/approvals', label: 'Team & Approvals', icon: CheckSquare, roles: ['Admin', 'Manager'] },
  { href: '/library', label: 'Media Library', icon: Library, roles: ['Admin', 'Manager', 'Editor'] },
];

const settingsItem = {
  href: '/settings',
  label: 'Settings',
  icon: Settings,
  roles: ['Admin', 'Manager', 'Editor'],
};

export function AppSidebar() {
  const pathname = usePathname();
  const { user, setUserRole } = useUser();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/' || pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  const availableMenuItems = menuItems.filter(item => item.roles.includes(user.role));

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Flame className="w-6 h-6 text-primary" />
          <h2 className="text-lg font-semibold tracking-tight">Social Central</h2>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {availableMenuItems.map(item => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton isActive={isActive(item.href)} tooltip={item.label}>
                  <item.icon />
                  <span>{item.label}</span>
                  {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href={settingsItem.href} legacyBehavior passHref>
              <SidebarMenuButton isActive={isActive(settingsItem.href)} tooltip={settingsItem.label}>
                <Settings />
                <span>{settingsItem.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2 p-2 h-auto text-sm">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.role}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mb-2" side="top" align="start">
                <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setUserRole('Admin')}>Admin</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setUserRole('Manager')}>Manager</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setUserRole('Editor')}>Editor</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
