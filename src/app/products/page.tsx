'use client';

import { motion } from 'framer-motion';
import {
  Package,
  TrendingUp,
  TrendingDown,
  Minus,
  Coffee,
  Cookie,
  Utensils,
  Droplet,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { KPICard } from '@/components/dashboard/kpi-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products, formatCurrencyShort } from '@/lib/data';
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

const categoryIcons: Record<string, React.ElementType> = {
  Coffee: Coffee,
  Signature: Coffee,
  'Non-Coffee': Droplet,
  Pastry: Cookie,
  Food: Utensils,
  Beverage: Droplet,
};

const totalRevenue = products.reduce((acc, p) => acc + p.revenue, 0);
const totalSold = products.reduce((acc, p) => acc + p.soldToday, 0);

export default function ProductsPage() {
  const sortedProducts = [...products].sort((a, b) => b.revenue - a.revenue);
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <MainLayout
      title="Product Intelligence"
      subtitle="Analyze product performance and popularity"
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
              title="Total Products"
              value={products.length.toString()}
              icon={Package}
              iconColor="text-primary"
              iconBg="bg-primary/10"
            />
          </motion.div>
          <motion.div variants={item}>
            <KPICard
              title="Total Revenue"
              value={formatCurrencyShort(totalRevenue)}
              change={12.4}
              icon={TrendingUp}
              iconColor="text-emerald-400"
              iconBg="bg-emerald-500/10"
            />
          </motion.div>
          <motion.div variants={item}>
            <KPICard
              title="Items Sold Today"
              value={totalSold.toLocaleString('id-ID')}
              change={8.7}
              icon={Package}
              iconColor="text-purple-400"
              iconBg="bg-purple-500/10"
            />
          </motion.div>
          <motion.div variants={item}>
            <KPICard
              title="Avg Price"
              value={formatCurrencyShort(28000)}
              icon={TrendingUp}
              iconColor="text-amber-400"
              iconBg="bg-amber-500/10"
            />
          </motion.div>
        </div>

        {/* Top Products */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Top Selling Products</CardTitle>
                <Tabs defaultValue="all" className="ml-auto">
                  <TabsList className="bg-secondary">
                    <TabsTrigger value="all">All</TabsTrigger>
                    {categories.map((cat) => (
                      <TabsTrigger key={cat} value={cat}>
                        {cat}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Rank</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Sold Today</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead>% of Total</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedProducts.map((product, index) => {
                    const Icon = categoryIcons[product.category] || Package;
                    const percentage = ((product.revenue / totalRevenue) * 100).toFixed(1);
                    return (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          <span
                            className={cn(
                              'flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold',
                              index === 0 && 'bg-amber-500/20 text-amber-400',
                              index === 1 && 'bg-gray-400/20 text-gray-400',
                              index === 2 && 'bg-orange-600/20 text-orange-400',
                              index > 2 && 'bg-secondary text-muted-foreground'
                            )}
                          >
                            {index + 1}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.category}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-number">
                          {formatCurrencyShort(product.price)}
                        </TableCell>
                        <TableCell className="text-right font-number">
                          {product.soldToday.toLocaleString('id-ID')}
                        </TableCell>
                        <TableCell className="text-right font-number font-semibold">
                          {formatCurrencyShort(product.revenue)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={parseFloat(percentage)}
                              className="h-2 w-16"
                            />
                            <span className="text-sm text-muted-foreground">
                              {percentage}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              product.trend === 'up' && 'border-emerald-500/30 text-emerald-400',
                              product.trend === 'down' && 'border-red-500/30 text-red-400',
                              product.trend === 'stable' && 'border-gray-500/30 text-muted-foreground'
                            )}
                          >
                            {product.trend === 'up' && <ArrowUpRight className="h-3 w-3 mr-1" />}
                            {product.trend === 'down' && <ArrowDownRight className="h-3 w-3 mr-1" />}
                            {product.trend}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Performance */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const categoryProducts = products.filter((p) => p.category === category);
            const categoryRevenue = categoryProducts.reduce((acc, p) => acc + p.revenue, 0);
            const categorySold = categoryProducts.reduce((acc, p) => acc + p.soldToday, 0);
            const Icon = categoryIcons[category] || Package;

            return (
              <motion.div key={category} variants={item}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{category}</p>
                        <p className="text-sm text-muted-foreground">
                          {categoryProducts.length} products
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Revenue</span>
                        <span className="font-semibold font-number">
                          {formatCurrencyShort(categoryRevenue)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Items Sold</span>
                        <span className="font-semibold font-number">
                          {categorySold.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">% of Total</span>
                        <span className="font-semibold text-primary">
                          {((categoryRevenue / totalRevenue) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </MainLayout>
  );
}
