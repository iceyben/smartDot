import { NextResponse } from "next/server";
import { auth } from "./app/lib/auth";

export default auth(function middleware(req: any) {
    const { token } = auth();
    const pathname = req.nextUrl.pathname;

    // Check for admin routes
    if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
        if (token?.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*",
        "/api/admin/:path*",
        "/checkout/:path*",
        "/orders/:path*",
    ],
};
