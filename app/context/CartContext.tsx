'use client';

// Cart Context Provider with security measures
// OWASP: Secure State Management, Input Validation, XSS Prevention

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { CartState, CartContextType, CartItem, CART_LIMITS } from '../types/cart';
import { cartStorage } from '../lib/cart-storage';
import {
    validateCartItem,
    validateQuantity,
    calculateTotal,
    sanitizeString,
} from '../lib/cart-validation';

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialCartState: CartState = {
    items: [],
    total: 0,
    itemCount: 0,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartState>(initialCartState);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        if (cartStorage.isAvailable()) {
            const savedCart = cartStorage.load();
            if (savedCart) {
                setCart(savedCart);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isLoaded && cartStorage.isAvailable()) {
            cartStorage.save(cart);
        }
    }, [cart, isLoaded]);

    // Recalculate totals
    const updateTotals = useCallback((items: CartItem[]): CartState => {
        const total = calculateTotal(items);
        const itemCount = items.reduce((count, item) => count + item.quantity, 0);

        return {
            items,
            total,
            itemCount,
        };
    }, []);

    // Add item to cart with validation
    const addToCart = useCallback(
        (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
            try {
                const quantity = item.quantity || 1;

                // Validate item
                const validation = validateCartItem(
                    { ...item, quantity },
                    cart.items.length
                );

                if (!validation.valid) {
                    // In production, show toast notification to user
                    alert(validation.error); // Temporary - replace with toast
                    return;
                }

                setCart((prevCart) => {
                    const existingItemIndex = prevCart.items.findIndex(
                        (cartItem) => cartItem.id === item.id
                    );

                    let newItems: CartItem[];

                    if (existingItemIndex > -1) {
                        // Item already in cart - update quantity
                        const existingItem = prevCart.items[existingItemIndex];
                        const newQuantity = existingItem.quantity + quantity;

                        // Check stock limit
                        if (item.maxStock && newQuantity > item.maxStock) {
                            alert(`Only ${item.maxStock} items available in stock`);
                            return prevCart;
                        }

                        // Check quantity limit
                        if (newQuantity > CART_LIMITS.MAX_QUANTITY_PER_ITEM) {
                            alert(`Maximum ${CART_LIMITS.MAX_QUANTITY_PER_ITEM} items per product`);
                            return prevCart;
                        }

                        newItems = [...prevCart.items];
                        newItems[existingItemIndex] = {
                            ...existingItem,
                            quantity: newQuantity,
                        };
                    } else {
                        // New item - add to cart
                        const newItem: CartItem = {
                            id: item.id,
                            name: sanitizeString(item.name),
                            price: item.price,
                            quantity,
                            image: item.image,
                            maxStock: item.maxStock,
                        };

                        newItems = [...prevCart.items, newItem];
                    }

                    return updateTotals(newItems);
                });
            } catch (error) {
                alert('Failed to add item to cart');
            }
        },
        [cart.items.length, updateTotals]
    );

    // Remove item from cart
    const removeFromCart = useCallback(
        (itemId: string) => {
            try {
                // Validate itemId (prevent injection)
                if (!itemId || typeof itemId !== 'string') {
                    return;
                }

                setCart((prevCart) => {
                    const newItems = prevCart.items.filter((item) => item.id !== itemId);
                    return updateTotals(newItems);
                });
            } catch (error) {
                alert('Failed to remove item from cart');
            }
        },
        [updateTotals]
    );

    // Update item quantity
    const updateQuantity = useCallback(
        (itemId: string, quantity: number) => {
            try {
                // Validate itemId
                if (!itemId || typeof itemId !== 'string') {
                    return;
                }

                // Validate quantity
                const quantityValidation = validateQuantity(quantity);
                if (!quantityValidation.valid) {
                    alert(quantityValidation.error);
                    return;
                }

                setCart((prevCart) => {
                    const itemIndex = prevCart.items.findIndex((item) => item.id === itemId);

                    if (itemIndex === -1) {
                        return prevCart;
                    }

                    const item = prevCart.items[itemIndex];

                    // Check stock limit
                    if (item.maxStock && quantity > item.maxStock) {
                        alert(`Only ${item.maxStock} items available in stock`);
                        return prevCart;
                    }

                    const newItems = [...prevCart.items];
                    newItems[itemIndex] = {
                        ...item,
                        quantity: quantityValidation.sanitized!,
                    };

                    return updateTotals(newItems);
                });
            } catch (error) {
                alert('Failed to update quantity');
            }
        },
        [updateTotals]
    );

    // Clear cart
    const clearCart = useCallback(() => {
        try {
            setCart(initialCartState);
            cartStorage.clear();
        } catch (error) {
        }
    }, []);

    // Check if item is in cart
    const isInCart = useCallback(
        (itemId: string): boolean => {
            return cart.items.some((item) => item.id === itemId);
        },
        [cart.items]
    );

    const value: CartContextType = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook to use cart context
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
