"use client"; // if you're using Next.js app router

import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import clsx from "clsx";

export const WishlistButton = () => {
  const [liked, setLiked] = useState(false);

  return (
    <span
      onClick={() => setLiked((prev) => !prev)} // toggle state
      className="absolute bg-white rounded-full p-1 right-5 top-4 cursor-pointer"
    >
      <FaHeart
        className={clsx(
          "text-sm transition-colors duration-200", // base styles
          liked ? "text-red-400" : "text-gray-300" // conditional styles
        )}
      />
    </span>
  );
};
