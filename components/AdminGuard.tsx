"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";

interface AdminOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Component that renders children only if user is admin
 * 
 * Usage:
 * <AdminOnly>
 *   <AdminFeature />
 * </AdminOnly>
 */
export function AdminOnly({ children, fallback = null }: AdminOnlyProps) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  return isAdmin ? children : fallback;
}

interface RequireAdminProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * Component that renders children only if user is admin
 * Otherwise redirects to specified URL
 */
export function RequireAdmin({ 
  children, 
  redirectTo = "/" 
}: RequireAdminProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isAdmin = session?.user?.role === "ADMIN";

  if (!isAdmin) {
    if (typeof window !== "undefined") {
      window.location.href = redirectTo;
    }
    return null;
  }

  return <>{children}</>;
}
