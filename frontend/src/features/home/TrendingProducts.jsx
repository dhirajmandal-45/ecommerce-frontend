import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function TrendingProducts({ products = [] }) {
    const navigate = useNavigate();

    // Pick 10 products from API data
    const trendingProducts = useMemo(() => {
        if (!products.length) return [];

        return [...products]
            .sort(() => Math.random() - 0.5)
            .slice(0, 10);
    }, [products]);

    // Duplicate for infinite scrolling
    const infiniteProducts = [
        ...trendingProducts,
        ...trendingProducts,
    ];

    // Open category page
    const handleViewAll = () => {
        if (trendingProducts.length > 0) {
            const category = trendingProducts[0].category;

            if (category) {
                navigate(
                    `/products?category=${encodeURIComponent(category)}`
                );
            } else {
                navigate("/products");
            }
        } else {
            navigate("/products");
        }
    };

    return (
        <section className="px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
            <div
                className="
                    mx-auto max-w-7xl
                    overflow-hidden rounded-2xl
                    bg-[#e9e4ff]
                    p-3 sm:p-4 lg:p-5
                "
            >

                {/* =========================
                    HEADER
                ========================= */}
                <div
                    className="
                        mb-3 flex items-center
                        justify-between px-1
                        sm:mb-4 sm:px-2
                    "
                >
                    <div className="flex items-center gap-2">

                        <div
                            className="
                                flex h-8 w-8
                                items-center justify-center
                                rounded-lg bg-black
                                text-white
                                sm:h-9 sm:w-9
                            "
                        >
                            <TrendingUp size={18} />
                        </div>

                        <div>
                            <h2
                                className="
                                    text-lg font-bold
                                    tracking-tight
                                    text-slate-950
                                    sm:text-xl lg:text-2xl
                                "
                            >
                                Trending Products
                            </h2>

                            <p
                                className="
                                    hidden text-xs
                                    text-slate-500 sm:block
                                "
                            >
                                Popular products customers are exploring
                            </p>
                        </div>
                    </div>

                    {/* VIEW ALL */}
                    <motion.button
                        type="button"
                        onClick={handleViewAll}
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.9 }}
                        className="
                            flex h-9 w-9 shrink-0
                            items-center justify-center
                            rounded-full bg-black
                            text-white
                            sm:h-10 sm:w-10
                        "
                    >
                        <ArrowRight size={20} />
                    </motion.button>
                </div>

                {/* =========================
                    PRODUCT AREA
                ========================= */}
                <div
                    className="
                        overflow-hidden rounded-xl
                        bg-white p-2
                        sm:p-3 lg:p-4
                    "
                >
                    {trendingProducts.length > 0 ? (

                        <motion.div
                            className="flex w-max gap-2 sm:gap-3"
                            animate={{
                                x: ["0%", "-50%"],
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 18,
                                    ease: "linear",
                                },
                            }}
                        >
                            {infiniteProducts.map(
                                (product, index) => {

                                    const image =
                                        product.imageUrl ||
                                        product.image ||
                                        product.productImage;

                                    const name =
                                        product.name ||
                                        product.productName ||
                                        "Unnamed Product";

                                    const price =
                                        product.price ||
                                        product.sellingPrice;

                                    const discount =
                                        product.discount ||
                                        product.discountPercentage;

                                    /*
                                     * IMPORTANT
                                     * Real database ID
                                     */
                                    const productId =
                                        product.id;

                                    return (
                                        <motion.div
                                            key={`${productId}-${index}`}
                                            whileHover={{ y: -5 }}
                                            whileTap={{
                                                scale: 0.97,
                                            }}
                                            className="
                                                w-[105px]
                                                shrink-0
                                                sm:w-[140px]
                                                md:w-[155px]
                                                lg:w-[170px]
                                                xl:w-[180px]
                                            "
                                        >

                                            {/* =================
                                                CLICKABLE PRODUCT
                                            ================= */}
                                            <Link
                                                to={`/products/${productId}`}
                                                className="block"
                                            >

                                                {/* IMAGE */}
                                                <div
                                                    className="
                                                        relative
                                                        h-[140px]
                                                        overflow-hidden
                                                        rounded-lg
                                                        bg-slate-100
                                                        sm:h-[175px]
                                                        md:h-[190px]
                                                        lg:h-[205px]
                                                    "
                                                >
                                                    {image && (
                                                        <img
                                                            src={image}
                                                            alt={name}
                                                            loading="lazy"
                                                            className="
                                                                h-full w-full
                                                                object-cover
                                                                transition-transform
                                                                duration-500
                                                                hover:scale-110
                                                            "
                                                        />
                                                    )}

                                                    {/* TRENDING */}
                                                    <div
                                                        className="
                                                            absolute left-2 top-2
                                                            rounded-md bg-black
                                                            px-2 py-1
                                                            text-[9px]
                                                            font-bold text-white
                                                        "
                                                    >
                                                        TRENDING
                                                    </div>
                                                </div>

                                                {/* NAME */}
                                                <p
                                                    className="
                                                        mt-2 truncate
                                                        text-sm font-medium
                                                        text-slate-700
                                                        transition
                                                        hover:text-violet-600
                                                    "
                                                >
                                                    {name}
                                                </p>

                                                {/* PRICE */}
                                                {price && (
                                                    <p
                                                        className="
                                                            mt-1 truncate
                                                            text-sm font-bold
                                                            text-slate-950
                                                        "
                                                    >
                                                        ₹
                                                        {Number(
                                                            price
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </p>
                                                )}

                                                {/* DISCOUNT */}
                                                {discount && (
                                                    <p
                                                        className="
                                                            mt-0.5 truncate
                                                            text-xs font-semibold
                                                            text-green-600
                                                        "
                                                    >
                                                        {typeof discount ===
                                                            "number"
                                                            ? `${discount}% Off`
                                                            : discount}
                                                    </p>
                                                )}

                                                {/* CATEGORY */}
                                                {product.category && (
                                                    <p
                                                        className="
                                                            mt-1 truncate
                                                            text-[10px]
                                                            font-medium
                                                            uppercase
                                                            tracking-wide
                                                            text-violet-500
                                                        "
                                                    >
                                                        {product.category}
                                                    </p>
                                                )}

                                            </Link>
                                        </motion.div>
                                    );
                                }
                            )}
                        </motion.div>

                    ) : (

                        /* EMPTY / LOADING */
                        <div
                            className="
                                flex h-[205px]
                                items-center justify-center
                                text-sm text-slate-400
                            "
                        >
                            Loading trending products...
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default TrendingProducts;