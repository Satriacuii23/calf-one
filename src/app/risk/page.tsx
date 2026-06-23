'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Truck,
  Package,
  Users,
  TrendingDown,
  CheckCircle,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { KPICard } from '@/components/dashboard/kpi-card';
import { RiskCard, RiskSummary } from '@/components/dashboard/risk-card';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { risks, vehicles } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function RiskPage() {
  const [dismissedRisks, setDismissedRisks] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');

  const filteredRisks = risks.filter((risk) => {
    const matchesSeverity = severityFilter === 'all' || risk.severity === severityFilter;
    const matchesType = typeFilter === 'all' || risk.type === typeFilter;
    return matchesSeverity && matchesType && !dismissedRisks.includes(risk.id);
  });

  const handleDismiss = (id: string) => {
    setDismissedRisks((prev) => [...prev, id]);
  };

  const criticalCount = filteredRisks.filter((r) => r.severity === 'critical').length;
  const warningCount = filteredRisks.filter((r) => r.severity === 'warning').length;
  const infoCount = filteredRisks.filter((r) => r.severity === 'info').length;
  const actionableCount = filteredRisks.filter((r) => r.actionable).length;

  const riskTypes = [
    { type: 'all', label: 'All', icon: AlertTriangle, count: risks.length },
    { type: 'revenue', label: 'Revenue', icon: TrendingDown, count: risks.filter(r => r.type === 'revenue').length },
    { type: 'operations', label: 'Operations', icon: AlertCircle, count: risks.filter(r => r.type === 'operations').length },
    { type: 'inventory', label: 'Inventory', icon: Package, count: risks.filter(r => r.type === 'inventory').length },
    { type: 'customer', label: 'Customer', icon: Users, count: risks.filter(r => r.type === 'customer').length },
    { type: 'vehicle', label: 'Vehicle', icon: Truck, count: risks.filter(r => r.type === 'vehicle').length },
  ];

  return (
    <MainLayout title="Risk Center" subtitle="Monitor and manage business risks">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Risks"
            value={filteredRisks.length.toString()}
            icon={AlertTriangle}
            iconColor="text-amber-600 dark:text-amber-400"
            iconBg="bg-amber-100 dark:bg-amber-500/20"
          />
          <KPICard
            title="Critical"
            value={criticalCount.toString()}
            icon={AlertCircle}
            iconColor="text-red-600 dark:text-red-400"
            iconBg="bg-red-100 dark:bg-red-500/20"
          />
          <KPICard
            title="Warnings"
            value={warningCount.toString()}
            icon={AlertTriangle}
            iconColor="text-amber-600 dark:text-amber-400"
            iconBg="bg-amber-100 dark:bg-amber-500/20"
          />
          <KPICard
            title="Actionable"
            value={actionableCount.toString()}
            icon={CheckCircle}
            iconColor="text-emerald-600 dark:text-emerald-400"
            iconBg="bg-emerald-100 dark:bg-emerald-500/20"
          />
        </div>

        {/* Summary */}
        <Card>
          <div className="p-4 flex flex-wrap items-center gap-6">
            <RiskSummary risks={filteredRisks} />
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {riskTypes.map((risk) => (
              <Button
                key={risk.type}
                variant={typeFilter === risk.type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter(risk.type)}
                className="gap-2"
              >
                <risk.icon className="h-4 w-4" />
                {risk.label}
                <Badge variant="secondary" className="ml-1">{risk.count}</Badge>
              </Button>
            ))}
          </div>

          <TabsList>
            <TabsTrigger value="all">All ({filteredRisks.length})</TabsTrigger>
            <TabsTrigger value="critical" className="text-red-600 dark:text-red-400">Critical ({criticalCount})</TabsTrigger>
            <TabsTrigger value="warning" className="text-amber-600 dark:text-amber-400">Warning ({warningCount})</TabsTrigger>
            <TabsTrigger value="info" className="text-blue-600 dark:text-blue-400">Info ({infoCount})</TabsTrigger>
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
              {filteredRisks.filter((r) => r.severity === 'critical').map((risk) => (
                <RiskCard key={risk.id} risk={risk} onDismiss={handleDismiss} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="warning">
            <div className="grid gap-4 lg:grid-cols-2">
              {filteredRisks.filter((r) => r.severity === 'warning').map((risk) => (
                <RiskCard key={risk.id} risk={risk} onDismiss={handleDismiss} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="info">
            <div className="grid gap-4 lg:grid-cols-2">
              {filteredRisks.filter((r) => r.severity === 'info').map((risk) => (
                <RiskCard key={risk.id} risk={risk} onDismiss={handleDismiss} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Vehicle Status */}
        <Card>
          <div className="p-4 lg:p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Vehicle Status
            </h3>
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className={cn(
                  'p-4 rounded-lg border',
                  vehicle.status === 'active' && 'border-emerald-300 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10',
                  vehicle.status === 'maintenance' && 'border-amber-300 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10',
                  vehicle.status === 'idle' && 'border-gray-300 bg-gray-50 dark:border-gray-500/30 dark:bg-gray-500/10'
                )}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{vehicle.plateNumber}</span>
                    <Badge variant="outline" className={cn(
                      vehicle.status === 'active' && 'border-emerald-300 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-400',
                      vehicle.status === 'maintenance' && 'border-amber-300 text-amber-700 dark:border-amber-500/30 dark:text-amber-400',
                      vehicle.status === 'idle' && 'border-gray-300 text-gray-600 dark:border-gray-500/30 dark:text-muted-foreground'
                    )}>
                      {vehicle.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{vehicle.location}</p>
                  <p className="text-sm text-muted-foreground">Efficiency: {vehicle.efficiency}%</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
