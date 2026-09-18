import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CategoryCard from "./CategoryCard";

const categories = [
    {
        id: 1,
        name: "Mobiles",
        subtitle: "Latest smartphones",
        image: "/images/phone.webp",
    },
    {
        id: 2,
        name: "Electronics",
        subtitle: "Smart gadgets",
        image: "/images/display.webp",
    },
    {
        id: 3,
        name: "Appliances",
        subtitle: "For your home",
        image: "/images/bad.webp",
    },
    {
        id: 4,
        name: "Accessories",
        subtitle: "Complete your setup",
        image: "/images/phone2.webp",
    },
    {
        id: 5,
        name: "New Arrivals",
        subtitle: "Fresh products",
        image: "/images/phone3.webp",
    },
    {
        id: 6,
        name: "Top Deals",
        subtitle: "Save more today",
        image: "/images/phone4.webp",
    },
];

function CategorySection() {
    return (
        <section className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-7xl">

                {/* HEADER */}
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <p className="mb-1 text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
                            Explore
                        </p>

                        <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl lg:text-3xl">
                            Shop by Category
                        </h2>
                    </div>

                    <motion.button
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.95 }}
                        className="
                            flex items-center gap-1.5
                            rounded-xl px-3 py-2
                            text-sm font-semibold
                            text-slate-700
                            hover:bg-white hover:text-blue-600
                        "
                    >
                        View All
                        <ArrowRight size={17} />
                    </motion.button>
                </div>

                {/* CATEGORIES */}
                <div className="
                    grid grid-cols-2 gap-3
                    sm:grid-cols-3 sm:gap-4
                    lg:grid-cols-6
                ">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.05,
                            }}
                        >
                            <CategoryCard category={category} />
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default CategorySection;