'use client';

import {
  Brain,
  TrendingUp,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { KPICard } from '@/components/dashboard/kpi-card';
import { InsightCard } from '@/components/dashboard/insight-card';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { aiInsights, formatCurrencyShort } from '@/lib/data';

const totalPotentialRevenue = aiInsights.reduce(
  (acc, insight) => acc + (insight.potentialRevenue || 0),
  0
);

const avgConfidence = aiInsights.reduce((acc, insight) => acc + insight.confidence, 0) / aiInsights.length;

export default function InsightsPage() {
  return (
    <MainLayout title="AI Insights" subtitle="AI-powered recommendations">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Active Insights"
            value={aiInsights.length.toString()}
            icon={Brain}
            iconColor="text-blue-600 dark:text-blue-400"
            iconBg="bg-blue-100 dark:bg-blue-500/20"
          />
          <KPICard
            title="Potential Revenue"
            value={formatCurrencyShort(totalPotentialRevenue)}
            change={18.5}
            icon={TrendingUp}
            iconColor="text-emerald-600 dark:text-emerald-400"
            iconBg="bg-emerald-100 dark:bg-emerald-500/20"
          />
          <KPICard
            title="Avg Confidence"
            value={`${avgConfidence.toFixed(0)}%`}
            icon={Target}
            iconColor="text-purple-600 dark:text-purple-400"
            iconBg="bg-purple-100 dark:bg-purple-500/20"
          />
          <Card className="p-4 lg:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">AI Status</p>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Active</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Processing latest data</p>
          </Card>
        </div>

        {/* Summary */}
        <Card>
          <div className="p-4 lg:p-6 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{aiInsights.length}</p>
                <p className="text-sm text-muted-foreground">New Insights</p>
              </div>
            </div>
            <div className="h-12 w-px bg-border hidden md:block" />
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{formatCurrencyShort(totalPotentialRevenue)}</p>
                <p className="text-sm text-muted-foreground">Potential Revenue</p>
              </div>
            </div>
            <Badge variant="outline" className="ml-auto bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-500/30 gap-1">
              <Sparkles className="h-3 w-3" />
              Updated 5 min ago
            </Badge>
          </div>
        </Card>

        {/* Insights Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {aiInsights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>

        {/* Insights by Category */}
        <Card>
          <div className="p-4 lg:p-6">
            <h3 className="text-lg font-semibold mb-4">Insights by Category</h3>
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
              {['revenue', 'operations', 'customer', 'inventory', 'expansion'].map((category) => {
                const categoryInsights = aiInsights.filter((i) => i.category === category);
                const categoryRevenue = categoryInsights.reduce((acc, i) => acc + (i.potentialRevenue || 0), 0);
                const avgConf = categoryInsights.length > 0
                  ? categoryInsights.reduce((acc, i) => acc + i.confidence, 0) / categoryInsights.length
                  : 0;

                return (
                  <div key={category} className="p-4 rounded-lg bg-muted hover:bg-accent transition-colors cursor-pointer">
                    <p className="text-sm font-medium capitalize mb-2">{category.replace('-', ' ')}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl font-bold">{categoryInsights.length}</span>
                      <span className="text-sm text-muted-foreground">insights</span>
                    </div>
                    <Progress value={avgConf} className="h-1 mb-2" />
                    <p className="text-xs text-muted-foreground">{avgConf.toFixed(0)}% confidence</p>
                    {categoryRevenue > 0 && (
                      <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
                        {formatCurrencyShort(categoryRevenue)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* AI Model Performance */}
        <Card>
          <div className="p-4 lg:p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Model Performance
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Recommendation Accuracy</span>
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">94.2%</span>
                </div>
                <Progress value={94.2} className="h-2" />
                <p className="text-xs text-muted-foreground">Based on 1,234 implemented recommendations</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Prediction Accuracy</span>
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">89.7%</span>
                </div>
                <Progress value={89.7} className="h-2" />
                <p className="text-xs text-muted-foreground">Revenue forecasts within 5% margin</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Processing Speed</span>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Real-time</span>
                </div>
                <Progress value={100} className="h-2" />
                <p className="text-xs text-muted-foreground">Sub-second processing</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
