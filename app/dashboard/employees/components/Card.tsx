import Image from "next/image";
import React from "react";

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
          <div className="bg-slate-200 p-4 rounded-lg flex space-x-5 justify-center mt-5">
               <div className="flex items-center">
                    <Image
                         src={src}
                         alt={alt}
                         height={194}
                         width={198}
                         className="h-20 w-20 object-cover rounded-full"
                    />
               </div>
               <div className="space-y-2">
                    <h2 className="font-medium text-lg text-center"> {name}</h2>
                    <div className="bg-amber-300 w-18  mx-auto rounded-full  ">
                         <p className="text-center text-[10px] py-0.5">
                              {position}
                         </p>
                    </div>
                    <span>
                         <p className="text-xs">{email}</p>
                         <p className="text-xs pt-1">{phone}</p>
                    </span>
               </div>
          </div>
     );
};

export default EmployeeCard;
