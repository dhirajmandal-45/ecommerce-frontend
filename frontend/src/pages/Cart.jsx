import {
    Minus,
    Plus,
    Trash2,
    ShoppingBag,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
    const navigate = useNavigate();

    const {
        cartItems,
        cartCount,
        cartTotal,
        cartLoading,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
    } = useCart();

    if (cartLoading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-violet-600" />
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="
                min-h-[70vh]
                flex
                items-center
                justify-center
                px-4
            ">
                <div className="
                    text-center
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-10
                    shadow-sm
                ">
                    <ShoppingBag
                        size={50}
                        className="
                            mx-auto
                            text-slate-300
                        "
                    />

                    <h2 className="
                        mt-4
                        text-2xl
                        font-black
                        text-slate-950
                    ">
                        Your cart is empty
                    </h2>

                    <p className="
                        mt-2
                        text-sm
                        text-slate-500
                    ">
                        Add some products to your cart.
                    </p>

                    <Link
                        to="/products"
                        className="
                            mt-6
                            inline-flex
                            rounded-xl
                            bg-slate-950
                            px-6 py-3
                            text-sm
                            font-bold
                            text-white
                            hover:bg-violet-600
                        "
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="
            mx-auto
            max-w-6xl
            px-4
            py-8
        ">
            <div className="mb-8">
                <h1 className="
                    text-3xl
                    font-black
                    text-slate-950
                ">
                    Shopping Cart
                </h1>

                <p className="
                    mt-2
                    text-sm
                    text-slate-500
                ">
                    {cartCount} item
                    {cartCount !== 1
                        ? "s"
                        : ""}{" "}
                    in your cart
                </p>
            </div>

            <div className="
                grid
                gap-6
                lg:grid-cols-3
            ">
                {/* ITEMS */}

                <div className="
                    space-y-4
                    lg:col-span-2
                ">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="
                                flex
                                gap-4
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                p-4
                                shadow-sm
                            "
                        >
                            <img
                                src={
                                    item.imageUrl ||
                                    item.image ||
                                    item.productImage
                                }
                                alt={item.name}
                                className="
                                    h-24
                                    w-24
                                    rounded-xl
                                    bg-slate-50
                                    object-contain
                                "
                            />

                            <div className="
                                flex
                                min-w-0
                                flex-1
                                flex-col
                                justify-between
                            ">
                                <div>
                                    <h3 className="
                                        line-clamp-2
                                        font-bold
                                        text-slate-900
                                    ">
                                        {item.name}
                                    </h3>

                                    <p className="
                                        mt-1
                                        font-black
                                        text-slate-950
                                    ">
                                        ₹
                                        {Number(
                                            item.price
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </p>
                                </div>

                                <div className="
                                    mt-3
                                    flex
                                    items-center
                                    justify-between
                                    gap-3
                                ">
                                    <div className="
                                        flex
                                        items-center
                                        rounded-xl
                                        border
                                        border-slate-200
                                    ">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                decreaseQuantity(
                                                    item.id
                                                )
                                            }
                                            className="
                                                flex
                                                h-9
                                                w-9
                                                items-center
                                                justify-center
                                                hover:bg-slate-50
                                            "
                                        >
                                            <Minus
                                                size={15}
                                            />
                                        </button>

                                        <span className="
                                            w-8
                                            text-center
                                            text-sm
                                            font-bold
                                        ">
                                            {
                                                item.quantity
                                            }
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                increaseQuantity(
                                                    item.id
                                                )
                                            }
                                            className="
                                                flex
                                                h-9
                                                w-9
                                                items-center
                                                justify-center
                                                hover:bg-slate-50
                                            "
                                        >
                                            <Plus
                                                size={15}
                                            />
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeFromCart(
                                                item.id
                                            )
                                        }
                                        className="
                                            flex
                                            items-center
                                            gap-1
                                            text-xs
                                            font-bold
                                            text-red-500
                                            hover:text-red-600
                                        "
                                    >
                                        <Trash2
                                            size={15}
                                        />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* SUMMARY */}

                <div className="
                    h-fit
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                    shadow-sm
                ">
                    <h2 className="
                        text-lg
                        font-black
                        text-slate-950
                    ">
                        Order Summary
                    </h2>

                    <div className="
                        mt-5
                        flex
                        justify-between
                        text-sm
                        text-slate-500
                    ">
                        <span>
                            Items ({cartCount})
                        </span>

                        <span>
                            ₹
                            {cartTotal.toLocaleString(
                                "en-IN"
                            )}
                        </span>
                    </div>

                    <div className="
                        my-5
                        border-t
                        border-slate-200
                    " />

                    <div className="
                        flex
                        justify-between
                        text-lg
                        font-black
                        text-slate-950
                    ">
                        <span>Total</span>

                        <span>
                            ₹
                            {cartTotal.toLocaleString(
                                "en-IN"
                            )}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/checkout"
                            )
                        }
                        className="
                            mt-6
                            h-12
                            w-full
                            rounded-xl
                            bg-slate-950
                            text-sm
                            font-bold
                            text-white
                            transition
                            hover:bg-violet-600
                        "
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;