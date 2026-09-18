import { apiRequest } from "./api";

export const getCart = () =>
    apiRequest("/cart");

export const addToCart = (productId, quantity = 1) =>
    apiRequest("/cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            productId,
            quantity,
        }),
    });

export const updateCartItem = (cartItemId, quantity) =>
    apiRequest(`/cart/${cartItemId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
    });

export const removeCartItem = (cartItemId) =>
    apiRequest(`/cart/${cartItemId}`, {
        method: "DELETE",
    });

export const clearCart = () =>
    apiRequest("/cart", {
        method: "DELETE",
    });
