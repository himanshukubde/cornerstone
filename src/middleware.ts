import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("cs_auth_token")?.value;

  // 1. Protect /jobs (Must be logged in to view jobs)
  if (pathname.startsWith("/jobs") && pathname !== "/jobs/login") {
    if (!token) {
      const loginUrl = new URL("/jobs/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If already logged in and visiting /jobs/login, redirect to /jobs
  if (pathname === "/jobs/login" && token) {
    return NextResponse.redirect(new URL("/jobs", req.url));
  }

  // 2. Protect /admin (Must be logged in to access Admin Panel)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!token) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If already logged in and visiting /admin/login, redirect to /admin
  if (pathname === "/admin/login" && token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/jobs/:path*"],
};
