"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function logout() {
  cookies().delete("auth-token")
  cookies().delete("user-type")
  redirect("/login")
}

