import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Star, Check, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function ProductCard({ product = {} }) {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [added, setAdded] = useState(false);

    // ============================================================
    // PRODUCT IMAGE
    // ============================================================

    const image =
        product.imageUrl ||
        product.image ||
        product.productImage ||
        "https://via.placeholder.com/300";

    // ============================================================
    // PRODUCT NAME
    // ============================================================

    const name =
        product.name ||
        product.productName ||
        "Unnamed Product";

    // ============================================================
    // PRICE
    // ============================================================

    const price = Number(
        product.price ||
        product.sellingPrice ||
        0
    );

    // ============================================================
    // DISCOUNT
    // ============================================================

    const discount = Number(
        product.discount ||
        product.discountPercentage ||
        0
    );

    // ============================================================
    // RATING
    // ============================================================

    const rating = Number(
        product.rating ||
        product.averageRating ||
        4.3
    );

    // ============================================================
    // RATING COUNT
    // ============================================================

    const ratingCount =
        product.ratingCount ||
        product.reviewsCount ||
        128;

    // ============================================================
    // ORIGINAL PRICE
    // ============================================================

    const originalPrice =
        product.originalPrice ||
        product.mrp ||
        (discount > 0
            ? Math.round(
                price / (1 - discount / 100)
            )
            : null);

    // ============================================================
    // PRODUCT ID
    // ============================================================

    const productId = product.id;

    // ============================================================
    // ADD TO CART
    // ============================================================

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!productId) {
            console.error("Cannot add product without product ID");
            return;
        }

        if (!localStorage.getItem("token")) {
            navigate("/login");
            return;
        }

        const addedItem = await addToCart(product);

        if (!addedItem) {
            return;
        }

        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 1800);
    };

    // ============================================================
    // BUY NOW
    // ============================================================

    const handleBuyNow = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!productId) {
            console.error("Cannot buy product without product ID");
            return;
        }

        if (!localStorage.getItem("token")) {
            navigate("/login");
            return;
        }

        const addedItem = await addToCart(product);

        if (addedItem) {
            navigate("/checkout");
        }
    };

    return (
        <motion.article
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="
                group relative flex h-full flex-col
                overflow-hidden rounded-2xl
                border border-slate-200
                bg-white
                shadow-sm
                transition-shadow
                hover:shadow-xl
            "
        >
            {/* =====================================================
                PRODUCT IMAGE
            ===================================================== */}

            <div className="
                relative
                aspect-square
                overflow-hidden
                bg-slate-50
            ">
                <Link
                    to={`/products/${productId}`}
                    className="block h-full w-full"
                >
                    <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        className="
                            h-full w-full
                            object-contain p-3
                            transition-transform
                            duration-500
                            group-hover:scale-105
                        "
                    />
                </Link>

                {/* DISCOUNT */}

                {discount > 0 && (
                    <span
                        className="
                            absolute left-3 top-3
                            rounded-lg
                            bg-red-600
                            px-2 py-1
                            text-[10px]
                            font-bold
                            text-white
                            shadow-sm
                        "
                    >
                        {discount}% OFF
                    </span>
                )}

                {/* WISHLIST */}

                <button
                    type="button"
                    aria-label="Add to wishlist"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    className="
                        absolute right-3 top-3
                        flex h-9 w-9
                        items-center justify-center
                        rounded-full
                        border border-slate-200
                        bg-white/95
                        text-slate-600
                        shadow-sm
                        backdrop-blur
                        transition
                        hover:text-red-500
                    "
                >
                    <Heart size={17} />
                </button>
            </div>

            {/* =====================================================
                PRODUCT INFORMATION
            ===================================================== */}

            <div className="
                flex flex-1
                flex-col
                p-4
            ">
                {/* PRODUCT NAME */}

                <Link
                    to={`/products/${productId}`}
                    className="hover:text-violet-600"
                >
                    <h3
                        className="
                            line-clamp-2
                            min-h-[40px]
                            text-sm
                            font-semibold
                            leading-5
                            text-slate-900
                            transition
                        "
                    >
                        {name}
                    </h3>
                </Link>

                {/* RATING */}

                <div className="
                    mt-2
                    flex
                    items-center
                    gap-2
                ">
                    <div
                        className="
                            flex
                            items-center
                            gap-1
                            rounded-md
                            bg-emerald-700
                            px-1.5 py-1
                            text-[11px]
                            font-bold
                            text-white
                        "
                    >
                        <span>
                            {rating.toFixed(1)}
                        </span>

                        <Star
                            size={10}
                            className="
                                fill-white
                                text-white
                            "
                        />
                    </div>

                    <span className="
                        text-[11px]
                        text-slate-500
                    ">
                        (
                        {Number(
                            ratingCount
                        ).toLocaleString("en-IN")}
                        )
                    </span>
                </div>

                {/* PRICE */}

                <div className="mt-3">
                    <div className="
                        flex
                        items-baseline
                        gap-2
                    ">
                        <span
                            className="
                                text-lg
                                font-black
                                text-slate-950
                            "
                        >
                            ₹
                            {price.toLocaleString(
                                "en-IN"
                            )}
                        </span>

                        {originalPrice &&
                            originalPrice > price && (
                                <span
                                    className="
                                        text-xs
                                        text-slate-400
                                        line-through
                                    "
                                >
                                    ₹
                                    {Number(
                                        originalPrice
                                    ).toLocaleString(
                                        "en-IN"
                                    )}
                                </span>
                            )}
                    </div>

                    <span className="
                        text-[10px]
                        text-slate-500
                    ">
                        Free Delivery
                    </span>
                </div>

                {/* =================================================
                    ADD TO CART
                ================================================= */}

                <motion.button
                    type="button"
                    whileTap={{
                        scale: 0.95,
                    }}
                    onClick={handleAddToCart}
                    className="
                        mt-4
                        flex w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-slate-950
                        py-2.5
                        text-xs
                        font-bold
                        text-white
                        transition
                        hover:bg-violet-600
                    "
                >
                    <AnimatePresence mode="wait">
                        {added ? (
                            <motion.span
                                key="added"
                                initial={{
                                    opacity: 0,
                                    scale: 0.7,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.7,
                                }}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                <Check size={15} />

                                Added to Cart
                            </motion.span>
                        ) : (
                            <motion.span
                                key="add"
                                initial={{
                                    opacity: 0,
                                    scale: 0.7,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.7,
                                }}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                <ShoppingCart
                                    size={15}
                                />

                                Add to Cart
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>

                {/* =================================================
                    BUY NOW
                ================================================= */}

                <motion.button
                    type="button"
                    whileTap={{
                        scale: 0.95,
                    }}
                    onClick={handleBuyNow}
                    className="
                        mt-2
                        flex w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        py-2.5
                        text-xs
                        font-bold
                        text-slate-900
                        transition
                        hover:border-blue-500
                        hover:bg-blue-50
                        hover:text-blue-600
                    "
                >
                    <Zap size={15} />

                    Buy Now
                </motion.button>
            </div>
        </motion.article>
    );
}

export default ProductCard;