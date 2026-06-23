'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Store,
  MapPin,
  Star,
  TrendingUp,
  Users,
  Filter,
  Search,
  ChevronRight,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { KPICard } from '@/components/dashboard/kpi-card';
import { OutletCard, OutletRow } from '@/components/dashboard/outlet-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { outlets, formatCurrencyShort, cityPerformance } from '@/lib/data';
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

const totalOutlets = outlets.length;
const avgPerformance =
  outlets.reduce(
    (acc, outlet) =>
      acc + (outlet.revenueToday / outlet.revenueTarget) * 100,
    0
  ) / outlets.length;

export default function OutletsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');

  const filteredOutlets = outlets.filter((outlet) => {
    const matchesSearch =
      outlet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outlet.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || outlet.status === statusFilter;
    const matchesCity = cityFilter === 'all' || outlet.city === cityFilter;
    return matchesSearch && matchesStatus && matchesCity;
  });

  const sortedOutlets = [...filteredOutlets].sort(
    (a, b) => b.revenueToday - a.revenueToday
  );

  const cities = [...new Set(outlets.map((o) => o.city))];

  return (
    <MainLayout
      title="Outlet Intelligence"
      subtitle="Monitor and analyze all Kopi Calf outlets"
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
              title="Total Outlets"
              value={totalOutlets.toString()}
              icon={Store}
              iconColor="text-primary"
              iconBg="bg-primary/10"
            />
          </motion.div>
          <motion.div variants={item}>
            <KPICard
              title="Active Today"
              value={(totalOutlets - 1).toString()}
              icon={TrendingUp}
              iconColor="text-emerald-400"
              iconBg="bg-emerald-500/10"
            />
          </motion.div>
          <motion.div variants={item}>
            <KPICard
              title="Avg Performance"
              value={`${avgPerformance.toFixed(1)}%`}
              change={2.3}
              icon={Star}
              iconColor="text-amber-400"
              iconBg="bg-amber-500/10"
            />
          </motion.div>
          <motion.div variants={item}>
            <KPICard
              title="Total Cities"
              value={cities.length.toString()}
              icon={MapPin}
              iconColor="text-purple-400"
              iconBg="bg-purple-500/10"
            />
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search outlets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value || 'all')}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="needs-attention">Needs Attention</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={cityFilter} onValueChange={(value) => setCityFilter(value || 'all')}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="City" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cities</SelectItem>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{filteredOutlets.length} outlets</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Outlet Grid / Table View */}
        <motion.div variants={item}>
          <Tabs defaultValue="grid" className="space-y-4">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>

            <TabsContent value="grid">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedOutlets.map((outlet) => (
                  <OutletCard key={outlet.id} outlet={outlet} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="table">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60px]">Rank</TableHead>
                        <TableHead>Outlet</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Performance</TableHead>
                        <TableHead>Transactions</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedOutlets.map((outlet, index) => (
                        <OutletRow key={outlet.id} outlet={outlet} rank={index + 1} />
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="map">
              <Card className="min-h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Map View</h3>
                  <p className="text-muted-foreground mb-4">
                    Interactive map coming soon with real-time outlet locations
                  </p>
                  <Button variant="outline">Coming Soon</Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* City Performance */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>City Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cityPerformance
                  .sort((a, b) => b.revenue - a.revenue)
                  .map((city) => {
                    const performance = (city.revenue / city.target) * 100;
                    return (
                      <div key={city.city} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="font-medium">{city.city}</span>
                            <Badge variant="outline" className="text-xs">
                              {city.outlets} outlets
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-number text-muted-foreground">
                              {formatCurrencyShort(city.revenue)}
                            </span>
                            <Badge
                              variant="outline"
                              className={cn(
                                performance >= 100
                                  ? 'border-emerald-500/30 text-emerald-400'
                                  : 'border-amber-500/30 text-amber-400'
                              )}
                            >
                              {performance >= 0 ? '+' : ''}
                              {city.growth.toFixed(1)}%
                            </Badge>
                          </div>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={cn(
                              'h-full rounded-full transition-all',
                              performance >= 100 ? 'bg-emerald-400' : 'bg-amber-400'
                            )}
                            style={{ width: `${Math.min(performance, 100)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
