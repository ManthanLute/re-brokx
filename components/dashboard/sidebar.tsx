"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Users,
  Home,
  FileText,
  CreditCard,
  UserCog,
  Building2,
  Zap,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { logout } from "@/app/actions/auth-actions"

interface SidebarItem {
  title: string
  href: string
  icon: React.ReactNode
  submenu?: { title: string; href: string }[]
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Set mounted state to true after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-open submenu based on current path
  useEffect(() => {
    if (mounted && pathname) {
      const activeItem = sidebarItems.find(
        (item) => item.submenu && item.submenu.some((subitem) => pathname.startsWith(subitem.href)),
      )
      if (activeItem) {
        setOpenSubmenu(activeItem.title)
      }
    }
  }, [pathname, mounted])

  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Lead Management",
      href: "/dashboard/leads",
      icon: <Users className="h-5 w-5" />,
      submenu: [
        { title: "All Leads", href: "/dashboard/leads" },
        { title: "New Leads", href: "/dashboard/leads/new" },
        { title: "Follow-ups", href: "/dashboard/leads/followup" },
        { title: "Closed Leads", href: "/dashboard/leads/closed" },
      ],
    },
    {
      title: "Properties",
      href: "/dashboard/properties",
      icon: <Home className="h-5 w-5" />,
      submenu: [
        { title: "All Properties", href: "/dashboard/properties" },
        { title: "Add Property", href: "/dashboard/properties/add" },
        { title: "Categories", href: "/dashboard/properties/categories" },
      ],
    },
    {
      title: "Deals",
      href: "/dashboard/deals",
      icon: <FileText className="h-5 w-5" />,
      submenu: [
        { title: "Active Deals", href: "/dashboard/deals/active" },
        { title: "Completed", href: "/dashboard/deals/completed" },
        { title: "Cancelled", href: "/dashboard/deals/cancelled" },
      ],
    },
    {
      title: "Payments",
      href: "/dashboard/payments",
      icon: <CreditCard className="h-5 w-5" />,
      submenu: [
        { title: "Invoices", href: "/dashboard/payments/invoices" },
        { title: "Commissions", href: "/dashboard/payments/commissions" },
        { title: "Reports", href: "/dashboard/payments/reports" },
      ],
    },
    {
      title: "Team",
      href: "/dashboard/team",
      icon: <UserCog className="h-5 w-5" />,
    },
    {
      title: "Builders",
      href: "/dashboard/builders",
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      title: "Integrations",
      href: "/dashboard/integrations",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const toggleSubmenu = (title: string) => {
    if (openSubmenu === title) {
      setOpenSubmenu(null)
    } else {
      setOpenSubmenu(title)
    }
  }

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-white transition-all duration-300",
        collapsed ? "w-20" : "w-64",
        mounted ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <Link href="/dashboard" className="flex items-center">
          {collapsed ? (
            <div className="relative h-8 w-8 transition-all duration-300">
              <Image src="/images/brokx-logo.png" alt="BrokX Logo" fill style={{ objectFit: "contain" }} />
            </div>
          ) : (
            <div className="relative h-8 w-24 transition-all duration-300">
              <Image src="/images/brokx-logo.png" alt="BrokX Logo" fill style={{ objectFit: "contain" }} />
            </div>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 transition-all duration-300 hover:bg-brokx-blue/10 hover:text-brokx-blue"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
        <nav className="space-y-1 px-2">
          {sidebarItems.map((item) => (
            <div key={item.title}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={cn(
                      "flex items-center w-full rounded-md px-3 py-2 text-sm font-medium transition-all duration-300",
                      isActive(item.href) ? "bg-brokx-blue/10 text-brokx-blue" : "text-gray-700 hover:bg-gray-100",
                      collapsed && "justify-center",
                    )}
                  >
                    <span
                      className={cn(
                        "transition-all duration-300",
                        isActive(item.href) ? "text-brokx-blue" : "",
                        "mr-3",
                      )}
                    >
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.title}</span>
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 transition-transform duration-300",
                            openSubmenu === item.title && "rotate-90",
                          )}
                        />
                      </>
                    )}
                  </button>
                  {!collapsed && openSubmenu === item.title && (
                    <div className="mt-1 space-y-1 pl-10 overflow-hidden animate-accordion-down">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.title}
                          href={subitem.href}
                          className={cn(
                            "block rounded-md px-3 py-2 text-sm font-medium transition-all duration-300",
                            isActive(subitem.href)
                              ? "bg-brokx-blue/10 text-brokx-blue"
                              : "text-gray-700 hover:bg-gray-100",
                          )}
                        >
                          {subitem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-300",
                    isActive(item.href) ? "bg-brokx-blue/10 text-brokx-blue" : "text-gray-700 hover:bg-gray-100",
                    collapsed && "justify-center",
                  )}
                >
                  <span
                    className={cn(
                      "transition-all duration-300",
                      isActive(item.href) ? "text-brokx-blue" : "",
                      collapsed ? "mr-0" : "mr-3",
                    )}
                  >
                    {item.icon}
                  </span>
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t p-4">
        <form action={logout}>
          <Button
            type="submit"
            variant="ghost"
            className={cn(
              "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-300",
              collapsed && "justify-center",
            )}
          >
            <LogOut className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")} />
            {!collapsed && <span>Logout</span>}
          </Button>
        </form>
      </div>
    </div>
  )
}

