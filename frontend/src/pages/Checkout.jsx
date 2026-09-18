import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    CheckCircle,
    MapPin,
    ShoppingBag,
    Loader2,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { getProfile } from "../services/authService";

function Checkout() {
    const navigate = useNavigate();

    const {
        cartItems,
        cartCount,
        cartTotal,
        cartLoading,
        clearLocalCart,
    } = useCart();

    const [loadingUser, setLoadingUser] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const [address, setAddress] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    // =====================================================
    // FETCH LOGGED-IN USER PROFILE
    // =====================================================

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            setLoadingUser(true);

            if (!localStorage.getItem("token")) {
                navigate("/login");
                return;
            }

            const user = await getProfile();

            setAddress({
                name: user.name || "",
                phone: user.phone || "",
                address: user.address || "",
                city: user.city || "",
                state: user.state || "",
                pincode: user.pincode || "",
            });
        } catch (error) {
            console.error("Failed to fetch user profile:", error);

            if (error.message?.toLowerCase().includes("unauthorized")) {
                navigate("/login");
                return;
            }

            alert(error.message || "Unable to load your profile.");
        } finally {
            setLoadingUser(false);
        }
    };

    // =====================================================
    // HANDLE ADDRESS CHANGE
    // =====================================================

    const handleChange = (event) => {
        const { name, value } = event.target;

        setAddress((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    // =====================================================
    // PRODUCT HELPERS
    // =====================================================

    const getProductName = (item) => {
        return (
            item.name ||
            item.productName ||
            "Product"
        );
    };

    const getProductImage = (item) => {
        return (
            item.imageUrl ||
            item.image ||
            item.productImage ||
            "https://via.placeholder.com/150"
        );
    };

    const getProductPrice = (item) => {
        return Number(
            item.price ||
            item.sellingPrice ||
            0
        );
    };

    const getQuantity = (item) => {
        const quantity = Number(item.quantity);

        return quantity > 0 ? quantity : 1;
    };

    // =====================================================
    // TOTALS
    // =====================================================

    const subtotal = Number(cartTotal || 0);

    // The backend currently charges only the cart subtotal.
    const deliveryCharge = 0;
    const totalAmount = subtotal;

    // =====================================================
    // PLACE ORDER
    // =====================================================

    const handlePlaceOrder = async (event) => {
        event.preventDefault();

        if (!cartItems || cartItems.length === 0) {
            alert("Your cart is empty.");
            navigate("/cart");
            return;
        }

        const requiredFields = [
            "name",
            "phone",
            "address",
            "city",
            "state",
            "pincode",
        ];

        const missingField = requiredFields.some(
            (field) => !String(address[field] || "").trim()
        );

        if (missingField) {
            alert("Please fill in all delivery details.");
            return;
        }

        try {
            setPlacingOrder(true);

            const order = await createOrder(address);

            console.log("ORDER CREATED:", order);

            // The backend transaction already cleared the cart.
            // Clear only the frontend cart state here.
            clearLocalCart();

            setOrderPlaced(true);
        } catch (error) {
            console.error("Place order error:", error);

            if (
                error.status === 401 ||
                error.message?.toLowerCase().includes("unauthorized") ||
                error.message?.toLowerCase().includes("jwt") ||
                error.message?.toLowerCase().includes("expired")
            ) {
                navigate("/login");
                return;
            }

            alert(
                error.message ||
                "Something went wrong while placing your order."
            );
        } finally {
            setPlacingOrder(false);
        }
    };

    // =====================================================
    // ORDER SUCCESS
    // =====================================================

    if (orderPlaced) {
        return (
            <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-12">
                <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <CheckCircle size={42} />
                    </div>

                    <h1 className="mt-6 text-3xl font-black text-slate-950">
                        Order Placed Successfully
                    </h1>

                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                        Thank you for shopping with
                        SHOPX. Your order has been
                        placed successfully.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

                        <Link
                            to="/products"
                            className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
                        >
                            Continue Shopping
                        </Link>

                        <Link
                            to="/"
                            className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                        >
                            Back to Home
                        </Link>

                    </div>
                </div>
            </div>
        );
    }

    // =====================================================
    // CART LOADING
    // =====================================================

    if (cartLoading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center px-4">
                <Loader2
                    size={38}
                    className="animate-spin text-violet-600"
                />
            </div>
        );
    }

    // =====================================================
    // EMPTY CART
    // =====================================================

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-12">
                <div className="w-full rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">

                    <ShoppingBag
                        size={48}
                        className="mx-auto text-slate-300"
                    />

                    <h1 className="mt-5 text-2xl font-black text-slate-950">
                        Your cart is empty
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Add some products before
                        going to checkout.
                    </p>

                    <Link
                        to="/products"
                        className="mt-6 inline-flex rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
                    >
                        Shop Products
                    </Link>

                </div>
            </div>
        );
    }

    // =====================================================
    // CHECKOUT PAGE
    // =====================================================

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

            {/* HEADER */}

            <div className="mb-8">

                <Link
                    to="/cart"
                    className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
                >
                    <ArrowLeft size={17} />
                    Back to Cart
                </Link>

                <h1 className="text-3xl font-black tracking-tight text-slate-950">
                    Checkout
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Complete your delivery details
                    and place your order.
                </p>

            </div>

            {/* MAIN */}

            <div className="grid gap-6 lg:grid-cols-3">

                {/* =================================================
                    LEFT
                ================================================= */}

                <div className="space-y-6 lg:col-span-2">

                    {/* ADDRESS */}

                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="mb-6 flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <MapPin size={20} />
                            </div>

                            <div>

                                <h2 className="font-bold text-slate-950">
                                    Delivery Address
                                </h2>

                                <p className="text-xs text-slate-500">
                                    Your saved profile
                                    information
                                </p>

                            </div>

                        </div>

                        {/* LOADING */}

                        {loadingUser && (
                            <div className="mb-5 flex items-center gap-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">

                                <Loader2
                                    size={18}
                                    className="animate-spin"
                                />

                                Loading your profile...
                            </div>
                        )}

                        <form
                            id="checkout-form"
                            onSubmit={
                                handlePlaceOrder
                            }
                        >

                            <div className="grid gap-5 sm:grid-cols-2">

                                {/* NAME */}

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={
                                            address.name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter your name"
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                    />

                                </div>

                                {/* PHONE */}

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={
                                            address.phone
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter phone number"
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                    />

                                </div>

                                {/* ADDRESS */}

                                <div className="sm:col-span-2">

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Address
                                    </label>

                                    <textarea
                                        name="address"
                                        value={
                                            address.address
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="House number, street, area..."
                                        rows={4}
                                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                    />

                                </div>

                                {/* CITY */}

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        City
                                    </label>

                                    <input
                                        type="text"
                                        name="city"
                                        value={
                                            address.city
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter city"
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                    />

                                </div>

                                {/* STATE */}

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        State
                                    </label>

                                    <input
                                        type="text"
                                        name="state"
                                        value={
                                            address.state
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter state"
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                    />

                                </div>

                                {/* PINCODE */}

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Pincode
                                    </label>

                                    <input
                                        type="text"
                                        name="pincode"
                                        value={
                                            address.pincode
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter pincode"
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                    />

                                </div>

                            </div>

                        </form>

                    </section>

                    {/* =================================================
                        ORDER ITEMS
                    ================================================= */}

                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="mb-5 flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                <ShoppingBag size={20} />
                            </div>

                            <div>

                                <h2 className="font-bold text-slate-950">
                                    Order Items
                                </h2>

                                <p className="text-xs text-slate-500">
                                    {cartItems.length} product
                                    {cartItems.length !== 1
                                        ? "s"
                                        : ""}
                                </p>

                            </div>

                        </div>

                        <div className="divide-y divide-slate-100">

                            {cartItems.map(
                                (item, index) => {

                                    const price =
                                        getProductPrice(
                                            item
                                        );

                                    const quantity =
                                        getQuantity(
                                            item
                                        );

                                    return (
                                        <div
                                            key={
                                                item.id ||
                                                item.productId ||
                                                index
                                            }
                                            className="flex gap-4 py-4 first:pt-0 last:pb-0"
                                        >

                                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-50">

                                                <img
                                                    src={getProductImage(
                                                        item
                                                    )}
                                                    alt={getProductName(
                                                        item
                                                    )}
                                                    className="h-full w-full object-contain p-2"
                                                />

                                            </div>

                                            <div className="min-w-0 flex-1">

                                                <h3 className="line-clamp-2 text-sm font-bold text-slate-900">
                                                    {getProductName(
                                                        item
                                                    )}
                                                </h3>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    Quantity:{" "}
                                                    {
                                                        quantity
                                                    }
                                                </p>

                                                <p className="mt-2 text-sm font-black text-slate-950">
                                                    ₹
                                                    {(
                                                        price *
                                                        quantity
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </p>

                                            </div>

                                        </div>
                                    );
                                }
                            )}

                        </div>

                    </section>

                </div>

                {/* =================================================
                    RIGHT SUMMARY
                ================================================= */}

                <div>

                    <section className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <h2 className="text-lg font-black text-slate-950">
                            Order Summary
                        </h2>

                        <div className="mt-6 space-y-4">

                            <div className="flex items-center justify-between text-sm">

                                <span className="text-slate-500">
                                    Items
                                </span>

                                <span className="font-semibold text-slate-900">
                                    {cartCount}
                                </span>

                            </div>

                            <div className="flex items-center justify-between text-sm">

                                <span className="text-slate-500">
                                    Subtotal
                                </span>

                                <span className="font-semibold text-slate-900">
                                    ₹
                                    {subtotal.toLocaleString(
                                        "en-IN"
                                    )}
                                </span>

                            </div>

                            <div className="flex items-center justify-between text-sm">

                                <span className="text-slate-500">
                                    Delivery
                                </span>

                                <span className="font-semibold text-slate-900">
                                    {deliveryCharge ===
                                        0
                                        ? "FREE"
                                        : `₹${deliveryCharge}`}
                                </span>

                            </div>

                            <div className="border-t border-slate-100 pt-4">

                                <div className="flex items-center justify-between">

                                    <span className="font-bold text-slate-950">
                                        Total
                                    </span>

                                    <span className="text-xl font-black text-slate-950">
                                        ₹
                                        {totalAmount.toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>

                                </div>

                            </div>

                        </div>

                        <button
                            type="submit"
                            form="checkout-form"
                            disabled={
                                loadingUser ||
                                placingOrder
                            }
                            className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-bold text-white shadow-lg transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            {placingOrder ? (
                                <>
                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />
                                    Placing Order...
                                </>
                            ) : (
                                <>
                                    <CheckCircle
                                        size={18}
                                    />
                                    Place Order
                                </>
                            )}

                        </button>

                        <p className="mt-4 text-center text-[11px] leading-5 text-slate-400">
                            By placing your order,
                            you agree to the SHOPX
                            terms and conditions.
                        </p>

                    </section>

                </div>

            </div>
        </div>
    );
}

export default Checkout;