'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Wallet,
  PieChart,
  ArrowUpRight,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { KPICard, MiniKPICard } from '@/components/dashboard/kpi-card';
import {
  ChartCard,
  RevenueAreaChart,
  HourlyBarChart,
  CityPerformanceChart,
} from '@/components/dashboard/charts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

const paymentMethods = [
  { method: 'GoPay', count: 1847, amount: 51250000, percentage: 38.3 },
  { method: 'OVO', count: 1234, amount: 34280000, percentage: 25.6 },
  { method: 'DANA', count: 892, amount: 24760000, percentage: 18.5 },
  { method: 'Cash', count: 654, amount: 18170000, percentage: 13.6 },
  { method: 'Debit/Credit', count: 200, amount: 5550000, percentage: 4 },
];

const monthlyRevenue = [
  { month: 'Jan', current: 1245000000, previous: 1020000000 },
  { month: 'Feb', current: 1380000000, previous: 1150000000 },
  { month: 'Mar', current: 1520000000, previous: 1280000000 },
  { month: 'Apr', current: 1450000000, previous: 1310000000 },
  { month: 'May', current: 1680000000, previous: 1420000000 },
  { month: 'Jun', current: 1620000000, previous: 1380000000 },
];

export default function RevenuePage() {
  const sortedOutlets = [...outlets].sort(
    (a, b) => b.revenueToday - a.revenueToday
  );

  return (
    <MainLayout
      title="Revenue Intelligence"
      subtitle="Comprehensive revenue analytics and insights"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <motion.div variants={item}>
            <KPICard
              title="Revenue Today"
              value={formatCurrencyShort(kpiData.revenueToday)}
              change={kpiData.revenueGrowth}
              icon={Wallet}
              iconColor="text-emerald-400"
              iconBg="bg-emerald-500/10"
            />
          </motion.div>
          <motion.div variants={item}>
            <KPICard
              title="Revenue MTD"
              value={formatCurrencyShort(kpiData.revenueMTD)}
              change={12.4}
              icon={DollarSign}
              iconColor="text-cyan-400"
              iconBg="bg-cyan-500/10"
            />
          </motion.div>
          <motion.div variants={item}>
            <KPICard
              title="Average Transaction"
              value={formatCurrencyShort(kpiData.avgTransaction)}
              change={3.2}
              icon={CreditCard}
              iconColor="text-purple-400"
              iconBg="bg-purple-500/10"
            />
          </motion.div>
          <motion.div variants={item}>
            <KPICard
              title="Target Achievement"
              value="94.2%"
              change={-5.8}
              changeLabel="vs monthly target"
              icon={PieChart}
              iconColor="text-amber-400"
              iconBg="bg-amber-500/10"
            />
          </motion.div>
        </div>

        {/* Revenue Trend Chart */}
        <motion.div variants={item}>
          <ChartCard
            title="Revenue Trend Analysis"
            subtitle="Hourly revenue distribution for today"
          >
            <RevenueAreaChart data={revenueData} />
          </ChartCard>
        </motion.div>

        {/* Detailed Analytics Tabs */}
        <motion.div variants={item}>
          <Tabs defaultValue="outlets" className="space-y-4">
            <TabsList className="bg-card">
              <TabsTrigger value="outlets">By Outlet</TabsTrigger>
              <TabsTrigger value="hourly">Hourly Analysis</TabsTrigger>
              <TabsTrigger value="payment">Payment Methods</TabsTrigger>
              <TabsTrigger value="city">By City</TabsTrigger>
            </TabsList>

            <TabsContent value="outlets">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Outlet</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">Rank</TableHead>
                        <TableHead>Outlet</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                        <TableHead className="text-right">Target</TableHead>
                        <TableHead className="text-right">Achievement</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedOutlets.map((outlet, index) => {
                        const achievement =
                          (outlet.revenueToday / outlet.revenueTarget) * 100;
                        return (
                          <TableRow key={outlet.id}>
                            <TableCell className="font-medium">#{index + 1}</TableCell>
                            <TableCell className="font-medium">{outlet.name}</TableCell>
                            <TableCell>{outlet.city}</TableCell>
                            <TableCell className="text-right font-number">
                              {formatCurrencyShort(outlet.revenueToday)}
                            </TableCell>
                            <TableCell className="text-right font-number text-muted-foreground">
                              {formatCurrencyShort(outlet.revenueTarget)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Badge
                                variant="outline"
                                className={cn(
                                  achievement >= 100
                                    ? 'border-emerald-500/30 text-emerald-400'
                                    : 'border-amber-500/30 text-amber-400'
                                )}
                              >
                                {achievement.toFixed(1)}%
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hourly">
              <Card>
                <CardHeader>
                  <CardTitle>Hourly Revenue Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <HourlyBarChart data={hourlyRevenue} />
                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg bg-card p-4">
                      <p className="text-sm text-muted-foreground">Peak Hour</p>
                      <p className="text-xl font-bold text-primary">17:00 - 18:00</p>
                      <p className="text-sm font-number text-emerald-400">
                        {formatCurrencyShort(85000000)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-card p-4">
                      <p className="text-sm text-muted-foreground">Morning Peak</p>
                      <p className="text-xl font-bold text-primary">07:00 - 09:00</p>
                      <p className="text-sm font-number text-emerald-400">
                        {formatCurrencyShort(30500000)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-card p-4">
                      <p className="text-sm text-muted-foreground">Lunch Peak</p>
                      <p className="text-xl font-bold text-primary">11:00 - 14:00</p>
                      <p className="text-sm font-number text-emerald-400">
                        {formatCurrencyShort(145000000)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.method} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{method.method}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                              {method.count} transactions
                            </span>
                            <span className="font-number font-semibold">
                              {formatCurrencyShort(method.amount)}
                            </span>
                            <Badge variant="outline" className="w-16 justify-center">
                              {method.percentage}%
                            </Badge>
                          </div>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${method.percentage * 2.5}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="city">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by City</CardTitle>
                </CardHeader>
                <CardContent>
                  <CityPerformanceChart
                    data={cityPerformance.map((city) => ({
                      city: city.city,
                      revenue: city.revenue,
                      target: city.target,
                      growth: city.growth,
                    }))}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
