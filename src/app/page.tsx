'use client';

import {
  Wallet,
  TrendingUp,
  Users,
  ShoppingCart,
  Activity,
  DollarSign,
  ArrowUpRight,
  AlertTriangle,
  Brain,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { KPICard, MiniKPICard } from '@/components/dashboard/kpi-card';
import { ChartCard, RevenueAreaChart, HourlyBarChart } from '@/components/dashboard/charts';
import { RiskCard, RiskSummary } from '@/components/dashboard/risk-card';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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

export default function DashboardPage() {
  const visibleRisks = risks.slice(0, 3);
  const topOutlets = [...outlets].sort((a, b) => b.revenueToday - a.revenueToday).slice(0, 5);
  const bottomOutlets = [...outlets].sort((a, b) => a.revenueToday - b.revenueToday).slice(0, 3);

  return (
    <MainLayout title="Dashboard" subtitle="Executive overview for Kopi Calf">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Revenue Today"
            value={formatCurrencyShort(kpiData.revenueToday)}
            change={kpiData.revenueGrowth}
            icon={Wallet}
            iconColor="text-emerald-600 dark:text-emerald-400"
            iconBg="bg-emerald-100 dark:bg-emerald-500/20"
          />
          <KPICard
            title="Transactions"
            value={kpiData.transactionsToday.toLocaleString('id-ID')}
            change={8.2}
            icon={ShoppingCart}
            iconColor="text-blue-600 dark:text-blue-400"
            iconBg="bg-blue-100 dark:bg-blue-500/20"
          />
          <KPICard
            title="Active Customers"
            value={kpiData.activeCustomers.toLocaleString('id-ID')}
            change={kpiData.customerGrowth}
            icon={Users}
            iconColor="text-purple-600 dark:text-purple-400"
            iconBg="bg-purple-100 dark:bg-purple-500/20"
          />
          <Card className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Health Score</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl lg:text-3xl font-bold font-number text-emerald-600 dark:text-emerald-400">
                    {kpiData.healthScore}
                  </span>
                  <span className="text-sm text-muted-foreground">/100</span>
                </div>
              </div>
              <div className="h-11 w-11 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                <Activity className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <Progress value={kpiData.healthScore} className="h-2 mb-2" />
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Excellent Performance</p>
          </Card>
        </div>

        {/* Secondary KPIs */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <MiniKPICard label="Revenue MTD" value={formatCurrencyShort(kpiData.revenueMTD)} trend="up" trendValue="+12.4%" />
          <MiniKPICard label="Revenue YTD" value={`${(kpiData.revenueYTD / 1000000000).toFixed(1)}B`} trend="up" trendValue="+18.7%" />
          <MiniKPICard label="Avg Transaction" value={formatCurrencyShort(kpiData.avgTransaction)} trend="up" trendValue="+3.2%" />
          <MiniKPICard label="Top Outlet" value="Bandung Dago" trend="up" trendValue="32.6M" />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          <ChartCard title="Revenue Trend" subtitle="Today vs Yesterday" className="lg:col-span-2">
            <RevenueAreaChart data={revenueData} />
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-800 dark:bg-blue-500" />
                <span className="text-sm text-muted-foreground">Hari Ini</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-400" />
                <span className="text-sm text-muted-foreground">Kemarin</span>
              </div>
            </div>
          </ChartCard>

          <Card>
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  AI Insights
                </h3>
                <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30">
                  Live
                </Badge>
              </div>
              <div className="space-y-3">
                {aiInsights.slice(0, 3).map((insight) => (
                  <div key={insight.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted hover:bg-accent transition-colors cursor-pointer">
                    <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center shrink-0">
                      <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{insight.title}</p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{insight.expectedImpact}</p>
                    </div>
                    {insight.potentialRevenue && (
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
                        {formatCurrencyShort(insight.potentialRevenue)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-blue-600 dark:text-blue-400">
                View All Insights
              </Button>
            </div>
          </Card>
        </div>

        {/* Data Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard title="Hourly Revenue" subtitle="Peak hours analysis">
            <HourlyBarChart data={hourlyRevenue} />
          </ChartCard>

          <Card>
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold">Top Outlets</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="space-y-3">
                {topOutlets.map((outlet, index) => (
                  <div key={outlet.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <span className={cn(
                      'flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold',
                      index === 0 && 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
                      index === 1 && 'bg-gray-200 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400',
                      index === 2 && 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400',
                      index > 2 && 'bg-muted text-muted-foreground'
                    )}>
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{outlet.name}</p>
                      <p className="text-xs text-muted-foreground">{outlet.transactions} transactions</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold font-number">{formatCurrencyShort(outlet.revenueToday)}</p>
                      <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <ArrowUpRight className="h-3 w-3" />
                        <span className="text-xs font-medium">
                          {((outlet.revenueToday / outlet.revenueTarget) * 100 - 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Risk Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <div className="p-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 mb-4">
                <h3 className="text-base font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  Risk Center
                </h3>
                <RiskSummary risks={visibleRisks} />
              </div>
              <div className="space-y-3">
                {visibleRisks.map((risk) => (
                  <RiskCard key={risk.id} risk={risk} />
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-amber-600 dark:text-amber-400">
                View All Risks
              </Button>
            </div>
          </Card>

          <Card>
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold">Need Attention</h3>
                <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30">
                  {bottomOutlets.length} outlets
                </Badge>
              </div>
              <div className="space-y-3">
                {bottomOutlets.map((outlet) => (
                  <div key={outlet.id} className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                    <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate text-sm">{outlet.name}</p>
                      <p className="text-xs text-muted-foreground">{outlet.city} - {outlet.manager}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold font-number text-amber-600 dark:text-amber-400">
                        {((outlet.revenueToday / outlet.revenueTarget) * 100).toFixed(0)}%
                      </p>
                      <p className="text-xs text-muted-foreground">of target</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <div className="p-5">
            <h3 className="text-base font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-card hover:bg-accent border-border">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm">Full Report</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-card hover:bg-accent border-border">
                <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span className="text-sm">Customers</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-card hover:bg-accent border-border">
                <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm">Revenue</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-card hover:bg-accent border-border">
                <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm">AI Insights</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
