import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { withAdminAuth } from "@/app/lib/admin-middleware";
import bcrypt from "bcryptjs";
import { z } from "zod";

const createAdminSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name is required"),
});

/**
 * POST /api/admin/admins
 * Create a new admin account
 * Only existing admins can create new admins
 */
export async function POST(request: NextRequest): Promise<Response> {
  // Verify admin access
  const auth = await withAdminAuth(request);
  if (!auth.authenticated) return auth.response || new Response("Unauthorized", { status: 401 });

  try {
    const body = await request.json();

    // Validate request
    const validation = createAdminSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid request",
          details: validation.error.issues,
        },
        { status: 400 }
      );
    }

    const { email, password, name } = validation.data;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new admin
    const newAdmin = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "ADMIN",
        emailVerified: new Date(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Admin created successfully",
        admin: {
          id: newAdmin.id,
          email: newAdmin.email,
          name: newAdmin.name,
          role: newAdmin.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      { error: "Failed to create admin" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/admins
 * Fetch all admin accounts
 * Only admins can access this
 */
export async function GET(request: NextRequest): Promise<Response> {
  // Verify admin access
  const auth = await withAdminAuth(request);
  if (!auth.authenticated) return auth.response || new Response("Unauthorized", { status: 401 });

  try {
    const admins = await prisma.user.findMany({
      where: { role: "ADMIN" },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    return NextResponse.json(
      { error: "Failed to fetch admins" },
      { status: 500 }
    );
  }
}
