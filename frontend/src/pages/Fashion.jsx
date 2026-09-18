import { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
import {
    SlidersHorizontal,
    ChevronDown,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../features/products/ProductCard";
import { getProducts } from "../services/productService";

function Fashion() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFashionProducts = async () => {
            try {
                setLoading(true);

                const data = await getProducts("Fashion");

                console.log("Fashion Products:", data);

                setProducts(data);
            } catch (error) {
                console.error(
                    "Fashion products error:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchFashionProducts();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main>

                {/* =========================================
                    HERO
                ========================================== */}

                <section className="px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            className="
                                relative
                                overflow-hidden
                                rounded-3xl
                                bg-slate-950
                                px-6 py-12
                                sm:px-10
                                lg:px-16
                            "
                        >
                            <div className="
                                absolute
                                -right-20
                                -top-20
                                h-64
                                w-64
                                rounded-full
                                bg-violet-500/20
                                blur-3xl
                            " />

                            <div className="
                                absolute
                                -bottom-20
                                left-1/3
                                h-56
                                w-56
                                rounded-full
                                bg-blue-500/20
                                blur-3xl
                            " />

                            <div className="relative max-w-xl">

                                <p className="
                                    mb-3
                                    text-sm
                                    font-semibold
                                    uppercase
                                    tracking-[0.2em]
                                    text-violet-300
                                ">
                                    SHOPX Fashion
                                </p>

                                <h1 className="
                                    text-4xl
                                    font-bold
                                    tracking-tight
                                    text-white
                                    sm:text-5xl
                                ">
                                    Style that speaks

                                    <span className="
                                        block
                                        text-violet-300
                                    ">
                                        for itself.
                                    </span>
                                </h1>

                                <p className="
                                    mt-4
                                    max-w-lg
                                    text-sm
                                    leading-6
                                    text-slate-300
                                    sm:text-base
                                ">
                                    Discover trending fashion,
                                    everyday essentials and
                                    premium styles made for
                                    your lifestyle.
                                </p>

                                <motion.button
                                    whileHover={{
                                        scale: 1.03,
                                    }}
                                    whileTap={{
                                        scale: 0.97,
                                    }}
                                    className="
                                        mt-7
                                        rounded-xl
                                        bg-white
                                        px-6 py-3
                                        text-sm
                                        font-semibold
                                        text-slate-900
                                        shadow-lg
                                    "
                                >
                                    Shop Collection
                                </motion.button>

                            </div>
                        </motion.div>

                    </div>
                </section>

                {/* =========================================
                    CATEGORIES
                ========================================== */}

                <section className="
                    px-4 py-5
                    sm:px-6
                    lg:px-8
                ">
                    <div className="mx-auto max-w-7xl">

                        <div className="mb-5">
                            <h2 className="
                                text-xl
                                font-bold
                                text-slate-900
                                sm:text-2xl
                            ">
                                Shop Fashion
                            </h2>
                        </div>

                        <div className="
                            grid
                            grid-cols-2
                            gap-3
                            sm:grid-cols-4
                            lg:grid-cols-6
                        ">
                            {[
                                "Men",
                                "Women",
                                "Footwear",
                                "Accessories",
                                "Streetwear",
                                "New Arrivals",
                            ].map(
                                (category, index) => (
                                    <motion.button
                                        key={category}
                                        initial={{
                                            opacity: 0,
                                            y: 15,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            delay:
                                                index *
                                                0.05,
                                        }}
                                        whileHover={{
                                            y: -3,
                                        }}
                                        className="
                                            rounded-2xl
                                            border
                                            border-slate-200
                                            bg-white
                                            px-4 py-5
                                            text-sm
                                            font-semibold
                                            text-slate-700
                                            shadow-sm
                                            transition
                                            hover:border-violet-200
                                            hover:text-violet-600
                                        "
                                    >
                                        {category}
                                    </motion.button>
                                )
                            )}
                        </div>

                    </div>
                </section>

                {/* =========================================
                    PRODUCTS
                ========================================== */}

                <section className="
                    px-4 py-8
                    sm:px-6
                    lg:px-8
                ">
                    <div className="mx-auto max-w-7xl">

                        {/* HEADER */}

                        <div className="
                            mb-6
                            flex
                            flex-col
                            gap-4
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        ">

                            <div>

                                <p className="
                                    text-sm
                                    font-medium
                                    text-violet-600
                                ">
                                    Trending now
                                </p>

                                <h2 className="
                                    mt-1
                                    text-2xl
                                    font-bold
                                    text-slate-900
                                ">
                                    Fashion Collection
                                </h2>

                                {!loading && (
                                    <p className="
                                        mt-1
                                        text-xs
                                        text-slate-500
                                    ">
                                        {products.length}{" "}
                                        fashion products
                                    </p>
                                )}

                            </div>

                            <div className="flex gap-2">

                                <button
                                    type="button"
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        rounded-xl
                                        border
                                        border-slate-200
                                        bg-white
                                        px-4 py-2.5
                                        text-sm
                                        font-medium
                                        text-slate-700
                                        transition
                                        hover:border-violet-300
                                        hover:text-violet-600
                                    "
                                >
                                    <SlidersHorizontal
                                        size={17}
                                    />

                                    Filter
                                </button>

                                <button
                                    type="button"
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        rounded-xl
                                        border
                                        border-slate-200
                                        bg-white
                                        px-4 py-2.5
                                        text-sm
                                        font-medium
                                        text-slate-700
                                        transition
                                        hover:border-violet-300
                                        hover:text-violet-600
                                    "
                                >
                                    Sort

                                    <ChevronDown
                                        size={16}
                                    />
                                </button>

                            </div>

                        </div>

                        {/* =================================
                            LOADING
                        ================================== */}

                        {loading && (
                            <div className="
                                grid
                                grid-cols-2
                                gap-4
                                sm:grid-cols-3
                                lg:grid-cols-4
                            ">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(
                                    (item) => (
                                        <div
                                            key={item}
                                            className="
                                                overflow-hidden
                                                rounded-2xl
                                                bg-white
                                                ring-1
                                                ring-slate-100
                                            "
                                        >
                                            <div className="
                                                aspect-square
                                                animate-pulse
                                                bg-slate-200
                                            " />

                                            <div className="space-y-3 p-4">

                                                <div className="
                                                    h-4
                                                    animate-pulse
                                                    rounded
                                                    bg-slate-200
                                                " />

                                                <div className="
                                                    h-4
                                                    w-1/2
                                                    animate-pulse
                                                    rounded
                                                    bg-slate-200
                                                " />

                                                <div className="
                                                    h-9
                                                    animate-pulse
                                                    rounded
                                                    bg-slate-200
                                                " />

                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        )}

                        {/* =================================
                            PRODUCTS
                        ================================== */}

                        {!loading &&
                            products.length > 0 && (
                                <div className="
                                    grid
                                    grid-cols-2
                                    gap-4
                                    sm:grid-cols-3
                                    lg:grid-cols-4
                                ">
                                    {products.map(
                                        (product, index) => (
                                            <motion.div
                                                key={
                                                    product.id
                                                }
                                                initial={{
                                                    opacity: 0,
                                                    y: 20,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                transition={{
                                                    delay:
                                                        index *
                                                        0.05,
                                                }}
                                            >
                                                <ProductCard
                                                    product={
                                                        product
                                                    }
                                                />
                                            </motion.div>
                                        )
                                    )}
                                </div>
                            )}

                        {/* =================================
                            EMPTY
                        ================================== */}

                        {!loading &&
                            products.length === 0 && (
                                <div className="
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    px-6 py-16
                                    text-center
                                ">
                                    <h3 className="
                                        text-lg
                                        font-bold
                                        text-slate-900
                                    ">
                                        No fashion products found
                                    </h3>

                                    <p className="
                                        mt-2
                                        text-sm
                                        text-slate-500
                                    ">
                                        There are currently no
                                        products in the Fashion
                                        category.
                                    </p>
                                </div>
                            )}

                    </div>
                </section>

                {/* =========================================
                    BOTTOM OFFER
                ========================================== */}

                <section className="
                    px-4 py-8
                    sm:px-6
                    lg:px-8
                ">
                    <div className="mx-auto max-w-7xl">

                        <div className="
                            rounded-3xl
                            bg-[#e9e4ff]
                            px-6 py-10
                            text-center
                            sm:px-10
                        ">

                            <p className="
                                text-sm
                                font-semibold
                                uppercase
                                tracking-widest
                                text-violet-600
                            ">
                                SHOPX Exclusive
                            </p>

                            <h2 className="
                                mt-2
                                text-2xl
                                font-bold
                                text-slate-900
                                sm:text-3xl
                            ">
                                Upgrade your wardrobe
                            </h2>

                            <p className="
                                mx-auto
                                mt-2
                                max-w-lg
                                text-sm
                                text-slate-600
                            ">
                                Fresh styles, better prices
                                and everything you need to
                                create your perfect look.
                            </p>

                        </div>

                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}

export default Fashion;