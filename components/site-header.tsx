"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setIsScrolled(offset > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-10 w-32">
              <Image
                src="/images/brokx-logo.png"
                alt="BrokX Logo"
                fill
                style={{ objectFit: "contain" }}
                className="transition-all duration-300"
              />
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 ml-6">
            <Link href="/properties" className="text-sm font-medium hover:text-brokx-blue transition-colors">
              Properties
            </Link>
            <Link href="/dubai" className="text-sm font-medium hover:text-brokx-blue transition-colors">
              Dubai
            </Link>
            <Link href="/india" className="text-sm font-medium hover:text-brokx-blue transition-colors">
              India
            </Link>
            <Link href="/referral" className="text-sm font-medium hover:text-brokx-blue transition-colors">
              Referral Program
            </Link>
            <Link href="/partners" className="text-sm font-medium hover:text-brokx-blue transition-colors">
              Channel Partners
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {/* Dashboard link removed - only accessible after login */}
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden md:flex hover:bg-brokx-blue/10 transition-colors"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-gradient-to-r from-brokx-blue to-brokx-blue-light hover:from-brokx-blue-dark hover:to-brokx-blue transition-all duration-300 shadow-soft"
          >
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

