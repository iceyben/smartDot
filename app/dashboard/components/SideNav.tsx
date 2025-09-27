"use client";
import React from "react";
import { FiHome } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { IoDocumentsOutline } from "react-icons/io5";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoPowerSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

const SideNav = () => {
     const pathname = usePathname();
     return (
          <div className="flex flex-col space-y-4 pb-4 ">
               <div className="flex md:flex-col items-center justify-center  rounded-sm shadow-lg md:w-50 h-20 md:h-30 ">
                    <Link href="/">
                         <Image
                              src="/logo.png"
                              alt="App Logo"
                              width={40}
                              height={40}
                         />
                    </Link>

                    <h1 className=" ">SmartDotCom</h1>
               </div>

               <div className="flex justify-between items-center h-15 md:block md:space-y-5 px-3 ">
                    <Link href="/dashboard">
                         <div
                              className={clsx(
                                   "w-12 md:w-full h-10 flex  items-center md:mb-4 justify-center md:justify-start md:pl-3 text-2xl md:text-lg font-medium space-x-1.5 hover:bg-yellow-200 hover:text-black   ",
                                   {
                                        "bg-[#f9bf29]  md:bg-white text-green-70 md:text-[#f9bf29]":
                                             pathname === "/dashboard",
                                   }
                              )}
                         >
                              <FiHome className="" />{" "}
                              <h2 className="hidden md:block  ">Home</h2>
                         </div>
                    </Link>
                    {/* Employee nav link */}
                    <Link href="/dashboard/employees">
                         <div
                              className={clsx(
                                   "w-12 md:w-full h-10 flex  items-center pl-3 text-2xl md:mb-4 md:text-lg font-medium space-x-1.5 hover:bg-yellow-200 hover:text-black   ",
                                   {
                                        "bg-[#f9bf29]  md:bg-white text-green-70 md:text-[#f9bf29]":
                                             pathname ===
                                             "/dashboard/employees",
                                   }
                              )}
                         >
                              <FaRegUser className="" />{" "}
                              <h2 className="hidden md:block">Employees</h2>
                         </div>
                    </Link>
                    {/* Invoices nav link */}
                    <Link href="/dashboard/invoices">
                         <div
                              className={clsx(
                                   "w-12 md:w-full h-10 flex  items-center pl-3 text-2xl md:mb-4 md:text-lg font-medium space-x-1.5 hover:bg-yellow-200 hover:text-black  ",
                                   {
                                        " bg-[#f9bf29]  md:bg-white text-green-70 md:text-[#f9bf29]":
                                             pathname === "/dashboard/invoices",
                                   }
                              )}
                         >
                              <IoDocumentsOutline className="" />{" "}
                              <h2 className="hidden md:block">Invoices</h2>
                         </div>
                    </Link>

                    {/* Products nav links */}
                    <Link href="/dashboard/manage_products">
                         <div
                              className={clsx(
                                   "w-12 md:w-full h-10 flex  items-center pl-3 text-2xl md:text-lg font-medium space-x-1.5 hover:bg-yellow-200 hover:text-black  ",
                                   {
                                        "bg-[#f9bf29]  md:bg-white text-green-70 md:text-[#f9bf29]":
                                             pathname === "/dashboard/products",
                                   }
                              )}
                         >
                              <MdOutlineProductionQuantityLimits className="" />{" "}
                              <h2 className="hidden md:block">Products</h2>
                         </div>
                    </Link>
                    <div className="md:bg-gray-100 rounded-sm shadow-lg w-12 md:w-50 h-10 flex  items-center md:mt-30 pl-3 text-2xl md:text-lg font-medium space-x-1.5 hover:bg-yellow-200 ">
                         <IoPowerSharp className="" />{" "}
                         <h2 className="hidden md:block">Sign Out</h2>
                    </div>
               </div>
          </div>
     );
};

export default SideNav;
