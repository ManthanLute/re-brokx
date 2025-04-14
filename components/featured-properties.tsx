"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredProperties = [
  {
    id: 1,
    title: "Luxury Villa in Palm Jumeirah",
    location: "Palm Jumeirah, Dubai",
    price: "AED 15M",
    image: "/images/property-placeholder.png",
    tags: ["Premium", "Beachfront", "ROI: 7.5%"],
  },
  {
    id: 2,
    title: "Penthouse in Mumbai",
    location: "Worli, Mumbai",
    price: "₹12 Cr",
    image: "/images/property-placeholder.png",
    tags: ["Sea View", "Cashback: ₹10L"],
  },
  {
    id: 3,
    title: "Apartment in Dubai Marina",
    location: "Dubai Marina, Dubai",
    price: "AED 2.5M",
    image: "/images/property-placeholder.png",
    tags: ["ROI: 8.2%", "Ready to Move"],
  },
  {
    id: 4,
    title: "Villa in Pune",
    location: "Koregaon Park, Pune",
    price: "₹4.5 Cr",
    image: "/images/property-placeholder.png",
    tags: ["Township", "Cashback: ₹5L"],
  },
  {
    id: 5,
    title: "Apartment in Business Bay",
    location: "Business Bay, Dubai",
    price: "AED 1.8M",
    image: "/images/property-placeholder.png",
    tags: ["ROI: 9%", "Payment Plan: 30/70"],
  },
]

export function FeaturedProperties() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(featuredProperties.length / itemsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= featuredProperties.length ? 0 : prevIndex + itemsPerPage,
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0 ? Math.max(0, featuredProperties.length - itemsPerPage) : prevIndex - itemsPerPage,
    )
  }

  const visibleProperties = featuredProperties.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <div className="relative animate-on-scroll">
      <div className="flex overflow-hidden">
        <div className="flex transition-transform duration-300 ease-in-out w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {visibleProperties.map((property) => (
              <Card
                key={property.id}
                className="property-card overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 border-0"
              >
                <div className="relative h-48">
                  <Image
                    src={property.image || "/images/property-placeholder.png"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{property.title}</h3>
                  <p className="text-sm text-muted-foreground">{property.location}</p>
                  <p className="font-bold text-lg mt-2 gradient-text">{property.price}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {property.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-brokx-blue/5 text-brokx-blue-dark border-brokx-blue/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-brokx-blue to-brokx-blue-light hover:from-brokx-blue-dark hover:to-brokx-blue transition-all duration-300 shadow-soft"
                  >
                    <Link href={`/properties/${property.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full hover:bg-brokx-blue/10 hover:text-brokx-blue transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full hover:bg-brokx-blue/10 hover:text-brokx-blue transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      )}
    </div>
  )
}

