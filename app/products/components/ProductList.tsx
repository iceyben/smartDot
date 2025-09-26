"use client";

import React, { useEffect, useState } from "react";

interface Product {
     id: number;
     title: string;
     price: number;
     quantity: number;
     thumbnailUrl?: string;
}

export default function ProductList() {
     const [products, setProducts] = useState<Product[]>([]);
     const [message, setMessage] = useState("");

     const fetchProducts = async () => {
          try {
               const res = await fetch("/api/products");
               if (!res.ok) throw new Error("Failed to fetch products");
               const data = await res.json();
               setProducts(data);
          } catch (err) {
               console.error(err);
               setProducts([]);
          }
     };

     useEffect(() => {
          fetchProducts();
     }, []);

     return (
          <div className="p-4">
               {message && <p className="text-green-600">{message}</p>}
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {products.map((p) => (
                         <div key={p.id} className="border p-2">
                              <img
                                   src={p.thumbnailUrl || "/placeholder.png"}
                                   alt={p.title}
                                   className="h-32 w-full object-cover"
                              />
                              <h2 className="font-semibold">{p.title}</h2>
                              <p>${p.price}</p>
                         </div>
                    ))}
               </div>
          </div>
     );
}
