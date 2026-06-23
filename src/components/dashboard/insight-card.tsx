'use client';

import { Brain, TrendingUp, Users, MapPin, Lightbulb, Zap, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AIInsight } from '@/types';
import { formatCurrencyShort } from '@/lib/data';

const iconMap: Record<string, React.ElementType> = {
  users: Users,
  'trending-up': TrendingUp,
  'map-pin': MapPin,
  package: Lightbulb,
  lightbulb: Lightbulb,
  zap: Zap,
};

interface InsightCardProps {
  insight: AIInsight;
}

export function InsightCard({ insight }: InsightCardProps) {
  const Icon = iconMap[insight.icon] || Brain;

  return (
    <Card className="p-5 border border-border hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
            <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="font-semibold">{insight.title}</h4>
            <Badge variant="outline" className="mt-1 text-xs capitalize">
              {insight.category.replace('-', ' ')}
            </Badge>
          </div>
        </div>
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30 gap-1">
          <Brain className="h-3 w-3" />
          AI
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{insight.description}</p>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">Confidence</span>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{insight.confidence}%</span>
        </div>
        <Progress value={insight.confidence} className="h-2" />
      </div>

      <div className="flex items-center justify-between rounded-lg bg-muted p-3 mb-4">
        <span className="text-xs text-muted-foreground">Impact</span>
        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          {insight.expectedImpact}
        </span>
      </div>

      {insight.potentialRevenue && (
        <div className="flex items-center justify-between rounded-lg bg-emerald-50 dark:bg-emerald-500/10 p-3 mb-4 border border-emerald-200 dark:border-emerald-500/20">
          <span className="text-xs text-emerald-700 dark:text-emerald-400">Potential</span>
          <span className="text-lg font-bold font-number text-emerald-700 dark:text-emerald-400">
            {formatCurrencyShort(insight.potentialRevenue)}
          </span>
        </div>
      )}

      <div className="space-y-2 mb-4">
        <p className="text-xs font-medium text-muted-foreground">Actions:</p>
        {insight.actionItems.map((action, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0" />
            <span className="text-sm">{action}</span>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        Implement
        <ChevronRight className="h-4 w-4 ml-2" />
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
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted hover:bg-accent transition-colors cursor-pointer">
      <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium line-clamp-1">{insight.title}</p>
        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{insight.expectedImpact}</p>
      </div>
      {insight.potentialRevenue && (
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
          {formatCurrencyShort(insight.potentialRevenue)}
        </span>
      )}
    </div>
  );
}
