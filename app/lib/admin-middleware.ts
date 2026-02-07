import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

/**
 * Middleware for protecting admin API routes
 * Usage: Apply to all /api/admin/* routes that need authentication
 *
 * Example in route handler:
 * const adminAuth = await withAdminAuth(request);
 * if (!adminAuth.authenticated) return adminAuth.response;
 */
export async function withAdminAuth(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session?.user?.email) {
      return {
        authenticated: false,
        response: NextResponse.json(
          { error: "Unauthorized: Please sign in" },
          { status: 401 }
        ),
      };
    }

    // Check if user has admin role
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || user.role !== "ADMIN") {
      return {
        authenticated: false,
        response: NextResponse.json(
          { error: "Forbidden: Admin access required" },
          { status: 403 }
        ),
      };
    }

    return {
      authenticated: true,
      user,
      session,
      response: null,
    };
  } catch (error) {
    console.error("Admin auth middleware error:", error);
    return {
      authenticated: false,
      response: NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      ),
    };
  }
}
