"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bell, Search, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

export function DashboardHeader() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setShowSearchResults(true)
    }
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery("")
    setShowSearchResults(false)
  }

  return (
    <header
      className={`sticky top-0 z-30 flex h-16 items-center gap-4 border-b px-4 md:px-6 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <DashboardSidebar />
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex items-center gap-4 md:ml-auto md:gap-6 lg:gap-10">
        <form onSubmit={handleSearch} className="hidden md:flex-1 md:flex max-w-md relative">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8 bg-gray-50 focus:bg-white transition-colors pr-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {showSearchResults && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg p-2 z-50">
              <div className="p-2 text-sm">
                <p className="font-medium">Search results for "{searchQuery}"</p>
                <div className="mt-2 space-y-1">
                  <p className="text-muted-foreground">No results found</p>
                </div>
              </div>
            </div>
          )}
        </form>
        <nav className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative transition-all duration-300 hover:bg-brokx-blue/10 hover:text-brokx-blue"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-auto">
                {[1, 2, 3].map((i) => (
                  <DropdownMenuItem key={i} className="cursor-pointer p-4 transition-colors hover:bg-brokx-blue/5">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-9 w-9 border-2 border-brokx-blue/20">
                        <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt="Avatar" />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium">New lead assigned to you</p>
                        <p className="text-xs text-muted-foreground">
                          John Doe is interested in a 3BHK apartment in Mumbai
                        </p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer justify-center">
                <Link
                  href="/dashboard/notifications"
                  className="w-full text-center text-brokx-blue hover:text-brokx-blue-dark transition-colors"
                >
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full transition-all duration-300 hover:bg-brokx-blue/10"
              >
                <Avatar className="h-8 w-8 border-2 border-brokx-blue/20">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/profile"
                  className="cursor-pointer transition-colors hover:bg-brokx-blue/10 hover:text-brokx-blue focus:bg-brokx-blue/10 focus:text-brokx-blue"
                >
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/settings"
                  className="cursor-pointer transition-colors hover:bg-brokx-blue/10 hover:text-brokx-blue focus:bg-brokx-blue/10 focus:text-brokx-blue"
                >
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/" className="w-full cursor-pointer text-red-600 hover:bg-red-50 focus:bg-red-50">
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  )
}

