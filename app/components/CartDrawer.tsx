'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaTimes, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
    const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity } = useCart();
    const drawerRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                closeCart();
            }
        };

        if (isCartOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            // Prevent body scroll when drawer is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen, closeCart]);

    // Handle escape key
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') closeCart();
        };

        if (isCartOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isCartOpen, closeCart]);

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity duration-300">
            <div
                ref={drawerRef}
                className="w-full max-w-md bg-base-100 h-full shadow-2xl flex flex-col transform transition-transform duration-300 animate-slide-in-right"
            >
                {/* Header */}
                <div className="p-4 border-b flex justify-between items-center bg-base-200">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        Your Cart <span className="badge badge-primary">{cart.itemCount}</span>
                    </h2>
                    <button
                        onClick={closeCart}
                        className="btn btn-ghost btn-circle btn-sm hover:bg-base-300"
                        aria-label="Close cart"
                    >
                        <FaTimes className="text-lg" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70">
                            <div className="text-6xl">🛒</div>
                            <p className="text-lg font-medium">Your cart is currently empty.</p>
                            <button onClick={closeCart} className="btn btn-primary btn-sm">
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        cart.items.map((item) => (
                            <div key={item.id} className="flex gap-4 p-3 bg-base-100 border rounded-xl hover:shadow-sm transition-shadow">
                                <div className="relative h-20 w-20 flex-shrink-0 bg-base-200 rounded-lg overflow-hidden">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                            <span className="text-2xl">📷</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-medium text-sm line-clamp-2 pr-2" title={item.name}>
                                            {item.name}
                                        </h3>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-error hover:bg-error/10 p-1.5 rounded-full transition-colors"
                                            aria-label="Remove item"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-end mt-2">
                                        <div className="flex items-center gap-2 bg-base-200 rounded-lg p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-6 h-6 flex items-center justify-center hover:bg-base-300 rounded text-xs"
                                                disabled={item.quantity <= 1}
                                            >
                                                <FaMinus />
                                            </button>
                                            <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-6 h-6 flex items-center justify-center hover:bg-base-300 rounded text-xs"
                                                disabled={item.maxStock ? item.quantity >= item.maxStock : false}
                                            >
                                                <FaPlus />
                                            </button>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500">Unit: RWF {item.price.toFixed(2)}</p>
                                            <p className="font-bold text-primary">RWF {(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cart.items.length > 0 && (
                    <div className="p-4 border-t bg-base-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-bold">RWF {cart.total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-xl font-extrabold text-primary">RWF {cart.total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <Link
                                href="/checkout"
                                onClick={closeCart}
                                className="btn btn-primary w-full text-white"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
