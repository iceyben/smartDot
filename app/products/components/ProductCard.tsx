import React from "react";
import AddToCart from "./AddToCart";
import Link from "next/link";

interface ProductCardProps {
     src: string;
     alt: string;
     status: string;
     title: string;
     description: string;
     price: number | string;
     category?: string;
     href: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
     src,
     alt,
     status,
     title,
     description,
     href,
     price,
     category,
}) => {
     return (
          <div className="relative card bg-base-100 shadow-sm h-60 scale-105 hover:scale-110 transition-transform duration-300 border border-green-300">
               hello
          </div>
     );
};

export default ProductCard;
