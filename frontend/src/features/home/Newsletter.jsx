import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

function Newsletter() {
    return (
        <section className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div
                className="
                    mx-auto max-w-7xl
                    overflow-hidden rounded-3xl
                    bg-[#e9e4ff]
                    px-5 py-8
                    sm:px-8 sm:py-10
                    lg:px-12 lg:py-12
                "
            >
                <div className="
                    flex flex-col gap-6
                    lg:flex-row lg:items-center
                    lg:justify-between
                ">

                    {/* TEXT */}
                    <div className="max-w-xl">
                        <div className="
                            mb-2 flex items-center gap-2
                            text-blue-600
                        ">
                            <Mail size={17} />

                            <span className="
                                text-xs font-bold
                                uppercase tracking-[0.15em]
                            ">
                                Stay Updated
                            </span>
                        </div>

                        <h2 className="
                            text-2xl font-black
                            tracking-tight text-slate-950
                            sm:text-3xl
                        ">
                            Get the latest SHOPX deals
                        </h2>

                        <p className="
                            mt-2 text-sm
                            leading-relaxed text-slate-600
                        ">
                            Subscribe for new arrivals, exclusive
                            offers and special discounts.
                        </p>
                    </div>

                    {/* FORM */}
                    <form className="
                        flex w-full max-w-md
                        rounded-2xl bg-white p-1.5
                        shadow-sm
                    ">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="
                                min-w-0 flex-1
                                bg-transparent
                                px-3 py-2.5
                                text-sm text-slate-800
                                outline-none
                                placeholder:text-slate-400
                            "
                        />

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.96 }}
                            className="
                                flex shrink-0
                                items-center gap-2
                                rounded-xl
                                bg-slate-950
                                px-4 py-2.5
                                text-sm font-bold
                                text-white
                                transition
                                hover:bg-blue-600
                            "
                        >
                            Subscribe
                            <ArrowRight size={16} />
                        </motion.button>
                    </form>

                </div>
            </div>
        </section>
    );
}

export default Newsletter;