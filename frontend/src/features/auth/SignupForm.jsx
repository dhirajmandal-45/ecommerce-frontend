import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { signup as signupUser } from "../../services/authService";
import {
    User,
    Mail,
    Phone,
    LockKeyhole,
    Eye,
    EyeOff,
    MapPin,
    ArrowRight,
    ShoppingBag,
} from "lucide-react";

function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [loading, setLoading] = useState(false);

    // ---------------------------------------
    // HANDLE INPUT CHANGE
    // ---------------------------------------

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ---------------------------------------
    // SIGNUP API
    // ---------------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        try {
            setLoading(true);

            await signupUser(formData);

            console.log("Signup successful");

            // ---------------------------------------
            // SUCCESS
            // ---------------------------------------

            alert("Account created successfully!");

            // Redirect to login
            window.location.href = "/login";

        } catch (error) {
            console.error("Signup Error:", error);

            alert(
                error.message ||
                "Something went wrong. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">

            {/* HEADER */}

            <header className="border-b border-slate-200 bg-white">

                <div className="
                    mx-auto flex max-w-7xl
                    items-center justify-between
                    px-4 py-4
                    sm:px-6 lg:px-8
                ">

                    <Link
                        to="/"
                        className="flex items-center gap-2"
                    >

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

                        <div>

                            <span className="
                                block text-xl font-black
                                tracking-tight text-slate-950
                            ">
                                SHOPX
                            </span>

                            <span className="
                                hidden text-[9px]
                                font-semibold
                                uppercase
                                tracking-[0.18em]
                                text-slate-400
                                sm:block
                            ">
                                Everything. Better.
                            </span>

                        </div>

                    </Link>

                    <Link
                        to="/"
                        className="
                            text-sm font-semibold
                            text-slate-500
                            hover:text-blue-600
                        "
                    >
                        Back to Store
                    </Link>

                </div>

            </header>

            {/* SIGNUP */}

            <main className="
                flex justify-center
                px-4 py-8
                sm:px-6 sm:py-10
            ">

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.5,
                    }}
                    className="
                        w-full max-w-2xl
                        rounded-3xl
                        border border-slate-200
                        bg-white
                        p-6
                        shadow-xl
                        shadow-slate-200/50
                        sm:p-8
                    "
                >

                    {/* ICON */}

                    <div className="
                        mx-auto flex h-14 w-14
                        items-center justify-center
                        rounded-2xl
                        bg-blue-50
                        text-blue-600
                    ">
                        <ShoppingBag size={27} />
                    </div>

                    {/* TITLE */}

                    <div className="mt-5 text-center">

                        <h1 className="
                            text-2xl font-black
                            tracking-tight text-slate-950
                            sm:text-3xl
                        ">
                            Create your account
                        </h1>

                        <p className="
                            mt-2 text-sm text-slate-500
                        ">
                            Join SHOPX and start shopping today.
                        </p>

                    </div>

                    {/* FORM */}

                    <form
                        onSubmit={handleSubmit}
                        className="mt-7 space-y-5"
                    >

                        {/* NAME + EMAIL */}

                        <div className="grid gap-5 sm:grid-cols-2">

                            {/* NAME */}

                            <div>

                                <label className="
                                    mb-2 block text-sm
                                    font-semibold text-slate-700
                                ">
                                    Full name
                                </label>

                                <div className="relative">

                                    <User
                                        size={18}
                                        className="
                                            absolute left-3.5
                                            top-1/2
                                            -translate-y-1/2
                                            text-slate-400
                                        "
                                    />

                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        required
                                        className="
                                            h-12 w-full
                                            rounded-xl
                                            border border-slate-200
                                            bg-slate-50
                                            pl-11 pr-4
                                            text-sm outline-none
                                            transition
                                            focus:border-blue-500
                                            focus:bg-white
                                            focus:ring-4
                                            focus:ring-blue-500/10
                                        "
                                    />

                                </div>

                            </div>

                            {/* EMAIL */}

                            <div>

                                <label className="
                                    mb-2 block text-sm
                                    font-semibold text-slate-700
                                ">
                                    Email address
                                </label>

                                <div className="relative">

                                    <Mail
                                        size={18}
                                        className="
                                            absolute left-3.5
                                            top-1/2
                                            -translate-y-1/2
                                            text-slate-400
                                        "
                                    />

                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        required
                                        className="
                                            h-12 w-full
                                            rounded-xl
                                            border border-slate-200
                                            bg-slate-50
                                            pl-11 pr-4
                                            text-sm outline-none
                                            transition
                                            focus:border-blue-500
                                            focus:bg-white
                                            focus:ring-4
                                            focus:ring-blue-500/10
                                        "
                                    />

                                </div>

                            </div>

                        </div>

                        {/* PHONE + PASSWORD */}

                        <div className="grid gap-5 sm:grid-cols-2">

                            {/* PHONE */}

                            <div>

                                <label className="
                                    mb-2 block text-sm
                                    font-semibold text-slate-700
                                ">
                                    Phone number
                                </label>

                                <div className="relative">

                                    <Phone
                                        size={18}
                                        className="
                                            absolute left-3.5
                                            top-1/2
                                            -translate-y-1/2
                                            text-slate-400
                                        "
                                    />

                                    <input
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="9876543210"
                                        required
                                        className="
                                            h-12 w-full
                                            rounded-xl
                                            border border-slate-200
                                            bg-slate-50
                                            pl-11 pr-4
                                            text-sm outline-none
                                            transition
                                            focus:border-blue-500
                                            focus:bg-white
                                            focus:ring-4
                                            focus:ring-blue-500/10
                                        "
                                    />

                                </div>

                            </div>

                            {/* PASSWORD */}

                            <div>

                                <label className="
                                    mb-2 block text-sm
                                    font-semibold text-slate-700
                                ">
                                    Password
                                </label>

                                <div className="relative">

                                    <LockKeyhole
                                        size={18}
                                        className="
                                            absolute left-3.5
                                            top-1/2
                                            -translate-y-1/2
                                            text-slate-400
                                        "
                                    />

                                    <input
                                        name="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Create a password"
                                        required
                                        className="
                                            h-12 w-full
                                            rounded-xl
                                            border border-slate-200
                                            bg-slate-50
                                            pl-11 pr-11
                                            text-sm outline-none
                                            transition
                                            focus:border-blue-500
                                            focus:bg-white
                                            focus:ring-4
                                            focus:ring-blue-500/10
                                        "
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        className="
                                            absolute right-3.5
                                            top-1/2
                                            -translate-y-1/2
                                            text-slate-400
                                            hover:text-slate-700
                                        "
                                    >

                                        {showPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}

                                    </button>

                                </div>

                            </div>

                        </div>

                        {/* ADDRESS */}

                        <div>

                            <label className="
                                mb-2 block text-sm
                                font-semibold text-slate-700
                            ">
                                Address
                            </label>

                            <div className="relative">

                                <MapPin
                                    size={18}
                                    className="
                                        absolute left-3.5
                                        top-3.5
                                        text-slate-400
                                    "
                                />

                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter your address"
                                    rows="3"
                                    required
                                    className="
                                        w-full resize-none
                                        rounded-xl
                                        border border-slate-200
                                        bg-slate-50
                                        py-3 pl-11 pr-4
                                        text-sm outline-none
                                        transition
                                        focus:border-blue-500
                                        focus:bg-white
                                        focus:ring-4
                                        focus:ring-blue-500/10
                                    "
                                />

                            </div>

                        </div>

                        {/* CITY STATE PINCODE */}

                        <div className="grid gap-5 sm:grid-cols-3">

                            <input
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="City"
                                required
                                className="
                                    h-12 w-full
                                    rounded-xl
                                    border border-slate-200
                                    bg-slate-50 px-4
                                    text-sm outline-none
                                    focus:border-blue-500
                                    focus:ring-4
                                    focus:ring-blue-500/10
                                "
                            />

                            <input
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="State"
                                required
                                className="
                                    h-12 w-full
                                    rounded-xl
                                    border border-slate-200
                                    bg-slate-50 px-4
                                    text-sm outline-none
                                    focus:border-blue-500
                                    focus:ring-4
                                    focus:ring-blue-500/10
                                "
                            />

                            <input
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                placeholder="Pincode"
                                inputMode="numeric"
                                required
                                className="
                                    h-12 w-full
                                    rounded-xl
                                    border border-slate-200
                                    bg-slate-50 px-4
                                    text-sm outline-none
                                    focus:border-blue-500
                                    focus:ring-4
                                    focus:ring-blue-500/10
                                "
                            />

                        </div>

                        {/* BUTTON */}

                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{
                                scale: loading ? 1 : 1.01,
                            }}
                            whileTap={{
                                scale: loading ? 1 : 0.98,
                            }}
                            className="
                                flex h-12 w-full
                                items-center justify-center
                                gap-2 rounded-xl
                                bg-slate-950
                                text-sm font-bold
                                text-white
                                shadow-lg
                                shadow-slate-950/10
                                transition
                                hover:bg-blue-600
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >

                            {loading ? (
                                "Creating Account..."
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight size={17} />
                                </>
                            )}

                        </motion.button>

                    </form>

                    {/* LOGIN */}

                    <p className="
                        mt-7 text-center
                        text-sm text-slate-500
                    ">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="
                                font-bold text-blue-600
                                hover:text-blue-700
                            "
                        >
                            Sign in
                        </Link>

                    </p>

                </motion.div>

            </main>

        </div>
    );
}

export default SignupForm;