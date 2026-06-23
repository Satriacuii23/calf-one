'use client';

import { Star, MapPin } from 'lucide-react';
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
    <div
      className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">{outlet.name}</h4>
          <div className="flex items-center gap-1 mt-1">
            <MapPin className="h-3 w-3 text-slate-400" />
            <span className="text-xs text-slate-500 dark:text-slate-400">{outlet.city}</span>
          </div>
        </div>
        <Badge
          className={cn(
            'capitalize text-xs',
            outlet.status === 'excellent' && 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
            outlet.status === 'good' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
            outlet.status === 'needs-attention' && 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
            outlet.status === 'critical' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          )}
        >
          {outlet.status.replace('-', ' ')}
        </Badge>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-500 dark:text-slate-400">Revenue</span>
            <span className="text-sm font-semibold font-number text-slate-900 dark:text-slate-100">
              {formatCurrencyShort(outlet.revenueToday)}
            </span>
          </div>
          <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                isAboveTarget ? 'bg-emerald-500' : 'bg-amber-500'
              )}
              style={{ width: `${Math.min(performance, 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-slate-400 dark:text-slate-500">
              Target: {formatCurrencyShort(outlet.revenueTarget)}
            </span>
            <span className={cn(
              'text-xs font-medium',
              isAboveTarget ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
            )}>
              {performance.toFixed(0)}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="text-center">
            <p className="text-lg font-bold font-number text-slate-900 dark:text-slate-100">{outlet.transactions}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Transaksi</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span className="font-semibold text-slate-900 dark:text-slate-100">{outlet.rating}</span>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {outlet.manager.split(' ')[0]}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface OutletRowProps {
  outlet: Outlet;
  rank: number;
}

export function OutletRow({ outlet, rank }: OutletRowProps) {
  const performance = (outlet.revenueToday / outlet.revenueTarget) * 100;

  return (
    <tr className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <td className="py-3 px-4">
        <span className="text-sm font-medium text-slate-500">#{rank}</span>
      </td>
      <td className="py-3 px-4">
        <div>
          <p className="font-medium text-slate-900 dark:text-slate-100">{outlet.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{outlet.city}</p>
        </div>
      </td>
      <td className="py-3 px-4">
        <span className="font-semibold font-number text-slate-900 dark:text-slate-100">
          {formatCurrencyShort(outlet.revenueToday)}
        </span>
      </td>
      <td className="py-3 px-4">
        <div className="w-20">
          <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full',
                performance >= 100 ? 'bg-emerald-500' : 'bg-amber-500'
              )}
              style={{ width: `${Math.min(performance, 100)}%` }}
            />
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
            {performance.toFixed(0)}%
          </span>
        </div>
      </td>
      <td className="py-3 px-4">
        <span className="text-sm text-slate-700 dark:text-slate-300">{outlet.transactions}</span>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
          <span className="font-medium text-slate-900 dark:text-slate-100">{outlet.rating}</span>
        </div>
      </td>
      <td className="py-3 px-4">
        <Badge className={cn(
          outlet.status === 'excellent' && 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
          outlet.status === 'good' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
          outlet.status === 'needs-attention' && 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
          outlet.status === 'critical' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
        )}>
          {outlet.status}
        </Badge>
      </td>
    </tr>
  );
}
