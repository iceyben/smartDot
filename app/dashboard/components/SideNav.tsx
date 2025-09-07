"use client";
import React from "react";
import { CiHome } from "react-icons/ci";
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
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col items-center justify-center bg-[#f9bf29] rounded-sm shadow-lg md:w-50 h-30 ">
        <Link href="/">
          <Image src="/logo.png" alt="App Logo" width={40} height={40} />
        </Link>

        <h1 className=" ">DashBoard</h1>
      </div>

      <Link href="/dashboard">
        <div
          className={clsx(
            "bg-gray-100 rounded-sm shadow-lg md:w-50 h-10 flex  items-center pl-3 text-lg font-medium space-x-1.5 hover:bg-yellow-200  ",
            {
              "bg-yellow-200": pathname === "/dashboard",
            }
          )}
        >
          <CiHome className="" /> <h2>Home</h2>
        </div>
      </Link>
      {/* Employee nav link */}
      <Link href="/dashboard/employees">
        <div
          className={clsx(
            "bg-gray-100 rounded-sm shadow-lg md:w-50 h-10 flex  items-center pl-3 text-lg font-medium space-x-1.5 hover:bg-yellow-200 ",
            {
              "bg-yellow-200": pathname === "/dashboard/employees",
            }
          )}
        >
          <FaRegUser className="" /> <h2>Employees</h2>
        </div>
      </Link>
      {/* Invoices nav link */}
      <Link href="/dashboard/invoices">
        <div
          className={clsx(
            "bg-gray-100 rounded-sm shadow-lg md:w-50 h-10 flex  items-center pl-3 text-lg font-medium space-x-1.5 hover:bg-yellow-200 ",
            {
              " bg-yellow-200 ": pathname === "/dashboard/invoices",
            }
          )}
        >
          <IoDocumentsOutline className="" /> <h2>Invoices</h2>
        </div>
      </Link>

      {/* Products nav links */}
      <Link href="/dashboard/products">
        <div
          className={clsx(
            "bg-gray-100 rounded-sm shadow-lg md:w-50 h-10 flex  items-center pl-3 text-lg font-medium space-x-1.5 hover:bg-yellow-200 ",
            {
              "bg-yellow-200": pathname === "/dashboard/products",
            }
          )}
        >
          <MdOutlineProductionQuantityLimits className="" /> <h2>Products</h2>
        </div>
      </Link>
      <div className="bg-gray-100 rounded-sm shadow-lg md:w-50 h-10 flex  items-center mt-30 pl-3 text-lg font-medium space-x-1.5 hover:bg-yellow-200 ">
        <IoPowerSharp className="" /> <h2>Sign Out</h2>
      </div>
    </div>
  );
};

export default SideNav;
