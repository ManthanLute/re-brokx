"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, Mail, Phone, User } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OtpInput } from "@/components/otp-input"
import { register, verifyOtp } from "@/app/actions/auth"

export default function RegisterPage() {
  const router = useRouter();
  const [userType, setUserType] = useState("customer")
  const [showPassword, setShowPassword] = useState(false)
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [verificationMethod, setVerificationMethod] = useState("email")

  const handleRegister = async (formData: FormData) => {
    try {
      const result = await register(formData);
      if (result.success) {
        router.push("/dashboard");
      }
    } catch (error: any) {
      // Handle error (you might want to show this in the UI)
      console.error(error.message);
    }
  }

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
            <Link href="/login" className="text-sm font-medium hover:text-primary">
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">
              Register to access exclusive property deals and cashback offers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="customer" className="w-full" onValueChange={setUserType}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="customer">Customer</TabsTrigger>
                <TabsTrigger value="agent">Agent</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
            </Tabs>

            {!isOtpSent ? (
              <form action={handleRegister} className="space-y-4 mt-4">
                <input type="hidden" name="userType" value={userType} />
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input id="name" name="name" placeholder="John Doe" className="pl-10" required />
                  </div>
                </div>
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
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input id="phone" name="phone" type="tel" placeholder="+91 9876543210" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
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
                <div className="space-y-2">
                  <Label>Verify via</Label>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant={verificationMethod === "email" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setVerificationMethod("email")}
                    >
                      Email
                    </Button>
                    <Button
                      type="button"
                      variant={verificationMethod === "phone" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setVerificationMethod("phone")}
                    >
                      Phone
                    </Button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brokx-blue to-brokx-blue-light hover:from-brokx-blue-dark hover:to-brokx-blue transition-all duration-300 shadow-soft"
                >
                  Register
                </Button>
              </form>
            ) : (
              <form action={verifyOtp} className="space-y-4 mt-4">
                <input type="hidden" name="userType" value={userType} />
                <div className="space-y-2">
                  <Label>Enter OTP sent to your {verificationMethod === "email" ? "email" : "phone"}</Label>
                  <OtpInput
                    length={6}
                    onComplete={(otp) => {
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
                    Change {verificationMethod === "email" ? "Email" : "Phone Number"}
                  </Button>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brokx-blue to-brokx-blue-light hover:from-brokx-blue-dark hover:to-brokx-blue transition-all duration-300 shadow-soft"
                >
                  Verify & Complete Registration
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-brokx-blue hover:underline">
                Login
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

