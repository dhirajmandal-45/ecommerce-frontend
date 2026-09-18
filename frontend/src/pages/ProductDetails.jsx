import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Heart,
    Minus,
    Plus,
    ShoppingBag,
    Star,
    Truck,
    ShieldCheck,
    RotateCcw,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../features/products/ProductCard";
import { useCart } from "../context/CartContext";
import { getProductById, getProducts } from "../services/productService";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [recommendedProducts, setRecommendedProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [recommendationLoading, setRecommendationLoading] =
        useState(false);

    const [quantity, setQuantity] = useState(1);

    // ==================================================
    // FETCH CURRENT PRODUCT
    // ==================================================

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);

                const data = await getProductById(id);

                console.log("Current Product:", data);
                console.log("Product ID:", data.id);
                console.log("Category:", data.category);
                console.log("Image URL:", data.imageUrl);

                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    // ==================================================
    // FETCH RECOMMENDED PRODUCTS
    // SAME CATEGORY AS CURRENT PRODUCT
    // ==================================================

    useEffect(() => {
        if (!product?.category) {
            return;
        }

        const fetchRecommendedProducts = async () => {
            try {
                setRecommendationLoading(true);

                const data = await getProducts(product.category);

                console.log("Category Products:", data);

                // Remove currently opened product
                const filteredProducts = data
                    .filter(
                        (item) =>
                            String(item.id) !== String(product.id)
                    )
                    .slice(0, 8);

                setRecommendedProducts(filteredProducts);
            } catch (error) {
                console.error(
                    "Error fetching recommendations:",
                    error
                );

                setRecommendedProducts([]);
            } finally {
                setRecommendationLoading(false);
            }
        };

        fetchRecommendedProducts();
    }, [product]);

    // ==================================================
    // QUANTITY
    // ==================================================

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    // ==================================================
    // LOADING
    // ==================================================

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

    // ==================================================
    // PRODUCT NOT FOUND
    // ==================================================

    if (!product) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Navbar />

                <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                    <h1 className="text-2xl font-bold text-slate-900">
                        Product not found
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        The product you're looking for doesn't exist.
                    </p>

                    <Link
                        to="/products"
                        className="mt-6 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
                    >
                        Browse Products
                    </Link>
                </div>

                <Footer />
            </div>
        );
    }

    // ==================================================
    // MAIN PRODUCT DETAILS
    // ==================================================

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">

                    {/* BACK */}
                    <Link
                        to="/products"
                        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-violet-600"
                    >
                        <ArrowLeft size={17} />
                        Back to Products
                    </Link>

                    {/* ======================================
                        PRODUCT DETAILS
                    ====================================== */}

                    <section className="grid gap-8 lg:grid-cols-2">

                        {/* IMAGE */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: -25,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
                        >
                            <div className="relative aspect-square overflow-hidden bg-slate-100">

                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="h-full w-full object-contain p-4"
                                />

                                {/* WISHLIST */}
                                <button
                                    type="button"
                                    aria-label="Add to wishlist"
                                    className="
                                        absolute right-4 top-4
                                        flex h-11 w-11
                                        items-center justify-center
                                        rounded-full
                                        bg-white/90
                                        text-slate-700
                                        shadow-md
                                        backdrop-blur
                                        transition
                                        hover:text-red-500
                                    "
                                >
                                    <Heart size={20} />
                                </button>
                            </div>
                        </motion.div>

                        {/* INFORMATION */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 25,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                delay: 0.1,
                            }}
                            className="flex flex-col justify-center"
                        >

                            {/* CATEGORY */}
                            <p className="text-sm font-semibold text-violet-600">
                                {product.category || "SHOPX"}
                            </p>

                            {/* NAME */}
                            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                {product.name}
                            </h1>

                            {/* RATING */}
                            <div className="mt-4 flex items-center gap-3">

                                <div className="flex items-center gap-1 rounded-lg bg-yellow-50 px-2.5 py-1.5">
                                    <Star
                                        size={15}
                                        className="fill-yellow-400 text-yellow-400"
                                    />

                                    <span className="text-sm font-bold text-slate-800">
                                        {product.rating || "4.5"}
                                    </span>
                                </div>

                                <span className="text-sm text-slate-400">
                                    Customer reviews
                                </span>
                            </div>

                            {/* PRICE */}
                            <div className="mt-6 flex flex-wrap items-center gap-3">

                                <span className="text-3xl font-black text-slate-950">
                                    ₹
                                    {Number(product.price).toLocaleString(
                                        "en-IN"
                                    )}
                                </span>

                                {product.discount > 0 && (
                                    <span className="rounded-lg bg-green-50 px-2 py-1 text-xs font-bold text-green-600">
                                        {product.discount}% OFF
                                    </span>
                                )}
                            </div>

                            {/* DESCRIPTION */}
                            <div className="mt-6 border-t border-slate-200 pt-6">

                                <h2 className="text-sm font-bold text-slate-900">
                                    About this product
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {product.description ||
                                        "Discover quality products with a premium shopping experience from SHOPX."}
                                </p>
                            </div>

                            {/* PRODUCT DETAILS */}
                            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">

                                {product.brand && (
                                    <div className="rounded-xl bg-white p-3 ring-1 ring-slate-100">
                                        <p className="text-[11px] text-slate-400">
                                            Brand
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-slate-800">
                                            {product.brand}
                                        </p>
                                    </div>
                                )}

                                {product.color && (
                                    <div className="rounded-xl bg-white p-3 ring-1 ring-slate-100">
                                        <p className="text-[11px] text-slate-400">
                                            Color
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-slate-800">
                                            {product.color}
                                        </p>
                                    </div>
                                )}

                                {product.size && (
                                    <div className="rounded-xl bg-white p-3 ring-1 ring-slate-100">
                                        <p className="text-[11px] text-slate-400">
                                            Size
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-slate-800">
                                            {product.size}
                                        </p>
                                    </div>
                                )}

                                {product.stock !== undefined && (
                                    <div className="rounded-xl bg-white p-3 ring-1 ring-slate-100">
                                        <p className="text-[11px] text-slate-400">
                                            Stock
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-slate-800">
                                            {product.stock > 0
                                                ? "In Stock"
                                                : "Out of Stock"}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* QUANTITY */}
                            <div className="mt-6">

                                <p className="mb-2 text-sm font-semibold text-slate-700">
                                    Quantity
                                </p>

                                <div className="flex w-fit items-center rounded-xl border border-slate-200 bg-white">

                                    <button
                                        type="button"
                                        onClick={decreaseQuantity}
                                        className="p-3 text-slate-600 transition hover:text-violet-600"
                                    >
                                        <Minus size={17} />
                                    </button>

                                    <span className="min-w-10 text-center text-sm font-bold">
                                        {quantity}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={increaseQuantity}
                                        className="p-3 text-slate-600 transition hover:text-violet-600"
                                    >
                                        <Plus size={17} />
                                    </button>

                                </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                                <motion.button
                                    type="button"
                                    onClick={async () => {
                                        if (!localStorage.getItem("token")) {
                                            navigate("/login");
                                            return;
                                        }

                                        await addToCart(product, quantity);
                                    }}
                                    whileTap={{
                                        scale: 0.97,
                                    }}
                                    className="
                                        flex flex-1
                                        items-center justify-center
                                        gap-2 rounded-xl
                                        bg-slate-950
                                        px-6 py-3.5
                                        text-sm font-bold
                                        text-white
                                        transition
                                        hover:bg-violet-600
                                    "
                                >
                                    <ShoppingBag size={18} />
                                    Add to Cart
                                </motion.button>

                                <motion.button
                                    type="button"
                                    onClick={async () => {
                                        if (!localStorage.getItem("token")) {
                                            navigate("/login");
                                            return;
                                        }

                                        const addedItem = await addToCart(product, quantity);

                                        if (addedItem) {
                                            navigate("/checkout");
                                        }
                                    }}
                                    whileTap={{
                                        scale: 0.97,
                                    }}
                                    className="
                                        flex items-center
                                        justify-center
                                        gap-2 rounded-xl
                                        border border-slate-200
                                        bg-white
                                        px-6 py-3.5
                                        text-sm font-bold
                                        text-slate-800
                                        transition
                                        hover:border-violet-300
                                        hover:text-violet-600
                                    "
                                >
                                    Buy Now
                                </motion.button>

                            </div>

                            {/* BENEFITS */}
                            <div className="mt-8 grid grid-cols-3 gap-2 border-t border-slate-200 pt-6">

                                <div className="text-center">
                                    <Truck
                                        size={19}
                                        className="mx-auto text-violet-600"
                                    />

                                    <p className="mt-2 text-[11px] font-semibold text-slate-700 sm:text-xs">
                                        Fast Delivery
                                    </p>
                                </div>

                                <div className="text-center">
                                    <ShieldCheck
                                        size={19}
                                        className="mx-auto text-violet-600"
                                    />

                                    <p className="mt-2 text-[11px] font-semibold text-slate-700 sm:text-xs">
                                        Secure Payment
                                    </p>
                                </div>

                                <div className="text-center">
                                    <RotateCcw
                                        size={19}
                                        className="mx-auto text-violet-600"
                                    />

                                    <p className="mt-2 text-[11px] font-semibold text-slate-700 sm:text-xs">
                                        Easy Returns
                                    </p>
                                </div>

                            </div>
                        </motion.div>
                    </section>

                    {/* ======================================
                        RECOMMENDED PRODUCTS
                    ====================================== */}

                    <section className="mt-16 border-t border-slate-200 pt-10">

                        <div className="mb-6 flex items-end justify-between gap-4">

                            <div>
                                <p className="text-sm font-semibold text-violet-600">
                                    More from {product.category}
                                </p>

                                <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                                    You May Also Like
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Products similar to what you're viewing.
                                </p>
                            </div>

                            <Link
                                to={`/products?category=${encodeURIComponent(
                                    product.category
                                )}`}
                                className="hidden text-sm font-semibold text-slate-700 transition hover:text-violet-600 sm:block"
                            >
                                View All →
                            </Link>
                        </div>

                        {/* LOADING */}
                        {recommendationLoading && (
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                {[1, 2, 3, 4].map((item) => (
                                    <div
                                        key={item}
                                        className="overflow-hidden rounded-2xl bg-white"
                                    >
                                        <div className="aspect-square animate-pulse bg-slate-200" />

                                        <div className="space-y-3 p-4">
                                            <div className="h-4 animate-pulse rounded bg-slate-200" />

                                            <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />

                                            <div className="h-9 animate-pulse rounded bg-slate-200" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* RECOMMENDED */}
                        {!recommendationLoading &&
                            recommendedProducts.length > 0 && (
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                    {recommendedProducts.map(
                                        (recommendedProduct, index) => (
                                            <motion.div
                                                key={recommendedProduct.id}
                                                initial={{
                                                    opacity: 0,
                                                    y: 20,
                                                }}
                                                whileInView={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                viewport={{
                                                    once: true,
                                                }}
                                                transition={{
                                                    delay: index * 0.06,
                                                }}
                                            >
                                                <ProductCard
                                                    product={
                                                        recommendedProduct
                                                    }
                                                />
                                            </motion.div>
                                        )
                                    )}
                                </div>
                            )}

                        {/* NO RECOMMENDATIONS */}
                        {!recommendationLoading &&
                            recommendedProducts.length === 0 && (
                                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                                    <p className="text-sm text-slate-500">
                                        No more products available in this
                                        category.
                                    </p>
                                </div>
                            )}

                        {/* MOBILE VIEW ALL */}
                        <Link
                            to={`/products?category=${encodeURIComponent(
                                product.category
                            )}`}
                            className="mt-5 block text-center text-sm font-semibold text-violet-600 sm:hidden"
                        >
                            View all {product.category} products →
                        </Link>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default ProductDetails;