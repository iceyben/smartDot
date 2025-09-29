import React from "react";
import AddToCart from "./AddToCart";
import Link from "next/link";
import Image from "next/image";
import { FaOpencart } from "react-icons/fa";
import { WishlistButton } from "./WishlistButton";


interface ProductCardProps {
   
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
          <div className="relative shadow-lg  flex flex-col bg-slate-200 p-3 rounded-2xl">
               <WishlistButton/>
               <Link href={`/products/${1}`}>
               <Image src="/image1.jpg" alt="Product" height={123} width={123} className=" rounded-lg w-full object-cover" />
               </Link>
               <div className="">
                    <span className="w-ful ">
                         <h2 className="text-[11px] font-medium mb-1 ">Product name</h2>
                         <p className="text-[9px] break-words">Product descricption kclkxl zk;lxzz;l xkz;lxkzx;lz x;lkxz;l kxz;lkxz;l kxz;lkx;lxz k;xzlk;xzlkc ;xzkc;xck;x zk;xzlk;xz kc;xzkc; xzk;xz</p>
                    </span>
                    <span className="flex justify-between items-center text-[11px] mt-5">
                         <p className="font-bold">${234 }</p>
                        <AddToCart/>
                    </span>
               </div>
          </div>
     );
};

export default ProductCard;
