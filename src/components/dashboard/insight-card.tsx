'use client';

import { Brain, TrendingUp, Users, MapPin, Lightbulb, Zap, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
    <div className="p-5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{insight.title}</h4>
            <Badge variant="outline" className="mt-1 text-xs capitalize">
              {insight.category.replace('-', ' ')}
            </Badge>
          </div>
        </div>
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 gap-1">
          <Brain className="h-3 w-3" />
          AI
        </Badge>
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{insight.description}</p>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">Confidence</span>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{insight.confidence}%</span>
        </div>
        <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-blue-600 dark:bg-blue-400" style={{ width: `${insight.confidence}%` }} />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-md bg-slate-50 dark:bg-slate-800 p-3 mb-4">
        <span className="text-xs text-slate-500 dark:text-slate-400">Impact</span>
        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          {insight.expectedImpact}
        </span>
      </div>

      {insight.potentialRevenue && (
        <div className="flex items-center justify-between rounded-md bg-emerald-50 dark:bg-emerald-900/20 p-3 mb-4 border border-emerald-200 dark:border-emerald-800">
          <span className="text-xs text-emerald-700 dark:text-emerald-400">Potential</span>
          <span className="text-base font-bold font-number text-emerald-700 dark:text-emerald-400">
            {formatCurrencyShort(insight.potentialRevenue)}
          </span>
        </div>
      )}

      <div className="space-y-2 mb-4">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Actions:</p>
        {insight.actionItems.map((action, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0" />
            <span className="text-sm text-slate-700 dark:text-slate-300">{action}</span>
          </div>
        ))}
      </div>

      <button className="w-full py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-slate-100 dark:bg-slate-800 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
        Implement
        <ChevronRight className="h-4 w-4 inline ml-1" />
      </button>
    </div>
  );
}

interface QuickInsightProps {
  insight: AIInsight;
}

export function QuickInsight({ insight }: QuickInsightProps) {
  const Icon = iconMap[insight.icon] || Brain;

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer">
      <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 line-clamp-1">{insight.title}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{insight.expectedImpact}</p>
      </div>
      {insight.potentialRevenue && (
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
          {formatCurrencyShort(insight.potentialRevenue)}
        </span>
      )}
    </div>
  );
}
