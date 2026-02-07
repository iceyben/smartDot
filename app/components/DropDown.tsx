"use client";

/**
 * DropDown Component
 * Displays a dropdown menu with product categories fetched from the database
 * Categories are dynamically loaded via API call
 */

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
}

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch categories from database on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (_error) {
        console.error("Error fetching categories:", _error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        type="button"
        className={clsx(
          "inline-flex w-full items-center justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-white/20 hover:bg-white/10 transition-all duration-200 ease-in-out",
          "font-sans tracking-wide"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Shop/Product
        <ChevronDown
          className={clsx("h-4 w-4 text-white/70 transition-transform duration-200", isOpen && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown menu */}
      <div
        className={clsx(
          "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none",
          "transform transition-all duration-200 ease-out",
          isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 -translate-y-2 pointer-events-none"
        )}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          {/* Header */}
          <div className="block px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
            Shop By Category
          </div>

          {/* Loading state */}
          {loading && (
            <div className="px-4 py-2 text-sm text-gray-500 text-center">
              Loading categories...
            </div>
          )}

          {/* Categories list */}
          {!loading && categories.length > 0 && (
            <>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-150 border-l-2 border-transparent hover:border-green-500"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </>
          )}

          {/* Empty state */}
          {!loading && categories.length === 0 && (
            <div className="px-4 py-2 text-sm text-gray-500 text-center">
              No categories available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropDown;
