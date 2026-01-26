"use client";

/**
 * Checkout Page
 * Handles order checkout with WhatsApp integration
 */

import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Define strict types for shipping info
interface ShippingInfo {
    fullName: string;
    phoneNumber: string;
    email: string; // optional
    address: string;
    city: string;
    note: string;
}

export default function CheckoutPage() {
    const { data: session } = useSession();
    const { cart, clearCart, updateQuantity, removeFromCart } = useCart();
    const router = useRouter();

    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
        fullName: "",
        phoneNumber: "",
        email: "",
        address: "",
        city: "",
        note: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingUser, setIsLoadingUser] = useState(false);

    // Auto-fill user info if logged in
    useEffect(() => {
        if (session?.user) {
            setShippingInfo(prev => ({
                ...prev,
                fullName: session.user?.name || prev.fullName,
                email: session.user?.email || prev.email,
                phoneNumber: session.user?.phoneNumber || prev.phoneNumber,
                address: session.user?.address || prev.address,
                city: session.user?.city || prev.city,
            }));

            // Fallback for fields not in session (e.g. if they just updated and session didn't refresh)
            if (!session.user.phoneNumber || !session.user.address) {
                const fetchLastOrder = async () => {
                    try {
                        setIsLoadingUser(true);
                        const res = await fetch('/api/orders/latest');
                        if (res.ok) {
                            const lastOrder = await res.json();
                            if (lastOrder && lastOrder.shippingInfo) {
                                const info = lastOrder.shippingInfo;
                                setShippingInfo(prev => ({
                                    ...prev,
                                    phoneNumber: prev.phoneNumber || info.phoneNumber || "",
                                    address: prev.address || info.address || "",
                                    city: prev.city || info.city || "",
                                }));
                            }
                        }
                    } catch (error) {
                        console.error("Error fetching last order:", error);
                    } finally {
                        setIsLoadingUser(false);
                    }
                };
                fetchLastOrder();
            }
        }
    }, [session]);

    // Preview modal state
    const [showPreview, setShowPreview] = useState(false);
    const [previewMessage, setPreviewMessage] = useState("");

    // WhatsApp admin phone number
    const ADMIN_WHATSAPP = "+250785657398";

    // If cart is empty, redirect to products
    if (cart.items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <Link href="/products" className="btn btn-primary text-white">
                    Browse Products
                </Link>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setShippingInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleWhatsAppOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            // 1. Create order in database
            const orderItems = cart.items.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price,
            }));

            const orderResponse = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: orderItems,
                    total: cart.total,
                    shippingInfo: {
                        fullName: shippingInfo.fullName,
                        phoneNumber: shippingInfo.phoneNumber,
                        email: shippingInfo.email,
                        address: shippingInfo.address,
                        city: shippingInfo.city,
                        note: shippingInfo.note,
                    },
                }),
            });

            if (!orderResponse.ok) {
                const errorData = await orderResponse.json();
                throw new Error(errorData.error || "Failed to create order");
            }

            const order = await orderResponse.json();
            const baseUrl = window.location.origin;

            // 2. Format the message for WhatsApp
            let message = `🌟 *NEW ORDER* 🌟\n`;
            message += `SmartDot Electronics\n`;
            message += `Order #${order.id.slice(-8).toUpperCase()}\n\n`;

            message += `👤 *Customer Details:*\n`;
            message += `Name: ${shippingInfo.fullName}\n`;
            message += `Phone: ${shippingInfo.phoneNumber}\n`;
            message += `Address: ${shippingInfo.address}, ${shippingInfo.city}\n`;
            if (shippingInfo.note) message += `Note: ${shippingInfo.note}\n`;

            message += `\n📦 *Order Summary:*\n`;
            cart.items.forEach((item, index) => {
                const itemTotal = (item.price * item.quantity).toFixed(2);
                message += `${index + 1}. *${item.name}*\n`;
                message += `   Qty: ${item.quantity}  |  $${itemTotal}\n`;
                if (item.image) {
                    const imageUrl = item.image.startsWith('http')
                        ? item.image
                        : `${baseUrl}${item.image}`;
                    message += `   🔗 [Image](${imageUrl})\n`;
                }
                message += `\n`;
            });

            message += `💰 *TOTAL: $${cart.total.toFixed(2)}*\n`;
            message += `--------------------------------\n`;

            setPreviewMessage(message);
            setShowPreview(true);

        } catch (error) {
            const err = error as Error;
            alert(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const confirmOrder = () => {
        if (!previewMessage) return;
        const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(previewMessage)}`;
        window.open(whatsappUrl, "_blank");
        clearCart();
        router.push('/checkout/success');
        setShowPreview(false);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <Link href="/products" className="flex items-center gap-2 text-gray-600 mb-6 hover:text-primary transition-colors font-medium">
                <FaArrowLeft /> Back to Shopping
            </Link>

            <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100">
                    <div className="flex justify-between items-center mb-6 border-b pb-2">
                        <h2 className="text-xl font-bold text-gray-800">Shipping Details</h2>
                        {session?.user?.phoneNumber && (
                            <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium flex items-center gap-1 animate-pulse">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                Profile info loaded
                            </span>
                        )}
                    </div>
                    <form onSubmit={handleWhatsAppOrder} className="space-y-5">
                        <div>
                            <label className="label pl-0">
                                <span className="label-text font-semibold text-gray-700">Full Name *</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                required
                                value={shippingInfo.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="input input-bordered w-full bg-gray-50 border-gray-300 focus:border-primary focus:bg-white transition-all shadow-sm"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="label pl-0">
                                    <span className="label-text font-semibold text-gray-700">Phone Number *</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    required
                                    value={shippingInfo.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="+1 234 567 890"
                                    className="input input-bordered w-full bg-gray-50 border-gray-300 focus:border-primary focus:bg-white transition-all shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="label pl-0">
                                    <span className="label-text font-semibold text-gray-700">City *</span>
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    required
                                    value={shippingInfo.city}
                                    onChange={handleChange}
                                    placeholder="New York"
                                    className="input input-bordered w-full bg-gray-50 border-gray-300 focus:border-primary focus:bg-white transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="label pl-0">
                                <span className="label-text font-semibold text-gray-700">Delivery Address *</span>
                            </label>
                            <textarea
                                name="address"
                                required
                                value={shippingInfo.address}
                                onChange={handleChange}
                                placeholder="123 Street Name, Apartment 4B"
                                className="textarea textarea-bordered w-full h-24 bg-gray-50 border-gray-300 focus:border-primary focus:bg-white transition-all shadow-sm"
                            ></textarea>
                        </div>

                        <div>
                            <label className="label pl-0">
                                <span className="label-text font-semibold text-gray-700">Order Notes (Optional)</span>
                            </label>
                            <textarea
                                name="note"
                                value={shippingInfo.note}
                                onChange={handleChange}
                                placeholder="Special instructions for delivery..."
                                className="textarea textarea-bordered w-full bg-gray-50 border-gray-300 focus:border-primary focus:bg-white transition-all shadow-sm"
                            ></textarea>
                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-success w-full text-white text-lg gap-2 shadow-lg shadow-green-200 hover:shadow-xl transition-shadow"
                            >
                                {isSubmitting ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    <FaWhatsapp className="text-xl" />
                                )}
                                Place Order via WhatsApp
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-white p-6 rounded-xl h-fit sticky top-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100">
                    <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Order Summary</h2>
                    <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {cart.items.map((item) => (
                            <div key={item.id} className="flex gap-4 py-3 border-b last:border-0 border-gray-100 items-start">
                                <div className="relative h-16 w-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">No Img</div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-sm line-clamp-2 text-gray-800 mb-1">{item.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500">Unit: ${item.price.toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center mt-2 gap-3">
                                        <div className="flex items-center bg-gray-100 rounded-md border border-gray-200">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-2 py-0.5 text-gray-600 hover:text-red-500 hover:bg-gray-200 rounded-l transition-colors"
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="text-xs font-semibold w-6 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-2 py-0.5 text-gray-600 hover:text-green-500 hover:bg-gray-200 rounded-r transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-xs text-red-500 hover:text-red-700 underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                        <div className="flex justify-between text-gray-600 text-sm">
                            <span>Subtotal</span>
                            <span>${cart.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 text-sm">
                            <span>Shipping</span>
                            <span className="text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded text-xs">Free</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold pt-3 border-t border-gray-200 mt-1">
                            <span className="text-gray-900">Total</span>
                            <span className="text-primary">${cart.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {showPreview && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-green-50">
                            <h3 className="text-xl font-bold text-green-800 flex items-center gap-2">
                                <FaWhatsapp className="text-2xl" /> Order Preview
                            </h3>
                            <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto bg-gray-50 flex-1">
                            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm font-mono text-sm whitespace-pre-wrap text-gray-700">
                                {previewMessage}
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3 bg-white">
                            <button onClick={() => setShowPreview(false)} className="btn btn-ghost flex-1">Edit Info</button>
                            <button onClick={confirmOrder} className="btn btn-success flex-[2] text-white font-bold gap-2">
                                <FaWhatsapp className="text-xl" /> Confirm & Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
