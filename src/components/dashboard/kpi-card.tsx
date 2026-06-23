'use client';

import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string;
  change?: number;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  className?: string;
}

export function KPICard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-blue-600',
  iconBg = 'bg-blue-100',
  className,
}: KPICardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className={cn('p-5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800', className)}>
      <div className="flex items-start justify-between mb-3">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', iconBg)}>
          <Icon className={cn('h-5 w-5', iconColor)} />
        </div>
        {change !== undefined && (
          <div
            className={cn(
              'flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold',
              isPositive
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            )}
          >
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(change).toFixed(1)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
        <p className="text-2xl lg:text-3xl font-bold font-number tracking-tight text-slate-900 dark:text-slate-100">{value}</p>
      </div>
    </div>
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
    <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">{label}</p>
      <div className="flex items-baseline justify-between">
        <span className="text-lg font-bold font-number text-slate-900 dark:text-slate-100">{value}</span>
        {trend && trendValue && (
          <span
            className={cn(
              'text-xs font-medium',
              trend === 'up' && 'text-emerald-600 dark:text-emerald-400',
              trend === 'down' && 'text-red-600 dark:text-red-400',
              trend === 'stable' && 'text-slate-500'
            )}
          >
            {trendValue}
          </span>
        )}
      </div>
    </div>
  );
}
