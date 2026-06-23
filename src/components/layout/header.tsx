'use client';

import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  Bell,
  Search,
  Calendar,
  Menu,
  LogOut,
  User,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { notifications } from '@/lib/data';

interface HeaderProps {
  title: string;
  subtitle?: string;
  sidebarCollapsed: boolean;
  onMobileMenuToggle: () => void;
}

export function Header({ title, subtitle, onMobileMenuToggle }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur-sm px-4 lg:px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-lg lg:text-xl font-semibold text-foreground">{title}</h1>
          {subtitle && (
            <p className="hidden lg:block text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Date */}
        <div className="hidden md:flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            {new Date().toLocaleDateString('id-ID', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            })}
          </span>
        </div>

        {/* Search */}
        <div className="hidden lg:block relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="w-[200px] h-9 pl-9 pr-4 rounded-lg bg-muted border-0 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent transition-colors"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5 text-foreground" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 top-full mt-2 z-50 w-[340px] lg:w-[380px] rounded-xl border border-border bg-popover shadow-2xl">
                <div className="flex items-center justify-between border-b border-border p-4">
                  <h3 className="font-semibold">Notifications</h3>
                  <button
                    className="flex h-6 w-6 items-center justify-center rounded hover:bg-accent"
                    onClick={() => setShowNotifications(false)}
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="max-h-[360px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        'flex gap-3 p-4 cursor-pointer transition-colors hover:bg-accent',
                        !notification.read && 'bg-accent/50'
                      )}
                    >
                      <div className="mt-1">
                        <div
                          className={cn(
                            'h-2 w-2 rounded-full',
                            notification.type === 'error' && 'bg-red-500',
                            notification.type === 'warning' && 'bg-amber-500',
                            notification.type === 'success' && 'bg-emerald-500',
                            notification.type === 'info' && 'bg-blue-500'
                          )}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{notification.title}</p>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {notification.message}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Menu */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="hidden lg:flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-accent transition-colors">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                SA
              </div>
              <span className="text-sm font-medium">Satria A</span>
              <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
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
    </header>
  );
}
