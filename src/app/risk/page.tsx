'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Filter,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Package,
  Users,
  TrendingDown,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { KPICard } from '@/components/dashboard/kpi-card';
import { RiskCard, RiskSummary } from '@/components/dashboard/risk-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { risks, vehicles } from '@/lib/data';
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

const riskTypes = [
  { type: 'all', label: 'All Risks', count: risks.length, icon: AlertTriangle },
  { type: 'revenue', label: 'Revenue', count: risks.filter(r => r.type === 'revenue').length, icon: TrendingDown },
  { type: 'operations', label: 'Operations', count: risks.filter(r => r.type === 'operations').length, icon: AlertCircle },
  { type: 'inventory', label: 'Inventory', count: risks.filter(r => r.type === 'inventory').length, icon: Package },
  { type: 'customer', label: 'Customer', count: risks.filter(r => r.type === 'customer').length, icon: Users },
  { type: 'vehicle', label: 'Vehicle', count: risks.filter(r => r.type === 'vehicle').length, icon: Truck },
];

export default function RiskPage() {
  const [dismissedRisks, setDismissedRisks] = useState<string[]>([]);
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredRisks = risks.filter((risk) => {
    const matchesSeverity = severityFilter === 'all' || risk.severity === severityFilter;
    const matchesType = typeFilter === 'all' || risk.type === typeFilter;
    return matchesSeverity && matchesType && !dismissedRisks.includes(risk.id);
  });

  const handleDismiss = (id: string) => {
    setDismissedRisks((prev) => [...prev, id]);
  };

  const criticalCount = risks.filter((r) => r.severity === 'critical' && !dismissedRisks.includes(r.id)).length;
  const warningCount = risks.filter((r) => r.severity === 'warning' && !dismissedRisks.includes(r.id)).length;
  const infoCount = risks.filter((r) => r.severity === 'info' && !dismissedRisks.includes(r.id)).length;
  const actionableCount = risks.filter((r) => r.actionable && !dismissedRisks.includes(r.id)).length;

  return (
    <MainLayout
      title="Risk Center"
      subtitle="Monitor and manage business risks in real-time"
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
              title="Total Risks"
              value={filteredRisks.length.toString()}
              icon={AlertTriangle}
              iconColor="text-amber-400"
              iconBg="bg-amber-500/10"
            />
          </motion.div>
          <motion.div variants={item}>
            <KPICard
              title="Critical"
              value={criticalCount.toString()}
              icon={XCircle}
              iconColor="text-red-400"
              iconBg="bg-red-500/10"
            />
          </motion.div>
          <motion.div variants={item}>
            <KPICard
              title="Warnings"
              value={warningCount.toString()}
              icon={AlertCircle}
              iconColor="text-amber-400"
              iconBg="bg-amber-500/10"
            />
          </motion.div>
          <motion.div variants={item}>
            <KPICard
              title="Actionable"
              value={actionableCount.toString()}
              icon={CheckCircle}
              iconColor="text-emerald-400"
              iconBg="bg-emerald-500/10"
            />
          </motion.div>
        </div>

        {/* Risk Summary */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center gap-6">
                <RiskSummary risks={filteredRisks} />
                <div className="ml-auto flex items-center gap-2">
                  <Badge variant="outline" className="gap-1">
                    <Clock className="h-3 w-3" />
                    Last updated: Just now
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-2">
                  {riskTypes.map((risk) => (
                    <Button
                      key={risk.type}
                      variant={typeFilter === risk.type ? 'default' : 'outline'}
                      size="sm"
                      className="gap-2"
                      onClick={() => setTypeFilter(risk.type)}
                    >
                      <risk.icon className="h-4 w-4" />
                      {risk.label}
                      <Badge
                        variant="secondary"
                        className="ml-1 h-5 w-6 items-center justify-center p-0"
                      >
                        {risk.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Select value={severityFilter} onValueChange={(value) => setSeverityFilter(value || 'all')}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severity</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Risk Cards by Severity */}
        <motion.div variants={item}>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Risks</TabsTrigger>
              <TabsTrigger value="critical" className="text-red-400">
                Critical ({criticalCount})
              </TabsTrigger>
              <TabsTrigger value="warning" className="text-amber-400">
                Warnings ({warningCount})
              </TabsTrigger>
              <TabsTrigger value="info" className="text-blue-400">
                Info ({infoCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid gap-4 lg:grid-cols-2">
                {filteredRisks.map((risk) => (
                  <RiskCard key={risk.id} risk={risk} onDismiss={handleDismiss} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="critical">
              <div className="grid gap-4 lg:grid-cols-2">
                {filteredRisks
                  .filter((r) => r.severity === 'critical')
                  .map((risk) => (
                    <RiskCard key={risk.id} risk={risk} onDismiss={handleDismiss} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="warning">
              <div className="grid gap-4 lg:grid-cols-2">
                {filteredRisks
                  .filter((r) => r.severity === 'warning')
                  .map((risk) => (
                    <RiskCard key={risk.id} risk={risk} onDismiss={handleDismiss} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="info">
              <div className="grid gap-4 lg:grid-cols-2">
                {filteredRisks
                  .filter((r) => r.severity === 'info')
                  .map((risk) => (
                    <RiskCard key={risk.id} risk={risk} onDismiss={handleDismiss} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Vehicle Status */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                Vehicle Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className={cn(
                      'p-4 rounded-lg border',
                      vehicle.status === 'active' && 'border-emerald-500/30 bg-emerald-500/5',
                      vehicle.status === 'maintenance' && 'border-amber-500/30 bg-amber-500/5',
                      vehicle.status === 'idle' && 'border-gray-500/30 bg-gray-500/5'
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{vehicle.plateNumber}</span>
                      <Badge
                        variant="outline"
                        className={cn(
                          vehicle.status === 'active' && 'border-emerald-500/30 text-emerald-400',
                          vehicle.status === 'maintenance' && 'border-amber-500/30 text-amber-400',
                          vehicle.status === 'idle' && 'border-gray-500/30 text-muted-foreground'
                        )}
                      >
                        {vehicle.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{vehicle.location}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Efficiency: {vehicle.efficiency}%
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
