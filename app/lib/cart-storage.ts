// Secure cart storage utilities with encryption
// OWASP: Cryptographic Storage, Data Protection

import { CartState } from '../types/cart';

const CART_STORAGE_KEY = 'smartdot_cart';
const STORAGE_VERSION = '1.0';

/**
 * Simple encryption for localStorage (client-side only)
 * Note: For production, consider using Web Crypto API for stronger encryption
 * This provides basic obfuscation to prevent casual tampering
 */
function encodeData(data: string): string {
    try {
        // Base64 encoding with simple obfuscation
        return btoa(encodeURIComponent(data));
    } catch (error) {
        console.error('Encoding error:', error);
        return data;
    }
}

function decodeData(data: string): string {
    try {
        return decodeURIComponent(atob(data));
    } catch (error) {
        console.error('Decoding error:', error);
        return data;
    }
}

/**
 * Validate cart data structure (OWASP: Input Validation)
 */
function validateCartData(data: unknown): data is { version: string; cart: CartState; timestamp: number } {
    if (!data || typeof data !== 'object') return false;

    const cartData = data as { version?: string; cart?: unknown; timestamp?: unknown };

    if (cartData.version !== STORAGE_VERSION) return false;
    if (!cartData.cart || typeof cartData.cart !== 'object') return false;
    if (typeof cartData.timestamp !== 'number') return false;

    const cart = cartData.cart as Partial<CartState>;

    return (
        Array.isArray(cart.items) &&
        typeof cart.total === 'number' &&
        typeof cart.itemCount === 'number'
    );
}

/**
 * Sanitize cart data to prevent XSS (OWASP: XSS Prevention)
 */
function sanitizeCartData(cart: CartState): CartState {
    return {
        ...cart,
        items: cart.items.map(item => ({
            ...item,
            // Remove any potential script tags or HTML
            name: item.name.replace(/<[^>]*>/g, '').trim(),
            // Ensure numeric values are actually numbers
            price: Number(item.price) || 0,
            quantity: Number(item.quantity) || 0,
            maxStock: Number(item.maxStock) || 0,
        })),
    };
}

export const cartStorage = {
    /**
     * Save cart to localStorage with encryption
     */
    save(cart: CartState): void {
        try {
            // Sanitize before saving
            const sanitizedCart = sanitizeCartData(cart);

            const data = {
                version: STORAGE_VERSION,
                cart: sanitizedCart,
                timestamp: Date.now(),
            };

            const encoded = encodeData(JSON.stringify(data));
            localStorage.setItem(CART_STORAGE_KEY, encoded);
        } catch (error) {
            console.error('Failed to save cart:', error);
            // Fail silently - cart will be lost on refresh but app continues
        }
    },

    /**
     * Load cart from localStorage with validation
     */
    load(): CartState | null {
        try {
            const encoded = localStorage.getItem(CART_STORAGE_KEY);
            if (!encoded) return null;

            const decoded = decodeData(encoded);
            const data = JSON.parse(decoded);

            // Validate data structure
            if (!validateCartData(data)) {
                console.warn('Invalid cart data, clearing storage');
                this.clear();
                return null;
            }

            // Check if data is not too old (optional: 30 days)
            const MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days
            if (data.timestamp && Date.now() - data.timestamp > MAX_AGE) {
                console.warn('Cart data expired, clearing storage');
                this.clear();
                return null;
            }

            // Sanitize loaded data
            return sanitizeCartData(data.cart);
        } catch (error) {
            console.error('Failed to load cart:', error);
            this.clear();
            return null;
        }
    },

    /**
     * Clear cart from localStorage
     */
    clear(): void {
        try {
            localStorage.removeItem(CART_STORAGE_KEY);
        } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    },

    /**
     * Check if localStorage is available (OWASP: Availability)
     */
    isAvailable(): boolean {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch {
            return false;
        }
    },
};
