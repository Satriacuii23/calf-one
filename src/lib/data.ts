import {
  KPIData,
  Outlet,
  Risk,
  AIInsight,
  Customer,
  Product,
  RevenueData,
  HourlyRevenue,
  CityPerformance,
  Vehicle,
  Notification,
} from '@/types';

export const kpiData: KPIData = {
  revenueToday: 847500000,
  revenueMTD: 24560000000,
  revenueYTD: 147850000000,
  transactionsToday: 4827,
  activeCustomers: 3856,
  healthScore: 87,
  revenueGrowth: 12.4,
  customerGrowth: 8.7,
  topOutlet: 'Kopi Calf Bandung Dago',
  avgTransaction: 175600,
};

export const outlets: Outlet[] = [
  {
    id: '1',
    name: 'Kopi Calf Bandung Dago',
    city: 'Bandung',
    status: 'excellent',
    revenueToday: 32650000,
    revenueTarget: 30000000,
    transactions: 186,
    rating: 4.9,
    lastUpdated: '2026-06-23T19:30:00',
    address: 'Jl. Ir. H. Djuanda No. 90, Bandung',
    manager: 'Ahmad Fauzi',
  },
  {
    id: '2',
    name: 'Kopi Calf Jakarta Selatan',
    city: 'Jakarta',
    status: 'excellent',
    revenueToday: 31200000,
    revenueTarget: 28000000,
    transactions: 178,
    rating: 4.8,
    lastUpdated: '2026-06-23T19:30:00',
    address: 'Jl. Jl. TB Simatupang No. 15, Jakarta Selatan',
    manager: 'Diana Putri',
  },
  {
    id: '3',
    name: 'Kopi Calf Surabaya',
    city: 'Surabaya',
    status: 'good',
    revenueToday: 28400000,
    revenueTarget: 28000000,
    transactions: 162,
    rating: 4.7,
    lastUpdated: '2026-06-23T19:30:00',
    address: 'Jl. Mayjen Sungkono No. 45, Surabaya',
    manager: 'Budi Santoso',
  },
  {
    id: '4',
    name: 'Kopi Calf Yogyakarta',
    city: 'Yogyakarta',
    status: 'good',
    revenueToday: 25600000,
    revenueTarget: 25000000,
    transactions: 146,
    rating: 4.6,
    lastUpdated: '2026-06-23T19:30:00',
    address: 'Jl. Malioboro No. 120, Yogyakarta',
    manager: 'Siti Rahayu',
  },
  {
    id: '5',
    name: 'Kopi Calf Bali Kuta',
    city: 'Bali',
    status: 'good',
    revenueToday: 24800000,
    revenueTarget: 25000000,
    transactions: 142,
    rating: 4.5,
    lastUpdated: '2026-06-23T19:30:00',
    address: 'Jl. Raya Kuta No. 88, Bali',
    manager: 'Made Wijaya',
  },
  {
    id: '6',
    name: 'Kopi Calf Semarang',
    city: 'Semarang',
    status: 'needs-attention',
    revenueToday: 18200000,
    revenueTarget: 25000000,
    transactions: 104,
    rating: 4.2,
    lastUpdated: '2026-06-23T19:30:00',
    address: 'Jl. Pandanaran No. 50, Semarang',
    manager: 'Joko Widodo',
  },
  {
    id: '7',
    name: 'Kopi Calf Medan',
    city: 'Medan',
    status: 'needs-attention',
    revenueToday: 16800000,
    revenueTarget: 22000000,
    transactions: 96,
    rating: 4.1,
    lastUpdated: '2026-06-23T19:30:00',
    address: 'Jl. Merdeka No. 75, Medan',
    manager: 'Rizky Ramadhan',
  },
  {
    id: '8',
    name: 'Kopi Calf Makassar',
    city: 'Makassar',
    status: 'good',
    revenueToday: 23400000,
    revenueTarget: 24000000,
    transactions: 134,
    rating: 4.5,
    lastUpdated: '2026-06-23T19:30:00',
    address: 'Jl. Pettarani No. 30, Makassar',
    manager: 'Andi Saputra',
  },
  {
    id: '9',
    name: 'Kopi Calf Palembang',
    city: 'Palembang',
    status: 'critical',
    revenueToday: 12400000,
    revenueTarget: 22000000,
    transactions: 71,
    rating: 3.8,
    lastUpdated: '2026-06-23T19:30:00',
    address: 'Jl. Angkatan 45 No. 12, Palembang',
    manager: 'Dedi Kurniawan',
  },
  {
    id: '10',
    name: 'Kopi Calf Malang',
    city: 'Malang',
    status: 'good',
    revenueToday: 21800000,
    revenueTarget: 22000000,
    transactions: 124,
    rating: 4.4,
    lastUpdated: '2026-06-23T19:30:00',
    address: 'Jl. Soekarno Hatta No. 60, Malang',
    manager: 'Rina Wulandari',
  },
];

export const risks: Risk[] = [
  {
    id: '1',
    type: 'revenue',
    severity: 'critical',
    title: 'Revenue Drop 18% at Palembang Outlet',
    description: 'Palembang outlet mengalami penurunan revenue signifikan sebesar 18% dari target harian.',
    outlet: 'Kopi Calf Palembang',
    timestamp: '2026-06-23T18:45:00',
    actionable: true,
    suggestedAction: 'Evaluasi staffing dan promosi lokal untuk boost penjualan.',
  },
  {
    id: '2',
    type: 'inventory',
    severity: 'critical',
    title: 'Stock Susu Kritis di 7 Outlet',
    description: 'Tujuh outlet memiliki stock susu kurang dari 2 hari operasional.',
    timestamp: '2026-06-23T18:30:00',
    actionable: true,
    suggestedAction: 'Segera lakukan restock dari gudang pusat.',
  },
  {
    id: '3',
    type: 'customer',
    severity: 'warning',
    title: 'Spike Complaint Terdeteksi',
    description: 'Peningkatan 35% complaint tentang lama tunggu di outlet Jakarta Selatan.',
    outlet: 'Kopi Calf Jakarta Selatan',
    timestamp: '2026-06-23T17:20:00',
    actionable: true,
    suggestedAction: 'Tambah staff di jam sibuk (17:00-20:00).',
  },
  {
    id: '4',
    type: 'operations',
    severity: 'warning',
    title: 'Transaction Anomaly Terdeteksi',
    description: 'Kemungkinan ada transaction void yang tidak wajar di outlet Bandung.',
    outlet: 'Kopi Calf Bandung Dago',
    timestamp: '2026-06-23T16:15:00',
    actionable: true,
    suggestedAction: 'Review log transaksi dengan manager outlet.',
  },
  {
    id: '5',
    type: 'vehicle',
    severity: 'info',
    title: 'Vehicle Downtime Terdeteksi',
    description: 'Kendaraan delivery #DK-2847 sedang dalam perbaikan.',
    timestamp: '2026-06-23T15:00:00',
    actionable: false,
  },
  {
    id: '6',
    type: 'inventory',
    severity: 'warning',
    title: 'Biji Kopi Grade A Menipis',
    description: 'Stock biji kopi premium under threat. Estimasi 5 hari sebelum habis.',
    timestamp: '2026-06-23T14:30:00',
    actionable: true,
    suggestedAction: 'PO urgent ke supplier atau redistribusi dari outlet lain.',
  },
];

export const aiInsights: AIInsight[] = [
  {
    id: '1',
    category: 'operations',
    title: 'Optimalisasi Staffing Peak Hours',
    description: 'Tingkatkan staffing di Kopi Calf Bandung Dago selama 17:00-20:00 untuk mengurangi waktu tunggu.',
    confidence: 94,
    expectedImpact: 'Peningkatan kepuasan pelanggan +12%',
    potentialRevenue: 4200000,
    actionItems: [
      'Jadwalkan 2 staff tambahan untuk shift sore',
      'Implementasikan sistem antrian digital',
    ],
    timestamp: '2026-06-23T19:00:00',
    icon: 'users',
  },
  {
    id: '2',
    category: 'customer',
    title: 'Win-back Campaign untuk Churn Risk Customers',
    description: '14,821 customers menunjukkan pola churn. Rekomendasi untuk kampaye win-back.',
    confidence: 88,
    expectedImpact: 'Recovery rate target 8%',
    potentialRevenue: 482000000,
    actionItems: [
      'Kirim voucher Rp 25,000 via push notification',
      'Personalisasi offer berdasarkan purchase history',
    ],
    timestamp: '2026-06-23T18:30:00',
    icon: 'heart',
  },
  {
    id: '3',
    category: 'revenue',
    title: 'Bundle Promotion Effectiveness',
    description: 'Bundle "Pagi Ceria" (Kopi + Roti) menunjukkan 23% higher margin. Rekomendasi ekspansi.',
    confidence: 91,
    expectedImpact: '+Rp 180 juta/bulan potential',
    potentialRevenue: 180000000,
    actionItems: [
      'Launch bundle di 15 outlet dengan sales rendah',
      'A/B test dengan harga Rp 45,000 vs Rp 48,000',
    ],
    timestamp: '2026-06-23T17:00:00',
    icon: 'trending-up',
  },
  {
    id: '4',
    category: 'expansion',
    title: 'High Potential Location: Gading Serpong',
    description: 'Area Gading Serpong menunjukkan demografi ideal dengan competition rendah.',
    confidence: 82,
    expectedImpact: 'Proyeksi revenue Rp 250 juta/bulan',
    potentialRevenue: 250000000,
    actionItems: [
      'Lakukan site survey minggu depan',
      'Analisis foot traffic dan parking availability',
    ],
    timestamp: '2026-06-23T16:00:00',
    icon: 'map-pin',
  },
  {
    id: '5',
    category: 'inventory',
    title: 'Supply Chain Optimization',
    description: 'Konsolidasi distribusi ke cluster Surabaya-Malang dapat hemat ongkir 18%.',
    confidence: 86,
    expectedImpact: 'Hemat Rp 45 juta/bulan',
    potentialRevenue: 45000000,
    actionItems: [
      'Review kontrak supplier untuk bulk discount',
      'Optimasi route distribusi mingguan',
    ],
    timestamp: '2026-06-23T15:30:00',
    icon: 'package',
  },
];

export const customers: Customer[] = [
  {
    id: '1',
    name: 'Rizky Pratama',
    email: 'rizky.pratama@email.com',
    phone: '081234567890',
    totalTransactions: 234,
    totalSpent: 41250000,
    lastVisit: '2026-06-23',
    segment: 'vip',
    lifetimeValue: 41250000,
    joinDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Anisa Wahyuni',
    email: 'anisa.wahyuni@email.com',
    phone: '081234567891',
    totalTransactions: 189,
    totalSpent: 28350000,
    lastVisit: '2026-06-22',
    segment: 'vip',
    lifetimeValue: 28350000,
    joinDate: '2024-02-20',
  },
  {
    id: '3',
    name: 'Dimas Ardiansyah',
    email: 'dimas.ardian@email.com',
    phone: '081234567892',
    totalTransactions: 67,
    totalSpent: 9380000,
    lastVisit: '2026-06-20',
    segment: 'regular',
    lifetimeValue: 9380000,
    joinDate: '2024-06-10',
  },
  {
    id: '4',
    name: 'Siti Nurhaliza',
    email: 'siti.nurhaliza@email.com',
    phone: '081234567893',
    totalTransactions: 45,
    totalSpent: 6300000,
    lastVisit: '2026-05-15',
    segment: 'churn-risk',
    lifetimeValue: 6300000,
    joinDate: '2024-08-05',
  },
  {
    id: '5',
    name: 'Bagus Permana',
    email: 'bagus.permana@email.com',
    phone: '081234567894',
    totalTransactions: 12,
    totalSpent: 1680000,
    lastVisit: '2026-06-23',
    segment: 'new',
    lifetimeValue: 1680000,
    joinDate: '2026-06-01',
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Caffe Latte',
    category: 'Coffee',
    price: 28000,
    soldToday: 856,
    revenue: 23968000,
    trend: 'up',
  },
  {
    id: '2',
    name: 'Cappuccino',
    category: 'Coffee',
    price: 30000,
    soldToday: 634,
    revenue: 19020000,
    trend: 'up',
  },
  {
    id: '3',
    name: 'Americano',
    category: 'Coffee',
    price: 25000,
    soldToday: 521,
    revenue: 13025000,
    trend: 'stable',
  },
  {
    id: '4',
    name: 'Kopi Susu Gula Aren',
    category: 'Signature',
    price: 32000,
    soldToday: 489,
    revenue: 15648000,
    trend: 'up',
  },
  {
    id: '5',
    name: 'Matcha Latte',
    category: 'Non-Coffee',
    price: 35000,
    soldToday: 356,
    revenue: 12460000,
    trend: 'down',
  },
  {
    id: '6',
    name: 'Croissant',
    category: 'Pastry',
    price: 22000,
    soldToday: 298,
    revenue: 6556000,
    trend: 'up',
  },
  {
    id: '7',
    name: 'Indomie Goreng',
    category: 'Food',
    price: 25000,
    soldToday: 267,
    revenue: 6675000,
    trend: 'stable',
  },
  {
    id: '8',
    name: 'Es Teh Manis',
    category: 'Beverage',
    price: 12000,
    soldToday: 892,
    revenue: 10704000,
    trend: 'up',
  },
];

export const revenueData: RevenueData[] = [
  { date: '00:00', today: 1200000, yesterday: 1100000, lastWeek: 1000000 },
  { date: '01:00', today: 800000, yesterday: 750000, lastWeek: 700000 },
  { date: '02:00', today: 500000, yesterday: 450000, lastWeek: 400000 },
  { date: '03:00', today: 300000, yesterday: 280000, lastWeek: 250000 },
  { date: '04:00', today: 400000, yesterday: 350000, lastWeek: 300000 },
  { date: '05:00', today: 1200000, yesterday: 1100000, lastWeek: 900000 },
  { date: '06:00', today: 3500000, yesterday: 3200000, lastWeek: 2800000 },
  { date: '07:00', today: 8500000, yesterday: 7800000, lastWeek: 7000000 },
  { date: '08:00', today: 12500000, yesterday: 11500000, lastWeek: 10000000 },
  { date: '09:00', today: 18000000, yesterday: 16500000, lastWeek: 15000000 },
  { date: '10:00', today: 22000000, yesterday: 20000000, lastWeek: 18500000 },
  { date: '11:00', today: 28500000, yesterday: 26000000, lastWeek: 24000000 },
  { date: '12:00', today: 45000000, yesterday: 42000000, lastWeek: 38000000 },
  { date: '13:00', today: 52000000, yesterday: 48000000, lastWeek: 44000000 },
  { date: '14:00', today: 48000000, yesterday: 45000000, lastWeek: 42000000 },
  { date: '15:00', today: 42000000, yesterday: 39000000, lastWeek: 36000000 },
  { date: '16:00', today: 38000000, yesterday: 35000000, lastWeek: 32000000 },
  { date: '17:00', today: 65000000, yesterday: 60000000, lastWeek: 55000000 },
  { date: '18:00', today: 85000000, yesterday: 78000000, lastWeek: 72000000 },
  { date: '19:00', today: 78000000, yesterday: 72000000, lastWeek: 68000000 },
  { date: '20:00', today: 55000000, yesterday: 51000000, lastWeek: 48000000 },
  { date: '21:00', today: 32000000, yesterday: 30000000, lastWeek: 28000000 },
  { date: '22:00', today: 18000000, yesterday: 16500000, lastWeek: 15000000 },
  { date: '23:00', today: 8500000, yesterday: 7800000, lastWeek: 7000000 },
];

export const hourlyRevenue: HourlyRevenue[] = [
  { hour: '06-07', revenue: 8500000, transactions: 48 },
  { hour: '07-08', revenue: 12500000, transactions: 71 },
  { hour: '08-09', revenue: 18000000, transactions: 102 },
  { hour: '09-10', revenue: 22000000, transactions: 125 },
  { hour: '10-11', revenue: 28500000, transactions: 162 },
  { hour: '11-12', revenue: 45000000, transactions: 256 },
  { hour: '12-13', revenue: 52000000, transactions: 296 },
  { hour: '13-14', revenue: 48000000, transactions: 273 },
  { hour: '14-15', revenue: 42000000, transactions: 239 },
  { hour: '15-16', revenue: 38000000, transactions: 216 },
  { hour: '16-17', revenue: 65000000, transactions: 370 },
  { hour: '17-18', revenue: 85000000, transactions: 484 },
  { hour: '18-19', revenue: 78000000, transactions: 444 },
  { hour: '19-20', revenue: 55000000, transactions: 313 },
  { hour: '20-21', revenue: 32000000, transactions: 182 },
  { hour: '21-22', revenue: 18000000, transactions: 102 },
];

export const cityPerformance: CityPerformance[] = [
  { city: 'Jakarta', outlets: 35, revenue: 4500000000, growth: 15.2, target: 4200000000 },
  { city: 'Bandung', outlets: 28, revenue: 3800000000, growth: 18.5, target: 3500000000 },
  { city: 'Surabaya', outlets: 22, revenue: 2800000000, growth: 12.8, target: 2700000000 },
  { city: 'Yogyakarta', outlets: 15, revenue: 1650000000, growth: 9.4, target: 1600000000 },
  { city: 'Bali', outlets: 12, revenue: 1400000000, growth: 22.1, target: 1200000000 },
  { city: 'Semarang', outlets: 8, revenue: 720000000, growth: -5.2, target: 850000000 },
  { city: 'Medan', outlets: 6, revenue: 580000000, growth: 3.1, target: 600000000 },
  { city: 'Makassar', outlets: 5, revenue: 420000000, growth: 8.9, target: 400000000 },
];

export const vehicles: Vehicle[] = [
  {
    id: '1',
    plateNumber: 'DK 1234 ABC',
    status: 'active',
    location: 'Gudang Pusat - Jakarta',
    lastDelivery: '2026-06-23T18:30:00',
    efficiency: 94,
  },
  {
    id: '2',
    plateNumber: 'DK 2345 BCD',
    status: 'active',
    location: 'Outlet Bandung Dago',
    lastDelivery: '2026-06-23T17:45:00',
    efficiency: 88,
  },
  {
    id: '3',
    plateNumber: 'DK 3456 CDE',
    status: 'maintenance',
    location: 'Service Center',
    lastDelivery: '2026-06-23T14:00:00',
    efficiency: 0,
  },
  {
    id: '4',
    plateNumber: 'DK 4567 DEF',
    status: 'active',
    location: 'En route to Surabaya',
    lastDelivery: '2026-06-23T16:20:00',
    efficiency: 91,
  },
  {
    id: '5',
    plateNumber: 'DK 5678 EFG',
    status: 'idle',
    location: 'Gudang Bandung',
    lastDelivery: '2026-06-23T12:00:00',
    efficiency: 76,
  },
];

export const notifications: Notification[] = [
  {
    id: '1',
    type: 'error',
    title: 'Revenue Alert',
    message: 'Palembang outlet di bawah target 44%',
    timestamp: '2026-06-23T18:45:00',
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Stock Alert',
    message: '7 outlet dengan stock susu kritis',
    timestamp: '2026-06-23T18:30:00',
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'New Insight Available',
    message: 'AI merekomendasikan 3 action items baru',
    timestamp: '2026-06-23T17:00:00',
    read: true,
  },
  {
    id: '4',
    type: 'success',
    title: 'Milestone Achieved',
    message: 'Revenue harian tertinggi tahun ini!',
    timestamp: '2026-06-23T16:00:00',
    read: true,
  },
];

// Helper functions
export function formatCurrency(amount: number): string {
  if (amount >= 1000000000) {
    return `Rp ${(amount / 1000000000).toFixed(1)}M`;
  } else if (amount >= 1000000) {
    return `Rp ${(amount / 1000000).toFixed(0)}jt`;
  } else if (amount >= 1000) {
    return `Rp ${(amount / 1000).toFixed(0)}rb`;
  }
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

export function formatCurrencyShort(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num);
}

export function formatPercentage(num: number): string {
  return `${num >= 0 ? '+' : ''}${num.toFixed(1)}%`;
}

export function getStatusColor(status: Outlet['status']): string {
  switch (status) {
    case 'excellent':
      return 'text-emerald-400';
    case 'good':
      return 'text-cyan-400';
    case 'needs-attention':
      return 'text-amber-400';
    case 'critical':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
}

export function getSeverityColor(severity: Risk['severity']): string {
  switch (severity) {
    case 'critical':
      return 'border-l-red-500 bg-red-500/5';
    case 'warning':
      return 'border-l-amber-500 bg-amber-500/5';
    case 'info':
      return 'border-l-blue-500 bg-blue-500/5';
    default:
      return 'border-l-gray-500 bg-gray-500/5';
  }
}

export function getSegmentColor(segment: Customer['segment']): string {
  switch (segment) {
    case 'vip':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'regular':
      return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    case 'churn-risk':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    case 'new':
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
}
