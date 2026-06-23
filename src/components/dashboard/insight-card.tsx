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
    <Card className="relative overflow-hidden p-5 transition-all duration-200 card-hover">
      {/* AI badge */}
      <div className="absolute top-4 right-4">
        <Badge
          variant="outline"
          className="gap-1 bg-purple-500/10 border-purple-500/30 text-purple-400"
        >
          <Brain className="h-3 w-3" />
          AI
        </Badge>
      </div>

      <div className="pr-16">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold">{insight.title}</h4>
            <Badge variant="outline" className="mt-1 text-xs capitalize">
              {insight.category.replace('-', ' ')}
            </Badge>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">{insight.description}</p>

        {/* Confidence Score */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Confidence Score</span>
            <span className="text-xs font-semibold text-primary">
              {insight.confidence}%
            </span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${insight.confidence}%` }}
            />
          </div>
        </div>

        {/* Expected Impact */}
        <div className="flex items-center justify-between rounded-lg bg-card p-3 mb-4">
          <span className="text-xs text-muted-foreground">Expected Impact</span>
          <span className="text-sm font-semibold text-emerald-400">
            {insight.expectedImpact}
          </span>
        </div>

        {/* Potential Revenue */}
        {insight.potentialRevenue && (
          <div className="flex items-center justify-between rounded-lg bg-emerald-500/5 p-3 border border-emerald-500/20 mb-4">
            <span className="text-xs text-emerald-400">Potential Revenue</span>
            <span className="text-lg font-bold font-number text-emerald-400">
              {formatCurrencyShort(insight.potentialRevenue)}
            </span>
          </div>
        )}

        {/* Action Items */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">
            Recommended Actions:
          </p>
          {insight.actionItems.map((action, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-sm">{action}</span>
            </div>
          ))}
        </div>

        <Button className="w-full mt-4 gap-2" variant="secondary">
          Implement Recommendations
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Decorative glow */}
      <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
    </Card>
  );
}

interface QuickInsightProps {
  insight: AIInsight;
}

export function QuickInsight({ insight }: QuickInsightProps) {
  const Icon = iconMap[insight.icon] || Brain;

  return (
    <div className="flex items-start gap-3 rounded-lg bg-card p-3 transition-colors hover:bg-accent cursor-pointer">
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
        <span className="text-xs font-semibold text-emerald-400 shrink-0">
          {formatCurrencyShort(insight.potentialRevenue)}
        </span>
      )}
    </div>
  );
}
