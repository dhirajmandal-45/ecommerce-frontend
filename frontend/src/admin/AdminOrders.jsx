import { useEffect, useState } from "react";
import { Package, RefreshCw, ShoppingBag } from "lucide-react";

import {
    getAdminOrders,
    updateAdminOrderStatus,
} from "../services/orderService";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getAdminOrders();
            setOrders(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Admin orders error:", err);
            setError(err.message || "Unable to load orders.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, status) => {
        try {
            setUpdatingId(orderId);

            const updatedOrder = await updateAdminOrderStatus(
                orderId,
                status
            );

            setOrders((currentOrders) =>
                currentOrders.map((order) =>
                    order.id === orderId
                        ? updatedOrder
                        : order
                )
            );
        } catch (err) {
            console.error("Update order status error:", err);
            setError(
                err.message || "Unable to update order status."
            );
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-950">
                        Orders
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Manage customer orders.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={fetchOrders}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                    <RefreshCw
                        size={17}
                        className={loading ? "animate-spin" : ""}
                    />
                    Refresh
                </button>
            </div>

            {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
                    <p className="mt-4 text-sm text-slate-500">
                        Loading orders...
                    </p>
                </div>
            ) : orders.length === 0 ? (
                <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                    <ShoppingBag
                        size={50}
                        className="mx-auto text-slate-300"
                    />

                    <h3 className="mt-4 text-xl font-bold">
                        No orders yet
                    </h3>

                    <p className="mt-2 text-slate-500">
                        Customer orders will appear here.
                    </p>
                </div>
            ) : (
                <div className="mt-8 space-y-5">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                        >
                            <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Order
                                    </p>

                                    <h3 className="mt-1 text-xl font-black text-slate-950">
                                        #{order.id}
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {order.user?.name} · {order.user?.email}
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-lg font-black text-slate-950">
                                        ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                                    </span>

                                    <select
                                        value={order.status || "PENDING"}
                                        disabled={updatingId === order.id}
                                        onChange={(event) =>
                                            handleStatusChange(
                                                order.id,
                                                event.target.value
                                            )
                                        }
                                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-blue-500"
                                    >
                                        <option value="PENDING">PENDING</option>
                                        <option value="CONFIRMED">CONFIRMED</option>
                                        <option value="SHIPPED">SHIPPED</option>
                                        <option value="DELIVERED">DELIVERED</option>
                                        <option value="CANCELLED">CANCELLED</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-3 py-5">
                                {(order.items || []).map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-slate-50">
                                            {item.product?.imageUrl ? (
                                                <img
                                                    src={item.product.imageUrl}
                                                    alt={item.productName}
                                                    className="h-full w-full object-contain"
                                                />
                                            ) : (
                                                <Package
                                                    size={20}
                                                    className="text-slate-300"
                                                />
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-bold text-slate-900">
                                                {item.productName}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                ₹{Number(item.price || 0).toLocaleString("en-IN")} × {item.quantity}
                                            </p>
                                        </div>

                                        <p className="text-sm font-bold text-slate-900">
                                            ₹{Number(item.subtotal || 0).toLocaleString("en-IN")}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-slate-100 pt-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Shipping
                                </p>
                                <p className="mt-1 text-sm text-slate-700">
                                    {order.shippingAddress}, {order.shippingCity},{" "}
                                    {order.shippingState} - {order.shippingPincode}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminOrders;
