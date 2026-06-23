// middleware.ts  ← en la raiz del proyecto, mismo nivel que package.json
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const pathname = req.nextUrl.pathname;

  const protectedRoutes = ["/dashboard", "/admin"];
  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));

  // Sin token -> redirigir a login
  if (isProtected && !token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // Ya autenticado -> no dejar volver a /login
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login"],
};
