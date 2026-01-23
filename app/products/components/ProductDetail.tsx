"use client";
/**
 * ProductDetailCard Component
 * Displays detailed product information with image gallery, pricing, and purchase options
 * Features:
 * - Image gallery with thumbnail navigation
 * - "Add to Cart" functionality
 * - "Buy Now" - adds to cart and redirects to immediate checkout
 */

import React, { useState } from "react";
import Image from "next/image";
import AddToCart from "./AddToCart";
import { WishlistButton } from "./WishlistButton";
import { FaStar, FaShieldAlt, FaTruck, FaUndo } from "react-icons/fa";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

interface ProductDetailProps {
  id?: string;
  title?: string;
  price?: number;
  description?: string;
  images?: string[];
  category?: string;
  stock?: number; // Available stock quantity
}

export const ProductDetailCard: React.FC<ProductDetailProps> = ({
  id = "1",
  title = "Smart Watch Series 7",
  price = 299.99,
  description = "Experience the future on your wrist. This smart watch features advanced health monitoring, seamless connectivity, and a stunning retina display. Water resistant up to 50 meters and battery life that lasts all day.",
  images = ["/watch.jpeg", "/watch.jpeg", "/watch.jpeg"],
  category = "Electronics",
  stock = 100, // Default stock for fallback
}) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  const { addToCart } = useCart();
  const router = useRouter();

  /**
   * Handle "Buy Now" button click
   * Adds product to cart and immediately redirects to checkout page
   */
  const handleBuyNow = () => {
    // Add product to cart with stock information
    addToCart({
      id,
      name: title,
      price,
      quantity: 1,
      image: activeImage,
      maxStock: stock, // Pass stock limit to cart
    });

    // Redirect to checkout page for immediate purchase
    router.push("/checkout");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-6">
      {/* Login / Image Gallery Section */}
      <div className="space-y-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 border border-gray-200">
          <Image
            src={activeImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 right-4 z-10">
            <WishlistButton />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(img)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? "border-primary ring-2 ring-primary/20" : "border-transparent opacity-70 hover:opacity-100"
                }`}
            >
              <Image src={img} alt={`View ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info Section */}
      <div className="flex flex-col space-y-6">
        <div>
          <span className="text-sm text-primary font-bold uppercase tracking-wider">{category}</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">{title}</h1>

          <div className="flex items-center space-x-4 mt-2">
            <div className="flex text-yellow-400 text-sm">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar className="text-gray-300" />
            </div>
            <span className="text-sm text-gray-500">(124 reviews)</span>
          </div>
        </div>

        <div className="flex items-end space-x-4">
          <h2 className="text-4xl font-bold text-gray-900">${price.toFixed(2)}</h2>
          <span className="text-xl text-gray-400 line-through mb-1">${(price * 1.2).toFixed(2)}</span>
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold mb-2">SAVE 20%</span>
        </div>

        <p className="text-gray-600 leading-relaxed text-lg">
          {description}
        </p>

        <div className="pt-6 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Add to Cart Button */}
            <AddToCart
              productId={id}
              productName={title}
              productPrice={price}
              productImage={activeImage}
              maxStock={stock}
            />

            {/* Buy Now Button - Adds to cart and redirects to checkout */}
            <button
              onClick={handleBuyNow}
              className="btn btn-primary text-white rounded-full"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-3 gap-4 py-6 text-center text-xs text-gray-600">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-lg">
              <FaTruck />
            </div>
            <span>Free Delivery</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 text-lg">
              <FaShieldAlt />
            </div>
            <span>2 Year Warranty</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 text-lg">
              <FaUndo />
            </div>
            <span>30 Day Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
};
