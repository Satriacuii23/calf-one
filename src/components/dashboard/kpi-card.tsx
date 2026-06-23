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
  changeLabel,
  icon: Icon,
  iconColor = 'text-primary',
  iconBg = 'bg-primary/20',
  suffix,
  className,
}: KPICardProps) {
  const isPositive = change !== undefined && change >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Card
      className={cn(
        'relative overflow-hidden p-6 transition-all duration-200 card-hover',
        className
      )}
    >
      {/* Glow effect for primary card */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', iconBg)}>
            <Icon className={cn('h-6 w-6', iconColor)} />
          </div>
          {change !== undefined && (
            <div
              className={cn(
                'flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold',
                isPositive
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-red-500/10 text-red-400'
              )}
            >
              <TrendIcon className="h-3 w-3" />
              {formatPercentage(change)}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold font-number tracking-tight">
              {value}
            </span>
            {suffix && (
              <span className="text-sm text-muted-foreground">{suffix}</span>
            )}
          </div>
        </div>

        {changeLabel && (
          <p className="mt-2 text-xs text-muted-foreground">{changeLabel}</p>
        )}
      </div>

      {/* Decorative corner gradient */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
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
    <div className="rounded-lg bg-card p-3">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <div className="flex items-baseline justify-between">
        <span className="text-lg font-bold font-number">{value}</span>
        {trend && trendValue && (
          <span
            className={cn(
              'text-xs font-medium',
              trend === 'up' && 'text-emerald-400',
              trend === 'down' && 'text-red-400',
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
