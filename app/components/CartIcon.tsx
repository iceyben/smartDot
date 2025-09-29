"use client";
import React from "react";
import { FaOpencart } from "react-icons/fa";

const CartIcon = () => {
     return (
          <>
               <div className="  ">
                    <span className="bg-red-500 absolute right-8 top-4  rounded-full px-[3px] py-[0px] flex justify-center items-center ">
                         <p className="text-[8px] text-center">1</p>
                    </span>
                    <FaOpencart className="text-xl relative " />
               </div>
          </>
     );
};

export default CartIcon;
