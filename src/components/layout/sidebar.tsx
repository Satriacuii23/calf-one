'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  ChevronLeft,
  ChevronRight,
  Coffee,
  Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { kpiData, formatCurrencyShort } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const navItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Revenue Intelligence',
    href: '/revenue',
    icon: TrendingUp,
  },
  {
    title: 'Outlet Intelligence',
    href: '/outlets',
    icon: Store,
  },
  {
    title: 'Customer Intelligence',
    href: '/customers',
    icon: Users,
  },
  {
    title: 'Product Intelligence',
    href: '/products',
    icon: Package,
  },
  {
    title: 'Risk Center',
    href: '/risk',
    icon: AlertTriangle,
    badge: 6,
  },
  {
    title: 'Expansion Intelligence',
    href: '/expansion',
    icon: MapPin,
  },
  {
    title: 'AI Insights',
    href: '/insights',
    icon: Brain,
    badge: 5,
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r border-border bg-sidebar transition-all duration-300',
        collapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
              <Coffee className="h-5 w-5 text-primary" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight">CALF</span>
                <span className="text-xs font-medium text-primary">ONE</span>
              </div>
            )}
          </Link>
          <button
            onClick={onToggle}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-accent transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-primary/10 text-primary border-l-2 border-primary ml-[-2px]'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/20 px-1.5 text-xs font-semibold text-primary">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <Separator />

        {/* Quick Stats */}
        {!collapsed && (
          <div className="p-4 space-y-3">
            <div className="rounded-lg bg-card p-3">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">
                  Health Score
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-number text-emerald-400">
                  {kpiData.healthScore}
                </span>
                <span className="text-xs text-muted-foreground">/100</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-emerald-400 transition-all"
                  style={{ width: `${kpiData.healthScore}%` }}
                />
              </div>
            </div>

            <div className="rounded-lg bg-card p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-muted-foreground">
                  Revenue Today
                </span>
              </div>
              <div className="text-lg font-bold font-number gradient-text">
                {formatCurrencyShort(kpiData.revenueToday)}
              </div>
            </div>
          </div>
        )}

        <Separator />

        {/* Settings & Profile */}
        <div className="p-3">
          <Link
            href="/settings"
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
              pathname === '/settings'
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            )}
          >
            <Settings className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Settings</span>}
          </Link>

          {!collapsed && (
            <div className="mt-3 flex items-center gap-3 rounded-lg bg-card p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                SA
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Satria A</p>
                <p className="text-xs text-muted-foreground truncate">
                  Founder
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
