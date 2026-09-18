// import { motion } from "framer-motion";
import { motion } from "framer-motion";
import { FaArrowUp, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaFacebook, FaInstagram } from "react-icons/fa";


import { FaXTwitter } from "react-icons/fa6";


function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="mt-8 bg-slate-950 text-slate-300">

            {/* MAIN FOOTER */}
            <div className="
                mx-auto max-w-7xl
                px-4 py-10
                sm:px-6
                lg:px-8 lg:py-12
            ">
                <div className="
                    grid grid-cols-2 gap-8
                    md:grid-cols-4
                ">

                    {/* BRAND */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2">
                            <div className="
                                flex h-9 w-9
                                items-center justify-center
                                rounded-xl
                                bg-gradient-to-br
                                from-blue-500 to-violet-600
                                text-lg font-black text-white
                            ">
                                S
                            </div>

                            <span className="
                                text-xl font-black
                                tracking-tight text-white
                            ">
                                SHOPX
                            </span>
                        </div>

                        <p className="
                            mt-4 max-w-xs
                            text-sm leading-6
                            text-slate-400
                        ">
                            Everything you need, better prices,
                            and a shopping experience made for you.
                        </p>

                        {/* SOCIAL */}
                        <div className="mt-5 flex gap-2">
                            {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map(
                                (Icon, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ y: -3 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="
                                            flex h-9 w-9
                                            items-center justify-center
                                            rounded-xl
                                            bg-slate-900
                                            text-slate-400
                                            transition
                                            hover:bg-blue-600
                                            hover:text-white
                                        "
                                    >
                                        <Icon size={16} />
                                    </motion.button>
                                )
                            )}
                        </div>
                    </div>

                    {/* SHOP */}
                    <div>
                        <h3 className="font-bold text-white">
                            Shop
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm">
                            <li className="hover:text-white">All Products</li>
                            <li className="hover:text-white">New Arrivals</li>
                            <li className="hover:text-white">Trending</li>
                            <li className="hover:text-white">Deals</li>
                        </ul>
                    </div>

                    {/* HELP */}
                    <div>
                        <h3 className="font-bold text-white">
                            Help
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm">
                            <li className="hover:text-white">Contact Us</li>
                            <li className="hover:text-white">Shipping</li>
                            <li className="hover:text-white">Returns</li>
                            <li className="hover:text-white">FAQ</li>
                        </ul>
                    </div>

                    {/* COMPANY */}
                    <div>
                        <h3 className="font-bold text-white">
                            Company
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm">
                            <li className="hover:text-white">About SHOPX</li>
                            <li className="hover:text-white">Privacy Policy</li>
                            <li className="hover:text-white">Terms</li>
                            <li className="hover:text-white">Careers</li>
                        </ul>
                    </div>
                </div>

                {/* BOTTOM */}
                <div className="
                    mt-10
                    flex flex-col gap-4
                    border-t border-slate-800
                    pt-6
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                ">
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} SHOPX. All rights reserved.
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="
                            flex w-fit items-center gap-2
                            text-xs font-semibold
                            text-slate-400
                            hover:text-white
                        "
                    >
                        Back to top
                        <FaArrowUp size={15} />
                    </button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;