"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function loginWithEmail(formData: FormData) {
  // In a real application, you would validate credentials against your database
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const userType = formData.get("userType") as string

  // Simulate authentication
  if (email && password) {
    // Set a cookie to maintain the session
    cookies().set("auth-token", "sample-token-value", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    cookies().set("user-type", userType, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })
  }

  redirect("/dashboard")
}

