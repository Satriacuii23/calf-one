'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
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
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
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
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={cn(
      'flex flex-col h-full bg-blue-900 text-white',
      collapsed ? 'w-[64px]' : 'w-[220px]'
    )}>
      {/* Logo */}
      <div className="flex items-center h-14 px-4 border-b border-blue-800">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-8 w-8 overflow-hidden rounded bg-white">
            <Image
              src="/images/logo.jpeg"
              alt="CALF"
              fill
              className="object-contain"
            />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight">CALF</span>
              <span className="text-[9px] font-semibold text-blue-300">ONE</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-100 hover:bg-blue-800'
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.title}</span>
                  {item.badge && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded bg-white/20 px-1.5 text-[10px] font-semibold">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Theme Toggle */}
      <div className="p-2 border-t border-blue-800">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full rounded-md px-3 py-2.5 text-sm font-medium text-blue-100 hover:bg-blue-800 transition-colors"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          {!collapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
      </div>

      {/* Settings */}
      <div className="p-2 border-t border-blue-800">
        <Link
          href="/settings"
          onClick={onMobileClose}
          className={cn(
            'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
            pathname === '/settings'
              ? 'bg-blue-700 text-white'
              : 'text-blue-100 hover:bg-blue-800'
          )}
        >
          <Settings className="h-5 w-5" />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>

      {/* User Profile */}
      {!collapsed && (
        <div className="p-2 border-t border-blue-800">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center gap-3 w-full rounded-md p-2 bg-blue-800/50 hover:bg-blue-800 transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                  SA
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-medium truncate">Satria A</p>
                  <p className="text-[10px] text-blue-300 truncate">Founder</p>
                </div>
                <ChevronDown className="h-4 w-4 text-blue-300" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={8}
                className="min-w-[180px] rounded-lg border border-slate-200 bg-white p-1 shadow-xl z-50"
              >
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-slate-100 outline-none text-slate-700">
                  <User className="h-4 w-4" /> Profile
                </DropdownMenu.Item>
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-slate-100 outline-none text-slate-700">
                  <Settings className="h-4 w-4" /> Settings
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="h-px bg-slate-200 my-1" />
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-slate-100 outline-none text-red-600">
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
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
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
