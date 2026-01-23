import Image from "next/image";
import Link from "next/link";
import prisma from "@/app/lib/prisma";
import { FiShoppingBag, FiArrowRight } from "react-icons/fi";

interface Product {
  id: string;
  name: string;
  images: string[];
  lastOrdered: Date;
  price: number;
  orderedQuantity: number;
  category?: { id: string; name: string } | null;
}

export default async function ProductsPage() {
  // Dummy user since Clerk is removed
  const userId = "guest_user";

  // Fetch user's orders and get unique products
  const orders = await prisma.order.findMany({
    where: {
      userId: userId,
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  // Extract unique products from all orders
  const productMap = new Map();
  orders.forEach((order) => {
    order.items.forEach((item) => {
      const productId = item.product.id;
      if (!productMap.has(productId)) {
        productMap.set(productId, {
          ...item.product,
          orderedQuantity: item.quantity,
          lastOrdered: order.createdAt,
        });
      } else {
        const existing = productMap.get(productId);
        if (order.createdAt > existing.lastOrdered) {
          existing.lastOrdered = order.createdAt;
        }
        existing.orderedQuantity += item.quantity;
      }
    });
  });

  const orderedProducts = Array.from(productMap.values()).sort(
    (a: Product, b: Product) => b.lastOrdered.getTime() - a.lastOrdered.getTime()
  );

  return (
    <div className="rounded-lg space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FiShoppingBag className="text-2xl text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
          </div>
          <span className="text-sm text-gray-500">
            {orderedProducts.length}{" "}
            {orderedProducts.length === 1 ? "product" : "products"} ordered
          </span>
        </div>

        {orderedProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
              <FiShoppingBag className="text-4xl text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Start shopping
            </h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Start shopping to see all the products you&apos;ve ordered here
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 btn btn-primary text-white hover:gap-3 transition-all"
            >
              Browse Products
              <FiArrowRight />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {orderedProducts.map((product: Product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FiShoppingBag className="text-4xl" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  {product.category && (
                    <p className="text-xs text-gray-500 mb-2">
                      {product.category.name}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <p className="text-lg font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </p>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      ×{product.orderedQuantity} ordered
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
