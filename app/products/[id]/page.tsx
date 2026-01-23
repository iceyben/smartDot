// app/products/[id]/page.tsx
/**
 * Product Detail Page
 * Fetches and displays a single product from the database based on the product ID
 * Route: /products/[id]
 */

import { ProductDetailCard } from "../components/ProductDetail";
import { notFound } from "next/navigation";
import prisma from "@/app/lib/prisma";

interface ProductDetailPageProps {
     params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
     // Await params to comply with Next.js 15 async params requirement
     const { id } = await params;

     // Fetch product from database with category information
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

     // If product doesn't exist, show 404 page
     if (!product) {
          notFound();
     }

     // Pass real product data to the ProductDetailCard component
     return (
          <ProductDetailCard
               id={product.id}
               title={product.name}
               price={product.price}
               description={product.description}
               images={product.images}
               category={product.category.name}
               stock={product.stock}
          />
     );
}
