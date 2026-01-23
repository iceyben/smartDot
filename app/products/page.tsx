"use client";

/**
 * Products Page
 * Displays all products with optional category filtering via URL query parameter
 * Usage: /products or /products?category=categoryId
 */

import React, { useState, useEffect, Suspense } from "react";
import ProductCard from "./components/ProductCard";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: {
    id: string;
    name: string;
  };
}

function ProductsPageContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  // Get category filter from URL query parameter
  const categoryId = searchParams.get("category");

  useEffect(() => {
    fetchProducts();
  }, [categoryId]); // Re-fetch when category changes

  const fetchProducts = async () => {
    try {
      // Build API URL with optional category filter
      const url = categoryId
        ? `/api/products?categoryId=${categoryId}`
        : "/api/products";

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading products...</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <p className="text-gray-500 text-lg mb-4">No products available</p>
        <Link href="/" className="text-green-600 hover:text-green-700">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          productId={product.id}
          title={product.name}
          price={product.price}
          src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder.jpg"}
          description={product.description}
          href={`/products/${product.id}`}
        />
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="text-gray-500">Loading products...</div></div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
