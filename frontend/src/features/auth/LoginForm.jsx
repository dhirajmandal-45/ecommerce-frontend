import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { login as loginUser } from "../../services/authService";
import {
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ArrowRight,
    ShoppingBag,
} from "lucide-react";

function LoginForm() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    // ============================================================
    // HANDLE INPUT CHANGE
    // ============================================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    // ============================================================
    // LOGIN
    // ============================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        const email = formData.email.trim();
        const password = formData.password;

        // Check empty fields
        if (!email || !password) {

            setError("Please enter email and password.");

            return;
        }


        try {

            setLoading(true);


            // ====================================================
            // LOGIN THROUGH BACKEND
            // ====================================================

            const token = await loginUser(email, password);

            console.log("Login successful");

            localStorage.setItem("token", token);

            // ====================================================
            // SAVE USER EMAIL
            // ====================================================

            localStorage.setItem(
                "userEmail",
                formData.email
            );


            // ====================================================
            // GET ROLE FROM JWT
            // ====================================================
            //
            // JWT structure:
            //
            // HEADER.PAYLOAD.SIGNATURE
            //
            // Example payload:
            //
            // {
            //     "sub": "admin@gmail.com",
            //     "role": "ADMIN"
            // }
            //
            // We decode the PAYLOAD to get the role.
            // ====================================================

            const payload = JSON.parse(
                atob(token.split(".")[1])
            );


            // Get role from JWT
            const role = payload.role;


            // ====================================================
            // SAVE ROLE IN LOCAL STORAGE
            // ====================================================

            localStorage.setItem("role", role);

            window.dispatchEvent(new Event("authChanged"));


            // ====================================================
            // DEBUG
            // ====================================================

            console.log("Logged in role:", role);

            console.log("Login successful");


            // ====================================================
            // GO TO HOME
            // ====================================================

            navigate("/");


        } catch (error) {

            console.error("Login error:", error);

            setError(
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

                <div
                    className="
                        mx-auto flex max-w-7xl
                        items-center justify-between
                        px-4 py-4
                        sm:px-6
                        lg:px-8
                    "
                >

                    {/* LOGO */}

                    <Link
                        to="/"
                        className="flex items-center gap-2"
                    >

                        <div
                            className="
                                flex h-9 w-9
                                items-center justify-center
                                rounded-xl
                                bg-gradient-to-br
                                from-blue-500 to-violet-600
                                text-lg font-black
                                text-white
                            "
                        >
                            S
                        </div>

                        <div>

                            <span
                                className="
                                    block text-xl
                                    font-black
                                    tracking-tight
                                    text-slate-950
                                "
                            >
                                SHOPX
                            </span>

                            <span
                                className="
                                    hidden text-[9px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.18em]
                                    text-slate-400
                                    sm:block
                                "
                            >
                                Everything. Better.
                            </span>

                        </div>

                    </Link>


                    {/* BACK TO STORE */}

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


            {/* LOGIN AREA */}

            <main
                className="
                    flex min-h-[calc(100vh-74px)]
                    items-center justify-center
                    px-4 py-10
                    sm:px-6
                "
            >

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
                        w-full max-w-md
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

                    <div
                        className="
                            mx-auto flex h-14 w-14
                            items-center justify-center
                            rounded-2xl
                            bg-blue-50
                            text-blue-600
                        "
                    >
                        <ShoppingBag size={27} />
                    </div>


                    {/* TITLE */}

                    <div className="mt-5 text-center">

                        <h1
                            className="
                                text-2xl font-black
                                tracking-tight
                                text-slate-950
                                sm:text-3xl
                            "
                        >
                            Welcome back
                        </h1>

                        <p
                            className="
                                mt-2 text-sm
                                text-slate-500
                            "
                        >
                            Sign in to continue shopping with SHOPX.
                        </p>

                    </div>


                    {/* FORM */}

                    <form
                        onSubmit={handleSubmit}
                        className="mt-7 space-y-5"
                    >

                        {/* EMAIL */}

                        <div>

                            <label
                                htmlFor="email"
                                className="
                                    mb-2 block
                                    text-sm font-semibold
                                    text-slate-700
                                "
                            >
                                Email address
                            </label>

                            <div className="relative">

                                <Mail
                                    size={18}
                                    className="
                                        absolute left-3.5 top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                    "
                                />

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    required
                                    className="
                                        h-12 w-full
                                        rounded-xl
                                        border border-slate-200
                                        bg-slate-50
                                        pl-11 pr-4
                                        text-sm
                                        text-slate-800
                                        outline-none
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

                            <div
                                className="
                                    mb-2 flex
                                    items-center justify-between
                                "
                            >

                                <label
                                    htmlFor="password"
                                    className="
                                        text-sm font-semibold
                                        text-slate-700
                                    "
                                >
                                    Password
                                </label>

                                <button
                                    type="button"
                                    className="
                                        text-xs font-semibold
                                        text-blue-600
                                        hover:text-blue-700
                                    "
                                >
                                    Forgot password?
                                </button>

                            </div>


                            <div className="relative">

                                <LockKeyhole
                                    size={18}
                                    className="
                                        absolute left-3.5 top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                    "
                                />

                                <input
                                    id="password"
                                    name="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                    className="
                                        h-12 w-full
                                        rounded-xl
                                        border border-slate-200
                                        bg-slate-50
                                        pl-11 pr-11
                                        text-sm
                                        text-slate-800
                                        outline-none
                                        transition
                                        focus:border-blue-500
                                        focus:bg-white
                                        focus:ring-4
                                        focus:ring-blue-500/10
                                    "
                                />


                                {/* SHOW / HIDE PASSWORD */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            (prev) => !prev
                                        )
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    className="
                                        absolute right-3.5 top-1/2
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


                        {/* ERROR */}

                        {error && (

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: -5,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                className="
                                    rounded-xl
                                    border border-red-200
                                    bg-red-50
                                    px-4 py-3
                                    text-sm
                                    font-medium
                                    text-red-600
                                "
                            >
                                {error}
                            </motion.div>

                        )}


                        {/* LOGIN BUTTON */}

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
                                gap-2
                                rounded-xl
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
                                <>
                                    <span
                                        className="
                                            h-4 w-4
                                            animate-spin
                                            rounded-full
                                            border-2
                                            border-white/30
                                            border-t-white
                                        "
                                    />

                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight size={17} />
                                </>
                            )}

                        </motion.button>

                    </form>


                    {/* SIGNUP */}

                    <p
                        className="
                            mt-7 text-center
                            text-sm text-slate-500
                        "
                    >
                        Don't have an account?{" "}

                        <Link
                            to="/signup"
                            className="
                                font-bold
                                text-blue-600
                                hover:text-blue-700
                            "
                        >
                            Create account
                        </Link>

                    </p>

                </motion.div>

            </main>

        </div>
    );
}

export default LoginForm;