'use client';

import { Star, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Outlet } from '@/types';
import { cn } from '@/lib/utils';
import { formatCurrencyShort } from '@/lib/data';

interface OutletCardProps {
  outlet: Outlet;
  onClick?: () => void;
}

export function OutletCard({ outlet, onClick }: OutletCardProps) {
  const performance = (outlet.revenueToday / outlet.revenueTarget) * 100;
  const isAboveTarget = performance >= 100;

  return (
    <Card
      className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
      onClick={onClick}
    >
      {/* Status indicator */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-1',
          outlet.status === 'excellent' && 'bg-emerald-500',
          outlet.status === 'good' && 'bg-blue-500',
          outlet.status === 'needs-attention' && 'bg-amber-500',
          outlet.status === 'critical' && 'bg-red-500'
        )}
      />

      <div className="mt-1">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-semibold line-clamp-1">{outlet.name}</h4>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{outlet.city}</span>
            </div>
          </div>
          <Badge
            variant="outline"
            className={cn(
              'gap-1',
              outlet.status === 'excellent' && 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
              outlet.status === 'good' && 'border-blue-500/30 text-blue-600 dark:text-blue-400',
              outlet.status === 'needs-attention' && 'border-amber-500/30 text-amber-600 dark:text-amber-400',
              outlet.status === 'critical' && 'border-red-500/30 text-red-600 dark:text-red-400'
            )}
          >
            {outlet.status === 'excellent' && 'Excellent'}
            {outlet.status === 'good' && 'Good'}
            {outlet.status === 'needs-attention' && 'Attention'}
            {outlet.status === 'critical' && 'Critical'}
          </Badge>
        </div>

        <div className="space-y-3">
          {/* Revenue */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Revenue</span>
              <span className="text-sm font-semibold font-number">
                {formatCurrencyShort(outlet.revenueToday)}
              </span>
            </div>
            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  'absolute left-0 top-0 h-full rounded-full transition-all',
                  isAboveTarget ? 'bg-emerald-500' : 'bg-amber-500'
                )}
                style={{ width: `${Math.min(performance, 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-muted-foreground">
                Target: {formatCurrencyShort(outlet.revenueTarget)}
              </span>
              <span
                className={cn(
                  'text-xs font-medium',
                  isAboveTarget ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                )}
              >
                {performance.toFixed(0)}%
              </span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="text-center">
              <p className="text-lg font-bold font-number">{outlet.transactions}</p>
              <p className="text-xs text-muted-foreground">Transaksi</p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span className="font-semibold">{outlet.rating}</span>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-muted-foreground">
                {outlet.manager.split(' ')[0]}
              </p>
              <p className="text-xs text-muted-foreground">Manager</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

interface OutletRowProps {
  outlet: Outlet;
  rank: number;
}

export function OutletRow({ outlet, rank }: OutletRowProps) {
  const performance = (outlet.revenueToday / outlet.revenueTarget) * 100;

  return (
    <tr className="border-b border-border hover:bg-accent/50 transition-colors">
      <td className="py-4 px-4">
        <span className="text-sm font-medium text-muted-foreground">#{rank}</span>
      </td>
      <td className="py-4 px-4">
        <div>
          <p className="font-medium">{outlet.name}</p>
          <p className="text-xs text-muted-foreground">{outlet.city}</p>
        </div>
      </td>
      <td className="py-4 px-4">
        <span className="font-semibold font-number">
          {formatCurrencyShort(outlet.revenueToday)}
        </span>
      </td>
      <td className="py-4 px-4">
        <div className="w-24">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full',
                performance >= 100 ? 'bg-emerald-500' : 'bg-amber-500'
              )}
              style={{ width: `${Math.min(performance, 100)}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground mt-1 block">
            {performance.toFixed(0)}%
          </span>
        </div>
      </td>
      <td className="py-4 px-4">
        <span className="text-sm">{outlet.transactions}</span>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
          <span className="font-medium">{outlet.rating}</span>
        </div>
      </td>
      <td className="py-4 px-4">
        <Badge
          variant="outline"
          className={cn(
            outlet.status === 'excellent' && 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
            outlet.status === 'good' && 'border-blue-500/30 text-blue-600 dark:text-blue-400',
            outlet.status === 'needs-attention' && 'border-amber-500/30 text-amber-600 dark:text-amber-400',
            outlet.status === 'critical' && 'border-red-500/30 text-red-600 dark:text-red-400'
          )}
        >
          {outlet.status}
        </Badge>
      </td>
    </tr>
  );
}
