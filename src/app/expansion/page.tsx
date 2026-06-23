'use client';

import {
  MapPin,
  TrendingUp,
  Target,
  DollarSign,
  Building,
  Users,
  ArrowRight,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { KPICard } from '@/components/dashboard/kpi-card';
import { ChartCard, CityPerformanceChart } from '@/components/dashboard/charts';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cityPerformance, formatCurrencyShort } from '@/lib/data';
import { cn } from '@/lib/utils';

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
    <MainLayout title="Expansion" subtitle="Plan Kopi Calf expansion strategy">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Current Outlets"
            value={currentOutlets.toString()}
            change={8.5}
            icon={Building}
            iconColor="text-blue-600 dark:text-blue-400"
            iconBg="bg-blue-100 dark:bg-blue-500/20"
          />
          <KPICard
            title="Target Outlets"
            value={targetOutlets.toString()}
            icon={Target}
            iconColor="text-emerald-600 dark:text-emerald-400"
            iconBg="bg-emerald-100 dark:bg-emerald-500/20"
          />
          <KPICard
            title="Total Revenue"
            value={formatCurrencyShort(totalRevenue)}
            change={15.2}
            icon={DollarSign}
            iconColor="text-purple-600 dark:text-purple-400"
            iconBg="bg-purple-100 dark:bg-purple-500/20"
          />
          <KPICard
            title="Target Revenue"
            value={`${(targetRevenue / 1000000000).toFixed(0)}B`}
            icon={TrendingUp}
            iconColor="text-amber-600 dark:text-amber-400"
            iconBg="bg-amber-100 dark:bg-amber-500/20"
          />
        </div>

        {/* Progress Overview */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <div className="p-4 lg:p-6">
              <h4 className="text-sm font-medium text-muted-foreground mb-4">Outlet Expansion</h4>
              <div className="flex items-end gap-3 mb-4">
                <span className="text-4xl font-bold font-number text-blue-600 dark:text-blue-400">
                  {currentOutlets}
                </span>
                <span className="text-lg text-muted-foreground mb-1">/ {targetOutlets}</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden mb-3">
                <div className="h-full rounded-full bg-blue-600 dark:bg-blue-500" style={{ width: `${outletProgress}%` }} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold">{outletProgress.toFixed(1)}%</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-4 lg:p-6">
              <h4 className="text-sm font-medium text-muted-foreground mb-4">Revenue Target</h4>
              <div className="flex items-end gap-3 mb-4">
                <span className="text-4xl font-bold font-number text-emerald-600 dark:text-emerald-400">
                  {formatCurrencyShort(totalRevenue)}
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden mb-3">
                <div className="h-full rounded-full bg-emerald-600 dark:bg-emerald-500" style={{ width: `${revenueProgress}%` }} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Target: {formatCurrencyShort(targetRevenue)}</span>
                <span className="font-semibold">{revenueProgress.toFixed(1)}%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* City Performance */}
        <ChartCard title="Current City Performance" subtitle="Revenue and target by city">
          <CityPerformanceChart
            data={cityPerformance.map((city) => ({
              city: city.city,
              revenue: city.revenue,
              target: city.target,
              growth: city.growth,
            }))}
          />
        </ChartCard>

        {/* Expansion Pipeline */}
        <Card>
          <div className="p-4 lg:p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Expansion Pipeline
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {expansionLocations.map((location, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted border border-border hover:bg-accent transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold">{location.city}</h4>
                    <Badge variant="outline" className={cn(
                      location.priority === 'High' && 'border-red-300 text-red-700 dark:border-red-500/30 dark:text-red-400',
                      location.priority === 'Medium' && 'border-amber-300 text-amber-700 dark:border-amber-500/30 dark:text-amber-400',
                      location.priority === 'Low' && 'border-gray-300 text-gray-600 dark:border-gray-500/30 dark:text-muted-foreground'
                    )}>
                      {location.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{location.status}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Potential</span>
                    <span className="font-semibold font-number text-emerald-600 dark:text-emerald-400">
                      {formatCurrencyShort(location.potential)}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Est. {Math.floor(location.potential / 150000)} customers</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Strategic Recommendations */}
        <Card>
          <div className="p-4 lg:p-6">
            <h3 className="text-lg font-semibold mb-4">Strategic Recommendations</h3>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <ArrowRight className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Prioritize Jabodetabek Expansion</h4>
                  <p className="text-sm text-muted-foreground">
                    Focus on BSD, Depok, and Bekasi areas with high population density. Expected ROI: 18-24 months.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center shrink-0">
                  <Target className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Strengthen Underperforming Cities</h4>
                  <p className="text-sm text-muted-foreground">
                    Semarang and Medan outlets need attention. Consider operational improvements.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center shrink-0">
                  <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Franchise Model Consideration</h4>
                  <p className="text-sm text-muted-foreground">
                    For tier-2 cities, consider franchise model to reduce capital expenditure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
