import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Plus,
    Package,
    Search,
    Trash2,
    Edit,
    Eye,
    RefreshCw,
    AlertCircle,
} from "lucide-react";

function AdminProducts() {

    const navigate = useNavigate();

    // ============================================================
    // STATE
    // ============================================================

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [deletingId, setDeletingId] = useState(null);


    // ============================================================
    // FETCH PRODUCTS
    // ============================================================

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:8080/products"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch products.");
            }

            const data = await response.json();

            // Newest product first
            setProducts(
                [...data].sort((a, b) => b.id - a.id)
            );

        } catch (error) {

            console.error("Fetch products error:", error);

            setError(
                error.message || "Unable to load products."
            );

        } finally {
            setLoading(false);
        }
    };


    // ============================================================
    // LOAD PRODUCTS WHEN PAGE OPENS
    // ============================================================

    useEffect(() => {

        fetchProducts();

    }, []);


    // ============================================================
    // DELETE PRODUCT
    // ============================================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            setDeletingId(id);

            const token = localStorage.getItem("token");

            if (!token) {

                setError("You are not logged in.");

                navigate("/login");

                return;
            }


            const response = await fetch(
                `http://localhost:8080/products/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            if (!response.ok) {

                const message = await response.text();

                throw new Error(
                    message || "Failed to delete product."
                );
            }


            // Remove product immediately from UI

            setProducts((prevProducts) =>
                prevProducts.filter(
                    (product) => product.id !== id
                )
            );


        } catch (error) {

            console.error("Delete product error:", error);

            setError(
                error.message ||
                "Unable to delete product."
            );

        } finally {

            setDeletingId(null);

        }
    };


    // ============================================================
    // SEARCH
    // ============================================================

    const filteredProducts = products.filter((product) => {

        const searchText = search.toLowerCase();

        return (
            product.name?.toLowerCase().includes(searchText) ||
            product.category?.toLowerCase().includes(searchText) ||
            product.brand?.toLowerCase().includes(searchText)
        );

    });


    // ============================================================
    // CALCULATE DISCOUNTED PRICE
    // ============================================================

    const getFinalPrice = (product) => {

        const price = Number(product.price || 0);
        const discount = Number(product.discount || 0);

        return price - (price * discount / 100);
    };


    // ============================================================
    // RENDER
    // ============================================================

    return (

        <div className="mx-auto max-w-7xl">


            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <h1 className="text-3xl font-black tracking-tight text-slate-950">
                        Products
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Manage your SHOPX store products.
                    </p>

                </div>


                <Link
                    to="/admin/products/new"
                    className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-slate-950
                        px-5
                        py-3
                        text-sm
                        font-bold
                        text-white
                        shadow-sm
                        transition
                        hover:bg-blue-600
                    "
                >

                    <Plus size={18} />

                    Add Product

                </Link>

            </div>


            {/* =====================================================
                ERROR
            ===================================================== */}

            {error && (

                <div
                    className="
                        mb-6
                        flex
                        items-center
                        justify-between
                        gap-4
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        px-4
                        py-3
                    "
                >

                    <div className="flex items-center gap-3">

                        <AlertCircle
                            size={19}
                            className="text-red-500"
                        />

                        <p className="text-sm font-semibold text-red-600">
                            {error}
                        </p>

                    </div>


                    <button
                        onClick={fetchProducts}
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-bold
                            text-red-600
                            hover:text-red-800
                        "
                    >

                        <RefreshCw size={16} />

                        Retry

                    </button>

                </div>

            )}


            {/* =====================================================
                SEARCH + REFRESH
            ===================================================== */}

            <div
                className="
                    mb-6
                    flex
                    flex-col
                    gap-3
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >

                <div className="relative w-full sm:max-w-md">

                    <Search
                        size={18}
                        className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                        "
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search products..."
                        className="
                            h-12
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            pl-11
                            pr-4
                            text-sm
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-4
                            focus:ring-blue-500/10
                        "
                    />

                </div>


                <button
                    type="button"
                    onClick={fetchProducts}
                    disabled={loading}
                    className="
                        flex
                        h-12
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-5
                        text-sm
                        font-bold
                        text-slate-700
                        transition
                        hover:bg-slate-50
                        disabled:opacity-50
                    "
                >

                    <RefreshCw
                        size={17}
                        className={loading ? "animate-spin" : ""}
                    />

                    Refresh

                </button>

            </div>


            {/* =====================================================
                PRODUCT COUNT
            ===================================================== */}

            {!loading && (

                <div className="mb-4">

                    <p className="text-sm font-semibold text-slate-500">

                        {filteredProducts.length}

                        {" "}

                        {filteredProducts.length === 1
                            ? "product"
                            : "products"}

                    </p>

                </div>

            )}


            {/* =====================================================
                LOADING
            ===================================================== */}

            {loading ? (

                <div
                    className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-12
                        text-center
                    "
                >

                    <div
                        className="
                            mx-auto
                            h-10
                            w-10
                            animate-spin
                            rounded-full
                            border-4
                            border-slate-200
                            border-t-blue-600
                        "
                    />

                    <p className="mt-4 text-sm font-semibold text-slate-500">
                        Loading products...
                    </p>

                </div>

            ) : filteredProducts.length === 0 ? (


                /* =================================================
                    EMPTY STATE
                ================================================= */

                <div
                    className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-12
                        text-center
                        shadow-sm
                    "
                >

                    <div
                        className="
                            mx-auto
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-2xl
                            bg-slate-100
                        "
                    >

                        <Package
                            size={32}
                            className="text-slate-400"
                        />

                    </div>


                    <h3 className="mt-5 text-lg font-bold text-slate-900">

                        {search
                            ? "No products found"
                            : "No products yet"}

                    </h3>


                    <p className="mt-2 text-sm text-slate-500">

                        {search
                            ? "Try searching with another product name."
                            : "Add your first product to your store."}

                    </p>


                    {!search && (

                        <Link
                            to="/admin/products/new"
                            className="
                                mt-6
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                bg-blue-600
                                px-5
                                py-3
                                text-sm
                                font-bold
                                text-white
                                transition
                                hover:bg-blue-700
                            "
                        >

                            <Plus size={18} />

                            Create Product

                        </Link>

                    )}

                </div>

            ) : (


                /* =================================================
                    PRODUCT GRID
                ================================================= */

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {filteredProducts.map((product) => (

                        <div
                            key={product.id}
                            className="
                                overflow-hidden
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                shadow-sm
                                transition
                                hover:-translate-y-1
                                hover:shadow-lg
                            "
                        >


                            {/* =====================================
                                IMAGE
                            ===================================== */}

                            <div
                                className="
                                    relative
                                    aspect-square
                                    overflow-hidden
                                    bg-slate-100
                                "
                            >

                                {product.imageUrl ? (

                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="
                                            h-full
                                            w-full
                                            object-cover
                                            transition
                                            duration-300
                                            hover:scale-105
                                        "
                                    />

                                ) : (

                                    <div
                                        className="
                                            flex
                                            h-full
                                            items-center
                                            justify-center
                                        "
                                    >

                                        <Package
                                            size={45}
                                            className="text-slate-300"
                                        />

                                    </div>

                                )}


                                {/* DISCOUNT */}

                                {Number(product.discount) > 0 && (

                                    <span
                                        className="
                                            absolute
                                            left-3
                                            top-3
                                            rounded-lg
                                            bg-red-500
                                            px-2.5
                                            py-1
                                            text-xs
                                            font-black
                                            text-white
                                        "
                                    >

                                        {product.discount}% OFF

                                    </span>

                                )}

                            </div>


                            {/* =====================================
                                CONTENT
                            ===================================== */}

                            <div className="p-5">


                                {/* CATEGORY */}

                                <p
                                    className="
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-wider
                                        text-blue-600
                                    "
                                >

                                    {product.category}

                                </p>


                                {/* NAME */}

                                <h3
                                    className="
                                        mt-2
                                        truncate
                                        text-base
                                        font-black
                                        text-slate-950
                                    "
                                    title={product.name}
                                >

                                    {product.name}

                                </h3>


                                {/* BRAND */}

                                <p className="mt-1 text-xs text-slate-500">

                                    {product.brand}

                                </p>


                                {/* PRICE */}

                                <div className="mt-4 flex items-center gap-2">

                                    <span className="text-lg font-black text-slate-950">

                                        ₹{getFinalPrice(product).toFixed(2)}

                                    </span>


                                    {Number(product.discount) > 0 && (

                                        <span
                                            className="
                                                text-xs
                                                font-semibold
                                                text-slate-400
                                                line-through
                                            "
                                        >

                                            ₹{Number(product.price).toFixed(2)}

                                        </span>

                                    )}

                                </div>


                                {/* STOCK + RATING */}

                                <div
                                    className="
                                        mt-3
                                        flex
                                        items-center
                                        justify-between
                                        text-xs
                                    "
                                >

                                    <span
                                        className={
                                            Number(product.stock) > 0
                                                ? "font-semibold text-emerald-600"
                                                : "font-semibold text-red-500"
                                        }
                                    >

                                        {Number(product.stock) > 0
                                            ? `${product.stock} in stock`
                                            : "Out of stock"}

                                    </span>


                                    <span className="font-semibold text-amber-500">

                                        ★ {product.rating ?? 0}

                                    </span>

                                </div>


                                {/* =================================
                                    ACTIONS
                                ================================= */}

                                <div
                                    className="
                                        mt-5
                                        grid
                                        grid-cols-3
                                        gap-2
                                    "
                                >


                                    {/* VIEW */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                `/products/${product.id}`
                                            )
                                        }
                                        title="View product"
                                        className="
                                            flex
                                            h-10
                                            items-center
                                            justify-center
                                            rounded-lg
                                            border
                                            border-slate-200
                                            text-slate-600
                                            transition
                                            hover:bg-slate-50
                                            hover:text-blue-600
                                        "
                                    >

                                        <Eye size={17} />

                                    </button>


                                    {/* EDIT */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                `/admin/products/edit/${product.id}`
                                            )
                                        }
                                        title="Edit product"
                                        className="
                                            flex
                                            h-10
                                            items-center
                                            justify-center
                                            rounded-lg
                                            border
                                            border-slate-200
                                            text-slate-600
                                            transition
                                            hover:bg-blue-50
                                            hover:text-blue-600
                                        "
                                    >

                                        <Edit size={17} />

                                    </button>


                                    {/* DELETE */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDelete(product.id)
                                        }
                                        disabled={
                                            deletingId === product.id
                                        }
                                        title="Delete product"
                                        className="
                                            flex
                                            h-10
                                            items-center
                                            justify-center
                                            rounded-lg
                                            border
                                            border-red-100
                                            text-red-500
                                            transition
                                            hover:bg-red-50
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                        "
                                    >

                                        {deletingId === product.id ? (

                                            <span
                                                className="
                                                    h-4
                                                    w-4
                                                    animate-spin
                                                    rounded-full
                                                    border-2
                                                    border-red-200
                                                    border-t-red-500
                                                "
                                            />

                                        ) : (

                                            <Trash2 size={17} />

                                        )}

                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default AdminProducts;