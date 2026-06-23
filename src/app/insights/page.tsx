'use client';

import { motion } from 'framer-motion';
import {
  Brain,
  TrendingUp,
  Sparkles,
  Lightbulb,
  Target,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { KPICard } from '@/components/dashboard/kpi-card';
import { InsightCard } from '@/components/dashboard/insight-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { aiInsights, formatCurrencyShort } from '@/lib/data';
import { cn } from '@/lib/utils';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const totalPotentialRevenue = aiInsights.reduce(
  (acc, insight) => acc + (insight.potentialRevenue || 0),
  0
);

const avgConfidence =
  aiInsights.reduce((acc, insight) => acc + insight.confidence, 0) /
  aiInsights.length;

export default function InsightsPage() {
  return (
    <MainLayout
      title="AI Insights"
      subtitle="AI-powered recommendations and predictions"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <motion.div variants={item}>
            <KPICard
              title="Active Insights"
              value={aiInsights.length.toString()}
              icon={Brain}
              iconColor="text-primary"
              iconBg="bg-primary/10"
            />
          </motion.div>
          <motion.div variants={item}>
            <KPICard
              title="Potential Revenue"
              value={formatCurrencyShort(totalPotentialRevenue)}
              change={18.5}
              icon={TrendingUp}
              iconColor="text-emerald-400"
              iconBg="bg-emerald-500/10"
            />
          </motion.div>
          <motion.div variants={item}>
            <KPICard
              title="Avg Confidence"
              value={`${avgConfidence.toFixed(0)}%`}
              icon={Target}
              iconColor="text-purple-400"
              iconBg="bg-purple-500/10"
            />
          </motion.div>
          <motion.div variants={item}>
            <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-purple-500/10 via-card to-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    AI Status
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="font-semibold text-emerald-400">Active</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-purple-400" />
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Processing latest data for new insights
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Summary */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-number">
                      {aiInsights.length}
                    </p>
                    <p className="text-sm text-muted-foreground">New Insights</p>
                  </div>
                </div>
                <div className="h-12 w-px bg-border hidden md:block" />
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-number text-emerald-400">
                      {formatCurrencyShort(totalPotentialRevenue)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Potential Revenue
                    </p>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/30 gap-1"
                  >
                    <Sparkles className="h-3 w-3" />
                    Updated 5 min ago
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Insights Grid */}
        <motion.div variants={item}>
          <div className="grid gap-6 lg:grid-cols-2">
            {aiInsights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </motion.div>

        {/* Insights by Category */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Insights by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-5">
                {['revenue', 'operations', 'customer', 'inventory', 'expansion'].map(
                  (category) => {
                    const categoryInsights = aiInsights.filter(
                      (i) => i.category === category
                    );
                    const categoryRevenue = categoryInsights.reduce(
                      (acc, i) => acc + (i.potentialRevenue || 0),
                      0
                    );
                    const avgConf =
                      categoryInsights.length > 0
                        ? categoryInsights.reduce(
                            (acc, i) => acc + i.confidence,
                            0
                          ) / categoryInsights.length
                        : 0;

                    return (
                      <div
                        key={category}
                        className="p-4 rounded-lg bg-card hover:bg-accent transition-colors cursor-pointer"
                      >
                        <p className="text-sm font-medium capitalize mb-2">
                          {category.replace('-', ' ')}
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl font-bold font-number">
                            {categoryInsights.length}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            insights
                          </span>
                        </div>
                        <Progress value={avgConf} className="h-1 mb-2" />
                        <p className="text-xs text-muted-foreground">
                          {avgConf.toFixed(0)}% avg confidence
                        </p>
                        {categoryRevenue > 0 && (
                          <p className="text-sm font-semibold text-emerald-400 mt-2">
                            {formatCurrencyShort(categoryRevenue)}
                          </p>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Model Performance */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Model Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Recommendation Accuracy
                    </span>
                    <span className="text-sm font-semibold text-emerald-400">
                      94.2%
                    </span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Based on 1,234 implemented recommendations
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Prediction Accuracy
                    </span>
                    <span className="text-sm font-semibold text-emerald-400">
                      89.7%
                    </span>
                  </div>
                  <Progress value={89.7} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Revenue forecasts within 5% margin
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Data Processing Speed
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      Real-time
                    </span>
                  </div>
                  <Progress value={100} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Sub-second processing for all data sources
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div variants={item}>
          <Card className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Lightbulb className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      Need More Insights?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Connect more data sources to unlock deeper AI-powered recommendations
                    </p>
                  </div>
                </div>
                <Button className="gap-2">
                  Connect Data Source
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
