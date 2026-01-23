import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";

/**
 * Get current admin session and verify admin role
 * Redirects to login if not authenticated or not an admin
 */
export async function getAdminSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  return { session, user };
}

/**
 * Check if user has admin role (non-blocking version)
 * Returns null if not authenticated or not an admin
 */
export async function checkAdminRole() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || user.role !== "ADMIN") {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error checking admin role:", error);
    return null;
  }
}

/**
 * Validate admin signup token (for security)
 * In production, use environment variables or database for valid tokens
 */
export async function validateAdminSignupToken(token: string): Promise<boolean> {
  // Use environment variable for master token
  const validTokens = process.env.ADMIN_SIGNUP_TOKENS?.split(",") || [];
  return validTokens.includes(token);
}
