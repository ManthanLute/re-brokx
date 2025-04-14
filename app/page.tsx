import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyCard } from "@/components/property-card"
import { LocationSelector } from "@/components/location-selector"
import { LoanCalculator } from "@/components/loan-calculator"
import { FeaturedProperties } from "@/components/featured-properties"
import { SiteHeader } from "@/components/site-header"
import { ScrollAnimation } from "@/components/scroll-animation"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <ScrollAnimation />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-hero-pattern bg-cover bg-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2 animate-on-scroll">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-md">
                  Find Your Dream Property with BrokX
                </h1>
                <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                  Discover properties in India and Dubai with the best cashback offers and ROI.
                </p>
              </div>
              <div
                className="w-full max-w-3xl bg-white rounded-lg shadow-card p-4 animate-on-scroll"
                style={{ animationDelay: "0.2s" }}
              >
                <Tabs defaultValue="buy" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                    <TabsTrigger
                      value="buy"
                      className="data-[state=active]:bg-white data-[state=active]:text-brokx-blue"
                    >
                      Buy
                    </TabsTrigger>
                    <TabsTrigger
                      value="rent"
                      className="data-[state=active]:bg-white data-[state=active]:text-brokx-blue"
                    >
                      Rent
                    </TabsTrigger>
                    <TabsTrigger
                      value="invest"
                      className="data-[state=active]:bg-white data-[state=active]:text-brokx-blue"
                    >
                      Invest
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="buy" className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <LocationSelector />
                      <div className="flex-1 flex items-center">
                        <div className="relative w-full">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Search for locality, landmark, project or builder"
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-brokx-blue/20 focus:border-brokx-blue transition-all"
                          />
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-brokx-blue to-brokx-blue-light hover:from-brokx-blue-dark hover:to-brokx-blue transition-all duration-300 shadow-soft">
                        Search
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="rent" className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <LocationSelector />
                      <div className="flex-1 flex items-center">
                        <div className="relative w-full">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Search for locality, landmark, project or builder"
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-brokx-blue/20 focus:border-brokx-blue transition-all"
                          />
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-brokx-blue to-brokx-blue-light hover:from-brokx-blue-dark hover:to-brokx-blue transition-all duration-300 shadow-soft">
                        Search
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="invest" className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <LocationSelector />
                      <div className="flex-1 flex items-center">
                        <div className="relative w-full">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Search for locality, landmark, project or builder"
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-brokx-blue/20 focus:border-brokx-blue transition-all"
                          />
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-brokx-blue to-brokx-blue-light hover:from-brokx-blue-dark hover:to-brokx-blue transition-all duration-300 shadow-soft">
                        Search
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col gap-4 animate-on-scroll">
              <h2 className="text-2xl font-bold tracking-tight gradient-text">Top Cashback Offers</h2>
              <p className="text-muted-foreground">Best deals with highest cashback</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <PropertyCard
                  image="/images/property-placeholder.png"
                  title="Luxury Apartment in Mumbai"
                  location="Thane, Mumbai"
                  price="₹1.2 Cr"
                  cashback="₹2.5 Lakhs"
                  specs={{
                    bedrooms: 3,
                    bathrooms: 2,
                    area: "1200 sq.ft",
                  }}
                />
                <PropertyCard
                  image="/images/property-placeholder.png"
                  title="Premium Villa"
                  location="Pune, Maharashtra"
                  price="₹2.8 Cr"
                  cashback="₹5 Lakhs"
                  specs={{
                    bedrooms: 4,
                    bathrooms: 4,
                    area: "2500 sq.ft",
                  }}
                />
                <PropertyCard
                  image="/images/property-placeholder.png"
                  title="Modern Apartment"
                  location="Nashik, Maharashtra"
                  price="₹85 Lakhs"
                  cashback="₹1.8 Lakhs"
                  specs={{
                    bedrooms: 2,
                    bathrooms: 2,
                    area: "950 sq.ft",
                  }}
                />
                <PropertyCard
                  image="/images/property-placeholder.png"
                  title="Spacious Flat"
                  location="Nagpur, Maharashtra"
                  price="₹65 Lakhs"
                  cashback="₹1.2 Lakhs"
                  specs={{
                    bedrooms: 2,
                    bathrooms: 1,
                    area: "850 sq.ft",
                  }}
                />
              </div>
              <div className="flex justify-center mt-6">
                <Button
                  variant="outline"
                  asChild
                  className="hover:bg-brokx-blue/10 hover:text-brokx-blue transition-colors"
                >
                  <Link href="/properties/cashback">View All Cashback Offers</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16 bg-gradient-to-b from-brokx-navy/5 to-brokx-blue/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col gap-4 animate-on-scroll">
              <h2 className="text-2xl font-bold tracking-tight gradient-text">Best ROI Properties in Dubai</h2>
              <p className="text-muted-foreground">Capital appreciation & rental yields</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <PropertyCard
                  image="/images/property-placeholder.png"
                  title="Downtown Dubai Apartment"
                  location="Downtown, Dubai"
                  price="AED 1.5M"
                  roi="8.5% Rental Yield"
                  specs={{
                    bedrooms: 1,
                    bathrooms: 1,
                    area: "750 sq.ft",
                  }}
                  tags={["Capital Appreciation: 12%"]}
                />
                <PropertyCard
                  image="/images/property-placeholder.png"
                  title="Palm Jumeirah Villa"
                  location="Palm Jumeirah, Dubai"
                  price="AED 12M"
                  roi="6.2% Rental Yield"
                  specs={{
                    bedrooms: 4,
                    bathrooms: 5,
                    area: "4500 sq.ft",
                  }}
                  tags={["Capital Appreciation: 15%"]}
                />
                <PropertyCard
                  image="/images/property-placeholder.png"
                  title="Dubai Marina Penthouse"
                  location="Dubai Marina, Dubai"
                  price="AED 4.2M"
                  roi="7.8% Rental Yield"
                  specs={{
                    bedrooms: 3,
                    bathrooms: 3,
                    area: "2200 sq.ft",
                  }}
                  tags={["Capital Appreciation: 10%"]}
                />
                <PropertyCard
                  image="/images/property-placeholder.png"
                  title="Business Bay Apartment"
                  location="Business Bay, Dubai"
                  price="AED 2.1M"
                  roi="9.1% Rental Yield"
                  specs={{
                    bedrooms: 2,
                    bathrooms: 2,
                    area: "1100 sq.ft",
                  }}
                  tags={["Capital Appreciation: 11%"]}
                />
              </div>
              <div className="flex justify-center mt-6">
                <Button
                  variant="outline"
                  asChild
                  className="hover:bg-brokx-blue/10 hover:text-brokx-blue transition-colors"
                >
                  <Link href="/properties/dubai-roi">View All Dubai Properties</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col gap-4 animate-on-scroll">
              <h2 className="text-2xl font-bold tracking-tight gradient-text">New Launches in India</h2>
              <p className="text-muted-foreground">Upcoming projects in top Indian cities</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <PropertyCard
                  image="/images/property-placeholder.png"
                  title="Green Valley Heights"
                  location="Thane, Mumbai"
                  price="₹95 Lakhs onwards"
                  cashback="₹2 Lakhs"
                  specs={{
                    bedrooms: "1-3",
                    bathrooms: "1-3",
                    area: "650-1450 sq.ft",
                  }}
                  tags={["New Launch", "20:80 Payment Plan"]}
                />
                <PropertyCard
                  image="/images/property-placeholder.png"
                  title="Skyline Towers"
                  location="Pune, Maharashtra"
                  price="₹1.1 Cr onwards"
                  cashback="₹2.5 Lakhs"
                  specs={{
                    bedrooms: "2-4",
                    bathrooms: "2-4",
                    area: "950-2200 sq.ft",
                  }}
                  tags={["New Launch", "10:90 Payment Plan"]}
                />
                <PropertyCard
                  image="/images/property-placeholder.png"
                  title="Riverside Residences"
                  location="Nashik, Maharashtra"
                  price="₹65 Lakhs onwards"
                  cashback="₹1.5 Lakhs"
                  specs={{
                    bedrooms: "1-3",
                    bathrooms: "1-3",
                    area: "600-1350 sq.ft",
                  }}
                  tags={["New Launch", "Possession: 2025"]}
                />
                <PropertyCard
                  image="/images/property-placeholder.png"
                  title="Metro City Towers"
                  location="Nagpur, Maharashtra"
                  price="₹55 Lakhs onwards"
                  cashback="₹1.2 Lakhs"
                  specs={{
                    bedrooms: "1-3",
                    bathrooms: "1-2",
                    area: "550-1250 sq.ft",
                  }}
                  tags={["New Launch", "Possession: 2024"]}
                />
              </div>
              <div className="flex justify-center mt-6">
                <Button
                  variant="outline"
                  asChild
                  className="hover:bg-brokx-blue/10 hover:text-brokx-blue transition-colors"
                >
                  <Link href="/properties/new-launches">View All New Launches</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16 bg-gradient-to-b from-brokx-navy/5 to-brokx-blue/5">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
              <div className="space-y-4 animate-on-scroll">
                <h2 className="text-2xl font-bold tracking-tight gradient-text">Instant Home Loan Eligibility Check</h2>
                <p className="text-muted-foreground">
                  Check your home loan eligibility instantly and get the best offers from our partner banks.
                </p>
                <LoanCalculator />
              </div>
              <div className="space-y-4 animate-on-scroll" style={{ animationDelay: "0.2s" }}>
                <h2 className="text-2xl font-bold tracking-tight gradient-text">Refer & Earn</h2>
                <p className="text-muted-foreground">
                  Refer your friends and family and earn ₹25,000 for India properties or AED 3,000 for Dubai properties.
                </p>
                <Card className="shadow-card border-0">
                  <CardHeader>
                    <CardTitle>Referral Program</CardTitle>
                    <CardDescription>Submit a lead and earn rewards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid gap-2">
                        <label htmlFor="leadName" className="text-sm font-medium">
                          Lead Name
                        </label>
                        <input
                          id="leadName"
                          placeholder="Enter lead's full name"
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-brokx-blue/20 focus:border-brokx-blue transition-all"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="typology" className="text-sm font-medium">
                          Typology
                        </label>
                        <select
                          id="typology"
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-brokx-blue/20 focus:border-brokx-blue transition-all"
                        >
                          <option value="">Select Typology</option>
                          <option value="1BHK">1 BHK</option>
                          <option value="2BHK">2 BHK</option>
                          <option value="3BHK">3 BHK</option>
                          <option value="4BHK">4 BHK</option>
                          <option value="Villa">Villa</option>
                          <option value="Penthouse">Penthouse</option>
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="project" className="text-sm font-medium">
                          Project Name
                        </label>
                        <input
                          id="project"
                          placeholder="Enter project name (optional)"
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-brokx-blue/20 focus:border-brokx-blue transition-all"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="comments" className="text-sm font-medium">
                          Comments
                        </label>
                        <textarea
                          id="comments"
                          placeholder="Any additional information"
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-brokx-blue/20 focus:border-brokx-blue transition-all"
                          rows={3}
                        />
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-brokx-blue to-brokx-blue-light hover:from-brokx-blue-dark hover:to-brokx-blue transition-all duration-300 shadow-soft">
                      Submit Referral
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight gradient-text">Featured Properties</h2>
              <p className="text-muted-foreground">Handpicked properties for you</p>
              <FeaturedProperties />
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0 bg-gradient-to-b from-white to-brokx-blue/5">
        <div className="container flex flex-col md:flex-row justify-between gap-4 md:gap-8 md:py-8">
          <div className="flex flex-col gap-2 md:gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-10 w-32">
                <Image src="/images/brokx-logo.png" alt="BrokX Logo" fill style={{ objectFit: "contain" }} />
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              BrokX - Your trusted partner for real estate in India and Dubai.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Properties</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/properties/india"
                    className="text-sm text-muted-foreground hover:text-brokx-blue transition-colors"
                  >
                    India
                  </Link>
                </li>
                <li>
                  <Link
                    href="/properties/dubai"
                    className="text-sm text-muted-foreground hover:text-brokx-blue transition-colors"
                  >
                    Dubai
                  </Link>
                </li>
                <li>
                  <Link
                    href="/properties/new-launches"
                    className="text-sm text-muted-foreground hover:text-brokx-blue transition-colors"
                  >
                    New Launches
                  </Link>
                </li>
                <li>
                  <Link
                    href="/properties/cashback"
                    className="text-sm text-muted-foreground hover:text-brokx-blue transition-colors"
                  >
                    Cashback Offers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/services/home-loans"
                    className="text-sm text-muted-foreground hover:text-brokx-blue transition-colors"
                  >
                    Home Loans
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/interior"
                    className="text-sm text-muted-foreground hover:text-brokx-blue transition-colors"
                  >
                    Interior Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/legal"
                    className="text-sm text-muted-foreground hover:text-brokx-blue transition-colors"
                  >
                    Legal Assistance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/mortgage"
                    className="text-sm text-muted-foreground hover:text-brokx-blue transition-colors"
                  >
                    Mortgage Finance
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-brokx-blue transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-muted-foreground hover:text-brokx-blue transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-sm text-muted-foreground hover:text-brokx-blue transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-brokx-blue transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-muted-foreground hover:text-brokx-blue transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-brokx-blue transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refund"
                    className="text-sm text-muted-foreground hover:text-brokx-blue transition-colors"
                  >
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/disclaimer"
                    className="text-sm text-muted-foreground hover:text-brokx-blue transition-colors"
                  >
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container flex flex-col md:flex-row items-center justify-between py-4 md:py-6 border-t mt-8">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} BrokX. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <select className="text-xs border rounded-md p-1 focus:ring-2 focus:ring-brokx-blue/20 focus:border-brokx-blue transition-all">
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="ar">Arabic</option>
            </select>
            <div className="flex items-center gap-2">
              <Link href="#" className="text-muted-foreground hover:text-brokx-blue transition-colors">
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
                  className="lucide lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-brokx-blue transition-colors">
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
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-brokx-blue transition-colors">
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
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-brokx-blue transition-colors">
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
                  className="lucide lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

