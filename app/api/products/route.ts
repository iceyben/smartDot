/**
 * Products API Endpoint (Public)
 * Fetches products from the database with optional category filtering
 * Route: GET /api/products
 * Query Parameters:
 *   - categoryId (optional): Filter products by category ID
 * Access: Public (no authentication required)
 */

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// GET - Fetch all products (public access)
export async function GET(request: NextRequest) {
  try {
    // Extract categoryId from query parameters
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    // Build where clause - filter by category if categoryId is provided
    const where = categoryId ? { categoryId } : {};

    // Fetch products from database with category information
    const products = await prisma.product.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Most recent products first
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
