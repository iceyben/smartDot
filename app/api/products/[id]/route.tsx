// app/api/products/[id]/route.ts
import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

interface Params {
     params: { id: string };
}

// ✅ GET /api/products/:id
export async function GET(req: Request, { params }: Params) {
     try {
          const product = await prisma.product.findUnique({
               where: { id: Number(params.id) },
               include: { images: true },
          });

          if (!product) {
               return NextResponse.json(
                    { error: "Product not found" },
                    { status: 404 }
               );
          }

          return NextResponse.json(product);
     } catch (error) {
          console.error("GET /api/products/[id] error:", error);
          return NextResponse.json(
               { error: "Failed to fetch product" },
               { status: 500 }
          );
     }
}
