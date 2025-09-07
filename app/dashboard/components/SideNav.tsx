import React from "react";
import { CiHome } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoDocumentsOutline } from "react-icons/io5";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { PiSignOut } from "react-icons/pi";

const SideNav = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="bg-[#f9bf29] rounded-sm shadow-lg md:w-50 h-30 ">
        <h1 className="flex justify-center pt-10 ">DashBoard</h1>
      </div>
      <div className="bg-gray-100 rounded-sm shadow-lg md:w-50 h-10 flex  items-center pl-3 text-lg font-medium space-x-1.5 hover:bg-yellow-200 ">
        <CiHome className="" /> <h2>Home</h2>
      </div>
      <div className="bg-gray-100 rounded-sm shadow-lg md:w-50 h-10 flex  items-center pl-3 text-lg font-medium space-x-1.5 hover:bg-yellow-200 ">
        <FaRegUser className="" /> <h2>Employee</h2>
      </div>
      <div className="bg-gray-100 rounded-sm shadow-lg md:w-50 h-10 flex  items-center pl-3 text-lg font-medium space-x-1.5 hover:bg-yellow-200 ">
        <IoDocumentsOutline className="" /> <h2>Invoices</h2>
      </div>
      <div className="bg-gray-100 rounded-sm shadow-lg md:w-50 h-10 flex  items-center pl-3 text-lg font-medium space-x-1.5 hover:bg-yellow-200 ">
        <MdOutlineProductionQuantityLimits className="" /> <h2>Product</h2>
      </div>
      <div className="bg-gray-100 rounded-sm shadow-lg md:w-50 h-10 flex  items-center mt-30 pl-3 text-lg font-medium space-x-1.5 hover:bg-yellow-200 ">
        <PiSignOut className="" /> <h2>Sign Out</h2>
      </div>
    </div>
  );
};

export default SideNav;
