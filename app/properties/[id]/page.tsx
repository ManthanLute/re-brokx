import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Bed, Bath, SquareCode, MapPin, Download, Calculator, Home, Phone, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PropertyCard } from "@/components/property-card"

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  // This would normally fetch data based on the ID
  const property = {
    id: params.id,
    title: "Luxury Apartment in Mumbai",
    description:
      "This beautiful apartment is located in the heart of Thane, Mumbai. It offers stunning views of the city skyline and is equipped with modern amenities.",
    location: "Thane, Mumbai",
    price: "₹1.2 Cr",
    marketPrice: "₹1.3 Cr",
    cashback: "₹2.5 Lakhs",
    pricePerSqFt: "₹10,000",
    marketPricePerSqFt: "₹10,833",
    specs: {
      bedrooms: 3,
      bathrooms: 2,
      area: "1200 sq.ft",
      floorHeight: "10 ft",
      floor: "12th",
      township: true,
      parking: 2,
      parkingType: "Standalone",
    },
    amenities: [
      "Swimming Pool",
      "Gym",
      "Clubhouse",
      "Children's Play Area",
      "Landscaped Gardens",
      "24/7 Security",
      "Power Backup",
      "Jogging Track",
    ],
    images: [
      "/placeholder.svg?height=500&width=800",
      "/placeholder.svg?height=500&width=800",
      "/placeholder.svg?height=500&width=800",
      "/placeholder.svg?height=500&width=800",
    ],
    builder: "Prestige Group",
    projectName: "Prestige Heights",
    possessionDate: "Dec 2024",
    paymentPlan: "20:80",
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="font-bold text-xl">
            BrokX
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/properties" className="text-sm font-medium hover:text-primary">
              Properties
            </Link>
            <Link href="/dubai" className="text-sm font-medium hover:text-primary">
              Dubai
            </Link>
            <Link href="/india" className="text-sm font-medium hover:text-primary">
              India
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-6">
            <Link href="/properties" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{property.title}</h1>
                <div className="flex items-center mt-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.location}</span>
                </div>
              </div>

              <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                <Image
                  src={property.images[0] || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {property.images.slice(1).map((image, index) => (
                  <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${property.title} - Image ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <Tabs defaultValue="overview">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6 space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Description</h2>
                    <p className="text-muted-foreground">{property.description}</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2">Key Details</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Builder</span>
                        <span className="font-medium">{property.builder}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Project</span>
                        <span className="font-medium">{property.projectName}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Possession</span>
                        <span className="font-medium">{property.possessionDate}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Payment Plan</span>
                        <span className="font-medium">{property.paymentPlan}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2">Price Comparison</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">BrokX Price</CardTitle>
                          <CardDescription>Including cashback</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-green-600">{property.price}</div>
                          <div className="text-sm text-muted-foreground">{property.pricePerSqFt} per sq.ft</div>
                          <Badge className="mt-2 bg-green-600">Cashback: {property.cashback}</Badge>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Market Price</CardTitle>
                          <CardDescription>Without cashback</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{property.marketPrice}</div>
                          <div className="text-sm text-muted-foreground">{property.marketPricePerSqFt} per sq.ft</div>
                          <Badge className="mt-2" variant="outline">
                            You save: {property.cashback}
                          </Badge>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="specifications" className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                      <Bed className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{property.specs.bedrooms} Bedrooms</div>
                        <div className="text-sm text-muted-foreground">Master Bedroom: 14' x 12'</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Bath className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{property.specs.bathrooms} Bathrooms</div>
                        <div className="text-sm text-muted-foreground">Master Bath: 8' x 6'</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <SquareCode className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{property.specs.area}</div>
                        <div className="text-sm text-muted-foreground">Carpet Area</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <path d="M2 22h20" />
                        <path d="M6 18v4" />
                        <path d="M18 18v4" />
                        <path d="M12 18v4" />
                        <path d="M18 2h4v4" />
                        <path d="M18 10h4v4" />
                        <path d="M18 6h4" />
                        <path d="M6 10a4 4 0 0 0 4 4h8" />
                        <path d="M6 6a4 4 0 0 1 4-4h8" />
                      </svg>
                      <div>
                        <div className="font-medium">{property.specs.floorHeight}</div>
                        <div className="text-sm text-muted-foreground">Floor to Ceiling Height</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="M7 7h10" />
                        <path d="M7 12h10" />
                        <path d="M7 17h10" />
                      </svg>
                      <div>
                        <div className="font-medium">{property.specs.floor} Floor</div>
                        <div className="text-sm text-muted-foreground">Out of 24 Floors</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                        <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                        <path d="M9 16h6" />
                      </svg>
                      <div>
                        <div className="font-medium">{property.specs.parking} Parking</div>
                        <div className="text-sm text-muted-foreground">Type: {property.specs.parkingType}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <path d="M4 6V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" />
                        <polyline points="14 2 14 8 20 8" />
                        <path d="M10 12H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h6" />
                        <circle cx="14" cy="16" r="2" />
                      </svg>
                      <div>
                        <div className="font-medium">
                          {property.specs.township ? "Township Project" : "Standalone Building"}
                        </div>
                        <div className="text-sm text-muted-foreground">Gated Community</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="amenities" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-600"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="location" className="mt-6">
                  <div className="aspect-[16/9] bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Google Maps Integration</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <h3 className="font-medium">Nearby Places</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-muted-foreground"
                        >
                          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                          <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                          <path d="M9 16h6" />
                        </svg>
                        <span>Shopping Mall - 1.2 km</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-muted-foreground"
                        >
                          <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
                          <path d="m9 16 .348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16" />
                          <path d="M8 7h.01" />
                          <path d="M16 7h.01" />
                          <path d="M12 7h.01" />
                          <path d="M12 11h.01" />
                          <path d="M16 11h.01" />
                          <path d="M8 11h.01" />
                          <path d="M10 22v-6.5m4 0V22" />
                        </svg>
                        <span>Hospital - 2.5 km</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-muted-foreground"
                        >
                          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                          <line x1="4" x2="4" y1="22" y2="15" />
                        </svg>
                        <span>School - 0.8 km</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-muted-foreground"
                        >
                          <path d="M12 2v20" />
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        <span>Metro Station - 1.5 km</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Similar Properties</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <PropertyCard
                    image="/placeholder.svg?height=200&width=300"
                    title="Modern Apartment"
                    location="Thane, Mumbai"
                    price="₹1.1 Cr"
                    cashback="₹2.2 Lakhs"
                    specs={{
                      bedrooms: 3,
                      bathrooms: 2,
                      area: "1150 sq.ft",
                    }}
                  />
                  <PropertyCard
                    image="/placeholder.svg?height=200&width=300"
                    title="Spacious 3BHK"
                    location="Thane, Mumbai"
                    price="₹1.3 Cr"
                    cashback="₹2.8 Lakhs"
                    specs={{
                      bedrooms: 3,
                      bathrooms: 3,
                      area: "1300 sq.ft",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Interested in this property?</CardTitle>
                  <CardDescription>Fill the form below to get in touch with our sales team</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <input id="name" placeholder="Enter your full name" className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        placeholder="Enter your phone number"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message (Optional)
                      </label>
                      <textarea
                        id="message"
                        placeholder="Any specific requirements or questions"
                        className="w-full p-2 border rounded-md"
                        rows={3}
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button className="w-full">Submit Inquiry</Button>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Button variant="outline" className="flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4" />
                      Call Now
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Schedule Visit
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Additional Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Download className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Download Brochure</div>
                      <div className="text-sm text-muted-foreground">Get detailed information</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calculator className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Home Loan Assistance</div>
                      <div className="text-sm text-muted-foreground">Get the best rates</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Home className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Interior Services</div>
                      <div className="text-sm text-muted-foreground">Post-handover assistance</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
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

