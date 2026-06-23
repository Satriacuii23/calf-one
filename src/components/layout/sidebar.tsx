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
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  HelpCircle,
  Sun,
  Moon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { kpiData } from '@/lib/data';
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
      collapsed ? 'w-[72px]' : 'w-[260px]'
    )}>
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-lg">
            <Image
              src="/images/logo.jpeg"
              alt="CALF ONE Logo"
              fill
              className="object-contain bg-white"
            />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight">CALF</span>
              <span className="text-xs font-medium text-blue-400">ONE</span>
            </div>
          )}
        </Link>
        <button
          onClick={onToggle}
          className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg hover:bg-sidebar-accent transition-colors"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation */}
      <ScrollArea.Root className="flex-1">
        <ScrollArea.Viewport className="h-full w-full">
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onMobileClose}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all sidebar-item',
                    isActive && 'bg-sidebar-accent border-l-2 border-blue-400'
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500/20 px-1.5 text-xs font-semibold text-blue-400">
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
        <ScrollArea.Scrollbar orientation="vertical" className="flex w-1 touch-none flex-col bg-transparent">
          <ScrollArea.Thumb className="relative flex-1 rounded-full bg-sidebar-border" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>

      {/* Theme Toggle */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium sidebar-item"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          {!collapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
      </div>

      {/* Settings */}
      <div className="p-3 border-t border-sidebar-border">
        <Link
          href="/settings"
          onClick={onMobileClose}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium sidebar-item',
            pathname === '/settings' && 'bg-sidebar-accent'
          )}
        >
          <Settings className="h-5 w-5" />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>

      {/* User Profile */}
      {!collapsed && (
        <div className="p-3 border-t border-sidebar-border">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center gap-3 w-full rounded-lg p-3 bg-sidebar-accent hover:bg-opacity-80 transition-colors">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold">
                  SA
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-medium truncate">Satria A</p>
                  <p className="text-xs text-sidebar-foreground/60 truncate">Founder</p>
                </div>
                <ChevronDown className="h-4 w-4 text-sidebar-foreground/60" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={8}
                className="min-w-[180px] rounded-lg bg-popover border border-border p-1 shadow-lg animate-fade-in z-50"
              >
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-accent outline-none">
                  <User className="h-4 w-4" /> Profile
                </DropdownMenu.Item>
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-accent outline-none">
                  <Settings className="h-4 w-4" /> Settings
                </DropdownMenu.Item>
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-accent outline-none">
                  <HelpCircle className="h-4 w-4" /> Help
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

export function MobileSidebar({ open, onClose, collapsed, onToggle }: MobileSidebarProps) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed left-0 top-0 z-50 h-full transition-transform duration-300 lg:hidden',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <Sidebar
          collapsed={false}
          onToggle={onToggle}
          mobileOpen={open}
          onMobileClose={onClose}
        />
      </div>
    </>
  );
}
