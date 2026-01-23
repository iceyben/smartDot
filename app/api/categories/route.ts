/**
 * Categories API Endpoint (Public)
 * Returns all categories from the database
 * Route: GET /api/categories
 * Access: Public (no authentication required)
 */

import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET() {
    try {
        // Fetch all categories, ordered alphabetically by name
        const categories = await prisma.category.findMany({
            orderBy: {
                name: "asc",
            },
            select: {
                id: true,
                name: true,
            },
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
