import React from "react";
import Image from "next/image";
interface ProductCardProps {
  src: string;
  alt: string;
  className?: string; // optional class for grid placement
  btn: string;
  title: string;
  description: string;
}

const ProductCard = ({
  src,
  alt,
  className,
  btn,
  title,
  description,
}: ProductCardProps) => {
  return (
    <div
      className={`bg-amber-300 rounded-lg overflow-hidden ${className} aspect-square transition-transform duration-300`}
    >
      <div className="   relative ">
        <Image
          src={src}
          alt={alt}
          width={500}
          height={300}
          className="object-cover"
        />
        <p className="absolute hover:bg-red-800 top-3 left-3  bg-red-600 text-white px-2 py-1 rounded-full shadow-md text-[9px] font-medium space-x-0.5 uppercase">
          New
        </p>
      </div>
      <div className="pl-2 pt-0.5 ">
        <h2 className="font-medium text-sm">Prices</h2>
        <p className="text-[11px]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore,
          perspiciatis.
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
