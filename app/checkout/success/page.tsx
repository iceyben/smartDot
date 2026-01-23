import Link from "next/link";
import { FaCheckCircle, FaWhatsapp } from "react-icons/fa";

export default function CheckoutSuccessPage() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <FaCheckCircle className="text-green-500 text-5xl" />
            </div>

            <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-600 max-w-md mb-8">
                Thank you for your order. If you haven&apos;t sent the WhatsApp message yet, please do so now to confirm your order details with our team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products" className="btn btn-outline">
                    Continue Shopping
                </Link>
                <Link href="/dashboard" className="btn btn-primary text-white">
                    View Account
                </Link>
            </div>
        </div>
    );
}
