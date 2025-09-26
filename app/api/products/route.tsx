import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
     try {
          const formData = await req.formData();

          const title = formData.get("title") as string;
          const description = formData.get("description") as string;
          const price = parseFloat(formData.get("price") as string);

          const files = formData.getAll("images") as File[];

          if (!files.length) {
               return NextResponse.json(
                    { error: "No images uploaded" },
                    { status: 400 }
               );
          }

          // For demo: using file names; normally you'd upload to S3/Cloudinary
          const thumbnailUrl = files[0].name;

          const product = await prisma.product.create({
               data: {
                    title,
                    description,
                    price,
                    thumbnailUrl,
                    images: {
                         create: files.map((file) => ({ url: file.name })),
                    },
               },
               include: { images: true },
          });

          return NextResponse.json(product, { status: 201 });
     } catch (error) {
          console.error("POST /api/products error:", error);
          return NextResponse.json(
               { error: "Failed to create product" },
               { status: 500 }
          );
     }
}



export async function GET() {
     try {
          const products = await prisma.product.findMany({
               include: { images: true },
          });
          return NextResponse.json(products);
     } catch (error) {
          console.error("GET /api/products error:", error);
          return NextResponse.json(
               { error: "Failed to fetch products" },
               { status: 500 }
          );
     }
}
