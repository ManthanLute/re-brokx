"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Filter, Search, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyCard } from "@/components/property-card"
import { LocationSelector } from "@/components/location-selector"
import { PriceRangeSlider } from "@/components/price-range-slider"
import { SiteHeader } from "@/components/site-header"

// Sample property data
const allProperties = [
  {
    id: 1,
    title: "Luxury Apartment in Mumbai",
    location: "Thane, Mumbai",
    price: "₹1.2 Cr",
    cashback: "₹2.5 Lakhs",
    country: "india",
    propertyType: "apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: "1200 sq.ft",
    amenities: ["gym", "pool", "clubhouse"],
    parking: "standalone",
    paymentPlan: "20-80",
    priceValue: 12000000,
    image: "/images/property-placeholder.png",
    tags: ["New Launch"],
  },
  {
    id: 2,
    title: "Premium Villa",
    location: "Pune, Maharashtra",
    price: "₹2.8 Cr",
    cashback: "₹5 Lakhs",
    country: "india",
    propertyType: "villa",
    bedrooms: 4,
    bathrooms: 4,
    area: "2500 sq.ft",
    amenities: ["gym", "pool", "clubhouse", "concierge"],
    parking: "standalone",
    paymentPlan: "10-90",
    priceValue: 28000000,
    image: "/images/property-placeholder.png",
    tags: ["Premium"],
  },
  {
    id: 3,
    title: "Downtown Dubai Apartment",
    location: "Downtown, Dubai",
    price: "AED 1.5M",
    roi: "8.5% Rental Yield",
    country: "dubai",
    propertyType: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: "750 sq.ft",
    amenities: ["gym", "pool", "concierge"],
    parking: "mechanical",
    paymentPlan: "post-handover",
    priceValue: 1500000,
    image: "/images/property-placeholder.png",
    tags: ["Capital Appreciation: 12%"],
  },
  {
    id: 4,
    title: "Modern Apartment",
    location: "Nashik, Maharashtra",
    price: "₹85 Lakhs",
    cashback: "₹1.8 Lakhs",
    country: "india",
    propertyType: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: "950 sq.ft",
    amenities: ["gym", "clubhouse"],
    parking: "stack",
    paymentPlan: "20-80",
    priceValue: 8500000,
    image: "/images/property-placeholder.png",
    tags: ["New Launch"],
  },
  {
    id: 5,
    title: "Palm Jumeirah Villa",
    location: "Palm Jumeirah, Dubai",
    price: "AED 12M",
    roi: "6.2% Rental Yield",
    country: "dubai",
    propertyType: "villa",
    bedrooms: 4,
    bathrooms: 5,
    area: "4500 sq.ft",
    amenities: ["gym", "pool", "clubhouse", "concierge", "business-lounge"],
    parking: "standalone",
    paymentPlan: "crypto",
    priceValue: 12000000,
    image: "/images/property-placeholder.png",
    tags: ["Capital Appreciation: 15%", "Premium"],
  },
  {
    id: 6,
    title: "Spacious Flat",
    location: "Nagpur, Maharashtra",
    price: "₹65 Lakhs",
    cashback: "₹1.2 Lakhs",
    country: "india",
    propertyType: "apartment",
    bedrooms: 2,
    bathrooms: 1,
    area: "850 sq.ft",
    amenities: ["gym"],
    parking: "stack",
    paymentPlan: "20-80",
    priceValue: 6500000,
    image: "/images/property-placeholder.png",
    tags: ["Affordable"],
  },
]

export default function PropertiesPage() {
  const [priceRange, setPriceRange] = useState<[number, number]>([500000, 20000000])
  const [activeFilters, setActiveFilters] = useState({
    propertyType: [] as string[],
    bedrooms: [] as string[],
    bathrooms: [] as string[],
    amenities: [] as string[],
    parking: [] as string[],
    paymentPlan: [] as string[],
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const [properties, setProperties] = useState(allProperties)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)
  const [sortOption, setSortOption] = useState("relevance")

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`
    } else {
      return `₹${price.toLocaleString()}`
    }
  }

  const handlePriceRangeChange = (values: [number, number]) => {
    setPriceRange(values)
  }

  const toggleFilter = (category: keyof typeof activeFilters, value: string) => {
    setActiveFilters((prev) => {
      const current = [...prev[category]]
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter((v) => v !== value) }
      } else {
        return { ...prev, [category]: [...current, value] }
      }
    })
  }

  const isFilterActive = (category: keyof typeof activeFilters, value: string) => {
    return activeFilters[category].includes(value)
  }

  const clearAllFilters = () => {
    setActiveFilters({
      propertyType: [],
      bedrooms: [],
      bathrooms: [],
      amenities: [],
      parking: [],
      paymentPlan: [],
    })
    setPriceRange([500000, 20000000])
    setSearchQuery("")
    setSelectedTab("all")
    setSortOption("relevance")
  }

  // Apply filters
  useEffect(() => {
    let filteredProperties = [...allProperties]

    // Filter by tab (country)
    if (selectedTab !== "all") {
      if (selectedTab === "cashback") {
        filteredProperties = filteredProperties.filter((property) => property.cashback)
      } else if (selectedTab === "new-launch") {
        filteredProperties = filteredProperties.filter(
          (property) => property.tags && property.tags.some((tag) => tag.toLowerCase().includes("new")),
        )
      } else {
        filteredProperties = filteredProperties.filter((property) => property.country === selectedTab)
      }
    }

    // Filter by price range
    filteredProperties = filteredProperties.filter(
      (property) => property.priceValue >= priceRange[0] && property.priceValue <= priceRange[1],
    )

    // Filter by property type
    if (activeFilters.propertyType.length > 0) {
      filteredProperties = filteredProperties.filter((property) =>
        activeFilters.propertyType.includes(property.propertyType),
      )
    }

    // Filter by bedrooms
    if (activeFilters.bedrooms.length > 0) {
      filteredProperties = filteredProperties.filter((property) => {
        // Handle "4+" case
        if (activeFilters.bedrooms.includes("4+") && property.bedrooms >= 4) {
          return true
        }
        return activeFilters.bedrooms.includes(property.bedrooms.toString())
      })
    }

    // Filter by bathrooms
    if (activeFilters.bathrooms.length > 0) {
      filteredProperties = filteredProperties.filter((property) => {
        // Handle "3+" case
        if (activeFilters.bathrooms.includes("3+") && property.bathrooms >= 3) {
          return true
        }
        return activeFilters.bathrooms.includes(property.bathrooms.toString())
      })
    }

    // Filter by amenities
    if (activeFilters.amenities.length > 0) {
      filteredProperties = filteredProperties.filter((property) =>
        activeFilters.amenities.every((amenity) => property.amenities.includes(amenity)),
      )
    }

    // Filter by parking
    if (activeFilters.parking.length > 0) {
      filteredProperties = filteredProperties.filter((property) => activeFilters.parking.includes(property.parking))
    }

    // Filter by payment plan
    if (activeFilters.paymentPlan.length > 0) {
      filteredProperties = filteredProperties.filter((property) =>
        activeFilters.paymentPlan.includes(property.paymentPlan),
      )
    }

    // Filter by search query
    if (searchQuery) {
      filteredProperties = filteredProperties.filter(
        (property) =>
          property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Sort properties
    switch (sortOption) {
      case "price-low-high":
        filteredProperties.sort((a, b) => a.priceValue - b.priceValue)
        break
      case "price-high-low":
        filteredProperties.sort((a, b) => b.priceValue - a.priceValue)
        break
      case "newest":
        // In a real app, you'd sort by date
        // Here we'll just use the ID as a proxy for "newest"
        filteredProperties.sort((a, b) => b.id - a.id)
        break
      case "cashback":
        // Sort properties with cashback first
        filteredProperties.sort((a, b) => (b.cashback ? 1 : 0) - (a.cashback ? 1 : 0))
        break
      case "roi":
        // Sort properties with ROI first
        filteredProperties.sort((a, b) => (b.roi ? 1 : 0) - (a.roi ? 1 : 0))
        break
      default:
        // Default sorting (relevance) - no change
        break
    }

    setProperties(filteredProperties)
    setCurrentPage(1) // Reset to first page when filters change
  }, [selectedTab, priceRange, activeFilters, searchQuery, sortOption])

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = properties.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(properties.length / itemsPerPage)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already applied via the useEffect
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4 space-y-6">
              <Card className="shadow-card border-0 transition-all duration-300 hover:shadow-md">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-lg flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        Filters
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-sm text-brokx-blue hover:text-brokx-blue-dark hover:bg-brokx-blue/5 transition-colors"
                      >
                        Clear All
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Location</h4>
                      <LocationSelector />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Price Range</h4>
                      <PriceRangeSlider
                        min={500000}
                        max={20000000}
                        step={100000}
                        defaultValue={priceRange}
                        onChange={handlePriceRangeChange}
                        formatValue={formatPrice}
                      />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Property Type</h4>
                      <div className="space-y-2">
                        {[
                          { id: "apartment", label: "Apartment" },
                          { id: "villa", label: "Villa" },
                          { id: "penthouse", label: "Penthouse" },
                          { id: "townhouse", label: "Townhouse" },
                        ].map((type) => (
                          <div key={type.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={type.id}
                              checked={isFilterActive("propertyType", type.id)}
                              onCheckedChange={() => toggleFilter("propertyType", type.id)}
                              className="data-[state=checked]:bg-brokx-blue data-[state=checked]:border-brokx-blue"
                            />
                            <label htmlFor={type.id} className="text-sm cursor-pointer">
                              {type.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Bedrooms</h4>
                      <div className="flex flex-wrap gap-2">
                        {["1", "2", "3", "4", "4+"].map((num) => (
                          <Button
                            key={num}
                            variant={isFilterActive("bedrooms", num) ? "default" : "outline"}
                            size="sm"
                            className={`rounded-full transition-all duration-300 ${
                              isFilterActive("bedrooms", num)
                                ? "bg-brokx-blue hover:bg-brokx-blue-dark"
                                : "hover:bg-brokx-blue/10 hover:text-brokx-blue"
                            }`}
                            onClick={() => toggleFilter("bedrooms", num)}
                          >
                            {num} {typeof num === "string" && num !== "4+" ? "BHK" : "BHK"}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Bathrooms</h4>
                      <div className="flex flex-wrap gap-2">
                        {["1", "2", "3", "3+"].map((num) => (
                          <Button
                            key={num}
                            variant={isFilterActive("bathrooms", num) ? "default" : "outline"}
                            size="sm"
                            className={`rounded-full transition-all duration-300 ${
                              isFilterActive("bathrooms", num)
                                ? "bg-brokx-blue hover:bg-brokx-blue-dark"
                                : "hover:bg-brokx-blue/10 hover:text-brokx-blue"
                            }`}
                            onClick={() => toggleFilter("bathrooms", num)}
                          >
                            {num}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Amenities</h4>
                      <div className="space-y-2">
                        {[
                          { id: "gym", label: "Gym" },
                          { id: "pool", label: "Swimming Pool" },
                          { id: "clubhouse", label: "Clubhouse" },
                          { id: "concierge", label: "Concierge" },
                          { id: "business-lounge", label: "Business Lounge" },
                        ].map((amenity) => (
                          <div key={amenity.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={amenity.id}
                              checked={isFilterActive("amenities", amenity.id)}
                              onCheckedChange={() => toggleFilter("amenities", amenity.id)}
                              className="data-[state=checked]:bg-brokx-blue data-[state=checked]:border-brokx-blue"
                            />
                            <label htmlFor={amenity.id} className="text-sm cursor-pointer">
                              {amenity.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Parking</h4>
                      <div className="space-y-2">
                        {[
                          { id: "standalone", label: "Standalone" },
                          { id: "mechanical", label: "Mechanical" },
                          { id: "stack", label: "Stack" },
                        ].map((parking) => (
                          <div key={parking.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={parking.id}
                              checked={isFilterActive("parking", parking.id)}
                              onCheckedChange={() => toggleFilter("parking", parking.id)}
                              className="data-[state=checked]:bg-brokx-blue data-[state=checked]:border-brokx-blue"
                            />
                            <label htmlFor={parking.id} className="text-sm cursor-pointer">
                              {parking.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Payment Plan</h4>
                      <div className="space-y-2">
                        {[
                          { id: "20-80", label: "20:80" },
                          { id: "10-90", label: "10:90" },
                          { id: "post-handover", label: "Post-Handover EMI" },
                          { id: "crypto", label: "Crypto (Dubai)" },
                        ].map((plan) => (
                          <div key={plan.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={plan.id}
                              checked={isFilterActive("paymentPlan", plan.id)}
                              onCheckedChange={() => toggleFilter("paymentPlan", plan.id)}
                              className="data-[state=checked]:bg-brokx-blue data-[state=checked]:border-brokx-blue"
                            />
                            <label htmlFor={plan.id} className="text-sm cursor-pointer">
                              {plan.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-brokx-blue to-brokx-blue-light hover:from-brokx-blue-dark hover:to-brokx-blue transition-all duration-300 shadow-md">
                        Apply Filters
                      </Button>
                      <Button
                        variant="outline"
                        onClick={clearAllFilters}
                        className="transition-all duration-300 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="md:w-3/4 space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Properties</h1>
                  <p className="text-muted-foreground">
                    Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, properties.length)} of {properties.length}{" "}
                    properties
                  </p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <form onSubmit={handleSearch} className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search properties"
                      className="pl-9 focus:ring-2 focus:ring-brokx-blue/20 focus:border-brokx-blue transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                  <select
                    className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brokx-blue/20 focus:border-brokx-blue transition-all"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="relevance">Sort by: Relevance</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                    <option value="cashback">Highest Cashback</option>
                    <option value="roi">Best ROI</option>
                  </select>
                </div>
              </div>

              <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="w-full justify-start bg-muted/50">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-white data-[state=active]:text-brokx-blue transition-all duration-300"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="india"
                    className="data-[state=active]:bg-white data-[state=active]:text-brokx-blue transition-all duration-300"
                  >
                    India
                  </TabsTrigger>
                  <TabsTrigger
                    value="dubai"
                    className="data-[state=active]:bg-white data-[state=active]:text-brokx-blue transition-all duration-300"
                  >
                    Dubai
                  </TabsTrigger>
                  <TabsTrigger
                    value="cashback"
                    className="data-[state=active]:bg-white data-[state=active]:text-brokx-blue transition-all duration-300"
                  >
                    Cashback
                  </TabsTrigger>
                  <TabsTrigger
                    value="new-launch"
                    className="data-[state=active]:bg-white data-[state=active]:text-brokx-blue transition-all duration-300"
                  >
                    New Launch
                  </TabsTrigger>
                </TabsList>
                <TabsContent value={selectedTab} className="mt-6">
                  {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Array(6)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                            <div className="p-4 border border-t-0 rounded-b-lg space-y-3">
                              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                              <div className="flex justify-between">
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                              </div>
                              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                              <div className="h-10 bg-gray-200 rounded"></div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : currentItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentItems.map((property) => (
                        <PropertyCard
                          key={property.id}
                          image={property.image}
                          title={property.title}
                          location={property.location}
                          price={property.price}
                          cashback={property.cashback}
                          roi={property.roi}
                          specs={{
                            bedrooms: property.bedrooms,
                            bathrooms: property.bathrooms,
                            area: property.area,
                          }}
                          tags={property.tags}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="rounded-full bg-gray-100 p-3 mb-4">
                        <Search className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium">No properties found</h3>
                      <p className="text-muted-foreground mt-1 mb-4">
                        {searchQuery ? `No results for "${searchQuery}"` : "Try adjusting your filters"}
                      </p>
                      <Button
                        variant="outline"
                        onClick={clearAllFilters}
                        className="transition-all duration-300 hover:bg-brokx-blue/10 hover:text-brokx-blue hover:border-brokx-blue/30"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}

                  {!isLoading && totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="transition-all duration-300 hover:bg-brokx-blue/10 hover:text-brokx-blue hover:border-brokx-blue/30"
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Previous
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => (
                          <Button
                            key={i + 1}
                            variant={currentPage === i + 1 ? "default" : "outline"}
                            size="sm"
                            onClick={() => paginate(i + 1)}
                            className={`transition-all duration-300 ${
                              currentPage === i + 1
                                ? "bg-brokx-blue hover:bg-brokx-blue-dark"
                                : "hover:bg-brokx-blue/10 hover:text-brokx-blue hover:border-brokx-blue/30"
                            }`}
                          >
                            {i + 1}
                          </Button>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="transition-all duration-300 hover:bg-brokx-blue/10 hover:text-brokx-blue hover:border-brokx-blue/30"
                        >
                          Next
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 bg-gradient-to-b from-white to-brokx-blue/5">
        <div className="container flex flex-col md:flex-row justify-between gap-4">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} BrokX. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

