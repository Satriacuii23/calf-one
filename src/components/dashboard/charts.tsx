'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrencyShort } from '@/lib/data';
import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({ title, subtitle, children, className }: ChartCardProps) {
  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  );
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
  prefix?: string;
}

function CustomTooltip({ active, payload, label, prefix = '' }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-xl">
        <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-muted-foreground">{entry.name}:</span>
            <span className="text-sm font-semibold font-number">
              {prefix}
              {entry.value.toLocaleString('id-ID')}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

interface RevenueAreaChartProps {
  data: Array<{
    date: string;
    today: number;
    yesterday: number;
    lastWeek: number;
  }>;
}

export function RevenueAreaChart({ data }: RevenueAreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorToday" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorYesterday" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
        <XAxis
          dataKey="date"
          stroke="#71717a"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#71717a"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${(value / 1000000).toFixed(0)}jt`}
        />
        <Tooltip content={<CustomTooltip prefix="Rp " />} />
        <Area
          type="monotone"
          dataKey="today"
          name="Hari Ini"
          stroke="#06b6d4"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorToday)"
        />
        <Area
          type="monotone"
          dataKey="yesterday"
          name="Kemarin"
          stroke="#8b5cf6"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorYesterday)"
          strokeDasharray="5 5"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface HourlyBarChartProps {
  data: Array<{
    hour: string;
    revenue: number;
    transactions: number;
  }>;
}

export function HourlyBarChart({ data }: HourlyBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
        <XAxis
          dataKey="hour"
          stroke="#71717a"
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#71717a"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${(value / 1000000).toFixed(0)}jt`}
        />
        <Tooltip content={<CustomTooltip prefix="Rp " />} />
        <Bar
          dataKey="revenue"
          name="Revenue"
          fill="#06b6d4"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface CustomerPieChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export function CustomerPieChart({ data }: CustomerPieChartProps) {
  return (
    <div className="flex items-center gap-8">
      <ResponsiveContainer width={180} height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-col gap-3">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{item.name}</span>
              <span className="text-sm font-semibold font-number">
                {item.value}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface CityPerformanceChartProps {
  data: Array<{
    city: string;
    revenue: number;
    target: number;
    growth: number;
  }>;
}

export function CityPerformanceChart({ data }: CityPerformanceChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 80, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" horizontal={false} />
        <XAxis
          type="number"
          stroke="#71717a"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${(value / 1000000000).toFixed(1)}B`}
        />
        <YAxis
          type="category"
          dataKey="city"
          stroke="#71717a"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip prefix="Rp " />} />
        <Legend />
        <Bar
          dataKey="revenue"
          name="Revenue"
          fill="#06b6d4"
          radius={[0, 4, 4, 0]}
          barSize={20}
        />
        <Bar
          dataKey="target"
          name="Target"
          fill="#1e1e2e"
          radius={[0, 4, 4, 0]}
          barSize={20}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface TrendLineChartProps {
  data: Array<{
    date: string;
    value: number;
  }>;
  color?: string;
}

export function TrendLineChart({ data, color = '#06b6d4' }: TrendLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={100}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

interface GrowthChartProps {
  data: Array<{
    month: string;
    current: number;
    previous: number;
  }>;
}

export function GrowthChart({ data }: GrowthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
        <XAxis
          dataKey="month"
          stroke="#71717a"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#71717a"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="current"
          name="2026"
          stroke="#06b6d4"
          strokeWidth={2}
          dot={{ fill: '#06b6d4', strokeWidth: 0, r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="previous"
          name="2025"
          stroke="#71717a"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ fill: '#71717a', strokeWidth: 0, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
