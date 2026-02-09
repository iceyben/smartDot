"use client";

import React from "react";
import { FiHome, FiPackage, FiShoppingBag, FiUsers } from "react-icons/fi";
import { IoPowerSharp as PowerIcon } from "react-icons/io5";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

const AdminSideNav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", icon: FiHome, label: "Dashboard" },
    { href: "/admin/products", icon: FiPackage, label: "Products" },
    { href: "/admin/orders", icon: FiShoppingBag, label: "Orders" },
    { href: "/admin/admins", icon: FiUsers, label: "Admin Users" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-center gap-3 p-6 border-b border-gray-200">
        <Link href="/admin" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Admin Logo" width={32} height={32} />
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer",
                  {
                    "bg-green-100 text-green-700 font-semibold": isActive,
                    "text-gray-700 hover:bg-gray-100": !isActive,
                  }
                )}
              >
                <Icon className="text-xl" />
                <span className="text-sm">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Exit */}
      <div className="p-4 border-t border-gray-200">
        <Link href="/">
          <button
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 w-full transition-colors"
          >
            <PowerIcon className="text-xl" />
            <span className="text-sm font-medium">Exit Admin</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminSideNav;
