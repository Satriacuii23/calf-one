'use client';

import { motion } from 'framer-motion';
import {
  MapPin,
  TrendingUp,
  Target,
  DollarSign,
  Building,
  Users,
  ArrowUpRight,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { KPICard } from '@/components/dashboard/kpi-card';
import { ChartCard, CityPerformanceChart } from '@/components/dashboard/charts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cityPerformance, formatCurrencyShort } from '@/lib/data';
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

const targetOutlets = 200;
const currentOutlets = 115;
const totalRevenue = cityPerformance.reduce((acc, c) => acc + c.revenue, 0);
const targetRevenue = 50000000000;

const expansionLocations = [
  { city: 'BSD/Tangerang', priority: 'High', potential: 850000000, status: 'Planning' },
  { city: 'Depok', priority: 'High', potential: 620000000, status: 'Planning' },
  { city: 'Bekasi', priority: 'Medium', potential: 580000000, status: 'Scouting' },
  { city: 'Karawang', priority: 'Medium', potential: 420000000, status: 'Scouting' },
  { city: 'Cibubur', priority: 'Medium', potential: 380000000, status: 'Scouting' },
  { city: 'Sentul', priority: 'Low', potential: 290000000, status: 'Research' },
  { city: 'Solo', priority: 'Medium', potential: 350000000, status: 'Research' },
  { city: 'Semarang', priority: 'High', potential: 520000000, status: 'Active' },
];

export default function ExpansionPage() {
  const outletProgress = (currentOutlets / targetOutlets) * 100;
  const revenueProgress = (totalRevenue / targetRevenue) * 100;

  return (
    <MainLayout
      title="Expansion Intelligence"
      subtitle="Plan and track Kopi Calf expansion strategy"
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
              title="Current Outlets"
              value={currentOutlets.toString()}
              change={8.5}
              icon={Building}
              iconColor="text-primary"
              iconBg="bg-primary/10"
            />
          </motion.div>
          <motion.div variants={item}>
            <KPICard
              title="Target Outlets"
              value={targetOutlets.toString()}
              icon={Target}
              iconColor="text-emerald-400"
              iconBg="bg-emerald-500/10"
            />
          </motion.div>
          <motion.div variants={item}>
            <KPICard
              title="Total Revenue"
              value={formatCurrencyShort(totalRevenue)}
              change={15.2}
              icon={DollarSign}
              iconColor="text-purple-400"
              iconBg="bg-purple-500/10"
            />
          </motion.div>
          <motion.div variants={item}>
            <KPICard
              title="Target Revenue"
              value={`${(targetRevenue / 1000000000).toFixed(0)}B`}
              icon={TrendingUp}
              iconColor="text-amber-400"
              iconBg="bg-amber-500/10"
            />
          </motion.div>
        </div>

        {/* Progress Overview */}
        <motion.div variants={item}>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Outlet Expansion Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-4xl font-bold font-number text-primary">
                    {currentOutlets}
                  </span>
                  <span className="text-lg text-muted-foreground mb-1">
                    / {targetOutlets}
                  </span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${outletProgress}%` }}
                    transition={{ duration: 1 }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400"
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">{outletProgress.toFixed(1)}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Annual Revenue Target</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-4xl font-bold font-number text-emerald-400">
                    {formatCurrencyShort(totalRevenue)}
                  </span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${revenueProgress}%` }}
                    transition={{ duration: 1 }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Target: {formatCurrencyShort(targetRevenue)}
                  </span>
                  <span className="font-semibold">{revenueProgress.toFixed(1)}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* City Performance */}
        <motion.div variants={item}>
          <ChartCard
            title="Current City Performance"
            subtitle="Revenue and target comparison by city"
          >
            <CityPerformanceChart
              data={cityPerformance.map((city) => ({
                city: city.city,
                revenue: city.revenue,
                target: city.target,
                growth: city.growth,
              }))}
            />
          </ChartCard>
        </motion.div>

        {/* Expansion Pipeline */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Expansion Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {expansionLocations.map((location, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold">{location.city}</h4>
                      <Badge
                        variant="outline"
                        className={cn(
                          location.priority === 'High' && 'border-red-500/30 text-red-400',
                          location.priority === 'Medium' && 'border-amber-500/30 text-amber-400',
                          location.priority === 'Low' && 'border-gray-500/30 text-muted-foreground'
                        )}
                      >
                        {location.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {location.status}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Potential</span>
                      <span className="font-semibold font-number text-emerald-400">
                        {formatCurrencyShort(location.potential)}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Est. {Math.floor(location.potential / 150000)} customers/month
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Strategic Recommendations */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Strategic Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                  <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <ArrowUpRight className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Prioritize Jabodetabek Expansion</h4>
                    <p className="text-sm text-muted-foreground">
                      Focus on BSD, Depok, and Bekasi areas with high population density and growing
                      middle-class demographic. Expected ROI: 18-24 months.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
                  <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Target className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Strengthen Underperforming Cities</h4>
                    <p className="text-sm text-muted-foreground">
                      Semarang and Medan outlets need attention. Consider operational improvements or
                      management changes before expansion.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
                  <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                    <DollarSign className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Franchise Model Consideration</h4>
                    <p className="text-sm text-muted-foreground">
                      For tier-2 cities, consider franchise model to reduce capital expenditure and
                      leverage local partner expertise.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
