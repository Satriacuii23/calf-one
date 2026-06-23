'use client';

import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  Bell,
  Search,
  Calendar,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { notifications, formatCurrencyShort } from '@/lib/data';

interface HeaderProps {
  title: string;
  subtitle?: string;
  sidebarCollapsed: boolean;
  onMobileMenuToggle: () => void;
}

export function Header({ title, subtitle, sidebarCollapsed, onMobileMenuToggle }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:px-6 transition-all duration-300'
      )}
    >
      {/* Mobile Menu Button */}
      <button
        onClick={onMobileMenuToggle}
        className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent transition-colors"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex flex-col lg:ml-0 ml-0">
        <h1 className="text-lg lg:text-xl font-semibold">{title}</h1>
        {subtitle && (
          <p className="text-xs lg:text-sm text-muted-foreground hidden sm:block">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        {/* Date Display */}
        <div className="hidden md:flex items-center gap-2 rounded-lg bg-card px-3 py-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {new Date().toLocaleDateString('id-ID', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>

        {/* Search - Desktop */}
        <div className="hidden lg:block relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="w-[200px] lg:w-[280px] h-10 pl-10 pr-4 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent transition-colors"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
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
              <div className="absolute right-0 top-full mt-2 z-50 w-[340px] lg:w-[380px] rounded-xl border border-border bg-popover shadow-2xl animate-fade-in">
                <div className="flex items-center justify-between border-b border-border p-4">
                  <h3 className="font-semibold">Notifications</h3>
                  <button
                    className="flex h-6 w-6 items-center justify-center rounded hover:bg-accent"
                    onClick={() => setShowNotifications(false)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="max-h-[360px] overflow-y-auto">
                  <div className="p-2">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          'flex gap-3 rounded-lg p-3 transition-colors cursor-pointer hover:bg-accent',
                          !notification.read && 'bg-accent/50'
                        )}
                      >
                        <div
                          className={cn(
                            'mt-0.5 h-2 w-2 rounded-full shrink-0',
                            notification.type === 'error' && 'bg-red-500',
                            notification.type === 'warning' && 'bg-amber-500',
                            notification.type === 'success' && 'bg-emerald-500',
                            notification.type === 'info' && 'bg-blue-500'
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium truncate">{notification.title}</p>
                            {!notification.read && (
                              <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Menu - Desktop */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="hidden lg:flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent transition-colors">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                SA
              </div>
              <span className="text-sm font-medium">Satria A</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
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
    </header>
  );
}
