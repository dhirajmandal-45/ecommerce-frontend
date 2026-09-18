import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import ProductCard from "../products/ProductCard";

function FeaturedProducts({ products = [] }) {
    const featuredProducts = products.slice(0, 8);

    return (
        <section className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-7xl">

                {/* HEADER */}
                <div className="mb-5 flex items-end justify-between">
                    <div>
                        <div className="mb-1 flex items-center gap-2">
                            <Sparkles
                                size={16}
                                className="text-blue-600"
                            />

                            <span className="
                                text-xs
                                font-bold
                                uppercase
                                tracking-[0.15em]
                                text-blue-600
                            ">
                                Recommended
                            </span>
                        </div>

                        <h2 className="
                            text-xl
                            font-black
                            tracking-tight
                            text-slate-950
                            sm:text-2xl
                            lg:text-3xl
                        ">
                            Featured Products
                        </h2>
                    </div>

                    <motion.button
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.95 }}
                        className="
                            flex items-center
                            gap-1.5
                            rounded-xl
                            px-3 py-2
                            text-sm
                            font-semibold
                            text-slate-700
                            transition
                            hover:bg-white
                            hover:text-blue-600
                        "
                    >
                        View All
                        <ArrowRight size={17} />
                    </motion.button>
                </div>

                {/* PRODUCTS */}
                {featuredProducts.length > 0 ? (
                    <div className="
                        grid
                        grid-cols-2
                        gap-3
                        sm:grid-cols-3
                        sm:gap-4
                        lg:grid-cols-4
                        lg:gap-5
                    ">
                        {featuredProducts.map((product, index) => (
                            <motion.div
                                key={product.id ?? index}
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
                                    amount: 0.15,
                                }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.05,
                                }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="
                        flex min-h-[250px]
                        items-center
                        justify-center
                        rounded-2xl
                        bg-white
                        text-sm
                        text-slate-400
                        ring-1 ring-slate-100
                    ">
                        Loading products...
                    </div>
                )}
            </div>
        </section>
    );
}

export default FeaturedProducts;