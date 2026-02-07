"use client";

import { useSession } from "next-auth/react";

/**
 * Hook to check if current user is admin
 * 
 * Usage:
 * const isAdmin = useIsAdmin();
 * 
 * if (isAdmin) {
 *   // Show admin features
 * }
 */
export function useIsAdmin(): boolean {
  const { data: session } = useSession();
  return (session?.user?.role === "ADMIN") || false;
}

/**
 * Hook to get current admin user
 * Returns null if not authenticated or not admin
 * 
 * Usage:
 * const admin = useAdminUser();
 */
export function useAdminUser() {
  const { data: session } = useSession();

  if (session?.user?.role === "ADMIN") {
    return session.user;
  }

  return null;
}

/**
 * Hook to check if user is loading
 * Useful for showing loading state while checking admin status
 */
export function useAdminLoading(): boolean {
  const { status } = useSession();
  return status === "loading";
}
