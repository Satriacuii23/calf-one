'use client';

import {
  Users,
  TrendingUp,
  UserPlus,
  Heart,
  Crown,
  AlertTriangle,
  Star,
  Search,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { KPICard } from '@/components/dashboard/kpi-card';
import { CustomerPieChart } from '@/components/dashboard/charts';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { customers, formatCurrencyShort, getSegmentColor } from '@/lib/data';
import { cn } from '@/lib/utils';

const customerSegments = [
  { name: 'VIP', value: 8, color: '#8b5cf6' },
  { name: 'Regular', value: 45, color: '#3b82f6' },
  { name: 'Churn Risk', value: 22, color: '#f59e0b' },
  { name: 'New', value: 25, color: '#22c55e' },
];

const topCustomers = [
  { name: 'Rizky Pratama', transactions: 234, spent: 41250000, segment: 'vip' },
  { name: 'Anisa Wahyuni', transactions: 189, spent: 28350000, segment: 'vip' },
  { name: 'Dimas Ardiansyah', transactions: 156, spent: 23400000, segment: 'regular' },
  { name: 'Siti Nurhaliza', transactions: 134, spent: 20100000, segment: 'regular' },
  { name: 'Bagus Permana', transactions: 112, spent: 16800000, segment: 'new' },
];

export default function CustomersPage() {
  return (
    <MainLayout title="Customers" subtitle="Customer analytics and segmentation">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Customers"
            value="48,521"
            change={8.7}
            icon={Users}
            iconColor="text-blue-600 dark:text-blue-400"
            iconBg="bg-blue-100 dark:bg-blue-500/20"
          />
          <KPICard
            title="Active Today"
            value="3,856"
            change={12.4}
            icon={TrendingUp}
            iconColor="text-emerald-600 dark:text-emerald-400"
            iconBg="bg-emerald-100 dark:bg-emerald-500/20"
          />
          <KPICard
            title="New Customers"
            value="234"
            change={15.2}
            icon={UserPlus}
            iconColor="text-purple-600 dark:text-purple-400"
            iconBg="bg-purple-100 dark:bg-purple-500/20"
          />
          <KPICard
            title="Churn Risk"
            value="1,284"
            change={-5.8}
            icon={AlertTriangle}
            iconColor="text-amber-600 dark:text-amber-400"
            iconBg="bg-amber-100 dark:bg-amber-500/20"
          />
        </div>

        {/* Segments + Top Customers */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <div className="p-4 lg:p-6">
              <h3 className="text-lg font-semibold mb-4">Customer Segments</h3>
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <CustomerPieChart data={customerSegments} />
              </div>
              <div className="mt-6 space-y-3">
                {customerSegments.map((segment) => (
                  <div key={segment.name} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${segment.color}20` }}>
                        {segment.name === 'VIP' && <Crown className="h-5 w-5" style={{ color: segment.color }} />}
                        {segment.name === 'Regular' && <Star className="h-5 w-5" style={{ color: segment.color }} />}
                        {segment.name === 'Churn Risk' && <AlertTriangle className="h-5 w-5" style={{ color: segment.color }} />}
                        {segment.name === 'New' && <UserPlus className="h-5 w-5" style={{ color: segment.color }} />}
                      </div>
                      <div>
                        <p className="font-medium">{segment.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(segment.value * 485).toLocaleString('id-ID')} customers
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" style={{ borderColor: segment.color, color: segment.color }}>
                      {segment.value}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-4 lg:p-6">
              <h3 className="text-lg font-semibold mb-4">Top Customers</h3>
              <div className="space-y-3">
                {topCustomers.map((customer, index) => (
                  <div key={customer.name} className="flex items-center gap-4 p-3 rounded-lg bg-muted hover:bg-accent transition-colors cursor-pointer">
                    <span className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold',
                      index === 0 && 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
                      index === 1 && 'bg-gray-200 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400',
                      index === 2 && 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400',
                      index > 2 && 'bg-muted text-muted-foreground'
                    )}>
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium truncate">{customer.name}</p>
                        <Badge variant="outline" className={cn(
                          customer.segment === 'vip' && 'border-purple-300 text-purple-700 dark:border-purple-500/30 dark:text-purple-400',
                          customer.segment === 'regular' && 'border-blue-300 text-blue-700 dark:border-blue-500/30 dark:text-blue-400',
                          customer.segment === 'new' && 'border-emerald-300 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-400'
                        )}>
                          {customer.segment}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{customer.transactions} transactions</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold font-number text-blue-600 dark:text-blue-400">
                        {formatCurrencyShort(customer.spent)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* All Customers Table */}
        <Card>
          <div className="p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">All Customers</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search customers..." className="w-[250px] pl-10" />
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Segment</TableHead>
                  <TableHead className="text-right">Transactions</TableHead>
                  <TableHead className="text-right">Total Spent</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead className="text-right">Lifetime Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getSegmentColor(customer.segment)}>
                        {customer.segment}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-number">{customer.totalTransactions}</TableCell>
                    <TableCell className="text-right font-number">{formatCurrencyShort(customer.totalSpent)}</TableCell>
                    <TableCell>{customer.lastVisit}</TableCell>
                    <TableCell className="text-right font-number text-blue-600 dark:text-blue-400">
                      {formatCurrencyShort(customer.lifetimeValue)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Metrics */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Card>
            <div className="p-4 lg:p-6">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Customer Retention</h4>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">87.4%</div>
              <Progress value={87.4} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">+2.3% from last month</p>
            </div>
          </Card>
          <Card>
            <div className="p-4 lg:p-6">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Avg Order Frequency</h4>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">4.2x</div>
              <Progress value={42} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">per customer per month</p>
            </div>
          </Card>
          <Card>
            <div className="p-4 lg:p-6">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Acquisition Cost</h4>
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">Rp 12.5K</div>
              <Progress value={65} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">-8% from last month</p>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
