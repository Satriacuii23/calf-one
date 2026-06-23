'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wallet,
  TrendingUp,
  Users,
  ShoppingCart,
  Activity,
  DollarSign,
  ArrowUpRight,
  ChevronRight,
  AlertTriangle,
  Brain,
  Sparkles,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { KPICard, MiniKPICard } from '@/components/dashboard/kpi-card';
import {
  ChartCard,
  RevenueAreaChart,
  HourlyBarChart,
} from '@/components/dashboard/charts';
import { RiskCard, RiskSummary } from '@/components/dashboard/risk-card';
import { QuickInsight } from '@/components/dashboard/insight-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  kpiData,
  outlets,
  risks,
  aiInsights,
  revenueData,
  hourlyRevenue,
  formatCurrencyShort,
} from '@/lib/data';
import { cn } from '@/lib/utils';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const [dismissedRisks, setDismissedRisks] = useState<string[]>([]);

  const visibleRisks = risks.filter((r) => !dismissedRisks.includes(r.id));
  const topOutlets = [...outlets]
    .sort((a, b) => b.revenueToday - a.revenueToday)
    .slice(0, 5);
  const bottomOutlets = [...outlets]
    .sort((a, b) => a.revenueToday - b.revenueToday)
    .slice(0, 3);

  const handleDismissRisk = (id: string) => {
    setDismissedRisks((prev) => [...prev, id]);
  };

  return (
    <MainLayout
      title="Executive Dashboard"
      subtitle="Real-time business intelligence for Kopi Calf"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Hero KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <motion.div variants={item}>
            <KPICard
              title="Revenue Today"
              value={formatCurrencyShort(kpiData.revenueToday)}
              change={kpiData.revenueGrowth}
              changeLabel="vs yesterday"
              icon={Wallet}
              iconColor="text-emerald-400"
              iconBg="bg-emerald-500/10"
            />
          </motion.div>

          <motion.div variants={item}>
            <KPICard
              title="Transactions"
              value={kpiData.transactionsToday.toLocaleString('id-ID')}
              change={8.2}
              changeLabel="vs yesterday"
              icon={ShoppingCart}
              iconColor="text-cyan-400"
              iconBg="bg-cyan-500/10"
            />
          </motion.div>

          <motion.div variants={item}>
            <KPICard
              title="Active Customers"
              value={kpiData.activeCustomers.toLocaleString('id-ID')}
              change={kpiData.customerGrowth}
              changeLabel="new today"
              icon={Users}
              iconColor="text-purple-400"
              iconBg="bg-purple-500/10"
            />
          </motion.div>

          <motion.div variants={item}>
            <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-emerald-500/10 via-card to-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Company Health
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold font-number text-emerald-400">
                      {kpiData.healthScore}
                    </span>
                    <span className="text-sm text-muted-foreground">/100</span>
                  </div>
                </div>
                <div className="h-14 w-14 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Activity className="h-7 w-7 text-emerald-400" />
                </div>
              </div>
              <div className="mt-3">
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${kpiData.healthScore}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                  />
                </div>
              </div>
              <p className="mt-2 text-xs text-emerald-400 font-medium">
                Excellent Performance
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Secondary KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <motion.div variants={item}>
            <MiniKPICard
              label="Revenue MTD"
              value={formatCurrencyShort(kpiData.revenueMTD)}
              trend="up"
              trendValue="+12.4%"
            />
          </motion.div>
          <motion.div variants={item}>
            <MiniKPICard
              label="Revenue YTD"
              value={`${(kpiData.revenueYTD / 1000000000).toFixed(1)}B`}
              trend="up"
              trendValue="+18.7%"
            />
          </motion.div>
          <motion.div variants={item}>
            <MiniKPICard
              label="Avg Transaction"
              value={formatCurrencyShort(kpiData.avgTransaction)}
              trend="up"
              trendValue="+3.2%"
            />
          </motion.div>
          <motion.div variants={item}>
            <MiniKPICard
              label="Top Outlet"
              value="Bandung Dago"
              trend="up"
              trendValue="32.6M"
            />
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Revenue Chart */}
          <motion.div variants={item} className="lg:col-span-2">
            <ChartCard
              title="Revenue Trend"
              subtitle="Today vs Yesterday vs Last Week"
            >
              <RevenueAreaChart data={revenueData} />
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">Hari Ini</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-purple-500" />
                  <span className="text-sm text-muted-foreground">Kemarin</span>
                </div>
              </div>
            </ChartCard>
          </motion.div>

          {/* Quick AI Insights */}
          <motion.div variants={item}>
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    AI Insights
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/30"
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    Live
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiInsights.slice(0, 3).map((insight) => (
                  <QuickInsight key={insight.id} insight={insight} />
                ))}
                <Button
                  variant="ghost"
                  className="w-full gap-2 text-primary"
                >
                  View All Insights
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Hourly Revenue + Top Outlets */}
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div variants={item}>
            <ChartCard
              title="Hourly Revenue"
              subtitle="Peak hours analysis"
            >
              <HourlyBarChart data={hourlyRevenue} />
            </ChartCard>
          </motion.div>

          <motion.div variants={item}>
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Top Performing Outlets</CardTitle>
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {topOutlets.map((outlet, index) => (
                  <div
                    key={outlet.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-card hover:bg-accent transition-colors cursor-pointer"
                  >
                    <span
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold',
                        index === 0 && 'bg-amber-500/20 text-amber-400',
                        index === 1 && 'bg-gray-400/20 text-gray-400',
                        index === 2 && 'bg-orange-600/20 text-orange-400',
                        index > 2 && 'bg-secondary text-muted-foreground'
                      )}
                    >
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{outlet.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {outlet.transactions} transactions
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold font-number">
                        {formatCurrencyShort(outlet.revenueToday)}
                      </p>
                      <div className="flex items-center gap-1 text-emerald-400">
                        <ArrowUpRight className="h-3 w-3" />
                        <span className="text-xs font-medium">
                          {((outlet.revenueToday / outlet.revenueTarget) * 100 - 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Risk Center Preview + Needs Attention */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Risk Center */}
          <motion.div variants={item}>
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                    Risk Center
                  </CardTitle>
                  <RiskSummary risks={visibleRisks} />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {visibleRisks.slice(0, 3).map((risk) => (
                  <RiskCard
                    key={risk.id}
                    risk={risk}
                    onDismiss={handleDismissRisk}
                  />
                ))}
                <Button
                  variant="ghost"
                  className="w-full gap-2 text-amber-400"
                >
                  View All Risks
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Outlets Needing Attention */}
          <motion.div variants={item}>
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Outlets Needing Attention</CardTitle>
                  <Badge variant="outline" className="text-amber-400 border-amber-500/30">
                    {bottomOutlets.length} outlets
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-3">
                {bottomOutlets.map((outlet) => (
                  <div
                    key={outlet.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20"
                  >
                    <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{outlet.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {outlet.city} • {outlet.manager}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold font-number text-amber-400">
                        {((outlet.revenueToday / outlet.revenueTarget) * 100).toFixed(0)}%
                      </p>
                      <p className="text-xs text-muted-foreground">of target</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div variants={item}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <Button
                  variant="outline"
                  className="h-auto py-4 flex-col gap-2 bg-card hover:bg-accent"
                >
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="text-sm">View Full Report</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 flex-col gap-2 bg-card hover:bg-accent"
                >
                  <Users className="h-5 w-5 text-purple-400" />
                  <span className="text-sm">Customer Analysis</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 flex-col gap-2 bg-card hover:bg-accent"
                >
                  <DollarSign className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm">Revenue Breakdown</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 flex-col gap-2 bg-card hover:bg-accent"
                >
                  <Brain className="h-5 w-5 text-cyan-400" />
                  <span className="text-sm">AI Recommendations</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
