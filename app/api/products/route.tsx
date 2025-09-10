import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import fs from "fs/promises";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // disable default Next.js parser
  },
};

// GET all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST - create new product
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const quantity = formData.get("quantity") as string;
    const imageFile = formData.get("image") as File;

    if (!title || !price || !imageFile) {
      return NextResponse.json(
        { error: "Title, price, and image are required" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const imageName = `${Date.now()}-${imageFile.name}`;
    const imagePath = path.join(uploadDir, imageName);
    await fs.writeFile(imagePath, buffer);

    const imageUrl = `/uploads/${imageName}`;

    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity) || 0,
        imageUrl,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

// DELETE - remove a product by id
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id)
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (!product)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    // Remove image file
    if (product.imageUrl) {
      const imagePath = path.join(process.cwd(), "public", product.imageUrl);
      await fs.unlink(imagePath).catch(() => {});
    }

    await prisma.product.delete({ where: { id: parseInt(id) } });
    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

// PATCH - mark product as sold (reduces quantity by 1)
export async function PATCH(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id)
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (!product)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    if (product.quantity <= 0) {
      return NextResponse.json(
        { error: "Product out of stock" },
        { status: 400 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { quantity: product.quantity - 1 },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to mark product as sold" },
      { status: 500 }
    );
  }
}
