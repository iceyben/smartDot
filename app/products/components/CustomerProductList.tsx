"use client";

import React from "react";
import useSWR from "swr";
import ProductCard from "./ProductCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CustomerProductList() {
  const { data: products, mutate } = useSWR("/api/products", fetcher);

  if (!products) return <p>Loading products...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
      {products.map((p: any) => (
        <ProductCard
          key={p.id}
          src={p.imageUrl || "/placeholder.png"}
          alt={p.title}
          status={p.quantity > 0 ? "Available" : "Sold"}
          title={p.title}
          description={p.description}
          price={p.price}
        />
      ))}
    </div>
  );
}
