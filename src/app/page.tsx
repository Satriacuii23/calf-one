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
  ChevronRight,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { KPICard, MiniKPICard } from '@/components/dashboard/kpi-card';
import { ChartCard, RevenueAreaChart, HourlyBarChart } from '@/components/dashboard/charts';
import { RiskCard, RiskSummary } from '@/components/dashboard/risk-card';
import { QuickInsight } from '@/components/dashboard/insight-card';
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
            iconColor="text-emerald-600"
            iconBg="bg-emerald-100"
          />
          <KPICard
            title="Transactions"
            value={kpiData.transactionsToday.toLocaleString('id-ID')}
            change={8.2}
            icon={ShoppingCart}
            iconColor="text-blue-600"
            iconBg="bg-blue-100"
          />
          <KPICard
            title="Active Customers"
            value={kpiData.activeCustomers.toLocaleString('id-ID')}
            change={kpiData.customerGrowth}
            icon={Users}
            iconColor="text-purple-600"
            iconBg="bg-purple-100"
          />
          <div className="p-5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Health Score</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl lg:text-3xl font-bold font-number text-emerald-600 dark:text-emerald-400">
                    {kpiData.healthScore}
                  </span>
                  <span className="text-sm text-slate-400">/100</span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Activity className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${kpiData.healthScore}%` }} />
            </div>
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Excellent Performance</p>
          </div>
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
                <div className="h-3 w-3 rounded-full bg-blue-800" />
                <span className="text-xs text-slate-500">Hari Ini</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-slate-300" />
                <span className="text-xs text-slate-500">Kemarin</span>
              </div>
            </div>
          </ChartCard>

          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                AI Insights
              </h3>
              <Badge className="bg-blue-100 text-blue-700">Live</Badge>
            </div>
            <div className="space-y-3">
              {aiInsights.slice(0, 3).map((insight) => (
                <QuickInsight key={insight.id} insight={insight} />
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 bg-slate-100 dark:bg-slate-800 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              View All Insights
            </button>
          </div>
        </div>

        {/* Data Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard title="Hourly Revenue" subtitle="Peak hours analysis">
            <HourlyBarChart data={hourlyRevenue} />
          </ChartCard>

          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Top Outlets</h3>
              <button className="text-xs text-blue-600 font-medium hover:underline">View All</button>
            </div>
            <div className="space-y-2">
              {topOutlets.map((outlet, index) => (
                <div key={outlet.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                  <span className={cn(
                    'flex h-6 w-6 items-center justify-center rounded text-xs font-bold',
                    index === 0 && 'bg-amber-100 text-amber-700',
                    index === 1 && 'bg-slate-200 text-slate-600',
                    index === 2 && 'bg-orange-100 text-orange-700',
                    index > 2 && 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                  )}>
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-slate-900 dark:text-slate-100">{outlet.name}</p>
                    <p className="text-xs text-slate-500">{outlet.transactions} transactions</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold font-number text-slate-900 dark:text-slate-100">{formatCurrencyShort(outlet.revenueToday)}</p>
                    <div className="flex items-center gap-1 text-emerald-600">
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
        </div>

        {/* Risk Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 mb-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                Risk Center
              </h3>
              <RiskSummary risks={visibleRisks} />
            </div>
            <div className="space-y-3">
              {visibleRisks.map((risk) => (
                <RiskCard key={risk.id} risk={risk} />
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm font-medium text-amber-600 bg-slate-100 dark:bg-slate-800 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              View All Risks
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Need Attention</h3>
              <Badge className="bg-amber-100 text-amber-700">{bottomOutlets.length} outlets</Badge>
            </div>
            <div className="space-y-3">
              {bottomOutlets.map((outlet) => (
                <div key={outlet.id} className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                  <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-slate-900 dark:text-slate-100 truncate">{outlet.name}</p>
                    <p className="text-xs text-slate-500">{outlet.city} - {outlet.manager}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold font-number text-amber-600">
                      {((outlet.revenueToday / outlet.revenueTarget) * 100).toFixed(0)}%
                    </p>
                    <p className="text-xs text-slate-500">of target</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-5">
          <h3 className="text-sm font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Full Report</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">
              <Users className="h-5 w-5 text-purple-600" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Customers</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">
              <DollarSign className="h-5 w-5 text-emerald-600" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Revenue</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">
              <Brain className="h-5 w-5 text-blue-600" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">AI Insights</span>
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
