import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth-token")?.value
  const userType = request.cookies.get("user-type")?.value

  // Check if the user is trying to access protected routes
  if (request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/admin")) {
    // For demo purposes, we're allowing direct access to the dashboard
    // In production, uncomment the following code:
    // if (!authToken) {
    //   return NextResponse.redirect(new URL('/login', request.url))
    // }

    // If trying to access admin routes but not an admin
    if (request.nextUrl.pathname.startsWith("/admin") && userType !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  // If authenticated user tries to access login/register pages, redirect to dashboard
  if ((request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register") && authToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
}

