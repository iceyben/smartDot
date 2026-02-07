import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { withAdminAuth } from "@/app/lib/admin-middleware";
import { writeFile } from "fs/promises";
import { join } from "path";

// GET - Fetch all products with categories
export async function GET(request: NextRequest): Promise<Response> {
  // Verify admin access
  const auth = await withAdminAuth(request);
  if (!auth.authenticated) return auth.response || new Response("Unauthorized", { status: 401 });

  try {

    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    const where = categoryId ? { categoryId } : {};

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
        createdAt: "desc",
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

// POST - Create new product
export async function POST(request: NextRequest): Promise<Response> {
  // Verify admin access
  const auth = await withAdminAuth(request);
  if (!auth.authenticated) return auth.response || new Response("Unauthorized", { status: 401 });

  try {

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string);
    const categoryId = formData.get("categoryId") as string;
    const imageFiles = formData.getAll("images") as File[];

    // Validate required fields
    if (!name || !price || !stock || !categoryId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate images (exactly 4)
    if (imageFiles.length !== 4) {
      return NextResponse.json(
        { error: "Exactly 4 images are required" },
        { status: 400 }
      );
    }

    // Upload images
    const imagePaths: string[] = [];
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      if (file.size === 0) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const timestamp = Date.now();
      const filename = `product_${timestamp}_${i}.${file.name.split('.').pop()}`;
      const path = join(process.cwd(), "public", "products", filename);

      // Ensure directory exists
      const { existsSync, mkdirSync } = await import("fs");
      const dir = join(process.cwd(), "public", "products");
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }

      await writeFile(path, buffer);
      imagePaths.push(`/products/${filename}`);
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        description: description || "",
        price,
        stock,
        categoryId,
        images: imagePaths,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
