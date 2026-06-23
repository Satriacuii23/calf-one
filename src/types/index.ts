export interface KPIData {
  revenueToday: number;
  revenueMTD: number;
  revenueYTD: number;
  transactionsToday: number;
  activeCustomers: number;
  healthScore: number;
  revenueGrowth: number;
  customerGrowth: number;
  topOutlet: string;
  avgTransaction: number;
}

export interface Outlet {
  id: string;
  name: string;
  city: string;
  status: 'excellent' | 'good' | 'needs-attention' | 'critical';
  revenueToday: number;
  revenueTarget: number;
  transactions: number;
  rating: number;
  lastUpdated: string;
  address: string;
  manager: string;
}

export interface Risk {
  id: string;
  type: 'revenue' | 'operations' | 'inventory' | 'customer' | 'vehicle';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  outlet?: string;
  timestamp: string;
  actionable: boolean;
  suggestedAction?: string;
}

export interface AIInsight {
  id: string;
  category: 'revenue' | 'operations' | 'customer' | 'inventory' | 'expansion';
  title: string;
  description: string;
  confidence: number;
  expectedImpact: string;
  potentialRevenue?: number;
  actionItems: string[];
  timestamp: string;
  icon: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalTransactions: number;
  totalSpent: number;
  lastVisit: string;
  segment: 'vip' | 'regular' | 'churn-risk' | 'new';
  lifetimeValue: number;
  joinDate: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  soldToday: number;
  revenue: number;
  trend: 'up' | 'down' | 'stable';
  image?: string;
}

export interface RevenueData {
  date: string;
  today: number;
  yesterday: number;
  lastWeek: number;
}

export interface HourlyRevenue {
  hour: string;
  revenue: number;
  transactions: number;
}

export interface CityPerformance {
  city: string;
  outlets: number;
  revenue: number;
  growth: number;
  target: number;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  status: 'active' | 'maintenance' | 'idle';
  location: string;
  lastDelivery: string;
  efficiency: number;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: number;
}
