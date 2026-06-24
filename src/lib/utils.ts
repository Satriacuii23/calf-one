import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  if (amount >= 1e9) {
    return `Rp ${(amount / 1e9).toFixed(1)} Billion`
  }
  if (amount >= 1e6) {
    return `Rp ${(amount / 1e6).toFixed(1)} Million`
  }
  if (amount >= 1e3) {
    return `Rp ${(amount / 1e3).toFixed(1)}K`
  }
  return `Rp ${amount.toLocaleString("id-ID")}`
}

export function formatNumber(num: number): string {
  if (num >= 1e6) {
    return `${(num / 1e6).toFixed(1)}M`
  }
  if (num >= 1e3) {
    return `${(num / 1e3).toFixed(1)}K`
  }
  return num.toLocaleString("id-ID")
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`
}

export function getHealthStatus(score: number): {
  label: string
  color: string
  bgColor: string
} {
  if (score >= 80) {
    return { label: "Healthy", color: "text-emerald-600", bgColor: "bg-emerald-50" }
  }
  if (score >= 60) {
    return { label: "Moderate", color: "text-amber-600", bgColor: "bg-amber-50" }
  }
  return { label: "Critical", color: "text-red-600", bgColor: "bg-red-50" }
}

export function getStatusColor(status: string): {
  dot: string
  text: string
  bg: string
} {
  switch (status.toLowerCase()) {
    case "online":
    case "active":
    case "healthy":
      return { dot: "bg-emerald-500", text: "text-emerald-600", bg: "bg-emerald-50" }
    case "warning":
    case "moderate":
      return { dot: "bg-amber-500", text: "text-amber-600", bg: "bg-amber-50" }
    case "offline":
    case "critical":
    case "inactive":
      return { dot: "bg-red-500", text: "text-red-600", bg: "bg-red-50" }
    default:
      return { dot: "bg-slate-400", text: "text-slate-600", bg: "bg-slate-50" }
  }
}
