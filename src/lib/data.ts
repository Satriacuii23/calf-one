import {
  RevenueData,
  OutletData,
  CustomerData,
  AlertData,
  CCTVData,
  InternetData,
  ProductData,
  HealthScore,
  AreaRevenue,
  CustomerFunnel,
  ChartDataPoint,
} from "@/types"

// Revenue Trend Data (Last 30 Days)
export const revenueTrendData: RevenueData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - (29 - i))
  const baseRevenue = 450000000 + Math.random() * 150000000
  const weekendBoost = [0, 6].includes(date.getDay()) ? 1.3 : 1
  return {
    date: date.toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
    revenue: Math.round(baseRevenue * weekendBoost),
    transactions: Math.round(15000 + Math.random() * 5000),
  }
})

// Area Revenue Data
export const areaRevenueData: AreaRevenue[] = [
  { area: "Bandung", revenue: 4200000000, outlets: 35, growth: 15.2 },
  { area: "Jakarta", revenue: 3800000000, outlets: 28, growth: 12.8 },
  { area: "Bekasi", revenue: 2100000000, outlets: 18, growth: 18.5 },
  { area: "Tasikmalaya", revenue: 1800000000, outlets: 15, growth: 22.1 },
  { area: "Karawang", revenue: 1500000000, outlets: 12, growth: 8.3 },
  { area: "Cirebon", revenue: 950000000, outlets: 7, growth: -5.2 },
]

// Top Outlets
export const topOutlets: OutletData[] = [
  { id: "1", name: "Calf Dago", area: "Bandung", revenue: 45000000, growth: 18.5, healthScore: 95, status: "online", cctvOnline: 8, cctvTotal: 8 },
  { id: "2", name: "Calf Plaza Indonesia", area: "Jakarta", revenue: 42000000, growth: 15.2, healthScore: 92, status: "online", cctvOnline: 12, cctvTotal: 12 },
  { id: "3", name: "Calf BEC", area: "Bandung", revenue: 38500000, growth: 12.8, healthScore: 89, status: "online", cctvOnline: 6, cctvTotal: 8 },
  { id: "4", name: "Calf Grand Metropolitan", area: "Bekasi", revenue: 35200000, growth: 22.1, healthScore: 94, status: "online", cctvOnline: 10, cctvTotal: 10 },
  { id: "5", name: "Calf Cihampelas", area: "Bandung", revenue: 32800000, growth: 8.3, healthScore: 87, status: "online", cctvOnline: 8, cctvTotal: 8 },
  { id: "6", name: "Calf Sudirman", area: "Jakarta", revenue: 31500000, growth: 11.5, healthScore: 91, status: "online", cctvOnline: 8, cctvTotal: 8 },
  { id: "7", name: "Calf Asia Afrika", area: "Bandung", revenue: 29200000, growth: -2.1, healthScore: 78, status: "warning", cctvOnline: 6, cctvTotal: 8 },
  { id: "8", name: "Calf Transmart", area: "Tasikmalaya", revenue: 27500000, growth: 25.3, healthScore: 96, status: "online", cctvOnline: 6, cctvTotal: 6 },
  { id: "9", name: "Calf Lippo", area: "Karawang", revenue: 25800000, growth: 5.7, healthScore: 85, status: "online", cctvOnline: 6, cctvTotal: 6 },
  { id: "10", name: "Calf Grage", area: "Cirebon", revenue: 23500000, growth: -8.4, healthScore: 62, status: "warning", cctvOnline: 4, cctvTotal: 8 },
]

// All Outlets for Operations
export const allOutlets: OutletData[] = [
  ...topOutlets,
  { id: "11", name: "Calf Riau", area: "Bandung", revenue: 22500000, growth: 9.2, healthScore: 88, status: "online", cctvOnline: 6, cctvTotal: 6 },
  { id: "12", name: "Calf Kebon Jeruk", area: "Jakarta", revenue: 21800000, growth: 6.8, healthScore: 86, status: "online", cctvOnline: 6, cctvTotal: 6 },
  { id: "13", name: "Calf Harapan Indah", area: "Bekasi", revenue: 19800000, growth: 14.3, healthScore: 90, status: "online", cctvOnline: 6, cctvTotal: 6 },
  { id: "14", name: "Calf Padalarang", area: "Bandung", revenue: 18200000, growth: 3.5, healthScore: 82, status: "online", cctvOnline: 4, cctvTotal: 4 },
  { id: "15", name: "Calf Cirebon Barat", area: "Cirebon", revenue: 15800000, growth: -12.1, healthScore: 45, status: "offline", cctvOnline: 2, cctvTotal: 6 },
]

// Alert Feed
export const alertFeed: AlertData[] = [
  { id: "1", type: "danger", message: "Outlet Cirebon offline for 2 hours", outlet: "Cirebon Barat", timestamp: "5 min ago", isRead: false },
  { id: "2", type: "warning", message: "17 CCTV cameras offline", timestamp: "12 min ago", isRead: false },
  { id: "3", type: "warning", message: "Internet unstable at 3 outlets", timestamp: "18 min ago", isRead: false },
  { id: "4", type: "info", message: "Customer complaints increased by 15%", timestamp: "25 min ago", isRead: false },
  { id: "5", type: "danger", message: "Revenue anomaly detected at Asia Afrika", outlet: "Asia Afrika", timestamp: "32 min ago", isRead: false },
  { id: "6", type: "info", message: "Peak hour approaching - Dago outlet", timestamp: "45 min ago", isRead: true },
  { id: "7", type: "warning", message: "Power fluctuation detected at Lippo", outlet: "Lippo", timestamp: "1 hour ago", isRead: true },
]

// CCTV Data
export const cctvData: CCTVData[] = [
  { id: "1", outletName: "Calf Dago", cameraName: "Counter Camera", status: "online", lastUpdate: "2 min ago" },
  { id: "2", outletName: "Calf Dago", cameraName: "Kitchen Camera", status: "online", lastUpdate: "2 min ago" },
  { id: "3", outletName: "Calf Plaza Indonesia", cameraName: "Main Entrance", status: "online", lastUpdate: "1 min ago" },
  { id: "4", outletName: "Calf Plaza Indonesia", cameraName: "Seating Area", status: "online", lastUpdate: "1 min ago" },
  { id: "5", outletName: "Calf BEC", cameraName: "Counter Camera", status: "offline", lastUpdate: "15 min ago" },
  { id: "6", outletName: "Calf BEC", cameraName: "Drive Thru", status: "online", lastUpdate: "3 min ago" },
  { id: "7", outletName: "Calf Grand Metropolitan", cameraName: "Main Hall", status: "online", lastUpdate: "2 min ago" },
  { id: "8", outletName: "Calf Grand Metropolitan", cameraName: "Kitchen", status: "online", lastUpdate: "2 min ago" },
]

// Internet Status
export const internetData: InternetData[] = [
  { outlet: "Calf Dago", isp: "Indihome", status: "stable", speed: 100, latency: 12 },
  { outlet: "Calf Plaza Indonesia", isp: "Biznet", status: "stable", speed: 150, latency: 8 },
  { outlet: "Calf BEC", isp: "First Media", status: "unstable", speed: 45, latency: 45 },
  { outlet: "Calf Grand Metropolitan", isp: "MyRepublic", status: "stable", speed: 100, latency: 15 },
  { outlet: "Calf Cihampelas", isp: "Indihome", status: "stable", speed: 100, latency: 14 },
  { outlet: "Calf Asia Afrika", isp: "Indihome", status: "unstable", speed: 50, latency: 38 },
  { outlet: "Calf Transmart", isp: "CBN", status: "stable", speed: 100, latency: 10 },
  { outlet: "Calf Lippo", isp: "Indihome", status: "unstable", speed: 35, latency: 52 },
]

// Products
export const productsData: ProductData[] = [
  { id: "1", name: "Cappuccino", category: "Coffee", revenue: 2800000000, units: 56000, growth: 18.5 },
  { id: "2", name: "Americano", category: "Coffee", revenue: 2100000000, units: 42000, growth: 12.3 },
  { id: "3", name: "Cafe Latte", category: "Coffee", revenue: 1950000000, units: 39000, growth: 8.7 },
  { id: "4", name: "Matcha Latte", category: "Non-Coffee", revenue: 1450000000, units: 29000, growth: 25.2 },
  { id: "5", name: "Croissant", category: "Food", revenue: 980000000, units: 19600, growth: 5.4 },
  { id: "6", name: "Rice Bowl", category: "Food", revenue: 850000000, units: 17000, growth: -2.1 },
]

// Customer Data
export const customerStats = {
  total: 128521,
  new: 18742,
  repeat: 82193,
  active: 45231,
  retention: 67.8,
  avgSpend: 78500,
}

export const customerFunnel: CustomerFunnel[] = [
  { stage: "Visitor", count: 250000, percentage: 100 },
  { stage: "Buyer", count: 128521, percentage: 51.4 },
  { stage: "Repeat Buyer", count: 82193, percentage: 32.9 },
  { stage: "Member", count: 45231, percentage: 18.1 },
  { stage: "VIP", count: 8542, percentage: 3.4 },
]

export const customerSegments = [
  { name: "VIP", count: 8542, color: "#0F2D6B", percentage: 6.6 },
  { name: "Loyal", count: 36689, color: "#1F5EFF", percentage: 28.5 },
  { name: "Regular", count: 65234, color: "#64748B", percentage: 50.8 },
  { name: "New", count: 18056, color: "#94A3B8", percentage: 14.1 },
]

export const churnRiskData = {
  atRisk: 14821,
  low: 85432,
  medium: 24268,
  high: 14821,
}

export const topCustomers: CustomerData[] = [
  { id: "1", name: "Budi Santoso", totalSpent: 48500000, visitCount: 312, lastVisit: "Today", segment: "VIP", churnRisk: "low" },
  { id: "2", name: "Siti Rahayu", totalSpent: 42100000, visitCount: 287, lastVisit: "Yesterday", segment: "VIP", churnRisk: "low" },
  { id: "3", name: "Ahmad Hidayat", totalSpent: 38500000, visitCount: 256, lastVisit: "Today", segment: "VIP", churnRisk: "low" },
  { id: "4", name: "Dewi Lestari", totalSpent: 35200000, visitCount: 234, lastVisit: "2 days ago", segment: "VIP", churnRisk: "low" },
  { id: "5", name: "Rudi Hermawan", totalSpent: 31800000, visitCount: 198, lastVisit: "Yesterday", segment: "Loyal", churnRisk: "low" },
]

// Purchase Frequency
export const purchaseFrequencyData: ChartDataPoint[] = [
  { name: "1x/week", value: 42500 },
  { name: "2-3x/week", value: 35800 },
  { name: "4-5x/week", value: 18200 },
  { name: "Daily", value: 8500 },
  { name: "Rarely", value: 23521 },
]

// Health Score Components
export const healthScoreData: HealthScore[] = [
  { category: "Revenue", score: 92, weight: 30, trend: "up" },
  { category: "Customer", score: 85, weight: 20, trend: "up" },
  { category: "Operations", score: 88, weight: 20, trend: "stable" },
  { category: "Infrastructure", score: 95, weight: 10, trend: "stable" },
  { category: "Product", score: 82, weight: 10, trend: "up" },
  { category: "Brand", score: 90, weight: 10, trend: "stable" },
]

// Infrastructure Status
export const infrastructureStatus = {
  cctv: { online: 985, total: 1032 },
  internet: { online: 112, total: 115 },
  vehicle: { online: 102, total: 105 },
  openComplaint: 12,
  socialSentiment: 78,
}

// AI Recommendations
export const aiRecommendations = [
  {
    id: "1",
    title: "Increase staffing at Dago outlet",
    description: "Recommended during 17:00-20:00 peak hours",
    impact: "+8.2%",
    confidence: 92,
  },
  {
    id: "2",
    title: "Launch weekend promo at Asia Afrika",
    description: "Current weekend performance 15% below average",
    impact: "+12.5%",
    confidence: 87,
  },
  {
    id: "3",
    title: "Send retention offers to 14,821 at-risk customers",
    description: "Predicted churn within next 30 days",
    impact: "+5.3%",
    confidence: 89,
  },
]

// Social Intelligence
export const socialMentions = [
  { platform: "instagram" as const, content: "Cappuccino nya enak banget! ☕", sentiment: "positive" as const, date: "2 hours ago", engagement: 1245 },
  { platform: "twitter" as const, content: "Tempat cozy buat kerja remote", sentiment: "positive" as const, date: "5 hours ago", engagement: 892 },
  { platform: "tiktok" as const, content: "Review Calf Dago - matcha latte recomended!", sentiment: "positive" as const, date: "1 day ago", engagement: 15420 },
  { platform: "instagram" as const, content: "Pelayanan agak lama nih terakhir", sentiment: "negative" as const, date: "1 day ago", engagement: 234 },
  { platform: "facebook" as const, content: "Sering beli di sini, harga terjangkau", sentiment: "positive" as const, date: "2 days ago", engagement: 456 },
]
