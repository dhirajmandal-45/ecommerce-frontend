import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
    ArrowLeft,
    Mail,
    UserRound,
    LogOut,
    ShoppingBag,
    Heart,
    MapPin,
    Building2,
    Map,
    Hash,
    Phone,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProfile } from "../services/authService";

function ProfilePage() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // =========================================
    // FETCH PROFILE
    // =========================================

    useEffect(() => {
        const token = localStorage.getItem("token");

        // No token → login
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchProfile = async () => {
            try {
                setLoading(true);

                const data = await getProfile();

                console.log("Profile data:", data);

                setProfile(data);

            } catch (error) {
                console.error(
                    "Profile loading error:",
                    error
                );

                if (
                    error.message?.toLowerCase().includes("unauthorized") ||
                    error.message?.toLowerCase().includes("jwt") ||
                    error.message?.toLowerCase().includes("expired")
                ) {
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();

    }, [navigate]);


    // =========================================
    // LOGOUT
    // =========================================

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("email");

        window.dispatchEvent(new Event("logoutChanged"));

        navigate("/login");
    };


    // =========================================
    // LOADING
    // =========================================
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">

                <Navbar />

                <div className="flex min-h-[60vh] items-center justify-center">
                    <div className="text-center">

                        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                        <p className="text-sm font-medium text-slate-500">
                            Loading your profile...
                        </p>

                    </div>
                </div>

                <Footer />

            </div>
        );
    }

    // =========================================
    // NO PROFILE
    // =========================================

    if (!profile) {
        return (
            <div className="min-h-screen bg-slate-50">

                <Navbar />

                <div className="
                    flex min-h-[60vh]
                    items-center
                    justify-center
                    px-4
                ">
                    <div className="text-center">

                        <h2 className="
                            text-2xl
                            font-bold
                            text-slate-900
                        ">
                            Unable to load profile
                        </h2>

                        <p className="
                            mt-2
                            text-sm
                            text-slate-500
                        ">
                            Please try logging in again.
                        </p>

                        <Link
                            to="/login"
                            className="
                                mt-5
                                inline-flex
                                rounded-xl
                                bg-blue-600
                                px-5 py-3
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:bg-blue-700
                            "
                        >
                            Go to Login
                        </Link>

                    </div>
                </div>

                <Footer />

            </div>
        );
    }


    // =========================================
    // USER INITIAL
    // =========================================

    const getInitial = () => {

        if (!profile.name) {
            return "U";
        }

        return profile.name
            .charAt(0)
            .toUpperCase();
    };


    return (
        <div className="min-h-screen bg-slate-50">

            <Navbar />

            <main className="
                px-4 py-8
                sm:px-6
                lg:px-8
            ">

                <div className="mx-auto max-w-5xl">

                    {/* =========================================
                        BACK
                    ========================================= */}

                    <Link
                        to="/"
                        className="
                            mb-6
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                            text-slate-600
                            transition
                            hover:text-blue-600
                        "
                    >
                        <ArrowLeft size={17} />

                        Back to Home
                    </Link>


                    {/* =========================================
                        PROFILE HEADER
                    ========================================= */}

                    <motion.section
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        className="
                            overflow-hidden
                            rounded-3xl
                            bg-white
                            shadow-sm
                            ring-1
                            ring-slate-200
                        "
                    >

                        {/* COVER */}

                        <div className="
                            h-36
                            bg-gradient-to-r
                            from-blue-600
                            via-violet-600
                            to-purple-600
                            sm:h-44
                        " />


                        {/* PROFILE */}

                        <div className="
                            px-5
                            pb-6
                            sm:px-8
                        ">

                            <div className="
                                -mt-14
                                flex
                                flex-col
                                gap-4
                                sm:-mt-16
                                sm:flex-row
                                sm:items-end
                                sm:justify-between
                            ">

                                {/* USER */}

                                <div className="
                                    flex
                                    items-end
                                    gap-4
                                ">

                                    {/* AVATAR */}

                                    <div className="
                                        flex
                                        h-28 w-28
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        border-4
                                        border-white
                                        bg-slate-950
                                        text-4xl
                                        font-black
                                        text-white
                                        shadow-xl
                                    ">
                                        {getInitial()}
                                    </div>


                                    {/* NAME */}

                                    <div className="pb-2">

                                        <h1 className="
                                            text-2xl
                                            font-black
                                            text-slate-950
                                        ">
                                            {profile.name}
                                        </h1>

                                        <p className="
                                            mt-1
                                            text-sm
                                            text-slate-500
                                        ">
                                            SHOPX Customer
                                        </p>

                                    </div>

                                </div>


                                {/* LOGOUT */}

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        border
                                        border-red-200
                                        bg-red-50
                                        px-4 py-2.5
                                        text-sm
                                        font-semibold
                                        text-red-600
                                        transition
                                        hover:bg-red-100
                                    "
                                >
                                    <LogOut size={17} />

                                    Logout
                                </button>

                            </div>

                        </div>

                    </motion.section>


                    {/* =========================================
                        ACCOUNT + QUICK ACTIONS
                    ========================================= */}

                    <div className="
                        mt-6
                        grid
                        gap-6
                        lg:grid-cols-3
                    ">

                        {/* ACCOUNT INFORMATION */}

                        <motion.section
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.1,
                            }}
                            className="
                                rounded-2xl
                                bg-white
                                p-5
                                shadow-sm
                                ring-1
                                ring-slate-200
                                lg:col-span-2
                                sm:p-6
                            "
                        >

                            <div className="mb-5">

                                <h2 className="
                                    text-lg
                                    font-bold
                                    text-slate-950
                                ">
                                    Account Information
                                </h2>

                                <p className="
                                    mt-1
                                    text-sm
                                    text-slate-500
                                ">
                                    Your basic SHOPX account details.
                                </p>

                            </div>


                            <div className="
                                grid
                                gap-4
                                sm:grid-cols-2
                            ">

                                {/* NAME */}

                                <ProfileInfo
                                    icon={<UserRound size={20} />}
                                    title="Full Name"
                                    value={profile.name}
                                    iconClass="
                                        bg-violet-100
                                        text-violet-600
                                    "
                                />


                                {/* EMAIL */}

                                <ProfileInfo
                                    icon={<Mail size={20} />}
                                    title="Email Address"
                                    value={profile.email}
                                    iconClass="
                                        bg-blue-100
                                        text-blue-600
                                    "
                                />


                                {/* PHONE */}

                                <ProfileInfo
                                    icon={<Phone size={20} />}
                                    title="Phone Number"
                                    value={profile.phone}
                                    iconClass="
                                        bg-green-100
                                        text-green-600
                                    "
                                />


                                {/* ROLE */}

                                <ProfileInfo
                                    icon={<UserRound size={20} />}
                                    title="Account Type"
                                    value={profile.role}
                                    iconClass="
                                        bg-orange-100
                                        text-orange-600
                                    "
                                />

                            </div>

                        </motion.section>


                        {/* QUICK ACTIONS */}

                        <motion.section
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.2,
                            }}
                            className="
                                rounded-2xl
                                bg-white
                                p-5
                                shadow-sm
                                ring-1
                                ring-slate-200
                            "
                        >

                            <h2 className="
                                text-lg
                                font-bold
                                text-slate-950
                            ">
                                Quick Actions
                            </h2>


                            <div className="
                                mt-5
                                space-y-3
                            ">

                                {/* ORDERS */}

                                <Link
                                    to="/orders"
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        rounded-xl
                                        border
                                        border-slate-200
                                        p-4
                                        transition
                                        hover:border-blue-200
                                        hover:bg-blue-50
                                    "
                                >

                                    <ShoppingBag
                                        size={19}
                                        className="
                                            text-blue-600
                                        "
                                    />

                                    <span className="
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                    ">
                                        My Orders
                                    </span>

                                </Link>


                                {/* WISHLIST */}

                                <Link
                                    to="/wishlist"
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        rounded-xl
                                        border
                                        border-slate-200
                                        p-4
                                        transition
                                        hover:border-red-200
                                        hover:bg-red-50
                                    "
                                >

                                    <Heart
                                        size={19}
                                        className="
                                            text-red-500
                                        "
                                    />

                                    <span className="
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                    ">
                                        Wishlist
                                    </span>

                                </Link>

                            </div>

                        </motion.section>

                    </div>


                    {/* =========================================
                        DELIVERY ADDRESS
                    ========================================= */}

                    <motion.section
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.25,
                        }}
                        className="
                            mt-6
                            rounded-2xl
                            bg-white
                            p-5
                            shadow-sm
                            ring-1
                            ring-slate-200
                            sm:p-6
                        "
                    >

                        {/* HEADER */}

                        <div className="
                            mb-6
                            flex
                            items-center
                            gap-3
                        ">

                            <div className="
                                flex
                                h-11 w-11
                                items-center
                                justify-center
                                rounded-xl
                                bg-blue-100
                                text-blue-600
                            ">
                                <MapPin size={21} />
                            </div>

                            <div>

                                <h2 className="
                                    text-lg
                                    font-bold
                                    text-slate-950
                                ">
                                    Delivery Address
                                </h2>

                                <p className="
                                    mt-1
                                    text-sm
                                    text-slate-500
                                ">
                                    Your saved delivery information.
                                </p>

                            </div>

                        </div>


                        {/* ADDRESS GRID */}

                        <div className="
                            grid
                            gap-4
                            sm:grid-cols-2
                        ">

                            {/* ADDRESS */}

                            <ProfileInfo
                                icon={<MapPin size={20} />}
                                title="Address"
                                value={profile.address}
                                iconClass="
                                    bg-blue-100
                                    text-blue-600
                                "
                            />


                            {/* CITY */}

                            <ProfileInfo
                                icon={<Building2 size={20} />}
                                title="City"
                                value={profile.city}
                                iconClass="
                                    bg-violet-100
                                    text-violet-600
                                "
                            />


                            {/* STATE */}

                            <ProfileInfo
                                icon={<Map size={20} />}
                                title="State"
                                value={profile.state}
                                iconClass="
                                    bg-purple-100
                                    text-purple-600
                                "
                            />


                            {/* PINCODE */}

                            <ProfileInfo
                                icon={<Hash size={20} />}
                                title="Pincode"
                                value={profile.pincode}
                                iconClass="
                                    bg-orange-100
                                    text-orange-600
                                "
                            />

                        </div>

                    </motion.section>


                    {/* =========================================
                        WELCOME
                    ========================================= */}

                    <motion.section
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.3,
                        }}
                        className="
                            mt-6
                            rounded-2xl
                            bg-slate-950
                            p-6
                            text-white
                            sm:p-8
                        "
                    >

                        <p className="
                            text-sm
                            font-semibold
                            text-blue-400
                        ">
                            Welcome back
                        </p>

                        <h2 className="
                            mt-2
                            text-2xl
                            font-black
                            sm:text-3xl
                        ">

                            Happy shopping,{" "}

                            <span className="
                                text-blue-400
                            ">
                                {profile.name}
                            </span>

                            !

                        </h2>

                        <p className="
                            mt-2
                            max-w-xl
                            text-sm
                            leading-6
                            text-slate-400
                        ">
                            Explore trending products, manage your
                            orders, and discover something new at SHOPX.
                        </p>

                    </motion.section>

                </div>

            </main>

            <Footer />

        </div>
    );
}


/* =========================================
   PROFILE INFO COMPONENT
========================================= */

function ProfileInfo({
    icon,
    title,
    value,
    iconClass,
}) {
    return (
        <div className="
            flex
            items-center
            gap-4
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            p-4
        ">

            <div className={`
                flex
                h-11 w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                ${iconClass}
            `}>
                {icon}
            </div>

            <div className="min-w-0">

                <p className="
                    text-xs
                    font-medium
                    text-slate-400
                ">
                    {title}
                </p>

                <p className="
                    mt-1
                    truncate
                    text-sm
                    font-semibold
                    text-slate-900
                ">
                    {value || "Not provided"}
                </p>

            </div>

        </div>
    );
}


export default ProfilePage;