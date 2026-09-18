import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    ShoppingBag,
    UserRound,
    Menu,
    X,
    ChevronDown,
    Sparkles,
    Heart,
    Package,
    LogOut,
    Store,
} from "lucide-react";

import { useCart } from "../context/CartContext";

const categories = [
    "All",
    "Fashion",
    "Mobiles",
    "Electronics",
    "Beauty",
    "Home",
    "Appliances",
    "Sports",
    "Accessories",
];

function Navbar() {
    const navigate = useNavigate();

    const [mobileMenu, setMobileMenu] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const [desktopSearch, setDesktopSearch] = useState("");
    const [mobileSearch, setMobileSearch] = useState("");

    const [moreOpen, setMoreOpen] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    // ============================================================
    // CART
    // ============================================================

    const { cartItems } = useCart();

    const cartCount = cartItems.reduce(
        (total, item) =>
            total + Number(item.quantity || 1),
        0
    );

    // ============================================================
    // CHECK LOGIN
    // ============================================================

    useEffect(() => {
        checkLogin();

        const handleStorage = () => {
            checkLogin();
        };

        const handleLoginChange = () => {
            checkLogin();
        };

        window.addEventListener(
            "storage",
            handleStorage
        );

        window.addEventListener(
            "loginChanged",
            handleLoginChange
        );

        window.addEventListener(
            "logoutChanged",
            handleLoginChange
        );

        return () => {
            window.removeEventListener(
                "storage",
                handleStorage
            );

            window.removeEventListener(
                "loginChanged",
                handleLoginChange
            );

            window.removeEventListener(
                "logoutChanged",
                handleLoginChange
            );
        };
    }, []);

    // ============================================================
    // CHECK JWT LOGIN
    // ============================================================

    const checkLogin = () => {
        try {
            const token =
                localStorage.getItem("token") ||
                localStorage.getItem("jwtToken") ||
                localStorage.getItem("accessToken");

            if (!token) {
                setIsLoggedIn(false);
                setUserEmail("");
                return;
            }

            const parts = token.split(".");

            if (parts.length !== 3) {
                setIsLoggedIn(false);
                setUserEmail("");
                return;
            }

            const base64Payload = parts[1]
                .replace(/-/g, "+")
                .replace(/_/g, "/");

            const payload = JSON.parse(
                atob(base64Payload)
            );

            const email =
                payload.email ||
                payload.sub ||
                localStorage.getItem("email") ||
                "";

            setIsLoggedIn(true);
            setUserEmail(email);
        } catch (error) {
            console.error(
                "Unable to read login session:",
                error
            );

            setIsLoggedIn(false);
            setUserEmail("");
        }
    };

    // ============================================================
    // PROFILE LETTER
    // ============================================================

    const getProfileLetter = () => {
        if (!userEmail) {
            return "U";
        }

        return userEmail
            .charAt(0)
            .toUpperCase();
    };

    // ============================================================
    // SEARCH
    // ============================================================

    const performSearch = (value) => {
        const query = value.trim();

        if (!query) {
            navigate("/search");
            return;
        }

        setMoreOpen(false);
        setMobileMenu(false);
        setSearchOpen(false);

        navigate(
            `/search?q=${encodeURIComponent(query)}`
        );
    };

    // ============================================================
    // DESKTOP SEARCH
    // ============================================================

    const handleDesktopSearch = (event) => {
        event.preventDefault();

        performSearch(desktopSearch);
    };

    // ============================================================
    // MOBILE SEARCH
    // ============================================================

    const handleMobileSearch = (event) => {
        event.preventDefault();

        performSearch(mobileSearch);
    };

    // ============================================================
    // LOGOUT
    // ============================================================

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("email");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("role");

        setIsLoggedIn(false);
        setUserEmail("");
        setMobileMenu(false);
        setMoreOpen(false);

        // Tell Navbar/components in same tab
        window.dispatchEvent(
            new Event("logoutChanged")
        );

        navigate("/");
    };

    // ============================================================
    // CATEGORY URL
    // ============================================================

    const getCategoryUrl = (category, index) => {
        if (index === 0) {
            return "/";
        }

        return `/products?category=${encodeURIComponent(
            category
        )}`;
    };

    return (
        <>
            <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">

                {/* =====================================================
                    TOP ANNOUNCEMENT
                ===================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: -20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="hidden bg-slate-950 text-white sm:block"
                >
                    <div className="mx-auto flex h-8 max-w-7xl items-center justify-center px-4 text-xs font-medium">

                        <Sparkles
                            size={13}
                            className="mr-2 text-blue-400"
                        />

                        Free shipping on orders above ₹999

                    </div>
                </motion.div>

                {/* =====================================================
                    MAIN NAVBAR
                ===================================================== */}

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="flex h-[72px] items-center gap-4">

                        {/* =================================================
                            LOGO
                        ================================================= */}

                        <Link
                            to="/"
                            className="group shrink-0"
                            onClick={() => {
                                setMoreOpen(false);
                                setMobileMenu(false);
                            }}
                        >
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    x: -20,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                className="flex items-center gap-2"
                            >

                                <motion.div
                                    whileHover={{
                                        rotate: 8,
                                        scale: 1.08,
                                    }}
                                    className="
                                        flex h-10 w-10
                                        items-center justify-center
                                        rounded-xl
                                        bg-gradient-to-br
                                        from-blue-600
                                        to-violet-600
                                        text-lg font-black
                                        text-white
                                        shadow-lg
                                        shadow-blue-500/20
                                    "
                                >
                                    S
                                </motion.div>

                                <div className="hidden sm:block">

                                    <h1 className="text-xl font-black tracking-tight text-slate-950">
                                        SHOP
                                        <span className="text-blue-600">
                                            X
                                        </span>
                                    </h1>

                                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                                        Everything. Better.
                                    </p>

                                </div>

                            </motion.div>
                        </Link>

                        {/* =================================================
                            DESKTOP SEARCH
                        ================================================= */}

                        <motion.form
                            initial={{
                                opacity: 0,
                                width: 0,
                            }}
                            animate={{
                                opacity: 1,
                                width: "100%",
                            }}
                            transition={{
                                duration: 0.5,
                            }}
                            onSubmit={handleDesktopSearch}
                            className="
                                relative hidden
                                min-w-0 flex-1
                                lg:block
                            "
                        >

                            <Search
                                size={20}
                                className="
                                    absolute left-4 top-1/2
                                    -translate-y-1/2
                                    cursor-pointer
                                    text-slate-400
                                "
                                onClick={() =>
                                    performSearch(
                                        desktopSearch
                                    )
                                }
                            />

                            <input
                                type="text"
                                value={desktopSearch}
                                onChange={(event) =>
                                    setDesktopSearch(
                                        event.target.value
                                    )
                                }
                                onKeyDown={(event) => {
                                    if (
                                        event.key ===
                                        "Enter"
                                    ) {
                                        performSearch(
                                            desktopSearch
                                        );
                                    }
                                }}
                                placeholder="Search products, brands and more..."
                                className="
                                    h-12 w-full
                                    rounded-2xl
                                    border border-slate-200
                                    bg-slate-50
                                    pl-11 pr-24
                                    text-sm text-slate-800
                                    outline-none
                                    transition-all duration-300
                                    placeholder:text-slate-400
                                    hover:border-slate-300
                                    focus:border-blue-500
                                    focus:bg-white
                                    focus:ring-4
                                    focus:ring-blue-500/10
                                "
                            />

                            <kbd
                                className="
                                    absolute right-3 top-1/2
                                    hidden -translate-y-1/2
                                    rounded-lg border
                                    border-slate-200
                                    bg-white px-2 py-1
                                    text-[10px] font-medium
                                    text-slate-400
                                    xl:block
                                "
                            >
                                Ctrl K
                            </kbd>

                        </motion.form>

                        {/* =================================================
                            RIGHT ACTIONS
                        ================================================= */}

                        <div className="ml-auto flex items-center gap-1 sm:gap-2">

                            {/* MOBILE SEARCH */}

                            <motion.button
                                type="button"
                                whileTap={{
                                    scale: 0.9,
                                }}
                                onClick={() =>
                                    setSearchOpen(
                                        (previous) =>
                                            !previous
                                    )
                                }
                                className="
                                    rounded-xl p-2.5
                                    text-slate-700
                                    transition
                                    hover:bg-slate-100
                                    lg:hidden
                                "
                            >
                                <Search size={21} />
                            </motion.button>

                            {/* WISHLIST */}

                            <motion.button
                                type="button"
                                whileHover={{
                                    y: -2,
                                }}
                                whileTap={{
                                    scale: 0.9,
                                }}
                                onClick={() =>
                                    navigate(
                                        "/wishlist"
                                    )
                                }
                                className="
                                    hidden rounded-xl p-2.5
                                    text-slate-700
                                    transition
                                    hover:bg-slate-100
                                    sm:block
                                "
                            >
                                <Heart size={21} />
                            </motion.button>

                            {/* =================================================
                                LOGIN / PROFILE
                            ================================================= */}

                            {!isLoggedIn ? (
                                <Link
                                    to="/login"
                                    className="
                                        hidden items-center gap-2
                                        rounded-xl px-3 py-2.5
                                        text-sm font-semibold
                                        text-slate-700
                                        transition
                                        hover:bg-slate-100
                                        hover:text-blue-600
                                        md:flex
                                    "
                                >
                                    <UserRound size={19} />
                                    Login
                                </Link>
                            ) : (
                                <Link
                                    to="/profile"
                                    title={userEmail}
                                    className="
                                        hidden md:flex
                                        items-center justify-center
                                        rounded-full
                                    "
                                >
                                    <motion.div
                                        whileHover={{
                                            scale: 1.08,
                                        }}
                                        whileTap={{
                                            scale: 0.92,
                                        }}
                                        className="
                                            flex h-10 w-10
                                            items-center justify-center
                                            rounded-full
                                            bg-gradient-to-br
                                            from-blue-600
                                            to-violet-600
                                            text-sm font-black
                                            text-white
                                            shadow-md
                                            ring-2
                                            ring-white
                                        "
                                    >
                                        {getProfileLetter()}
                                    </motion.div>
                                </Link>
                            )}

                            {/* =================================================
                                CART
                            ================================================= */}

                            <Link
                                to="/cart"
                                className="relative"
                            >
                                <motion.div
                                    whileHover={{
                                        y: -2,
                                    }}
                                    whileTap={{
                                        scale: 0.9,
                                    }}
                                    className="
                                        flex items-center gap-2
                                        rounded-xl p-2.5
                                        text-slate-800
                                        transition
                                        hover:bg-slate-100
                                    "
                                >
                                    <ShoppingBag size={22} />

                                    <span className="hidden text-sm font-semibold md:block">
                                        Cart
                                    </span>
                                </motion.div>

                                {cartCount > 0 && (
                                    <motion.span
                                        initial={{
                                            scale: 0,
                                        }}
                                        animate={{
                                            scale: 1,
                                        }}
                                        className="
                                            absolute -right-1 -top-1
                                            flex h-[18px] min-w-[18px]
                                            items-center justify-center
                                            rounded-full
                                            bg-blue-600
                                            px-1 text-[9px]
                                            font-bold text-white
                                            ring-2 ring-white
                                        "
                                    >
                                        {cartCount > 99
                                            ? "99+"
                                            : cartCount}
                                    </motion.span>
                                )}
                            </Link>

                            {/* =================================================
                                MOBILE MENU
                            ================================================= */}

                            <motion.button
                                type="button"
                                whileTap={{
                                    scale: 0.9,
                                }}
                                onClick={() =>
                                    setMobileMenu(true)
                                }
                                className="
                                    rounded-xl p-2.5
                                    text-slate-700
                                    transition
                                    hover:bg-slate-100
                                    lg:hidden
                                "
                            >
                                <Menu size={24} />
                            </motion.button>

                        </div>
                    </div>

                    {/* =====================================================
                        MOBILE SEARCH
                    ===================================================== */}

                    <AnimatePresence>
                        {searchOpen && (
                            <motion.form
                                initial={{
                                    opacity: 0,
                                    height: 0,
                                    y: -10,
                                }}
                                animate={{
                                    opacity: 1,
                                    height: "auto",
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    height: 0,
                                    y: -10,
                                }}
                                onSubmit={
                                    handleMobileSearch
                                }
                                className="
                                    overflow-hidden
                                    pb-3 lg:hidden
                                "
                            >

                                <div className="relative">

                                    <Search
                                        size={19}
                                        className="
                                            absolute left-4 top-1/2
                                            -translate-y-1/2
                                            cursor-pointer
                                            text-blue-500
                                        "
                                        onClick={() =>
                                            performSearch(
                                                mobileSearch
                                            )
                                        }
                                    />

                                    <input
                                        autoFocus
                                        type="text"
                                        value={mobileSearch}
                                        onChange={(event) =>
                                            setMobileSearch(
                                                event.target
                                                    .value
                                            )
                                        }
                                        placeholder="Search products..."
                                        className="
                                            h-12 w-full
                                            rounded-2xl
                                            border border-blue-500
                                            bg-slate-50
                                            pl-11 pr-4
                                            text-sm outline-none
                                            ring-4
                                            ring-blue-500/5
                                        "
                                    />

                                </div>

                            </motion.form>
                        )}
                    </AnimatePresence>

                    {/* =====================================================
                        DESKTOP CATEGORY NAV
                    ===================================================== */}

                    <div className="hidden border-t border-slate-100 lg:block">

                        <div
                            className="
                                flex h-12
                                items-center
                                justify-between
                                overflow-visible
                            "
                        >

                            {/* CATEGORIES */}

                            <div
                                className="
                                    flex h-full
                                    items-center gap-1
                                "
                            >

                                {categories.map(
                                    (
                                        category,
                                        index
                                    ) => (
                                        <NavLink
                                            key={category}
                                            to={getCategoryUrl(
                                                category,
                                                index
                                            )}
                                            onClick={() =>
                                                setMoreOpen(
                                                    false
                                                )
                                            }
                                            className={({
                                                isActive,
                                            }) =>
                                                `relative flex h-full items-center px-3 text-sm font-medium transition-colors ${isActive
                                                    ? "text-blue-600"
                                                    : "text-slate-600 hover:text-blue-600"
                                                }`
                                            }
                                        >
                                            {({
                                                isActive,
                                            }) => (
                                                <>
                                                    {category}

                                                    {isActive && (
                                                        <motion.span
                                                            layoutId="categoryIndicator"
                                                            className="
                                                                absolute
                                                                bottom-0
                                                                left-3
                                                                right-3
                                                                h-0.5
                                                                rounded-full
                                                                bg-blue-600
                                                            "
                                                        />
                                                    )}
                                                </>
                                            )}
                                        </NavLink>
                                    )
                                )}

                            </div>

                            {/* =================================================
                                MORE
                            ================================================= */}

                            <div
                                className="relative group"
                                onMouseEnter={() =>
                                    setMoreOpen(true)
                                }
                                onMouseLeave={() =>
                                    setMoreOpen(false)
                                }
                            >

                                <button
                                    type="button"
                                    onClick={() =>
                                        setMoreOpen(
                                            (previous) =>
                                                !previous
                                        )
                                    }
                                    className="
                                        flex items-center gap-1
                                        text-sm font-medium
                                        text-slate-500
                                        transition
                                        hover:text-slate-900
                                    "
                                >
                                    More

                                    <ChevronDown
                                        size={15}
                                        className={
                                            moreOpen
                                                ? "rotate-180 transition-transform"
                                                : "transition-transform"
                                        }
                                    />
                                </button>

                                {/* MORE DROPDOWN */}

                                <AnimatePresence>
                                    {moreOpen && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: 8,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: 8,
                                            }}
                                            transition={{
                                                duration: 0.15,
                                            }}
                                            className="
                                                absolute right-0 top-full
                                                z-[100]
                                                mt-3 w-52
                                                rounded-2xl
                                                border border-slate-200
                                                bg-white
                                                p-2
                                                shadow-xl
                                            "
                                        >

                                            <Link
                                                to="/admin"
                                                onClick={() =>
                                                    setMoreOpen(
                                                        false
                                                    )
                                                }
                                                className="
                                                    flex items-center gap-3
                                                    rounded-xl px-3 py-3
                                                    text-sm font-semibold
                                                    text-slate-700
                                                    transition
                                                    hover:bg-blue-50
                                                    hover:text-blue-600
                                                "
                                            >
                                                <Store
                                                    size={18}
                                                />

                                                Become a Seller
                                            </Link>

                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </div>

                        </div>
                    </div>

                </div>
            </header>

            {/* =========================================================
                MOBILE DRAWER
            ========================================================= */}

            <AnimatePresence>
                {mobileMenu && (
                    <>
                        {/* OVERLAY */}

                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            onClick={() =>
                                setMobileMenu(false)
                            }
                            className="
                                fixed inset-0 z-[60]
                                bg-slate-950/50
                                backdrop-blur-sm
                                lg:hidden
                            "
                        />

                        {/* DRAWER */}

                        <motion.aside
                            initial={{
                                x: "100%",
                            }}
                            animate={{
                                x: 0,
                            }}
                            exit={{
                                x: "100%",
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 350,
                                damping: 35,
                            }}
                            className="
                                fixed right-0 top-0
                                z-[70] h-full
                                w-[82%] max-w-sm
                                overflow-y-auto
                                bg-white
                                shadow-2xl
                                lg:hidden
                            "
                        >

                            {/* DRAWER HEADER */}

                            <div
                                className="
                                    flex h-[72px]
                                    items-center
                                    justify-between
                                    border-b px-5
                                "
                            >

                                <Link
                                    to="/"
                                    onClick={() =>
                                        setMobileMenu(false)
                                    }
                                    className="
                                        flex items-center gap-2
                                    "
                                >

                                    <div
                                        className="
                                            flex h-10 w-10
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-gradient-to-br
                                            from-blue-600
                                            to-violet-600
                                            font-black
                                            text-white
                                        "
                                    >
                                        S
                                    </div>

                                    <span
                                        className="
                                            text-xl font-black
                                        "
                                    >
                                        SHOP
                                        <span className="text-blue-600">
                                            X
                                        </span>
                                    </span>

                                </Link>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setMobileMenu(false)
                                    }
                                    className="
                                        rounded-xl p-2
                                        hover:bg-slate-100
                                    "
                                >
                                    <X size={23} />
                                </button>

                            </div>

                            {/* MOBILE USER */}

                            <div
                                className="
                                    m-4 rounded-2xl
                                    bg-slate-50 p-4
                                "
                            >

                                {isLoggedIn ? (
                                    <div
                                        className="
                                            flex items-center
                                            justify-between
                                        "
                                    >

                                        <Link
                                            to="/profile"
                                            onClick={() =>
                                                setMobileMenu(
                                                    false
                                                )
                                            }
                                            className="
                                                flex items-center
                                                gap-3
                                            "
                                        >

                                            <div
                                                className="
                                                    flex h-11 w-11
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    bg-gradient-to-br
                                                    from-blue-600
                                                    to-violet-600
                                                    font-black
                                                    text-white
                                                "
                                            >
                                                {getProfileLetter()}
                                            </div>

                                            <div>

                                                <p
                                                    className="
                                                        text-sm font-bold
                                                        text-slate-900
                                                    "
                                                >
                                                    My Profile
                                                </p>

                                                <p
                                                    className="
                                                        max-w-[170px]
                                                        truncate
                                                        text-xs
                                                        text-slate-500
                                                    "
                                                >
                                                    {userEmail}
                                                </p>

                                            </div>

                                        </Link>

                                        <button
                                            type="button"
                                            onClick={
                                                handleLogout
                                            }
                                            className="
                                                rounded-xl p-2
                                                text-slate-500
                                                transition
                                                hover:bg-red-50
                                                hover:text-red-600
                                            "
                                            title="Logout"
                                        >
                                            <LogOut size={19} />
                                        </button>

                                    </div>
                                ) : (
                                    <div
                                        className="
                                            flex items-center gap-3
                                        "
                                    >

                                        <div
                                            className="
                                                flex h-11 w-11
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-blue-100
                                                text-blue-600
                                            "
                                        >
                                            <UserRound size={21} />
                                        </div>

                                        <div>

                                            <p
                                                className="
                                                    text-sm font-bold
                                                    text-slate-900
                                                "
                                            >
                                                Welcome to SHOPX
                                            </p>

                                            <Link
                                                to="/login"
                                                onClick={() =>
                                                    setMobileMenu(
                                                        false
                                                    )
                                                }
                                                className="
                                                    text-xs
                                                    font-medium
                                                    text-blue-600
                                                "
                                            >
                                                Login / Create account
                                            </Link>

                                        </div>

                                    </div>
                                )}

                            </div>

                            {/* MOBILE LINKS */}

                            <nav className="px-4">

                                <MobileLink
                                    to="/"
                                    icon={
                                        <ShoppingBag size={19} />
                                    }
                                    label="Home"
                                    close={() =>
                                        setMobileMenu(false)
                                    }
                                />

                                <MobileLink
                                    to="/products"
                                    icon={
                                        <Search size={19} />
                                    }
                                    label="Shop Products"
                                    close={() =>
                                        setMobileMenu(false)
                                    }
                                />

                                <MobileLink
                                    to="/cart"
                                    icon={
                                        <ShoppingBag size={19} />
                                    }
                                    label={`Cart${cartCount > 0
                                            ? ` (${cartCount})`
                                            : ""
                                        }`}
                                    close={() =>
                                        setMobileMenu(false)
                                    }
                                />

                                <MobileLink
                                    to="/admin"
                                    icon={
                                        <Store size={19} />
                                    }
                                    label="Become a Seller"
                                    close={() =>
                                        setMobileMenu(false)
                                    }
                                />

                                {isLoggedIn && (
                                    <>
                                        <MobileLink
                                            to="/orders"
                                            icon={
                                                <Package size={19} />
                                            }
                                            label="My Orders"
                                            close={() =>
                                                setMobileMenu(
                                                    false
                                                )
                                            }
                                        />

                                        <MobileLink
                                            to="/profile"
                                            icon={
                                                <UserRound
                                                    size={19}
                                                />
                                            }
                                            label="My Profile"
                                            close={() =>
                                                setMobileMenu(
                                                    false
                                                )
                                            }
                                        />
                                    </>
                                )}

                                <MobileLink
                                    to="/wishlist"
                                    icon={
                                        <Heart size={19} />
                                    }
                                    label="Wishlist"
                                    close={() =>
                                        setMobileMenu(false)
                                    }
                                />

                            </nav>

                            {/* LOGOUT MOBILE */}

                            {isLoggedIn && (
                                <>
                                    <div
                                        className="
                                            mx-4 my-4 border-t
                                        "
                                    />

                                    <button
                                        type="button"
                                        onClick={
                                            handleLogout
                                        }
                                        className="
                                            mx-4 flex
                                            w-[calc(100%-2rem)]
                                            items-center gap-4
                                            rounded-xl px-3 py-3.5
                                            text-sm font-semibold
                                            text-red-600
                                            transition
                                            hover:bg-red-50
                                        "
                                    >
                                        <LogOut size={19} />
                                        Logout
                                    </button>
                                </>
                            )}

                            <div
                                className="
                                    mx-4 my-4 border-t
                                "
                            />

                            {/* CATEGORIES */}

                            <div className="px-4 pb-8">

                                <p
                                    className="
                                        mb-3 px-3
                                        text-xs font-bold
                                        uppercase
                                        tracking-wider
                                        text-slate-400
                                    "
                                >
                                    Categories
                                </p>

                                {categories
                                    .slice(1)
                                    .map(
                                        (category) => (
                                            <Link
                                                key={category}
                                                to={`/products?category=${encodeURIComponent(
                                                    category
                                                )}`}
                                                onClick={() =>
                                                    setMobileMenu(
                                                        false
                                                    )
                                                }
                                                className="
                                                    block rounded-xl
                                                    px-3 py-3
                                                    text-sm font-medium
                                                    text-slate-600
                                                    transition
                                                    hover:bg-slate-50
                                                    hover:text-blue-600
                                                "
                                            >
                                                {category}
                                            </Link>
                                        )
                                    )}

                            </div>

                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

// ================================================================
// MOBILE LINK
// ================================================================

function MobileLink({
    to,
    icon,
    label,
    close,
}) {
    return (
        <Link
            to={to}
            onClick={close}
            className="
                flex items-center gap-4
                rounded-xl px-3 py-3.5
                text-sm font-semibold
                text-slate-700
                transition
                hover:bg-slate-50
                hover:text-blue-600
            "
        >
            {icon}
            {label}
        </Link>
    );
}

export default Navbar;