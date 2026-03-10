import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const pathname = request.nextUrl.pathname;

  // Enhanced logging to debug middleware execution
  console.log("🔵 Middleware running:", {
    pathname,
    hasToken: !!token,
    timestamp: new Date().toISOString(),
  });

  const isAuthPage = pathname.startsWith("/login");
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isRootRoute = pathname === "/";

  // If not logged in and trying to access dashboard or root

  if (!token && (isDashboardRoute || isRootRoute)) {
    console.log("🔴 Redirecting to /login - no token");
    //return NextResponse.redirect(new URL("/login", request.url));
  }

  // If logged in and trying to access login or root
  if (token && (isAuthPage || isRootRoute)) {
    console.log("🟢 Redirecting to /dashboard/home - has token");
    return NextResponse.redirect(new URL("/dashboard/home", request.url));
  }

  console.log("✅ Middleware passed - allowing request");
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
