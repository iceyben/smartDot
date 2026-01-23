import React from "react";
import AddToCart from "./AddToCart";
import Link from "next/link";
import Image from "next/image";
import { FaOpencart } from "react-icons/fa";
import { WishlistButton } from "./WishlistButton";


interface ProductCardProps {
     productId?: string;
     src?: string;
     alt?: string;
     status?: string;
     title?: string;
     description?: string;
     price?: number | string;
     category?: string;
     href?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
     productId,
     src = "/placeholder.jpg",
     alt = "Product",
     status,
     title = "Product Name",
     description = "Product description",
     href = "#",
     price = 0,
     category,
}) => {
     // Use provided productId or fallback to title-based ID
     const finalProductId = productId || title.toLowerCase().replace(/\s+/g, '-');

     return (
          <div className="relative shadow-lg flex flex-col bg-slate-200 p-3 rounded-2xl h-full hover:shadow-xl transition-shadow duration-300">
               <WishlistButton />

               <Link href={href || `/products/${finalProductId}`} className="block relative w-full aspect-square mb-2 overflow-hidden rounded-lg bg-white">
                    <Image
                         src={src}
                         alt={alt}
                         fill
                         sizes="(max-width: 768px) 50vw, 25vw"
                         className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                    {status && (
                         <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full shadow-sm z-10">
                              {status}
                         </span>
                    )}
               </Link>

               <div className="flex flex-col flex-grow justify-between">
                    <div>
                         <Link href={href || `/products/${finalProductId}`}>
                              <h2 className="text-sm font-bold mb-1 line-clamp-1 hover:text-green-600 transition-colors text-gray-800">
                                   {title}
                              </h2>
                         </Link>
                         <p className="text-[10px] text-gray-500 line-clamp-2 mb-3 min-h-[30px]">
                              {description}
                         </p>
                    </div>

                    <div className="flex justify-between items-center mt-2 border-t border-gray-300/50 pt-2">
                         <p className="font-extrabold text-lg text-gray-900">RWF {Number(price).toFixed(2)}</p>
                         <AddToCart
                              productId={finalProductId}
                              productName={title}
                              productPrice={Number(price)}
                              productImage={src}
                              maxStock={10} // temporary default - should fetch from product
                         />
                    </div>
               </div>
          </div>
     );
};

export default ProductCard;
