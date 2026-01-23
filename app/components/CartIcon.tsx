"use client";
import React from "react";
import { FaOpencart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const CartIcon = () => {
     const { cart } = useCart();

     return (
          <div className="relative inline-flex items-center">
               <FaOpencart className="text-xl" />
               {cart.itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full min-w-[18px] h-[18px] flex justify-center items-center px-1">
                         <p className="text-[10px] font-semibold">
                              {cart.itemCount > 99 ? '99+' : cart.itemCount}
                         </p>
                    </span>
               )}
          </div>
     );
};

export default CartIcon;
