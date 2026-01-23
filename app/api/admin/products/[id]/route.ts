import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { withAdminAuth } from "@/lib/admin-middleware";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";

// GET - Fetch single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  // Verify admin access
  const auth = await withAdminAuth(request);
  if (!auth.authenticated) return auth.response || new Response("Unauthorized", { status: 401 });

  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PUT - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  // Verify admin access
  const auth = await withAdminAuth(request);
  if (!auth.authenticated) return auth.response || new Response("Unauthorized", { status: 401 });

  try {
    const { id } = await params;
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string);
    const categoryId = formData.get("categoryId") as string;
    const imageFiles = formData.getAll("images") as File[];

    // Get existing product
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    let imagePaths = existingProduct.images || [];

    // If new images are provided, replace old ones
    if (imageFiles.length > 0 && imageFiles[0].size > 0) {
      // Delete old images
      for (const oldImagePath of existingProduct.images) {
        try {
          const fullPath = join(process.cwd(), "public", oldImagePath);
          await unlink(fullPath);
        } catch (err) {
          // Ignore if file doesn't exist
        }
      }

      // Upload new images
      imagePaths = [];
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        if (file.size === 0) continue;

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const timestamp = Date.now();
        const filename = `product_${timestamp}_${i}.${file.name.split('.').pop()}`;
        const path = join(process.cwd(), "public", "products", filename);

        const { existsSync, mkdirSync } = await import("fs");
        const dir = join(process.cwd(), "public", "products");
        if (!existsSync(dir)) {
          mkdirSync(dir, { recursive: true });
        }

        await writeFile(path, buffer);
        imagePaths.push(`/products/${filename}`);
      }
    }

    // Update product
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description: description || existingProduct.description,
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

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  // Verify admin access
  const auth = await withAdminAuth(request);
  if (!auth.authenticated) return auth.response || new Response("Unauthorized", { status: 401 });

  try {
    const { id } = await params;

    // Get product to delete images
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete images
    for (const imagePath of product.images) {
      try {
        const fullPath = join(process.cwd(), "public", imagePath);
        await unlink(fullPath);
      } catch (err) {
        // Ignore if file doesn't exist
      }
    }

    // Delete product
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
