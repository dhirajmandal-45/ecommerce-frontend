import { apiRequest } from "./api";

export const createOrder = (shipping) =>
    apiRequest("/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            shippingAddress: shipping.address,
            shippingCity: shipping.city,
            shippingState: shipping.state,
            shippingPincode: shipping.pincode,
        }),
    });

export const getMyOrders = () =>
    apiRequest("/orders/my-orders");

export const getAdminOrders = () =>
    apiRequest("/admin/orders");

export const updateAdminOrderStatus = (orderId, status) =>
    apiRequest(`/admin/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
    });
