// app/dashboard/products/page.tsx
import ProductForm from "@/app/products/components/ProductForm";
import ProductList from "@/app/products/components/ProductList";
import React from "react";

export default function ProductsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <ProductForm />
      <h2>All Products</h2>
      <ProductList />
    </div>
  );
}
