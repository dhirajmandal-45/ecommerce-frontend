import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

function OfferBanner() {
    return (
        <section className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div
                className="
                    relative mx-auto max-w-7xl
                    overflow-hidden rounded-3xl
                    bg-slate-950
                    px-6 py-8
                    sm:px-10 sm:py-10
                    lg:px-14 lg:py-12
                "
            >
                {/* Decorative circles */}
                <div className="
                    absolute -right-16 -top-16
                    h-48 w-48 rounded-full
                    bg-blue-600/20 blur-2xl
                " />

                <div className="
                    absolute -bottom-20 right-1/4
                    h-40 w-40 rounded-full
                    bg-violet-600/20 blur-2xl
                " />

                <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                    {/* CONTENT */}
                    <div className="max-w-2xl">
                        <div className="
                            mb-3 flex items-center gap-2
                            text-xs font-bold uppercase
                            tracking-[0.15em] text-blue-400
                        ">
                            <Zap size={15} />
                            Limited Time Offer
                        </div>

                        <h2 className="
                            text-2xl font-black
                            leading-tight text-white
                            sm:text-3xl
                            lg:text-4xl
                        ">
                            Upgrade Your Everyday.
                            <br />
                            <span className="text-blue-400">
                                Save More with SHOPX.
                            </span>
                        </h2>

                        <p className="
                            mt-3 max-w-xl
                            text-sm leading-relaxed
                            text-slate-300
                            sm:text-base
                        ">
                            Discover amazing deals on gadgets,
                            electronics and everyday essentials.
                        </p>
                    </div>

                    {/* BUTTON */}
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="
                            flex w-fit items-center gap-2
                            rounded-xl bg-white
                            px-5 py-3
                            text-sm font-bold
                            text-slate-950
                            transition
                            hover:bg-blue-50
                        "
                    >
                        Shop Deals
                        <ArrowRight size={17} />
                    </motion.button>

                </div>
            </div>
        </section>
    );
}

export default OfferBanner;