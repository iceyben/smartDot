// middleware.ts
import { auth } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {headers} from "next/headers"

export async function middleware(req: NextRequest) {
  const session = await auth.api.getSession({
           headers: await headers(),  // pass request headers
         });
       

  const isDashboardRoute = req.nextUrl.pathname.startsWith("/dashboard");

  if (isDashboardRoute && !session?.user) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
