"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { GiSettingsKnobs } from "react-icons/gi";

interface Product {
     id: number;
     title: string;
     description?: string;
     images: string[]; // ✅ multiple images
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
               <h1 className="text-2xl font-bold ">Products</h1>
               <button className="px-2 py-1 ml-4 flex items-center mb-4 space-x-2 bg-slate-200 hover:bg-slate-300 rounded-md font-medium">
                    <p className="text-sm">Category</p>
                    <GiSettingsKnobs className="text-sm" />
               </button>

               <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {products.map((product) => (
                         <ProductCard
                              key={product.id}
                              src={product.images?.[0] || "/placeholder.png"} // ✅ first image = thumbnail
                              alt={product.title}
                              title={product.title}
                              description={product.description || ""}
                              price={product.price}
                              category="" // can map real category later
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
