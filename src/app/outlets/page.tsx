'use client';

import { useState } from 'react';
import {
  Store,
  MapPin,
  Star,
  TrendingUp,
  Search,
  Filter,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { KPICard } from '@/components/dashboard/kpi-card';
import { OutletCard } from '@/components/dashboard/outlet-card';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { outlets, formatCurrencyShort, cityPerformance } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function OutletsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');

  const filteredOutlets = outlets.filter((outlet) => {
    const matchesSearch =
      outlet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outlet.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || outlet.status === statusFilter;
    const matchesCity = cityFilter === 'all' || outlet.city === cityFilter;
    return matchesSearch && matchesStatus && matchesCity;
  });

  const sortedOutlets = [...filteredOutlets].sort((a, b) => b.revenueToday - a.revenueToday);
  const cities = [...new Set(outlets.map((o) => o.city))];

  const totalOutlets = outlets.length;
  const avgPerformance = outlets.reduce((acc, o) => acc + (o.revenueToday / o.revenueTarget) * 100, 0) / outlets.length;

  return (
    <MainLayout title="Outlets" subtitle="Monitor all Kopi Calf outlets">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Outlets"
            value={totalOutlets.toString()}
            icon={Store}
            iconColor="text-blue-600 dark:text-blue-400"
            iconBg="bg-blue-100 dark:bg-blue-500/20"
          />
          <KPICard
            title="Active Today"
            value={(totalOutlets - 1).toString()}
            icon={TrendingUp}
            iconColor="text-emerald-600 dark:text-emerald-400"
            iconBg="bg-emerald-100 dark:bg-emerald-500/20"
          />
          <KPICard
            title="Avg Performance"
            value={`${avgPerformance.toFixed(1)}%`}
            change={2.3}
            icon={Star}
            iconColor="text-amber-600 dark:text-amber-400"
            iconBg="bg-amber-100 dark:bg-amber-500/20"
          />
          <KPICard
            title="Total Cities"
            value={cities.length.toString()}
            icon={MapPin}
            iconColor="text-purple-600 dark:text-purple-400"
            iconBg="bg-purple-100 dark:bg-purple-500/20"
          />
        </div>

        {/* Search & Filter */}
        <Card>
          <div className="p-4 flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search outlets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v || 'all')}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="needs-attention">Attention</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
              <Select value={cityFilter} onValueChange={(v) => setCityFilter(v || 'all')}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Badge variant="outline">{filteredOutlets.length} outlets</Badge>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="grid" className="space-y-4">
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
          </TabsList>

          <TabsContent value="grid">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedOutlets.map((outlet) => (
                <OutletCard key={outlet.id} outlet={outlet} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="table">
            <Card>
              <div className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Outlet</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Transaksi</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedOutlets.map((outlet, index) => {
                      const performance = (outlet.revenueToday / outlet.revenueTarget) * 100;
                      return (
                        <TableRow key={outlet.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{outlet.name}</p>
                              <p className="text-xs text-muted-foreground">{outlet.city}</p>
                            </div>
                          </TableCell>
                          <TableCell className="font-number">
                            {formatCurrencyShort(outlet.revenueToday)}
                          </TableCell>
                          <TableCell>
                            <div className="w-20">
                              <Progress value={performance} className="h-2" />
                              <span className="text-xs text-muted-foreground">{performance.toFixed(0)}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{outlet.transactions}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                              {outlet.rating}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={cn(
                              outlet.status === 'excellent' && 'border-emerald-300 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-400',
                              outlet.status === 'good' && 'border-blue-300 text-blue-700 dark:border-blue-500/30 dark:text-blue-400',
                              outlet.status === 'needs-attention' && 'border-amber-300 text-amber-700 dark:border-amber-500/30 dark:text-amber-400',
                              outlet.status === 'critical' && 'border-red-300 text-red-700 dark:border-red-500/30 dark:text-red-400'
                            )}>
                              {outlet.status.replace('-', ' ')}
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
        </Tabs>

        {/* City Performance */}
        <Card>
          <div className="p-4 lg:p-6">
            <h3 className="text-lg font-semibold mb-4">City Performance</h3>
            <div className="space-y-4">
              {cityPerformance.sort((a, b) => b.revenue - a.revenue).map((city) => {
                const performance = (city.revenue / city.target) * 100;
                return (
                  <div key={city.city} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{city.city}</span>
                        <Badge variant="outline" className="text-xs">{city.outlets} outlets</Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-number text-sm text-muted-foreground">
                          {formatCurrencyShort(city.revenue)}
                        </span>
                        <Badge variant="outline" className={cn(
                          city.growth >= 0 ? 'border-emerald-300 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-400' : 'border-red-300 text-red-700 dark:border-red-500/30 dark:text-red-400'
                        )}>
                          {city.growth >= 0 ? '+' : ''}{city.growth.toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={performance} className="h-2" />
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
