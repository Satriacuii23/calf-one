'use client';

import {
  Package,
  TrendingUp,
  TrendingDown,
  Minus,
  Coffee,
  Cookie,
  Utensils,
  Droplet,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { KPICard } from '@/components/dashboard/kpi-card';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { products, formatCurrencyShort } from '@/lib/data';
import { cn } from '@/lib/utils';

const categoryIcons: Record<string, React.ElementType> = {
  Coffee: Coffee,
  Signature: Coffee,
  'Non-Coffee': Droplet,
  Pastry: Cookie,
  Food: Utensils,
  Beverage: Droplet,
};

export default function ProductsPage() {
  const sortedProducts = [...products].sort((a, b) => b.revenue - a.revenue);
  const categories = [...new Set(products.map((p) => p.category))];
  const totalRevenue = products.reduce((acc, p) => acc + p.revenue, 0);
  const totalSold = products.reduce((acc, p) => acc + p.soldToday, 0);

  return (
    <MainLayout title="Products" subtitle="Product analytics and performance">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Products"
            value={products.length.toString()}
            icon={Package}
            iconColor="text-blue-600 dark:text-blue-400"
            iconBg="bg-blue-100 dark:bg-blue-500/20"
          />
          <KPICard
            title="Total Revenue"
            value={formatCurrencyShort(totalRevenue)}
            change={12.4}
            icon={TrendingUp}
            iconColor="text-emerald-600 dark:text-emerald-400"
            iconBg="bg-emerald-100 dark:bg-emerald-500/20"
          />
          <KPICard
            title="Items Sold"
            value={totalSold.toLocaleString('id-ID')}
            change={8.7}
            icon={Package}
            iconColor="text-purple-600 dark:text-purple-400"
            iconBg="bg-purple-100 dark:bg-purple-500/20"
          />
          <KPICard
            title="Avg Price"
            value={formatCurrencyShort(28000)}
            icon={TrendingUp}
            iconColor="text-amber-600 dark:text-amber-400"
            iconBg="bg-amber-100 dark:bg-amber-500/20"
          />
        </div>

        {/* Top Products Table */}
        <Card>
          <div className="p-4 lg:p-6">
            <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Sold</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead>%</TableHead>
                  <TableHead>Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedProducts.map((product, index) => {
                  const Icon = categoryIcons[product.category] || Package;
                  const percentage = ((product.revenue / totalRevenue) * 100).toFixed(1);
                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <span className={cn(
                          'flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold',
                          index === 0 && 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
                          index === 1 && 'bg-gray-200 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400',
                          index === 2 && 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400',
                          index > 2 && 'bg-muted text-muted-foreground'
                        )}>
                          {index + 1}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">{product.category}</Badge></TableCell>
                      <TableCell className="text-right font-number">{formatCurrencyShort(product.price)}</TableCell>
                      <TableCell className="text-right font-number">{product.soldToday.toLocaleString('id-ID')}</TableCell>
                      <TableCell className="text-right font-number font-semibold">{formatCurrencyShort(product.revenue)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={parseFloat(percentage)} className="h-2 w-16" />
                          <span className="text-sm text-muted-foreground">{percentage}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn(
                          product.trend === 'up' && 'border-emerald-300 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-400',
                          product.trend === 'down' && 'border-red-300 text-red-700 dark:border-red-500/30 dark:text-red-400',
                          product.trend === 'stable' && 'border-gray-300 text-gray-600 dark:border-gray-500/30 dark:text-muted-foreground'
                        )}>
                          {product.trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
                          {product.trend === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
                          {product.trend === 'stable' && <Minus className="h-3 w-3 mr-1" />}
                          {product.trend}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Category Performance */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const categoryProducts = products.filter((p) => p.category === category);
            const categoryRevenue = categoryProducts.reduce((acc, p) => acc + p.revenue, 0);
            const categorySold = categoryProducts.reduce((acc, p) => acc + p.soldToday, 0);
            const Icon = categoryIcons[category] || Package;

            return (
              <Card key={category}>
                <div className="p-4 lg:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold">{category}</p>
                      <p className="text-sm text-muted-foreground">{categoryProducts.length} products</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Revenue</span>
                      <span className="font-semibold font-number">{formatCurrencyShort(categoryRevenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Items Sold</span>
                      <span className="font-semibold font-number">{categorySold.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">% of Total</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {((categoryRevenue / totalRevenue) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
