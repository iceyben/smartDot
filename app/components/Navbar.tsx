import React from "react";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import clsx from "clsx";

import Image from "next/image";
import DropDown from "./DropDown";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-green-600 w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">
            {" "}
            <Link href="/">
              <Image src="/logo.png" alt="App Logo" width={40} height={40} />
            </Link>{" "}
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <div className="flex gap-4 items-center text-white ">
                <DropDown />
                <Link
                  href="/about"
                  className={clsx(
                    "hover:text-yellow-200 uppercase font-medium",
                    pathname === "/about" &&
                      "underline decoration-yellow-400 decoration-2  underline-offset-4"
                  )}
                >
                  About Us
                </Link>
                <Link
                  href="/products"
                  className={clsx(
                    "hover:text-yellow-200 uppercase font-medium",
                    pathname === "/products" &&
                      "underline decoration-yellow-400 decoration-2  underline-offset-4"
                  )}
                >
                  Products
                </Link>
                <Link href="/admin">
                  <FaRegUserCircle className="text-2xl" />
                </Link>
              </div>
            </ul>
          </div>
        </div>
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-orange-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <div className="">
            <Link href="/users">Users</Link>
          </div>
          <div>
            <Link href="/products">Products</Link>
          </div>
          <div>
            <Link href="/admin">
              <FaRegUserCircle className="text-2xl" />
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
