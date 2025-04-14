"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OtpInput } from "@/components/otp-input"
import { loginWithEmail } from "./actions"

export default function LoginPage() {
  const [userType, setUserType] = useState("customer")
  const [showPassword, setShowPassword] = useState(false)
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [loginMethod, setLoginMethod] = useState("email")

  const sendOtp = () => {
    // In a real application, this would send an OTP to the user's phone/email
    setIsOtpSent(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-24">
              <Image src="/images/brokx-logo.png" alt="BrokX Logo" fill style={{ objectFit: "contain" }} />
            </div>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/properties" className="text-sm font-medium hover:text-primary">
              Properties
            </Link>
            <Link href="/register" className="text-sm font-medium hover:text-primary">
              Register
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md mb-4">
          <Button
            onClick={() => (window.location.href = "/dashboard")}
            className="w-full bg-gradient-to-r from-brokx-blue to-brokx-blue-light hover:from-brokx-blue-dark hover:to-brokx-blue transition-all duration-300 shadow-soft"
          >
            Direct Access to Admin Portal (Demo)
          </Button>
        </div>
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Login to BrokX</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="customer" className="w-full" onValueChange={setUserType}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="customer">Customer</TabsTrigger>
                <TabsTrigger value="agent">Agent</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
            </Tabs>

            <Tabs defaultValue="email" className="w-full" onValueChange={setLoginMethod}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>
              <TabsContent value="email" className="space-y-4 mt-4">
                {!isOtpSent ? (
                  <form action={loginWithEmail} className="space-y-4">
                    <input type="hidden" name="userType" value={userType} />
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="name@example.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-brokx-blue to-brokx-blue-light hover:from-brokx-blue-dark hover:to-brokx-blue transition-all duration-300 shadow-soft"
                    >
                      Login
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Enter OTP sent to your email</Label>
                      <OtpInput length={6} onComplete={() => {}} />
                    </div>
                    <div className="text-center">
                      <Button variant="link" onClick={() => setIsOtpSent(false)}>
                        Change Email
                      </Button>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-brokx-blue to-brokx-blue-light hover:from-brokx-blue-dark hover:to-brokx-blue transition-all duration-300 shadow-soft">
                      Verify & Login
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="phone" className="space-y-4 mt-4">
                {!isOtpSent ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input id="phone" type="tel" placeholder="+91 9876543210" className="pl-10" required />
                      </div>
                    </div>
                    <Button
                      onClick={sendOtp}
                      className="w-full bg-gradient-to-r from-brokx-blue to-brokx-blue-light hover:from-brokx-blue-dark hover:to-brokx-blue transition-all duration-300 shadow-soft"
                    >
                      Send OTP
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      window.location.href = "/dashboard"
                    }}
                    className="space-y-4"
                  >
                    <input type="hidden" name="userType" value={userType} />
                    <input type="hidden" name="phone" id="phone-hidden" />
                    <div className="space-y-2">
                      <Label>Enter OTP sent to your phone</Label>
                      <OtpInput
                        length={6}
                        onComplete={(otp) => {
                          const phoneInput = document.getElementById("phone-hidden") as HTMLInputElement
                          if (phoneInput) {
                            phoneInput.value = document.getElementById("phone")?.value || ""
                          }
                          const otpInput = document.createElement("input")
                          otpInput.type = "hidden"
                          otpInput.name = "otp"
                          otpInput.value = otp
                          document.forms[0].appendChild(otpInput)
                          document.forms[0].requestSubmit()
                        }}
                      />
                    </div>
                    <div className="text-center">
                      <Button variant="link" onClick={() => setIsOtpSent(false)}>
                        Change Phone Number
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-brokx-blue to-brokx-blue-light hover:from-brokx-blue-dark hover:to-brokx-blue transition-all duration-300 shadow-soft"
                    >
                      Verify & Login
                    </Button>
                  </form>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-brokx-blue hover:underline">
                Register
              </Link>
            </div>
          </CardFooter>
        </Card>
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

