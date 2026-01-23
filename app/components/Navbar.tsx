"use client";
import React from "react";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import clsx from "clsx";

import Image from "next/image";
import DropDown from "./DropDown";
import { usePathname } from "next/navigation";
import { PiUserCircle } from "react-icons/pi";
import CartIcon from "./CartIcon";
import CartDrawer from "./CartDrawer";
import { useCart } from "../context/CartContext";

import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
     const pathname = usePathname();
     const { openCart } = useCart();
     const { data: session } = useSession();

     return (
          <div className="drawer">
               <input
                    id="my-drawer-3"
                    type="checkbox"
                    className="drawer-toggle"
               />
               <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="navbar bg-green-600 w-full px-4">
                         {/* Mobile Burger Menu (Left) */}
                         <div className="flex-none lg:hidden">
                              <label
                                   htmlFor="my-drawer-3"
                                   aria-label="open sidebar"
                                   className="btn btn-square btn-ghost text-white"
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

                         {/* Logo (Center on Mobile, Left on Desktop) */}
                         <div className="flex-1 lg:flex-none">
                              <Link href="/">
                                   <span className="flex items-center gap-1">
                                        <Image
                                             src="/logo.png"
                                             alt="App Logo"
                                             width={35}
                                             height={35}
                                        />
                                        <h1 className="text-lg md:text-2xl text-white font-bold whitespace-nowrap">
                                             SmartDotCom{" "}
                                             <span className="text-[10px] md:text-[12px] text-blue-800 hidden md:inline">
                                                  electronics
                                             </span>
                                        </h1>
                                   </span>
                              </Link>
                         </div>

                         {/* Mobile Actions (Right) */}
                         <div className="flex-none lg:hidden flex items-center gap-1 sm:gap-3">
                              {session ? (
                                   <div className="dropdown dropdown-end">
                                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar ring-2 ring-yellow-400 ring-offset-1 border-none shadow-sm">
                                             <div className="w-8 rounded-full">
                                                  {session.user?.image ? (
                                                       <img src={session.user.image} alt="Profile" referrerPolicy="no-referrer" />
                                                  ) : (
                                                       <PiUserCircle className="w-full h-full text-white" />
                                                  )}
                                             </div>
                                        </label>
                                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-white rounded-2xl w-52 text-gray-800 border border-gray-100">
                                             <li className="font-bold px-4 py-2 border-b border-gray-100">{session.user?.name || 'My Account'}</li>
                                             <li><Link href="/dashboard" className="py-3">Dashboard</Link></li>
                                             <li><button onClick={() => signOut()} className="py-3 text-red-500 font-bold">Logout</button></li>
                                        </ul>
                                   </div>
                              ) : (
                                   <div className="flex items-center gap-2">
                                        <Link href="/login" className="text-white text-[10px] font-bold uppercase py-1.5 px-3 border border-white/30 rounded-full">
                                             In
                                        </Link>
                                        <Link href="/signup" className="bg-yellow-400 text-green-800 text-[10px] font-black uppercase py-1.5 px-3 rounded-full shadow-sm">
                                             Join
                                        </Link>
                                   </div>
                              )}

                              <button
                                   onClick={openCart}
                                   className="flex items-center text-white p-1 ml-1"
                              >
                                   <CartIcon />
                              </button>
                         </div>

                         {/* Desktop Menu Content (Hidden on Mobile) */}
                         <div className="hidden lg:flex flex-1 justify-end px-2">
                              <ul className="menu menu-horizontal p-0">
                                   <div className="flex gap-6 items-center text-white">
                                        <DropDown />
                                        <Link
                                             href="/about"
                                             className={clsx(
                                                  "hover:text-yellow-200 uppercase font-semibold text-sm tracking-wide",
                                                  pathname === "/about" &&
                                                  "underline decoration-yellow-400 decoration-2 underline-offset-4"
                                             )}
                                        >
                                             About Us
                                        </Link>
                                        <Link
                                             href="/products"
                                             className={clsx(
                                                  "hover:text-yellow-200 uppercase font-semibold text-sm tracking-wide",
                                                  pathname === "/products" &&
                                                  "underline decoration-yellow-400 decoration-2 underline-offset-4"
                                             )}
                                        >
                                             Products
                                        </Link>

                                        {session ? (
                                             <div className="dropdown dropdown-end">
                                                  <label tabIndex={0} className="btn btn-ghost hover:bg-white/10 flex items-center gap-2 px-3 rounded-full transition-all border border-white/20">
                                                       <div className="flex flex-col items-end mr-1 hidden sm:flex">
                                                            <span className="text-[10px] uppercase font-bold text-white/70 leading-none">Account</span>
                                                            <span className="text-xs font-bold text-white max-w-[100px] truncate">{session.user?.name || 'User'}</span>
                                                       </div>
                                                       <div className="avatar">
                                                            <div className="w-9 h-9 rounded-full ring-2 ring-yellow-400 ring-offset-base-100 ring-offset-2 overflow-hidden shadow-lg">
                                                                 {session.user?.image ? (
                                                                      <img
                                                                           src={session.user.image}
                                                                           alt="Profile"
                                                                           referrerPolicy="no-referrer"
                                                                      />
                                                                 ) : (
                                                                      <div className="bg-gradient-to-br from-green-500 to-green-700 w-full h-full flex items-center justify-center">
                                                                           <PiUserCircle className="w-7 h-7 text-white" />
                                                                      </div>
                                                                 )}
                                                            </div>
                                                       </div>
                                                  </label>
                                                  <ul tabIndex={0} className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-white rounded-2xl w-64 text-gray-800 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                                                       <div className="px-4 py-3 border-b border-gray-100 mb-2">
                                                            <p className="text-xs text-gray-400 uppercase font-black tracking-widest">Signed in as</p>
                                                            <p className="font-bold text-green-600 truncate">{session.user?.email}</p>
                                                       </div>
                                                       <li>
                                                            <Link href="/dashboard" className="flex items-center gap-3 py-3 hover:bg-green-50 rounded-xl transition-colors font-semibold">
                                                                 <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                                                                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
                                                                 </div>
                                                                 Dashboard
                                                            </Link>
                                                       </li>
                                                       <li>
                                                            <Link href="/orders" className="flex items-center gap-3 py-3 hover:bg-green-50 rounded-xl transition-colors font-semibold">
                                                                 <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                                                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                                                                 </div>
                                                                 My Orders
                                                            </Link>
                                                       </li>
                                                       <div className="divider my-1 opacity-50"></div>
                                                       <li>
                                                            <button
                                                                 onClick={() => signOut()}
                                                                 className="flex items-center gap-3 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-bold"
                                                            >
                                                                 <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                                                                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                                                                 </div>
                                                                 Sign Out
                                                            </button>
                                                       </li>
                                                  </ul>
                                             </div>
                                        ) : (
                                             <div className="flex items-center gap-3">
                                                  <Link
                                                       href="/login"
                                                       className="text-white hover:text-white border border-white/30 hover:border-white px-5 py-2 rounded-full transition-all font-bold text-xs uppercase hover:bg-white/10 active:scale-95"
                                                  >
                                                       Login
                                                  </Link>
                                                  <Link
                                                       href="/signup"
                                                       className="bg-yellow-400 text-green-800 px-5 py-2 rounded-full hover:bg-white hover:text-green-600 transition-all font-black text-xs uppercase shadow-[0_4px_14px_0_rgba(250,204,21,0.39)] active:scale-95"
                                                  >
                                                       Join Now
                                                  </Link>
                                             </div>
                                        )}

                                        <button
                                             onClick={openCart}
                                             className="flex items-center hover:text-yellow-400 transition-colors ml-2"
                                        >
                                             <CartIcon />
                                        </button>
                                        <CartDrawer />
                                   </div>
                              </ul>
                         </div>
                    </div>
                    {/* Page content here */}
               </div>
               <div className="drawer-side z-50">
                    <label
                         htmlFor="my-drawer-3"
                         aria-label="close sidebar"
                         className="drawer-overlay"
                    ></label>
                    <ul className="menu bg-white min-h-full w-80 p-4 gap-4 text-black">
                         {/* Sidebar content here */}
                         <div className="mb-6 border-b pb-4">
                              <Link href="/" className="flex items-center gap-2">
                                   <Image
                                        src="/logo.png"
                                        alt="App Logo"
                                        width={40}
                                        height={40}
                                   />
                                   <h1 className="text-xl font-bold text-green-600">
                                        SmartDotCom{" "}
                                        <span className="text-[10px] text-blue-800 block leading-none">
                                             electronics
                                        </span>
                                   </h1>
                              </Link>
                         </div>

                         <div className="flex flex-col gap-4 font-medium">
                              <div className="px-2">
                                   <p className="text-xs text-gray-400 mb-1 uppercase font-bold tracking-wider">Browse</p>
                                   <DropDown />
                              </div>

                              <li className="border-b border-gray-100 pb-2">
                                   <Link href="/about" className="hover:text-green-600 active:bg-green-50 rounded-lg">
                                        About Us
                                   </Link>
                              </li>
                              <li className="border-b border-gray-100 pb-2">
                                   <Link href="/products" className="hover:text-green-600 active:bg-green-50 rounded-lg">
                                        Products
                                   </Link>
                              </li>

                              <li className="border-b border-gray-100 pb-2">
                                   <button
                                        onClick={() => {
                                             openCart();
                                             // Close drawer when cart opens
                                             const checkbox = document.getElementById('my-drawer-3') as HTMLInputElement;
                                             if (checkbox) checkbox.checked = false;
                                        }}
                                        className="flex justify-between items-center w-full hover:text-green-600 active:bg-green-50 rounded-lg"
                                   >
                                        <span className="font-medium">My Cart</span>
                                        <CartIcon />
                                   </button>
                              </li>

                              <div className="mt-4 pt-4 border-t border-gray-200">
                                   <p className="text-xs text-gray-400 mb-2 uppercase font-bold tracking-wider">Account</p>
                                   {session ? (
                                        <div className="flex flex-col gap-2 px-2">
                                             <div className="flex items-center gap-3 mb-4 p-4 bg-green-50 rounded-2xl border border-green-100 shadow-inner">
                                                  <div className="w-12 h-12 rounded-full ring-2 ring-yellow-400 ring-offset-2 overflow-hidden shadow-md">
                                                       {session.user?.image ? (
                                                            <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                                       ) : (
                                                            <div className="bg-green-600 w-full h-full flex items-center justify-center">
                                                                 <PiUserCircle className="w-8 h-8 text-white" />
                                                            </div>
                                                       )}
                                                  </div>
                                                  <div className="overflow-hidden flex-1">
                                                       <p className="text-sm font-black text-green-800 truncate">{session.user?.name || 'Valued User'}</p>
                                                       <p className="text-[10px] text-green-600 uppercase font-bold tracking-wider truncate">{session.user?.email}</p>
                                                  </div>
                                             </div>

                                             <Link href="/dashboard" className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-green-50 transition-colors font-bold text-gray-700">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
                                                  Dashboard
                                             </Link>

                                             <Link href="/orders" className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-green-50 transition-colors font-bold text-gray-700">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                                                  My Orders
                                             </Link>

                                             <button
                                                  onClick={() => signOut()}
                                                  className="flex items-center gap-3 w-full px-4 py-3 mt-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-black uppercase text-xs border border-transparent hover:border-red-100"
                                             >
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                                                  Logout
                                             </button>
                                        </div>
                                   ) : (
                                        <div className="flex flex-col gap-3 px-2 pt-2">
                                             <Link href="/login" className="flex items-center justify-center gap-2 border-2 border-green-600 text-green-600 py-3 rounded-xl hover:bg-green-50 transition-all font-black text-xs uppercase tracking-widest active:scale-95">
                                                  Sign in
                                             </Link>
                                             <Link href="/signup" className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-all font-black text-xs uppercase tracking-widest shadow-lg shadow-green-100 active:scale-95">
                                                  Create Account
                                             </Link>
                                        </div>
                                   )}
                              </div>
                         </div>
                    </ul>
               </div>
          </div>
     );
};

export default Navbar;
