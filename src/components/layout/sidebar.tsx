"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  TrendingUp,
  Building2,
  Users,
  Package,
  AlertTriangle,
  Settings,
  BarChart3,
  Zap,
  Brain,
  FileText,
  ChevronRight,
  X,
  Menu,
  LogOut,
  User,
  ActivitySquare,
  MessageSquare,
  HeadphonesIcon,
} from "lucide-react"
import { useState, useEffect } from "react"

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Revenue Intelligence", href: "/revenue", icon: TrendingUp },
  { name: "Outlet Intelligence", href: "/outlets", icon: Building2 },
  { name: "Customer Intelligence", href: "/customers", icon: Users },
  { name: "Product Intelligence", href: "/products", icon: Package },
  { name: "Risk Center", href: "/risk", icon: AlertTriangle },
  { name: "Operations Center", href: "/operations", icon: ActivitySquare },
  { name: "Social Intelligence", href: "/social", icon: MessageSquare },
  { name: "Customer Care", href: "/care", icon: HeadphonesIcon },
  { name: "AI Insights", href: "/insights", icon: Brain },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
]

const secondaryNav = [
  { name: "Expansions", href: "/expansion", icon: Zap },
  { name: "Why CALF ONE", href: "/why-calf-one", icon: BarChart3 },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileOpen])

  const NavItems = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <>
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onLinkClick}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-white/10 text-white border-l-2 border-white/30"
                : "text-white/70 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className={cn("h-5 w-5 shrink-0", collapsed && "mx-auto")} />
            <span className={cn("transition-opacity duration-200", collapsed && "lg:hidden")}>
              {item.name}
            </span>
          </Link>
        )
      })}

      <div className={cn("mt-6 pt-4", collapsed ? "px-0" : "px-3")}>
        <div className={cn("h-px bg-white/10 mb-4", collapsed ? "mx-3" : "")} />
        <p className={cn(
          "px-3 mb-2 text-[10px] font-semibold text-white/40 uppercase tracking-wider",
          collapsed && "lg:hidden"
        )}>
          More
        </p>
        {secondaryNav.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onLinkClick}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-white/10 text-white border-l-2 border-white/30"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", collapsed && "mx-auto")} />
              <span className={cn("transition-opacity duration-200", collapsed && "lg:hidden")}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:flex fixed left-0 top-0 z-40 h-screen flex-col bg-[#0F2D6B]"
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-white/10 shrink-0">
          <Link href="/" className="flex items-center gap-3 px-4 w-full">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <span className="text-sm font-bold text-white">C1</span>
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: collapsed ? 0 : 1 }}
              className="text-sm font-bold text-white whitespace-nowrap"
            >
              CALF ONE
            </motion.span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <NavItems />
        </nav>

        {/* Collapse Button */}
        <div className="border-t border-white/10 p-3 shrink-0">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center justify-center rounded-lg p-2 text-white/50 hover:bg-white/5 hover:text-white transition-colors"
          >
            <motion.div
              animate={{ rotate: collapsed ? 0 : 180 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="h-4 w-4" />
            </motion.div>
          </button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed left-0 top-0 z-50 h-screen w-[280px] flex flex-col bg-[#0F2D6B] lg:hidden"
            >
              {/* Logo */}
              <div className="flex h-16 items-center justify-between border-b border-white/10 px-4 shrink-0">
                <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                    <span className="text-sm font-bold text-white">C1</span>
                  </div>
                  <span className="text-sm font-bold text-white">CALF ONE</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10"
                >
                  <X className="h-5 w-5 text-white/70" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                <NavItems onLinkClick={() => setMobileOpen(false)} />
              </nav>

              {/* User */}
              <div className="border-t border-white/10 p-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">Admin</p>
                    <p className="text-xs text-white/50 truncate">Manager</p>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-white/10">
                    <LogOut className="h-4 w-4 text-white/50" />
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-30 p-2.5 rounded-xl bg-[#0F2D6B] shadow-lg"
      >
        <Menu className="h-5 w-5 text-white" />
      </button>
    </>
  )
}
