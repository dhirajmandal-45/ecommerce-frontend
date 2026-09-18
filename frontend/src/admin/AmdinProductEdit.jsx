import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Package,
    Tag,
    Star,
    Percent,
    Save,
    Trash2,
    Image as ImageIcon,
} from "lucide-react";

function AdminProductEdit() {
    const navigate = useNavigate();
    const { id } = useParams();

    // ============================================================
    // PRODUCT STATE
    // ============================================================

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        color: "",
        size: "",
        stock: "",
        rating: "0",
        discount: "0",
        imageUrl: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ============================================================
    // GET PRODUCT
    // ============================================================

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `http://localhost:8080/products/${id}`
            );

            if (!response.ok) {
                throw new Error("Product not found.");
            }

            const data = await response.json();

            setProduct({
                name: data.name ?? "",
                description: data.description ?? "",
                price: data.price ?? "",
                category: data.category ?? "",
                brand: data.brand ?? "",
                color: data.color ?? "",
                size: data.size ?? "",
                stock: data.stock ?? "",
                rating: data.rating ?? "0",
                discount: data.discount ?? "0",
                imageUrl: data.imageUrl ?? "",
            });
        } catch (err) {
            console.error("Fetch product error:", err);

            setError(
                err.message || "Failed to load product."
            );
        } finally {
            setLoading(false);
        }
    };

    // ============================================================
    // HANDLE INPUT
    // ============================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduct((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    };

    // ============================================================
    // UPDATE PRODUCT
    // ============================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        try {
            setSaving(true);

            const token = localStorage.getItem("token");

            if (!token) {
                setError("You are not logged in.");
                navigate("/login");
                return;
            }

            const updatedProduct = {
                name: product.name,
                description: product.description,
                price: Number(product.price),
                category: product.category,
                brand: product.brand,
                color: product.color,
                size: product.size,
                stock: Number(product.stock),
                rating: Number(product.rating),
                discount: Number(product.discount),
                imageUrl: product.imageUrl,
            };

            const response = await fetch(
                `http://localhost:8080/products/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify(updatedProduct),
                }
            );

            const responseText = await response.text();

            if (!response.ok) {
                throw new Error(
                    responseText || "Failed to update product."
                );
            }

            setSuccess("Product updated successfully.");

            setTimeout(() => {
                navigate("/admin/products");
            }, 1000);
        } catch (err) {
            console.error("Update product error:", err);

            setError(
                err.message ||
                "Something went wrong while updating the product."
            );
        } finally {
            setSaving(false);
        }
    };

    // ============================================================
    // DELETE PRODUCT
    // ============================================================

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeleting(true);
            setError("");
            setSuccess("");

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

            const responseText = await response.text();

            if (!response.ok) {
                throw new Error(
                    responseText || "Failed to delete product."
                );
            }

            navigate("/admin/products");
        } catch (err) {
            console.error("Delete product error:", err);

            setError(
                err.message ||
                "Something went wrong while deleting the product."
            );
        } finally {
            setDeleting(false);
        }
    };

    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                    <p className="mt-4 text-sm font-semibold text-slate-500">
                        Loading product...
                    </p>
                </div>
            </div>
        );
    }

    // ============================================================
    // UI
    // ============================================================

    return (
        <div className="mx-auto max-w-6xl">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="mb-8">

                <Link
                    to="/admin/products"
                    className="mb-3 flex w-fit items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
                >
                    <ArrowLeft size={17} />
                    Back to Products
                </Link>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-slate-950">
                            Edit Product
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Update your product information.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={deleting || saving}
                        className="flex w-fit items-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Trash2 size={17} />

                        {deleting
                            ? "Deleting..."
                            : "Delete Product"}
                    </button>

                </div>
            </div>

            {/* =====================================================
                ERROR
            ===================================================== */}

            {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                    {error}
                </div>
            )}

            {/* =====================================================
                SUCCESS
            ===================================================== */}

            {success && (
                <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-600">
                    {success}
                </div>
            )}

            {/* =====================================================
                FORM
            ===================================================== */}

            <form onSubmit={handleSubmit}>

                <div className="grid gap-6 lg:grid-cols-3">

                    {/* =================================================
                        LEFT SIDE
                    ================================================= */}

                    <div className="space-y-6 lg:col-span-2">

                        {/* =================================================
                            BASIC INFORMATION
                        ================================================= */}

                        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="mb-6 flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <Package size={20} />
                                </div>

                                <div>
                                    <h2 className="font-bold text-slate-950">
                                        Basic Information
                                    </h2>

                                    <p className="text-xs text-slate-500">
                                        Product name and description
                                    </p>
                                </div>

                            </div>

                            {/* PRODUCT NAME */}

                            <div className="mb-5">

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Product Name
                                </label>

                                <input
                                    name="name"
                                    value={product.name}
                                    onChange={handleChange}
                                    placeholder="Example: Premium Cotton T-Shirt"
                                    required
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                />

                            </div>

                            {/* DESCRIPTION */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={product.description}
                                    onChange={handleChange}
                                    placeholder="Write a detailed description..."
                                    rows={6}
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                />

                            </div>

                        </section>

                        {/* =================================================
                            PRICING
                        ================================================= */}

                        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="mb-6 flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <Tag size={20} />
                                </div>

                                <div>
                                    <h2 className="font-bold text-slate-950">
                                        Pricing & Inventory
                                    </h2>

                                    <p className="text-xs text-slate-500">
                                        Price, discount and stock
                                    </p>
                                </div>

                            </div>

                            <div className="grid gap-5 sm:grid-cols-3">

                                {/* PRICE */}

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Price
                                    </label>

                                    <div className="relative">

                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                                            ₹
                                        </span>

                                        <input
                                            name="price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={product.price}
                                            onChange={handleChange}
                                            required
                                            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
                                        />

                                    </div>

                                </div>

                                {/* DISCOUNT */}

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Discount
                                    </label>

                                    <div className="relative">

                                        <Percent
                                            size={17}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            name="discount"
                                            type="number"
                                            min="0"
                                            max="100"
                                            step="0.01"
                                            value={product.discount}
                                            onChange={handleChange}
                                            required
                                            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
                                        />

                                    </div>

                                </div>

                                {/* STOCK */}

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Stock
                                    </label>

                                    <input
                                        name="stock"
                                        type="number"
                                        min="0"
                                        value={product.stock}
                                        onChange={handleChange}
                                        required
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
                                    />

                                </div>

                            </div>

                        </section>

                        {/* =================================================
                            PRODUCT DETAILS
                        ================================================= */}

                        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="mb-6 flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                    <Tag size={20} />
                                </div>

                                <div>
                                    <h2 className="font-bold text-slate-950">
                                        Product Details
                                    </h2>

                                    <p className="text-xs text-slate-500">
                                        Category and product attributes
                                    </p>
                                </div>

                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">

                                {/* CATEGORY */}

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Category
                                    </label>

                                    <input
                                        name="category"
                                        value={product.category}
                                        onChange={handleChange}
                                        required
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
                                    />

                                </div>

                                {/* BRAND */}

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Brand
                                    </label>

                                    <input
                                        name="brand"
                                        value={product.brand}
                                        onChange={handleChange}
                                        required
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
                                    />

                                </div>

                                {/* COLOR */}

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Color
                                    </label>

                                    <input
                                        name="color"
                                        value={product.color}
                                        onChange={handleChange}
                                        required
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
                                    />

                                </div>

                                {/* SIZE */}

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Size
                                    </label>

                                    <input
                                        name="size"
                                        value={product.size}
                                        onChange={handleChange}
                                        required
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
                                    />

                                </div>

                                {/* RATING */}

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Rating
                                    </label>

                                    <div className="relative">

                                        <Star
                                            size={17}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400"
                                        />

                                        <input
                                            name="rating"
                                            type="number"
                                            min="0"
                                            max="5"
                                            step="0.1"
                                            value={product.rating}
                                            onChange={handleChange}
                                            required
                                            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
                                        />

                                    </div>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Rating between 0 and 5
                                    </p>

                                </div>

                            </div>

                        </section>

                    </div>

                    {/* =================================================
                        RIGHT SIDE
                    ================================================= */}

                    <div className="space-y-6">

                        {/* =================================================
                            IMAGE
                        ================================================= */}

                        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="mb-5 flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
                                    <ImageIcon size={20} />
                                </div>

                                <div>
                                    <h2 className="font-bold text-slate-950">
                                        Product Image
                                    </h2>

                                    <p className="text-xs text-slate-500">
                                        Current product image
                                    </p>
                                </div>

                            </div>

                            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-slate-100">

                                {product.imageUrl ? (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center">
                                        <ImageIcon
                                            size={42}
                                            className="mx-auto text-slate-300"
                                        />

                                        <p className="mt-3 text-sm font-semibold text-slate-400">
                                            No image
                                        </p>
                                    </div>
                                )}

                            </div>

                        </section>

                        {/* =================================================
                            SAVE
                        ================================================= */}

                        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="mb-4">

                                <p className="text-sm font-bold text-slate-950">
                                    Save Changes
                                </p>

                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    Review your product information before saving.
                                </p>

                            </div>

                            <button
                                type="submit"
                                disabled={saving || deleting}
                                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saving ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Save Changes
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/admin/products")
                                }
                                disabled={saving || deleting}
                                className="mt-3 h-12 w-full rounded-xl border border-slate-200 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Cancel
                            </button>

                        </section>

                    </div>

                </div>

            </form>
        </div>
    );
}

export default AdminProductEdit;