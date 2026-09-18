import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, ShoppingBag } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getMyOrders } from "../services/orderService";

function Orders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadOrders = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getMyOrders();
                setOrders(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Load orders error:", err);
                setError(err.message || "Unable to load orders.");

                if (
                    err.status === 401 ||
                    err.message?.toLowerCase().includes("unauthorized") ||
                    err.message?.toLowerCase().includes("jwt") ||
                    err.message?.toLowerCase().includes("expired")
                ) {
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Navbar />
                <div className="flex min-h-[60vh] items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-violet-600" />
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center gap-3">
                    <Link
                        to="/profile"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    >
                        <ArrowLeft size={18} />
                    </Link>

                    <div>
                        <h1 className="text-3xl font-black text-slate-950">
                            My Orders
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            View your orders and delivery details.
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {orders.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                        <ShoppingBag
                            size={50}
                            className="mx-auto text-slate-300"
                        />
                        <h2 className="mt-4 text-xl font-bold text-slate-900">
                            No orders yet
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Your completed orders will appear here.
                        </p>
                        <Link
                            to="/products"
                            className="mt-6 inline-flex rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:bg-violet-600"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                            >
                                <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Order #{order.id}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-400">
                                            {order.createdAt
                                                ? new Date(order.createdAt).toLocaleString("en-IN")
                                                : ""}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                                            {order.status}
                                        </span>
                                        <span className="text-lg font-black text-slate-950">
                                            ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3 py-4">
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
                                        Delivery Address
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
            </main>

            <Footer />
        </div>
    );
}

export default Orders;
