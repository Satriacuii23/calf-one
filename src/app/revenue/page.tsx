'use client';

import {
  TrendingUp,
  DollarSign,
  CreditCard,
  PieChart,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { KPICard } from '@/components/dashboard/kpi-card';
import {
  ChartCard,
  RevenueAreaChart,
  HourlyBarChart,
  CityPerformanceChart,
} from '@/components/dashboard/charts';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  kpiData,
  outlets,
  revenueData,
  hourlyRevenue,
  cityPerformance,
  formatCurrencyShort,
} from '@/lib/data';
import { cn } from '@/lib/utils';

const paymentMethods = [
  { method: 'GoPay', count: 1847, amount: 51250000, percentage: 38.3 },
  { method: 'OVO', count: 1234, amount: 34280000, percentage: 25.6 },
  { method: 'DANA', count: 892, amount: 24760000, percentage: 18.5 },
  { method: 'Cash', count: 654, amount: 18170000, percentage: 13.6 },
  { method: 'Debit/Credit', count: 200, amount: 5550000, percentage: 4 },
];

export default function RevenuePage() {
  const sortedOutlets = [...outlets].sort(
    (a, b) => b.revenueToday - a.revenueToday
  );

  return (
    <MainLayout
      title="Revenue"
      subtitle="Revenue analytics and insights"
    >
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Revenue Today"
            value={formatCurrencyShort(kpiData.revenueToday)}
            change={kpiData.revenueGrowth}
            icon={DollarSign}
            iconColor="text-emerald-600 dark:text-emerald-400"
            iconBg="bg-emerald-100 dark:bg-emerald-500/20"
          />
          <KPICard
            title="Revenue MTD"
            value={formatCurrencyShort(kpiData.revenueMTD)}
            change={12.4}
            icon={TrendingUp}
            iconColor="text-blue-600 dark:text-blue-400"
            iconBg="bg-blue-100 dark:bg-blue-500/20"
          />
          <KPICard
            title="Avg Transaction"
            value={formatCurrencyShort(kpiData.avgTransaction)}
            change={3.2}
            icon={CreditCard}
            iconColor="text-purple-600 dark:text-purple-400"
            iconBg="bg-purple-100 dark:bg-purple-500/20"
          />
          <KPICard
            title="Target Achievement"
            value="94.2%"
            change={-5.8}
            icon={PieChart}
            iconColor="text-amber-600 dark:text-amber-400"
            iconBg="bg-amber-100 dark:bg-amber-500/20"
          />
        </div>

        {/* Revenue Chart */}
        <ChartCard title="Revenue Trend" subtitle="Hourly revenue today">
          <RevenueAreaChart data={revenueData} />
        </ChartCard>

        {/* Tabs */}
        <Tabs defaultValue="outlets" className="space-y-4">
          <TabsList>
            <TabsTrigger value="outlets">By Outlet</TabsTrigger>
            <TabsTrigger value="hourly">Hourly</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="city">By City</TabsTrigger>
          </TabsList>

          <TabsContent value="outlets">
            <Card>
              <div className="p-4 lg:p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Outlet</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Target</TableHead>
                      <TableHead className="text-right">%</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedOutlets.map((outlet, index) => {
                      const achievement = (outlet.revenueToday / outlet.revenueTarget) * 100;
                      return (
                        <TableRow key={outlet.id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell className="font-medium">{outlet.name}</TableCell>
                          <TableCell>{outlet.city}</TableCell>
                          <TableCell className="text-right font-number">
                            {formatCurrencyShort(outlet.revenueToday)}
                          </TableCell>
                          <TableCell className="text-right font-number text-muted-foreground">
                            {formatCurrencyShort(outlet.revenueTarget)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline" className={cn(
                              achievement >= 100
                                ? 'border-emerald-300 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-400'
                                : 'border-amber-300 text-amber-700 dark:border-amber-500/30 dark:text-amber-400'
                            )}>
                              {achievement.toFixed(0)}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="hourly">
            <Card>
              <div className="p-4 lg:p-6">
                <HourlyBarChart data={hourlyRevenue} />
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm text-muted-foreground">Peak Hour</p>
                    <p className="text-lg font-bold">17:00 - 18:00</p>
                    <p className="text-sm font-number text-emerald-600 dark:text-emerald-400">
                      {formatCurrencyShort(85000000)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm text-muted-foreground">Morning Peak</p>
                    <p className="text-lg font-bold">07:00 - 09:00</p>
                    <p className="text-sm font-number text-emerald-600 dark:text-emerald-400">
                      {formatCurrencyShort(30500000)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm text-muted-foreground">Lunch Peak</p>
                    <p className="text-lg font-bold">11:00 - 14:00</p>
                    <p className="text-sm font-number text-emerald-600 dark:text-emerald-400">
                      {formatCurrencyShort(145000000)}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card>
              <div className="p-4 lg:p-6 space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.method} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{method.method}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {method.count}
                        </span>
                        <span className="font-number font-semibold">
                          {formatCurrencyShort(method.amount)}
                        </span>
                        <Badge variant="outline">{method.percentage}%</Badge>
                      </div>
                    </div>
                    <Progress value={method.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="city">
            <Card>
              <div className="p-4 lg:p-6">
                <CityPerformanceChart
                  data={cityPerformance.map((city) => ({
                    city: city.city,
                    revenue: city.revenue,
                    target: city.target,
                    growth: city.growth,
                  }))}
                />
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
