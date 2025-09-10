"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import DeleteConfirm from "./DeleteConfirm";

interface Product {
  id: number;
  title: string;
  description?: string;
  imageUrl?: string;
  price: number;
  quantity: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null); // product being deleted
  const [deleteTitle, setDeleteTitle] = useState<string>("");

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const confirmDelete = async () => {
    if (deleteId === null) return;
    try {
      await fetch(`/api/products?id=${deleteId}`, { method: "DELETE" });
      setProducts(products.filter((p) => p.id !== deleteId));
      setMessage("Product deleted successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete product");
    } finally {
      setDeleteId(null);
      setDeleteTitle("");
    }
  };

  const handleSold = async (id: number) => {
    try {
      await fetch(`/api/products?id=${id}`, { method: "PATCH" });
      fetchProducts();
      setMessage("Product marked as sold!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to mark product as sold");
    }
  };

  return (
    <div className="p-6">
      {message && <p className="mb-2 text-green-600">{message}</p>}

      <h2 className="text-xl font-semibold mb-2">Product List</h2>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-center">
              <td className="px-4 py-2 border">
                <img
                  src={product.imageUrl || "/placeholder.png"}
                  alt={product.title}
                  className="h-16 w-16 object-cover mx-auto"
                />
              </td>
              <td className="px-4 py-2 border">{product.title}</td>
              <td className="px-4 py-2 border">${product.price}</td>
              <td className="px-4 py-2 border">{product.quantity}</td>
              <td className="px-4 py-2 border space-x-2">
                <button
                  onClick={() => handleSold(product.id)}
                  className="btn btn-sm btn-success"
                  disabled={product.quantity <= 0}
                >
                  Sold
                </button>
                <button
                  onClick={() => {
                    setDeleteId(product.id);
                    setDeleteTitle(product.title);
                  }}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render Delete Confirmation Modal */}
      {deleteId !== null && (
        <DeleteConfirm
          title={deleteTitle}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default ProductList;
