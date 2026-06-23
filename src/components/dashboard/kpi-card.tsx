'use client';

import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { formatPercentage } from '@/lib/data';

interface KPICardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  suffix?: string;
  className?: string;
}

export function KPICard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-primary',
  iconBg = 'bg-primary/10',
  className,
}: KPICardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <Card className={cn('p-4 lg:p-6 transition-colors hover:bg-accent/50', className)}>
      <div className="flex items-start justify-between mb-3">
        <div className={cn('flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-lg', iconBg)}>
          <Icon className={cn('h-5 w-5 lg:h-6 lg:w-6', iconColor)} />
        </div>
        {change !== undefined && (
          <div
            className={cn(
              'flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold',
              isPositive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
            )}
          >
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {formatPercentage(change)}
          </div>
        )}
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <span className="text-2xl lg:text-3xl font-bold font-number tracking-tight">
          {value}
        </span>
      </div>
    </Card>
  );
}

interface MiniKPICardProps {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
}

export function MiniKPICard({ label, value, trend, trendValue }: MiniKPICardProps) {
  return (
    <div className="rounded-lg bg-card border border-border p-3">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <div className="flex items-baseline justify-between">
        <span className="text-lg font-bold font-number">{value}</span>
        {trend && trendValue && (
          <span
            className={cn(
              'text-xs font-medium',
              trend === 'up' && 'text-emerald-500',
              trend === 'down' && 'text-red-500',
              trend === 'stable' && 'text-muted-foreground'
            )}
          >
            {trendValue}
          </span>
        )}
      </div>
    </div>
  );
}
