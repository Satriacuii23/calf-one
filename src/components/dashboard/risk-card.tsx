'use client';

import { AlertTriangle, AlertCircle, Info, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Risk, AIInsight } from '@/types';
import { cn } from '@/lib/utils';

interface RiskCardProps {
  risk: Risk;
  onDismiss?: (id: string) => void;
}

export function RiskCard({ risk, onDismiss }: RiskCardProps) {
  const getIcon = () => {
    switch (risk.severity) {
      case 'critical':
        return AlertTriangle;
      case 'warning':
        return AlertCircle;
      default:
        return Info;
    }
  };

  const Icon = getIcon();

  return (
    <Card
      className={cn(
        'relative overflow-hidden p-4 transition-all duration-200 card-hover border-l-4',
        risk.severity === 'critical' && 'border-l-red-500',
        risk.severity === 'warning' && 'border-l-amber-500',
        risk.severity === 'info' && 'border-l-blue-500'
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
            risk.severity === 'critical' && 'bg-red-500/10',
            risk.severity === 'warning' && 'bg-amber-500/10',
            risk.severity === 'info' && 'bg-blue-500/10'
          )}
        >
          <Icon
            className={cn(
              'h-5 w-5',
              risk.severity === 'critical' && 'text-red-400',
              risk.severity === 'warning' && 'text-amber-400',
              risk.severity === 'info' && 'text-blue-400'
            )}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="text-sm font-semibold">{risk.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {risk.description}
              </p>
            </div>
            {onDismiss && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => onDismiss(risk.id)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {risk.outlet && (
              <Badge variant="outline" className="gap-1 text-xs">
                <MapPin className="h-3 w-3" />
                {risk.outlet}
              </Badge>
            )}
            <Badge
              variant="outline"
              className={cn(
                'gap-1 text-xs',
                risk.severity === 'critical' && 'border-red-500/30 text-red-400',
                risk.severity === 'warning' && 'border-amber-500/30 text-amber-400',
                risk.severity === 'info' && 'border-blue-500/30 text-blue-400'
              )}
            >
              {risk.type}
            </Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
              <Clock className="h-3 w-3" />
              {new Date(risk.timestamp).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>

          {risk.suggestedAction && risk.actionable && (
            <div className="mt-3 rounded-lg bg-card p-3">
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Suggested Action:
              </p>
              <p className="text-sm">{risk.suggestedAction}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
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
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <span className="text-sm font-medium">{critical} Critical</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-amber-500" />
        <span className="text-sm font-medium">{warning} Warning</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-blue-500" />
        <span className="text-sm font-medium">{info} Info</span>
      </div>
    </div>
  );
}
