import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-user")?.value;

  console.log(token);
  console.log("in the goddamn middleware");

  // Paths that require authentication
  const protectedPaths = ["/devices", "/profile", "/settings"];
  const isProtected = protectedPaths.some(path =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    // redirect to login if not authenticated
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// define which routes middleware runs on
export const config = {
  matcher: ["/devices/:path*", "/settings/:path*", "/profile/:path*"],
};
