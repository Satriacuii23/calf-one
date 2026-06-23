'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  LayoutDashboard,
  TrendingUp,
  Store,
  Users,
  Package,
  AlertTriangle,
  MapPin,
  Brain,
  Settings,
  ChevronDown,
  LogOut,
  User,
  Sun,
  Moon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navItems = [
  { title: 'Dashboard', href: '/', icon: LayoutDashboard },
  { title: 'Revenue', href: '/revenue', icon: TrendingUp },
  { title: 'Outlets', href: '/outlets', icon: Store },
  { title: 'Customers', href: '/customers', icon: Users },
  { title: 'Products', href: '/products', icon: Package },
  { title: 'Risk Center', href: '/risk', icon: AlertTriangle, badge: 6 },
  { title: 'Expansion', href: '/expansion', icon: MapPin },
  { title: 'AI Insights', href: '/insights', icon: Brain, badge: 5 },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={cn(
      'flex flex-col h-full bg-sidebar text-sidebar-foreground',
      collapsed ? 'w-[68px]' : 'w-[240px]'
    )}>
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border/50">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-lg bg-white/10">
            <Image
              src="/images/logo.jpeg"
              alt="CALF"
              fill
              className="object-contain"
            />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight">CALF</span>
              <span className="text-[10px] font-semibold text-blue-300">ONE</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea.Root className="flex-1">
        <ScrollArea.Viewport className="h-full w-full">
          <nav className="p-2 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onMobileClose}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-sidebar-accent text-white shadow-sm'
                      : 'text-white/70 hover:bg-sidebar-accent/50 hover:text-white'
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-white/20 px-1.5 text-[10px] font-semibold">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </nav>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical" className="flex w-1.5 touch-none flex-col bg-transparent">
          <ScrollArea.Thumb className="relative flex-1 rounded-full bg-white/20" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>

      {/* Theme Toggle */}
      <div className="p-2 border-t border-sidebar-border/50">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full rounded-md px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-sidebar-accent/50 hover:text-white transition-all"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          {!collapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
      </div>

      {/* Settings */}
      <div className="p-2 border-t border-sidebar-border/50">
        <Link
          href="/settings"
          onClick={onMobileClose}
          className={cn(
            'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all',
            pathname === '/settings'
              ? 'bg-sidebar-accent text-white'
              : 'text-white/70 hover:bg-sidebar-accent/50 hover:text-white'
          )}
        >
          <Settings className="h-5 w-5" />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>

      {/* User Profile */}
      {!collapsed && (
        <div className="p-2 border-t border-sidebar-border/50">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center gap-3 w-full rounded-md p-2 bg-sidebar-accent/30 hover:bg-sidebar-accent/50 transition-all">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-semibold">
                  SA
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-medium truncate">Satria A</p>
                  <p className="text-[10px] text-white/60 truncate">Founder</p>
                </div>
                <ChevronDown className="h-4 w-4 text-white/60" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={8}
                className="min-w-[180px] rounded-lg bg-popover border border-border p-1 shadow-xl z-50"
              >
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-accent outline-none">
                  <User className="h-4 w-4" /> Profile
                </DropdownMenu.Item>
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-accent outline-none">
                  <Settings className="h-4 w-4" /> Settings
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="h-px bg-border my-1" />
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-accent outline-none text-red-500">
                  <LogOut className="h-4 w-4" /> Sign Out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      )}
    </div>
  );
}

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggle: () => void;
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      <div
        className={cn(
          'fixed left-0 top-0 z-50 h-full transition-transform duration-300 lg:hidden',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <Sidebar
          collapsed={false}
          onToggle={() => {}}
          mobileOpen={open}
          onMobileClose={onClose}
        />
      </div>
    </>
  );
}
