"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { PrismaClient, users_user_type } from "@prisma/client";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
config();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function loginWithEmail(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const userType = formData.get("userType") as string

  if (email && password) {
    // Await cookies() and store in a variable
    const cookieStore = await cookies()
    cookieStore.set("auth-token", "sample-token-value", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })
    cookieStore.set("user-type", userType, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })
  }

  redirect("/login")
}

export async function loginWithPhone(formData: FormData) {
  const phone = formData.get("phone") as string
  const otp = formData.get("otp") as string
  const userType = formData.get("userType") as string

  if (phone && otp) {
    const cookieStore = await cookies()
    cookieStore.set("auth-token", "sample-token-value", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })
    cookieStore.set("user-type", userType, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })
  }

  redirect("/login")
}

export async function register(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;
  const userType = (formData.get("userType") as string).charAt(0).toUpperCase() + (formData.get("userType") as string).slice(1).toLowerCase() as users_user_type;

  if (!name || !email || !phone || !password) {
    throw new Error("All fields are required.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.users.create({
      data: {
        full_name: name,
        email: email,
        phone: phone,
        password_hash: hashedPassword,
        user_type: userType,
      },
    });

    const cookieStore = await cookies();
    cookieStore.set("auth-token", "sample-token-value", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    cookieStore.set("user-type", userType, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    // Return success instead of redirecting
    return { success: true };
  } catch (error: any) {
    console.error("Database Error:", error);
    if (error.code === 'P2002') {
      if (error.meta?.target?.includes('email')) {
        throw new Error("This email address is already registered.");
      } else if (error.meta?.target?.includes('phone')) {
        throw new Error("This phone number is already registered.");
      }
    }
    throw new Error("User registration failed. Please try again.");
  }
}

export async function verifyOtp(formData: FormData) {
  const otp = formData.get("otp") as string
  const userType = formData.get("userType") as string

  if (otp) {
    const cookieStore = await cookies()
    cookieStore.set("auth-token", "sample-token-value", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })
    cookieStore.set("user-type", userType, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })
  }

  redirect("/login")
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
  cookieStore.delete("user-type")
  redirect("/login")
}

export async function getAuthToken() {
  return (await cookies()).get("auth-token")?.value
}

export async function getUserType() {
  return (await cookies()).get("user-type")?.value
}
