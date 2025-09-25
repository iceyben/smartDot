import Image from "next/image";
import React from "react";
import { BsX } from "react-icons/bs";

interface EmployeeCardProps {
     src: string;
     alt: string;
     name: string;
     position: string;
     email: string;
     phone: string;
}

const EmployeeCard = ({
     src,
     alt,
     name,
     position,
     email,
     phone,
}: EmployeeCardProps) => {
     return (
          <div className="bg-slate-200 p-4 rounded-lg flex md:flex-col md:justify-center  space-x-5 justify-center mt-5   ">
               <span>
                    <BsX className="text-xl cursor-pointer hover:bg-red-600 transition-colors duration-75 bg-amber-300 rounded-full hover:text-slate-200 " />
               </span>
               <div className="flex items-center md:justify-center">
                    <Image
                         src={src}
                         alt={alt}
                         height={194}
                         width={198}
                         className="h-20 w-20 object-cover rounded-full md:ml-4 "
                    />
               </div>
               <div className="space-y-2 ">
                    <h2 className="font-medium text-lg text-center"> {name}</h2>
                    <div className="bg-amber-300 w-18  mx-auto rounded-full   ">
                         <p className="text-center text-[10px] py-0.5">
                              {position}
                         </p>
                    </div>
                    <span className="md:text-center">
                         <p className="text-xs">{email}</p>
                         <p className="text-xs pt-1">{phone}</p>
                    </span>
               </div>
          </div>
     );
};

export default EmployeeCard;
