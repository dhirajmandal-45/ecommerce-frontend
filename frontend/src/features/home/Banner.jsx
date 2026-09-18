import { motion } from "framer-motion";
import bannerData from "./BannerData";

function Banner() {
    // Duplicate the banners for a seamless infinite loop
    const banners = [...bannerData, ...bannerData];

    return (
        <section className="w-full overflow-hidden bg-slate-50 py-6 sm:py-8">

            {/* INFINITE BANNER TRACK */}
            <motion.div
                className="flex w-max gap-4 px-4 sm:gap-6 sm:px-6 lg:px-8"
                animate={{
                    x: ["0%", "-50%"],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 35,
                        ease: "linear",
                    },
                }}
            >
                {banners.map((banner, index) => (
                    <motion.div
                        key={`${banner.id}-${index}`}
                        whileHover={{
                            scale: 1.02,
                            y: -3,
                        }}
                        transition={{ duration: 0.25 }}
                        className="
                            relative
                            h-[180px]
                            w-[310px]
                            shrink-0
                            overflow-hidden
                            rounded-2xl
                            bg-white
                            shadow-sm
                            sm:h-[220px]
                            sm:w-[420px]
                            lg:h-[280px]
                            lg:w-[570px]
                        "
                    >
                        {/* BANNER IMAGE */}
                        <img
                            src={banner.image}
                            alt={banner.title}
                            className="
                                absolute inset-0
                                h-full w-full
                                object-cover
                            "
                        />

                        {/* OVERLAY */}
                        <div className="
                            absolute inset-0
                            bg-gradient-to-r
                            from-slate-950/75
                            via-slate-950/30
                            to-transparent
                        " />

                        {/* TEXT */}
                        <div className="
                            relative z-10
                            flex h-full
                            max-w-[65%]
                            flex-col
                            justify-center
                            px-5
                            sm:px-7
                            lg:px-8
                        ">
                            {/* <span className="
                                mb-2
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.18em]
                                text-blue-300
                                sm:text-xs
                            ">
                                SHOPX Special
                            </span> */}

                            <h2 className="
                                text-lg
                                font-black
                                leading-tight
                                text-white
                                sm:text-2xl
                                lg:text-3xl
                            ">
                                {banner.title}
                            </h2>

                            <p className="
                                mt-2
                                line-clamp-2
                                text-xs
                                leading-relaxed
                                text-white/80
                                sm:text-sm
                            ">
                                {banner.subtitle}
                            </p>

                            <p className="
                                mt-3
                                text-sm
                                font-bold
                                text-white
                                sm:text-base
                            ">
                                {banner.price}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* INDICATORS */}
            <div className="
                mt-5
                flex
                items-center
                justify-center
                gap-1.5
            ">
                {bannerData.slice(0, 5).map((banner, index) => (
                    <span
                        key={banner.id}
                        className={`
                            h-1.5 rounded-full
                            ${index === 0
                                ? "w-5 bg-slate-900"
                                : "w-1.5 bg-slate-300"
                            }
                        `}
                    />
                ))}
            </div>

        </section>
    );
}

export default Banner;