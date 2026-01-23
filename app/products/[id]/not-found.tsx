/**
 * Not Found Page for Product Details
 * Displayed when a product with the given ID doesn't exist in the database
 */

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="text-center p-8">
                <h1 className="text-6xl font-bold text-error mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                    Product Not Found
                </h2>
                <p className="text-gray-600 mb-8">
                    Sorry, the product you&apos;re looking for doesn&apos;t exist or has been removed.
                </p>
                <Link href="/products" className="btn btn-primary">
                    Browse All Products
                </Link>
            </div>
        </div>
    );
}
