'use client';

import {
  Brain,
  TrendingUp,
  Users,
  Package,
  MapPin,
  Lightbulb,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AIInsight } from '@/types';
import { cn } from '@/lib/utils';
import { formatCurrencyShort } from '@/lib/data';

interface InsightCardProps {
  insight: AIInsight;
}

const iconMap: Record<string, React.ElementType> = {
  users: Users,
  'trending-up': TrendingUp,
  'map-pin': MapPin,
  package: Package,
  lightbulb: Lightbulb,
  zap: Zap,
};

export function InsightCard({ insight }: InsightCardProps) {
  const Icon = iconMap[insight.icon] || Brain;

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold">{insight.title}</h4>
            <Badge variant="outline" className="mt-1 text-xs capitalize">
              {insight.category.replace('-', ' ')}
            </Badge>
          </div>
        </div>
        <Badge variant="outline" className="bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-500/30 gap-1">
          <Brain className="h-3 w-3" />
          AI
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{insight.description}</p>

      {/* Confidence Score */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">Confidence</span>
          <span className="text-xs font-semibold text-primary">
            {insight.confidence}%
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${insight.confidence}%` }}
          />
        </div>
      </div>

      {/* Expected Impact */}
      <div className="flex items-center justify-between rounded-lg bg-muted p-3 mb-4">
        <span className="text-xs text-muted-foreground">Impact</span>
        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          {insight.expectedImpact}
        </span>
      </div>

      {/* Potential Revenue */}
      {insight.potentialRevenue && (
        <div className="flex items-center justify-between rounded-lg bg-emerald-100 dark:bg-emerald-500/20 p-3 mb-4 border border-emerald-200 dark:border-emerald-500/30">
          <span className="text-xs text-emerald-700 dark:text-emerald-400">Potential</span>
          <span className="text-lg font-bold font-number text-emerald-700 dark:text-emerald-400">
            {formatCurrencyShort(insight.potentialRevenue)}
          </span>
        </div>
      )}

      {/* Action Items */}
      <div className="space-y-2 mb-4">
        <p className="text-xs font-medium text-muted-foreground">Actions:</p>
        {insight.actionItems.map((action, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
            <span className="text-sm">{action}</span>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full gap-2">
        Implement
        <ChevronRight className="h-4 w-4" />
      </Button>
    </Card>
  );
}

interface QuickInsightProps {
  insight: AIInsight;
}

export function QuickInsight({ insight }: QuickInsightProps) {
  const Icon = iconMap[insight.icon] || Brain;

  return (
    <div className="flex items-start gap-3 rounded-lg bg-card border border-border p-3 hover:bg-accent transition-colors cursor-pointer">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium line-clamp-1">{insight.title}</p>
        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
          {insight.expectedImpact}
        </p>
      </div>
      {insight.potentialRevenue && (
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
          {formatCurrencyShort(insight.potentialRevenue)}
        </span>
      )}
    </div>
  );
}
