import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function CategoryCard({ category }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.97 }}
            className="
                group
                min-w-[135px]
                cursor-pointer
                rounded-2xl
                bg-white
                p-3
                shadow-sm
                ring-1 ring-slate-100
                transition-shadow
                hover:shadow-lg
                sm:min-w-[155px]
                md:min-w-0
            "
        >
            {/* IMAGE */}
            <div className="
                relative
                aspect-square
                overflow-hidden
                rounded-xl
                bg-slate-100
            ">
                <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="
                        h-full w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-110
                    "
                />

                <div className="
                    absolute right-2 top-2
                    flex h-7 w-7
                    items-center justify-center
                    rounded-full
                    bg-white/90
                    text-slate-900
                    opacity-0
                    shadow-sm
                    transition-opacity
                    group-hover:opacity-100
                ">
                    <ArrowUpRight size={15} />
                </div>
            </div>

            {/* NAME */}
            <h3 className="
                mt-3
                truncate
                text-sm
                font-bold
                text-slate-800
            ">
                {category.name}
            </h3>

            {/* SUBTITLE */}
            {category.subtitle && (
                <p className="
                    mt-1
                    truncate
                    text-xs
                    text-slate-400
                ">
                    {category.subtitle}
                </p>
            )}
        </motion.div>
    );
}

export default CategoryCard;