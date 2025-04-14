"use client"

import Link from "next/link"
import Image from "next/image"
import { Bed, Bath, SquareCode, Heart } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface PropertyCardProps {
  image: string
  title: string
  location: string
  price: string
  cashback?: string
  roi?: string
  specs: {
    bedrooms: string | number
    bathrooms: string | number
    area: string
  }
  tags?: string[]
}

export function PropertyCard({ image, title, location, price, cashback, roi, specs, tags }: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <Card
      className={cn(
        "property-card overflow-hidden border-0 transition-all duration-300",
        isHovered ? "shadow-lg transform -translate-y-1" : "shadow-card",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Image
          src={image || "/images/property-placeholder.png"}
          alt={title}
          width={300}
          height={200}
          className="w-full h-48 object-cover transition-transform duration-500 ease-in-out"
          style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
        />
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-2 right-2 bg-white/80 rounded-full h-8 w-8 transition-all duration-300",
            isFavorite ? "text-red-500 hover:text-red-600 hover:bg-white" : "hover:bg-white hover:text-brokx-blue",
          )}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsFavorite(!isFavorite)
          }}
        >
          <Heart className={cn("h-4 w-4", isFavorite ? "fill-current" : "")} />
          <span className="sr-only">Add to favorites</span>
        </Button>
        {cashback && (
          <Badge className="absolute bottom-2 left-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-0 shadow-sm">
            Cashback: {cashback}
          </Badge>
        )}
        {roi && (
          <Badge className="absolute bottom-2 left-2 bg-gradient-to-r from-brokx-blue to-brokx-blue-light hover:from-brokx-blue-dark hover:to-brokx-blue border-0 shadow-sm">
            {roi}
          </Badge>
        )}
      </div>
      <CardHeader className="p-4">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg leading-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 transition-all duration-300 hover:text-brokx-blue">
            <Bed className="h-4 w-4 text-brokx-blue" />
            <span>{specs.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1 transition-all duration-300 hover:text-brokx-blue">
            <Bath className="h-4 w-4 text-brokx-blue" />
            <span>{specs.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1 transition-all duration-300 hover:text-brokx-blue">
            <SquareCode className="h-4 w-4 text-brokx-blue" />
            <span>{specs.area}</span>
          </div>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-brokx-blue/5 text-brokx-blue-dark border-brokx-blue/20 transition-all duration-300 hover:bg-brokx-blue/10"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <div className="mt-4">
          <p className="font-bold text-lg gradient-text">{price}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-brokx-blue to-brokx-blue-light hover:from-brokx-blue-dark hover:to-brokx-blue transition-all duration-300 shadow-md"
        >
          <Link href={`/properties/${encodeURIComponent(title)}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

