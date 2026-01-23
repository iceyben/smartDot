import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { validateAdminSignupToken } from "@/lib/admin-auth";
import { z } from "zod";

// Validation schema
const adminSignupSchema = z.object({
  email: z.string().email("Invalid email format"),
  token: z.string().min(1, "Signup token is required"),
});

/**
 * Admin signup endpoint with token verification
 * POST /api/admin/auth/signup
 *
 * Security features:
 * - Token validation (invitation-based)
 * - Email uniqueness check
 * - Prevents duplicate admin creation
 * - Rate limiting recommended (add in production)
 */
export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json();

    // Validate request body
    const validation = adminSignupSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid request",
          details: validation.error.issues,
        },
        { status: 400 }
      );
    }

    const { email, token } = validation.data;

    // 1. Verify signup token
    const isValidToken = await validateAdminSignupToken(token);
    if (!isValidToken) {
      return NextResponse.json(
        { error: "Invalid or expired signup token" },
        { status: 401 }
      );
    }

    // 2. Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: existingUser.role === "ADMIN"
            ? "This email is already registered as an admin"
            : "This email is already registered. Please contact support to upgrade to admin.",
        },
        { status: 409 }
      );
    }

    // 3. Create new admin user
    const adminUser = await prisma.user.create({
      data: {
        email,
        name: email.split("@")[0], // Use email prefix as default name
        role: "ADMIN",
        emailVerified: new Date(),
      },
    });

    // 4. Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Admin account created successfully",
        user: {
          id: adminUser.id,
          email: adminUser.email,
          role: adminUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin signup error:", error);
    return NextResponse.json(
      { error: "Failed to create admin account" },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to validate token before signup
 * Allows frontend to check if token is valid before showing signup form
 */
export async function GET(request: NextRequest): Promise<Response> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { valid: false, error: "Token is required" },
        { status: 400 }
      );
    }

    const isValid = await validateAdminSignupToken(token);
    return NextResponse.json({ valid: isValid });
  } catch (error) {
    console.error("Token validation error:", error);
    return NextResponse.json(
      { valid: false, error: "Failed to validate token" },
      { status: 500 }
    );
  }
}
