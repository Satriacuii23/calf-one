import {
  OutletData,
  AreaRevenue,
  HealthScore,
} from "@/types"

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
  { id: "1", name: "Calf Dago", area: "Bandung", revenue: 45000000, growth: 18.5, healthScore: 95, status: "online", cctvOnline: 8, cctvTotal: 8, lat: -6.8906, lng: 107.6119 },
  { id: "2", name: "Calf Plaza Indonesia", area: "Jakarta", revenue: 42000000, growth: 15.2, healthScore: 92, status: "online", cctvOnline: 12, cctvTotal: 12, lat: -6.1936, lng: 106.8225 },
  { id: "3", name: "Calf BEC", area: "Bandung", revenue: 38500000, growth: 12.8, healthScore: 89, status: "online", cctvOnline: 6, cctvTotal: 8, lat: -6.9056, lng: 107.6105 },
  { id: "4", name: "Calf Grand Metropolitan", area: "Bekasi", revenue: 35200000, growth: 22.1, healthScore: 94, status: "online", cctvOnline: 10, cctvTotal: 10, lat: -6.2519, lng: 106.9839 },
  { id: "5", name: "Calf Cihampelas", area: "Bandung", revenue: 32800000, growth: 8.3, healthScore: 87, status: "online", cctvOnline: 8, cctvTotal: 8, lat: -6.8927, lng: 107.6041 },
  { id: "6", name: "Calf Sudirman", area: "Jakarta", revenue: 31500000, growth: 11.5, healthScore: 91, status: "online", cctvOnline: 8, cctvTotal: 8, lat: -6.2238, lng: 106.8055 },
  { id: "7", name: "Calf Asia Afrika", area: "Bandung", revenue: 29200000, growth: -2.1, healthScore: 78, status: "warning", cctvOnline: 6, cctvTotal: 8, lat: -6.9213, lng: 107.6074 },
  { id: "8", name: "Calf Transmart", area: "Tasikmalaya", revenue: 27500000, growth: 25.3, healthScore: 96, status: "online", cctvOnline: 6, cctvTotal: 6, lat: -7.3274, lng: 108.2201 },
  { id: "9", name: "Calf Lippo", area: "Karawang", revenue: 25800000, growth: 5.7, healthScore: 85, status: "online", cctvOnline: 6, cctvTotal: 6, lat: -6.3262, lng: 107.2917 },
  { id: "10", name: "Calf Grage", area: "Cirebon", revenue: 23500000, growth: -8.4, healthScore: 62, status: "warning", cctvOnline: 4, cctvTotal: 8, lat: -6.7155, lng: 108.5522 },
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
