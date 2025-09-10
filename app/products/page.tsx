"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

interface Product {
  id: number;
  title: string;
  description?: string;
  imageUrl?: string;
  price: number;
  isNew: boolean;
  isTrending: boolean;
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            src={product.imageUrl || "/placeholder.png"}
            alt={product.title}
            title={product.title}
            description={product.description || ""}
            price={product.price}
            status={
              product.isNew
                ? "New"
                : product.isTrending
                ? "Trending"
                : "Available"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
