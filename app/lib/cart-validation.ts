// Cart validation utilities (OWASP: Input Validation)

import { CartItem, CART_LIMITS } from '../types/cart';

export class CartValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CartValidationError';
    }
}

/**
 * Validate item before adding to cart
 * OWASP: Input Validation, Business Logic
 */
export function validateCartItem(
    item: Partial<CartItem>,
    currentCartSize: number
): { valid: boolean; error?: string } {
    // Check if cart is full (DoS prevention)
    if (currentCartSize >= CART_LIMITS.MAX_ITEMS) {
        return {
            valid: false,
            error: `Cart is full. Maximum ${CART_LIMITS.MAX_ITEMS} items allowed.`,
        };
    }

    // Validate required fields
    if (!item.id || typeof item.id !== 'string') {
        return { valid: false, error: 'Invalid item ID' };
    }

    if (!item.name || typeof item.name !== 'string') {
        return { valid: false, error: 'Invalid item name' };
    }

    // Validate name length (XSS/DoS prevention)
    if (item.name.length > 200) {
        return { valid: false, error: 'Item name too long' };
    }

    // Validate price
    if (typeof item.price !== 'number' || isNaN(item.price)) {
        return { valid: false, error: 'Invalid price' };
    }

    if (item.price < CART_LIMITS.MIN_PRICE || item.price > CART_LIMITS.MAX_PRICE) {
        return {
            valid: false,
            error: `Price must be between $${CART_LIMITS.MIN_PRICE} and $${CART_LIMITS.MAX_PRICE}`,
        };
    }

    // Validate quantity
    const quantity = item.quantity || 1;
    if (typeof quantity !== 'number' || isNaN(quantity) || !Number.isInteger(quantity)) {
        return { valid: false, error: 'Invalid quantity' };
    }

    if (quantity < CART_LIMITS.MIN_QUANTITY || quantity > CART_LIMITS.MAX_QUANTITY_PER_ITEM) {
        return {
            valid: false,
            error: `Quantity must be between ${CART_LIMITS.MIN_QUANTITY} and ${CART_LIMITS.MAX_QUANTITY_PER_ITEM}`,
        };
    }

    // Validate stock
    if (item.maxStock !== undefined) {
        if (typeof item.maxStock !== 'number' || isNaN(item.maxStock)) {
            return { valid: false, error: 'Invalid stock value' };
        }

        if (quantity > item.maxStock) {
            return {
                valid: false,
                error: `Only ${item.maxStock} items available in stock`,
            };
        }
    }

    // Validate image URL
    if (item.image && typeof item.image !== 'string') {
        return { valid: false, error: 'Invalid image URL' };
    }

    return { valid: true };
}

/**
 * Sanitize string input to prevent XSS
 * OWASP: XSS Prevention
 */
export function sanitizeString(input: string): string {
    return input
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/[<>'"]/g, '') // Remove special characters
        .trim()
        .substring(0, 200); // Limit length
}

/**
 * Validate and sanitize quantity update
 */
export function validateQuantity(quantity: unknown): {
    valid: boolean;
    sanitized?: number;
    error?: string;
} {
    // Type check
    if (typeof quantity !== 'number' || isNaN(quantity)) {
        return { valid: false, error: 'Quantity must be a number' };
    }

    // Integer check
    if (!Number.isInteger(quantity)) {
        return { valid: false, error: 'Quantity must be a whole number' };
    }

    // Range check
    if (quantity < CART_LIMITS.MIN_QUANTITY) {
        return { valid: false, error: `Minimum quantity is ${CART_LIMITS.MIN_QUANTITY}` };
    }

    if (quantity > CART_LIMITS.MAX_QUANTITY_PER_ITEM) {
        return {
            valid: false,
            error: `Maximum quantity is ${CART_LIMITS.MAX_QUANTITY_PER_ITEM}`,
        };
    }

    return { valid: true, sanitized: quantity };
}

/**
 * Calculate cart total safely (prevent overflow)
 */
export function calculateTotal(items: CartItem[]): number {
    const total = items.reduce((sum, item) => {
        const itemTotal = item.price * item.quantity;
        return sum + itemTotal;
    }, 0);

    // Round to 2 decimal places
    return Math.round(total * 100) / 100;
}
