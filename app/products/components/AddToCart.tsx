'use client'
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { FaOpencart } from "react-icons/fa";

const AddToCart = () => {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    setAdded((prev) => !prev); // toggle between true and false
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center space-x-1 hover:bg-amber-600 cursor-pointer bg-amber-500 px-1.5 py-0.5 rounded-full"
    >
      {added ? (
        <FaCheck className="text-green-500" />
      ) : (
        <FaOpencart className="text-black" />
      )}
      <p>{added ? "Added" : "Add To Cart"}</p>
    </button>
  );
};

export default AddToCart;
