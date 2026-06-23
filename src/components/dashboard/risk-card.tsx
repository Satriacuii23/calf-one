'use client';

import { AlertTriangle, AlertCircle, Info, Clock, MapPin } from 'lucide-react';
import { Risk } from '@/types';
import { cn } from '@/lib/utils';

interface RiskCardProps {
  risk: Risk;
  onDismiss?: (id: string) => void;
}

export function RiskCard({ risk }: RiskCardProps) {
  const Icon = risk.severity === 'critical' ? AlertTriangle : risk.severity === 'warning' ? AlertCircle : Info;

  return (
    <div
      className={cn(
        'p-4 rounded-lg border-l-4 bg-white dark:bg-slate-900',
        risk.severity === 'critical' && 'border-l-red-500',
        risk.severity === 'warning' && 'border-l-amber-500',
        risk.severity === 'info' && 'border-l-blue-500'
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
          risk.severity === 'critical' && 'bg-red-100 dark:bg-red-900/30',
          risk.severity === 'warning' && 'bg-amber-100 dark:bg-amber-900/30',
          risk.severity === 'info' && 'bg-blue-100 dark:bg-blue-900/30'
        )}>
          <Icon
            className={cn(
              'h-5 w-5',
              risk.severity === 'critical' && 'text-red-600 dark:text-red-400',
              risk.severity === 'warning' && 'text-amber-600 dark:text-amber-400',
              risk.severity === 'info' && 'text-blue-600 dark:text-blue-400'
            )}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{risk.title}</h4>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{risk.description}</p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {risk.outlet && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                <MapPin className="h-3 w-3" />
                {risk.outlet}
              </span>
            )}
            <span className={cn(
              'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium capitalize',
              risk.severity === 'critical' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
              risk.severity === 'warning' && 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
              risk.severity === 'info' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
            )}>
              {risk.type}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-400 ml-auto">
              <Clock className="h-3 w-3" />
              {new Date(risk.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {risk.suggestedAction && risk.actionable && (
            <div className="mt-3 rounded-md bg-slate-50 dark:bg-slate-800 p-3">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Action:</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">{risk.suggestedAction}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface RiskSummaryProps {
  risks: Risk[];
}

export function RiskSummary({ risks }: RiskSummaryProps) {
  const critical = risks.filter((r) => r.severity === 'critical').length;
  const warning = risks.filter((r) => r.severity === 'warning').length;
  const info = risks.filter((r) => r.severity === 'info').length;

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{critical} Critical</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{warning} Warning</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{info} Info</span>
      </div>
    </div>
  );
}
