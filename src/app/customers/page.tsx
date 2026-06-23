'use client';

import { motion } from 'framer-motion';
import {
  Users,
  TrendingUp,
  UserPlus,
  Heart,
  Crown,
  AlertTriangle,
  Star,
  Search,
  Filter,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { KPICard } from '@/components/dashboard/kpi-card';
import { CustomerPieChart } from '@/components/dashboard/charts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { customers, formatCurrencyShort, getSegmentColor } from '@/lib/data';
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

const customerSegments = [
  { name: 'VIP', value: 8, color: '#8b5cf6' },
  { name: 'Regular', value: 45, color: '#06b6d4' },
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
    <MainLayout
      title="Customer Intelligence"
      subtitle="Analyze customer behavior and segmentation"
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
              title="Total Customers"
              value="48,521"
              change={8.7}
              icon={Users}
              iconColor="text-primary"
              iconBg="bg-primary/10"
            />
          </motion.div>
          <motion.div variants={item}>
            <KPICard
              title="Active Today"
              value="3,856"
              change={12.4}
              icon={TrendingUp}
              iconColor="text-emerald-400"
              iconBg="bg-emerald-500/10"
            />
          </motion.div>
          <motion.div variants={item}>
            <KPICard
              title="New Customers"
              value="234"
              change={15.2}
              icon={UserPlus}
              iconColor="text-purple-400"
              iconBg="bg-purple-500/10"
            />
          </motion.div>
          <motion.div variants={item}>
            <KPICard
              title="Churn Risk"
              value="1,284"
              change={-5.8}
              changeLabel="needs attention"
              icon={AlertTriangle}
              iconColor="text-amber-400"
              iconBg="bg-amber-500/10"
            />
          </motion.div>
        </div>

        {/* Customer Segments + Top Customers */}
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div variants={item}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
              </CardHeader>
              <CardContent>
                <CustomerPieChart data={customerSegments} />
                <div className="mt-6 space-y-3">
                  {customerSegments.map((segment) => (
                    <div
                      key={segment.name}
                      className="flex items-center justify-between p-3 rounded-lg bg-card"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-10 w-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${segment.color}20` }}
                        >
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
                      <Badge
                        variant="outline"
                        style={{ borderColor: segment.color, color: segment.color }}
                      >
                        {segment.value}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Top Customers by Spending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCustomers.map((customer, index) => (
                    <div
                      key={customer.name}
                      className="flex items-center gap-4 p-3 rounded-lg bg-card hover:bg-accent transition-colors cursor-pointer"
                    >
                      <span
                        className={cn(
                          'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold',
                          index === 0 && 'bg-amber-500/20 text-amber-400',
                          index === 1 && 'bg-gray-400/20 text-gray-400',
                          index === 2 && 'bg-orange-600/20 text-orange-400',
                          index > 2 && 'bg-secondary text-muted-foreground'
                        )}
                      >
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium truncate">{customer.name}</p>
                          <Badge
                            variant="outline"
                            className={cn(
                              customer.segment === 'vip' && 'border-purple-500/30 text-purple-400',
                              customer.segment === 'regular' && 'border-cyan-500/30 text-cyan-400',
                              customer.segment === 'new' && 'border-emerald-500/30 text-emerald-400'
                            )}
                          >
                            {customer.segment}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {customer.transactions} transactions
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold font-number text-primary">
                          {formatCurrencyShort(customer.spent)}
                        </p>
                        <p className="text-xs text-muted-foreground">lifetime</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Customer Table */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Customers</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search customers..." className="w-[250px] pl-10" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
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
                          <p className="text-sm text-muted-foreground">
                            {customer.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getSegmentColor(customer.segment)}
                        >
                          {customer.segment}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-number">
                        {customer.totalTransactions}
                      </TableCell>
                      <TableCell className="text-right font-number">
                        {formatCurrencyShort(customer.totalSpent)}
                      </TableCell>
                      <TableCell>{customer.lastVisit}</TableCell>
                      <TableCell className="text-right font-number text-primary">
                        {formatCurrencyShort(customer.lifetimeValue)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Customer Metrics */}
        <div className="grid gap-6 md:grid-cols-3">
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Customer Retention Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-number text-emerald-400 mb-2">
                  87.4%
                </div>
                <Progress value={87.4} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  +2.3% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Average Order Frequency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-number text-primary mb-2">
                  4.2x
                </div>
                <Progress value={42} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  per customer per month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Customer Acquisition Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-number text-amber-400 mb-2">
                  Rp 12.5K
                </div>
                <Progress value={65} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  -8% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </MainLayout>
  );
}
