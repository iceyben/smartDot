import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { withAdminAuth } from "@/app/lib/admin-middleware";

// GET - Fetch all categories
export async function GET() {
  try {

    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST - Create a new category
export async function POST(request: NextRequest): Promise<Response> {
  // Verify admin access
  const auth = await withAdminAuth(request);
  if (!auth.authenticated) return auth.response || new Response("Unauthorized", { status: 401 });

  try {

    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: { name },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    const err = error as Record<string, unknown>;
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 409 }
      );
    }
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
