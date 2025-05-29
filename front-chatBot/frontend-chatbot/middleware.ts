// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rutas protegidas
const protectedRoutes = ["/dashboard", "/clientes", "/home", "/usuarios"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isProtected = protectedRoutes.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/clientes/:path*", "/home/:path*", "/usuarios/:path*"],
};
