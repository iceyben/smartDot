"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "./Navbar";

const ConditionalNavbar = () => {
  const pathname = usePathname();
  if (!pathname) return null;

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) return null;
  return <Navbar />;
};

export default ConditionalNavbar;

