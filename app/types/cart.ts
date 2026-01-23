// Cart type definitions with strict typing for security
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    maxStock: number; // Prevent over-ordering
}

export interface CartState {
    items: CartItem[];
    total: number;
    itemCount: number;
}

export interface CartContextType {
    cart: CartState;
    addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    isInCart: (itemId: string) => boolean;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
}

// Validation constants (OWASP: Input Validation)
export const CART_LIMITS = {
    MAX_ITEMS: 100, // Prevent DoS attacks
    MAX_QUANTITY_PER_ITEM: 999,
    MIN_QUANTITY: 1,
    MAX_PRICE: 999999.99,
    MIN_PRICE: 0.01,
} as const;
