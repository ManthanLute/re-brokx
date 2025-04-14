import Link from "next/link"
import { Check, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReferralPage() {
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
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
            <Link href="/referral" className="text-sm font-medium text-primary">
              Referral Program
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Refer & Earn
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Refer your friends and family to BrokX and earn ₹25,000 for India properties or AED 3,000 for Dubai
                  properties.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button className="w-full" size="lg">
                  Start Referring Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Refer a Friend</h3>
                  <p className="text-muted-foreground">
                    Share property details with your friends and family who are looking to buy a property.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">We'll Handle the Rest</h3>
                  <p className="text-muted-foreground">
                    Our sales team will contact your referral and guide them through the property buying process.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 2v20" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Earn Rewards</h3>
                  <p className="text-muted-foreground">
                    Once your referral makes a purchase, you earn ₹25,000 for India properties or AED 3,000 for Dubai
                    properties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Submit a Referral</h2>
                <p className="text-muted-foreground">
                  Fill out the form with your referral's details and we'll take care of the rest.
                </p>
                <Card>
                  <CardHeader>
                    <CardTitle>Referral Form</CardTitle>
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
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="leadPhone" className="text-sm font-medium">
                          Lead Phone Number
                        </label>
                        <input
                          id="leadPhone"
                          placeholder="Enter lead's phone number"
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="leadEmail" className="text-sm font-medium">
                          Lead Email (Optional)
                        </label>
                        <input
                          id="leadEmail"
                          type="email"
                          placeholder="Enter lead's email"
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="country" className="text-sm font-medium">
                          Country
                        </label>
                        <select id="country" className="w-full p-2 border rounded-md">
                          <option value="">Select Country</option>
                          <option value="india">India</option>
                          <option value="uae">UAE (Dubai)</option>
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="typology" className="text-sm font-medium">
                          Typology
                        </label>
                        <select id="typology" className="w-full p-2 border rounded-md">
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
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="comments" className="text-sm font-medium">
                          Comments
                        </label>
                        <textarea
                          id="comments"
                          placeholder="Any additional information"
                          className="w-full p-2 border rounded-md"
                          rows={3}
                        />
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Submit Referral</Button>
                  </CardFooter>
                </Card>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">Submit a Referral</h3>
                      <p className="text-muted-foreground">
                        Fill out the referral form with your friend's details and property requirements.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">We Contact Your Referral</h3>
                      <p className="text-muted-foreground">
                        Our sales team will reach out to your referral within 24 hours to understand their requirements.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">Property Viewing</h3>
                      <p className="text-muted-foreground">
                        We arrange property viewings based on your referral's preferences and requirements.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      4
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">Booking & Payment</h3>
                      <p className="text-muted-foreground">
                        Once your referral books a property, we process the payment and documentation.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      5
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">You Get Rewarded</h3>
                      <p className="text-muted-foreground">
                        You receive your referral bonus of ₹25,000 for India properties or AED 3,000 for Dubai
                        properties.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-background p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Referral Program Benefits</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>Earn ₹25,000 for each successful India property referral</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>Earn AED 3,000 for each successful Dubai property referral</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>No limit on the number of referrals you can make</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>Track your referrals and earnings in real-time</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>Get paid within 7 days of successful property booking</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Frequently Asked Questions</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Got questions about our referral program? Find answers to common questions below.
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>How do I refer someone?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      You can refer someone by filling out the referral form on this page with their details. Our sales
                      team will contact them directly.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>When do I get paid?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      You will receive your referral bonus within 7 days after your referral successfully books a
                      property through BrokX.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Is there a limit to how many people I can refer?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      No, there is no limit to the number of referrals you can make. The more you refer, the more you
                      earn!
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>How can I track my referrals?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      You can track all your referrals and their status in the "My Referrals" section of your dashboard.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
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

