import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
    addToCart as addCartItem,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart as clearBackendCart,
} from "../services/cartService";

const CartContext = createContext(null);

const normalizeCartItem = (item) => {
    const product = item?.product || item || {};

    return {
        ...product,
        id: product.id,
        cartItemId: item?.id,
        quantity: Number(item?.quantity || 0),
    };
};

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [cartLoading, setCartLoading] = useState(false);

    const loadCart = useCallback(async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setCartItems([]);
            return;
        }

        try {
            setCartLoading(true);
            const data = await getCart();

            setCartItems(
                Array.isArray(data)
                    ? data.map(normalizeCartItem)
                    : []
            );
        } catch (error) {
            console.error("Failed to load cart:", error);

            if (
                error.message?.toLowerCase().includes("unauthorized") ||
                error.message?.toLowerCase().includes("jwt") ||
                error.message?.toLowerCase().includes("expired")
            ) {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                localStorage.removeItem("userEmail");
                setCartItems([]);
            }
        } finally {
            setCartLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCart();

        const handleAuthChanged = () => {
            loadCart();
        };

        const handleLogoutChanged = () => {
            setCartItems([]);
        };

        window.addEventListener("authChanged", handleAuthChanged);
        window.addEventListener("logoutChanged", handleLogoutChanged);

        return () => {
            window.removeEventListener("authChanged", handleAuthChanged);
            window.removeEventListener("logoutChanged", handleLogoutChanged);
        };
    }, [loadCart]);

    const addToCart = async (product, quantity = 1) => {
        if (!product?.id) {
            return null;
        }

        if (!localStorage.getItem("token")) {
            return null;
        }

        try {
            const savedItem = await addCartItem(
                Number(product.id),
                quantity
            );

            const normalized = normalizeCartItem(savedItem);

            setCartItems((currentItems) => {
                const existing = currentItems.find(
                    (item) => String(item.id) === String(normalized.id)
                );

                if (existing) {
                    return currentItems.map((item) =>
                        String(item.id) === String(normalized.id)
                            ? normalized
                            : item
                    );
                }

                return [...currentItems, normalized];
            });

            return normalized;
        } catch (error) {
            console.error("Add to cart error:", error);
            alert(error.message || "Unable to add product to cart.");
            return null;
        }
    };

    const increaseQuantity = async (productId) => {
        const item = cartItems.find(
            (cartItem) => String(cartItem.id) === String(productId)
        );

        if (!item?.cartItemId) {
            return;
        }

        try {
            const savedItem = await updateCartItem(
                item.cartItemId,
                item.quantity + 1
            );

            const normalized = normalizeCartItem(savedItem);

            setCartItems((currentItems) =>
                currentItems.map((cartItem) =>
                    String(cartItem.id) === String(productId)
                        ? normalized
                        : cartItem
                )
            );
        } catch (error) {
            console.error("Increase cart quantity error:", error);
            alert(error.message || "Unable to update cart.");
        }
    };

    const decreaseQuantity = async (productId) => {
        const item = cartItems.find(
            (cartItem) => String(cartItem.id) === String(productId)
        );

        if (!item?.cartItemId) {
            return;
        }

        try {
            if (item.quantity <= 1) {
                await removeCartItem(item.cartItemId);

                setCartItems((currentItems) =>
                    currentItems.filter(
                        (cartItem) =>
                            String(cartItem.id) !== String(productId)
                    )
                );

                return;
            }

            const savedItem = await updateCartItem(
                item.cartItemId,
                item.quantity - 1
            );

            const normalized = normalizeCartItem(savedItem);

            setCartItems((currentItems) =>
                currentItems.map((cartItem) =>
                    String(cartItem.id) === String(productId)
                        ? normalized
                        : cartItem
                )
            );
        } catch (error) {
            console.error("Decrease cart quantity error:", error);
            alert(error.message || "Unable to update cart.");
        }
    };

    const removeFromCart = async (productId) => {
        const item = cartItems.find(
            (cartItem) => String(cartItem.id) === String(productId)
        );

        if (!item?.cartItemId) {
            return;
        }

        try {
            await removeCartItem(item.cartItemId);

            setCartItems((currentItems) =>
                currentItems.filter(
                    (cartItem) =>
                        String(cartItem.id) !== String(productId)
                )
            );
        } catch (error) {
            console.error("Remove cart item error:", error);
            alert(error.message || "Unable to remove product.");
        }
    };

    const clearCart = async () => {
        try {
            if (localStorage.getItem("token")) {
                await clearBackendCart();
            }
        } catch (error) {
            console.error("Clear cart error:", error);
        } finally {
            setCartItems([]);
        }
    };

    const clearLocalCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
    );

    const cartTotal = cartItems.reduce(
        (total, item) =>
            total +
            Number(item.price || 0) *
                Number(item.quantity || 0),
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount,
                cartTotal,
                cartLoading,
                loadCart,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
                clearLocalCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
}

export default CartContext;
