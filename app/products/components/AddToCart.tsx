'use client'
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { FaOpencart } from "react-icons/fa";
import { useCart } from "@/app/context/CartContext";

interface AddToCartProps {
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  maxStock?: number;
}

const AddToCart: React.FC<AddToCartProps> = ({
  productId,
  productName,
  productPrice,
  productImage,
  maxStock = 999,
}) => {
  const { addToCart, isInCart } = useCart();
  const [showAdded, setShowAdded] = useState(false);
  const inCart = isInCart(productId);

  const handleClick = () => {
    addToCart({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      maxStock,
    });

    // Show "Added" feedback for 2 seconds
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center space-x-1 hover:bg-amber-600 cursor-pointer bg-amber-500 px-1.5 py-0.5 rounded-full transition-colors duration-200 min-h-[44px] md:min-h-0"
      aria-label={`Add ${productName} to cart`}
    >
      {showAdded ? (
        <>
          <FaCheck className="text-green-700" />
          <p className="text-sm">Added!</p>
        </>
      ) : (
        <>
          <FaOpencart className="text-black" />
          <p className="text-sm">{inCart ? "Add More" : "Add To Cart"}</p>
        </>
      )}
    </button>
  );
};

export default AddToCart;
