"use client"

import { Bell, Search, ChevronDown, LogOut, Settings, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface HeaderProps {
  title?: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <header className={cn(
      "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-8"
    )}>
      <div className="flex items-center gap-4 ml-12 lg:ml-0">
        {title && (
          <div>
            <h1 className="text-lg lg:text-xl font-semibold text-slate-900">{title}</h1>
            {subtitle && <p className="text-xs lg:text-sm text-slate-500 hidden sm:block">{subtitle}</p>}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-48 lg:w-64 pl-9 h-9 bg-slate-50 border-slate-200 focus:bg-white rounded-lg"
          />
        </div>

        {/* Date */}
        <div className="hidden lg:block text-sm text-slate-500">
          {currentDate}
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-lg">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 rounded-xl border-slate-200 shadow-lg">
            <DropdownMenuLabel className="text-base font-semibold">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 rounded-lg cursor-pointer">
              <div className="flex items-center gap-2 w-full">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="font-medium text-slate-900">Outlet Cirebon offline</span>
              </div>
              <span className="text-xs text-slate-500 pl-4">5 min ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 rounded-lg cursor-pointer">
              <div className="flex items-center gap-2 w-full">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="font-medium text-slate-900">17 CCTV cameras offline</span>
              </div>
              <span className="text-xs text-slate-500 pl-4">12 min ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 rounded-lg cursor-pointer">
              <div className="flex items-center gap-2 w-full">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="font-medium text-slate-900">Internet unstable at 3 outlets</span>
              </div>
              <span className="text-xs text-slate-500 pl-4">18 min ago</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2 rounded-lg">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-[#0F2D6B] text-white text-sm">SA</AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col items-start">
                <span className="text-sm font-medium text-slate-900">Admin</span>
                <span className="text-xs text-slate-500">Manager</span>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400 hidden lg:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl border-slate-200 shadow-lg">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-lg cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 rounded-lg cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
