export interface KPIData {
  label: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: string
}

export interface RevenueData {
  date: string
  revenue: number
  transactions: number
}

export interface OutletData {
  id: string
  name: string
  area: string
  revenue: number
  growth: number
  healthScore: number
  status: "online" | "warning" | "offline"
  cctvOnline: number
  cctvTotal: number
}

export interface CustomerData {
  id: string
  name: string
  totalSpent: number
  visitCount: number
  lastVisit: string
  segment: "VIP" | "Loyal" | "Regular" | "New"
  churnRisk: "low" | "medium" | "high"
}

export interface AlertData {
  id: string
  type: "danger" | "warning" | "info"
  message: string
  outlet?: string
  timestamp: string
  isRead: boolean
}

export interface InfrastructureStatus {
  category: string
  online: number
  total: number
  status: "healthy" | "warning" | "critical"
}

export interface CCTVData {
  id: string
  outletName: string
  cameraName: string
  status: "online" | "offline"
  lastUpdate: string
  thumbnail?: string
}

export interface InternetData {
  outlet: string
  isp: string
  status: "stable" | "unstable" | "offline"
  speed: number
  latency: number
}

export interface ProductData {
  id: string
  name: string
  category: string
  revenue: number
  units: number
  growth: number
}

export interface HealthScore {
  category: string
  score: number
  weight: number
  trend: "up" | "down" | "stable"
}

export interface ChartDataPoint {
  name: string
  value: number
  [key: string]: string | number
}

export interface AreaRevenue {
  area: string
  revenue: number
  outlets: number
  growth: number
}

export interface CustomerFunnel {
  stage: string
  count: number
  percentage: number
}

export interface SocialMention {
  platform: "instagram" | "twitter" | "facebook" | "tiktok"
  content: string
  sentiment: "positive" | "neutral" | "negative"
  date: string
  engagement: number
}
