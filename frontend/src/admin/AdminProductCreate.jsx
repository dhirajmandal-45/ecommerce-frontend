import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Image,
    Package,
    Tag,
    Star,
    Percent,
    Save,
    X,
} from "lucide-react";

function AdminProductCreate() {
    const navigate = useNavigate();

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
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ============================================================
    // HANDLE INPUT
    // ============================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ============================================================
    // HANDLE IMAGE
    // ============================================================

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        setError("");
        setSuccess("");

        if (!file) {
            return;
        }

        // Check image type
        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            e.target.value = "";
            return;
        }

        // Maximum 5 MB
        if (file.size > 5 * 1024 * 1024) {
            setError("Image size must be less than 5 MB.");
            e.target.value = "";
            return;
        }

        // Remove old preview URL
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }

        setImageFile(file);

        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    };

    // ============================================================
    // REMOVE IMAGE
    // ============================================================

    const removeImage = () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }

        setImageFile(null);
        setImagePreview("");

        const fileInput = document.getElementById("product-image");

        if (fileInput) {
            fileInput.value = "";
        }
    };

    // ============================================================
    // SUBMIT PRODUCT
    // ============================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        // Image required
        if (!imageFile) {
            setError("Please select a product image.");
            return;
        }

        try {
            setLoading(true);

            // ====================================================
            // GET JWT TOKEN
            // ====================================================

            const token = localStorage.getItem("token");

            if (!token) {
                setError("You are not logged in.");
                navigate("/login");
                return;
            }

            // ====================================================
            // CREATE FORMDATA
            // ====================================================

            const formData = new FormData();

            formData.append("name", product.name);
            formData.append("description", product.description);
            formData.append("price", product.price);
            formData.append("category", product.category);
            formData.append("brand", product.brand);
            formData.append("color", product.color);
            formData.append("size", product.size);
            formData.append("stock", product.stock);
            formData.append("rating", product.rating);
            formData.append("discount", product.discount);

            // IMPORTANT:
            // Backend expects @RequestParam("image")
            formData.append("image", imageFile);

            // ====================================================
            // SEND TO BACKEND
            // ====================================================

            const response = await fetch(
                "http://localhost:8080/products",
                {
                    method: "POST",

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                    body: formData,
                }
            );

            // ====================================================
            // READ RESPONSE
            // ====================================================

            const responseText = await response.text();

            // ====================================================
            // CHECK RESPONSE
            // ====================================================

            if (!response.ok) {
                throw new Error(
                    responseText || "Failed to create product."
                );
            }

            console.log(
                "Product created successfully:",
                responseText
            );

            setSuccess("Product created successfully!");

            // ====================================================
            // CLEAR FORM
            // ====================================================

            setProduct({
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
            });

            removeImage();

            // ====================================================
            // GO TO PRODUCTS
            // ====================================================

            setTimeout(() => {
                navigate("/admin/products");
            }, 1000);

        } catch (error) {
            console.error("Create product error:", error);

            setError(
                error.message ||
                "Something went wrong while creating the product."
            );
        } finally {
            setLoading(false);
        }
    };

    // ============================================================
    // UI
    // ============================================================

    return (
        <div className="mx-auto max-w-6xl">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <button
                        type="button"
                        onClick={() => navigate("/admin/products")}
                        className="
                            mb-3
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                            text-slate-500
                            hover:text-blue-600
                        "
                    >
                        <ArrowLeft size={17} />
                        Back to Products
                    </button>

                    <h1 className="text-3xl font-black tracking-tight text-slate-950">
                        Create Product
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Add a new product to your SHOPX store.
                    </p>

                </div>

            </div>

            {/* =====================================================
                ERROR
            ===================================================== */}

            {error && (
                <div
                    className="
                        mb-6
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        px-4
                        py-3
                        text-sm
                        font-semibold
                        text-red-600
                    "
                >
                    {error}
                </div>
            )}

            {/* =====================================================
                SUCCESS
            ===================================================== */}

            {success && (
                <div
                    className="
                        mb-6
                        rounded-xl
                        border
                        border-emerald-200
                        bg-emerald-50
                        px-4
                        py-3
                        text-sm
                        font-semibold
                        text-emerald-600
                    "
                >
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

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-blue-50
                                        text-blue-600
                                    "
                                >
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

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                    "
                                >
                                    Product Name
                                </label>

                                <input
                                    name="name"
                                    value={product.name}
                                    onChange={handleChange}
                                    placeholder="Example: Premium Cotton T-Shirt"
                                    required
                                    className="
                                        h-12
                                        w-full
                                        rounded-xl
                                        border
                                        border-slate-200
                                        bg-slate-50
                                        px-4
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-blue-500
                                        focus:bg-white
                                        focus:ring-4
                                        focus:ring-blue-500/10
                                    "
                                />

                            </div>

                            {/* DESCRIPTION */}

                            <div>

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                    "
                                >
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={product.description}
                                    onChange={handleChange}
                                    placeholder="Write a detailed description of the product..."
                                    rows={6}
                                    className="
                                        w-full
                                        resize-none
                                        rounded-xl
                                        border
                                        border-slate-200
                                        bg-slate-50
                                        p-4
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-blue-500
                                        focus:bg-white
                                        focus:ring-4
                                        focus:ring-blue-500/10
                                    "
                                />

                            </div>

                        </section>

                        {/* =================================================
                            PRICING
                        ================================================= */}

                        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="mb-6 flex items-center gap-3">

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-emerald-50
                                        text-emerald-600
                                    "
                                >
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

                                    <label
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                            text-slate-700
                                        "
                                    >
                                        Price
                                    </label>

                                    <div className="relative">

                                        <span
                                            className="
                                                absolute
                                                left-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-sm
                                                font-bold
                                                text-slate-400
                                            "
                                        >
                                            ₹
                                        </span>

                                        <input
                                            name="price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={product.price}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            required
                                            className="
                                                h-12
                                                w-full
                                                rounded-xl
                                                border
                                                border-slate-200
                                                bg-slate-50
                                                pl-9
                                                pr-4
                                                text-sm
                                                outline-none
                                                focus:border-blue-500
                                                focus:bg-white
                                            "
                                        />

                                    </div>

                                </div>

                                {/* DISCOUNT */}

                                <div>

                                    <label
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                            text-slate-700
                                        "
                                    >
                                        Discount
                                    </label>

                                    <div className="relative">

                                        <Percent
                                            size={17}
                                            className="
                                                absolute
                                                left-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-slate-400
                                            "
                                        />

                                        <input
                                            name="discount"
                                            type="number"
                                            min="0"
                                            max="100"
                                            step="0.01"
                                            value={product.discount}
                                            onChange={handleChange}
                                            placeholder="0"
                                            required
                                            className="
                                                h-12
                                                w-full
                                                rounded-xl
                                                border
                                                border-slate-200
                                                bg-slate-50
                                                pl-11
                                                pr-4
                                                text-sm
                                                outline-none
                                                focus:border-blue-500
                                                focus:bg-white
                                            "
                                        />

                                    </div>

                                </div>

                                {/* STOCK */}

                                <div>

                                    <label
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                            text-slate-700
                                        "
                                    >
                                        Stock
                                    </label>

                                    <input
                                        name="stock"
                                        type="number"
                                        min="0"
                                        value={product.stock}
                                        onChange={handleChange}
                                        placeholder="0"
                                        required
                                        className="
                                            h-12
                                            w-full
                                            rounded-xl
                                            border
                                            border-slate-200
                                            bg-slate-50
                                            px-4
                                            text-sm
                                            outline-none
                                            focus:border-blue-500
                                            focus:bg-white
                                        "
                                    />

                                </div>

                            </div>

                        </section>

                        {/* =================================================
                            PRODUCT DETAILS
                        ================================================= */}

                        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="mb-6 flex items-center gap-3">

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-violet-50
                                        text-violet-600
                                    "
                                >
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

                                    <label
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                            text-slate-700
                                        "
                                    >
                                        Category
                                    </label>

                                    <select
                                        name="category"
                                        value={product.category}
                                        onChange={handleChange}
                                        required
                                        className="
                                            h-12
                                            w-full
                                            rounded-xl
                                            border
                                            border-slate-200
                                            bg-slate-50
                                            px-4
                                            text-sm
                                            outline-none
                                            transition
                                            focus:border-blue-500
                                            focus:bg-white
                                            focus:ring-4
                                            focus:ring-blue-500/10
                                        "
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Fashion">Fashion</option>
                                        <option value="Mobiles">Mobiles</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Beauty">Beauty</option>
                                        <option value="Home">Home</option>
                                        <option value="Appliances">Appliances</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Accessories">Accessories</option>
                                    </select>

                                </div>

                                {/* BRAND */}

                                <div>

                                    <label
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                            text-slate-700
                                        "
                                    >
                                        Brand
                                    </label>

                                    <input
                                        name="brand"
                                        value={product.brand}
                                        onChange={handleChange}
                                        placeholder="Example: Nike"
                                        required
                                        className="
                                            h-12
                                            w-full
                                            rounded-xl
                                            border
                                            border-slate-200
                                            bg-slate-50
                                            px-4
                                            text-sm
                                            outline-none
                                            focus:border-blue-500
                                            focus:bg-white
                                        "
                                    />

                                </div>

                                {/* COLOR */}

                                <div>

                                    <label
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                            text-slate-700
                                        "
                                    >
                                        Color
                                    </label>

                                    <input
                                        name="color"
                                        value={product.color}
                                        onChange={handleChange}
                                        placeholder="Example: Black"
                                        required
                                        className="
                                            h-12
                                            w-full
                                            rounded-xl
                                            border
                                            border-slate-200
                                            bg-slate-50
                                            px-4
                                            text-sm
                                            outline-none
                                            focus:border-blue-500
                                            focus:bg-white
                                        "
                                    />

                                </div>

                                {/* SIZE */}

                                <div>

                                    <label
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                            text-slate-700
                                        "
                                    >
                                        Size
                                    </label>

                                    <input
                                        name="size"
                                        value={product.size}
                                        onChange={handleChange}
                                        placeholder="Example: M"
                                        required
                                        className="
                                            h-12
                                            w-full
                                            rounded-xl
                                            border
                                            border-slate-200
                                            bg-slate-50
                                            px-4
                                            text-sm
                                            outline-none
                                            focus:border-blue-500
                                            focus:bg-white
                                        "
                                    />

                                </div>

                                {/* RATING */}

                                <div>

                                    <label
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                            text-slate-700
                                        "
                                    >
                                        Rating
                                    </label>

                                    <div className="relative">

                                        <Star
                                            size={17}
                                            className="
                                                absolute
                                                left-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-amber-400
                                            "
                                        />

                                        <input
                                            name="rating"
                                            type="number"
                                            min="0"
                                            max="5"
                                            step="0.1"
                                            value={product.rating}
                                            onChange={handleChange}
                                            placeholder="0"
                                            required
                                            className="
                                                h-12
                                                w-full
                                                rounded-xl
                                                border
                                                border-slate-200
                                                bg-slate-50
                                                pl-11
                                                pr-4
                                                text-sm
                                                outline-none
                                                focus:border-blue-500
                                                focus:bg-white
                                            "
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
                            IMAGE UPLOAD
                        ================================================= */}

                        <section
                            className="
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                p-6
                                shadow-sm
                            "
                        >

                            <div className="mb-5 flex items-center gap-3">

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-pink-50
                                        text-pink-600
                                    "
                                >
                                    <Image size={20} />
                                </div>

                                <div>

                                    <h2 className="font-bold text-slate-950">
                                        Product Image
                                    </h2>

                                    <p className="text-xs text-slate-500">
                                        Select an image from your computer
                                    </p>

                                </div>

                            </div>

                            {/* IMAGE PREVIEW */}

                            <div
                                className="
                                    relative
                                    mb-5
                                    flex
                                    aspect-square
                                    items-center
                                    justify-center
                                    overflow-hidden
                                    rounded-2xl
                                    bg-slate-100
                                "
                            >

                                {imagePreview ? (
                                    <>
                                        <img
                                            src={imagePreview}
                                            alt="Product preview"
                                            className="
                                                h-full
                                                w-full
                                                object-cover
                                            "
                                        />

                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="
                                                absolute
                                                right-3
                                                top-3
                                                flex
                                                h-9
                                                w-9
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-white
                                                text-red-500
                                                shadow-lg
                                                transition
                                                hover:bg-red-50
                                            "
                                        >
                                            <X size={18} />
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-center">

                                        <Image
                                            size={42}
                                            className="mx-auto text-slate-300"
                                        />

                                        <p
                                            className="
                                                mt-3
                                                text-sm
                                                font-semibold
                                                text-slate-400
                                            "
                                        >
                                            No image selected
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                text-xs
                                                text-slate-400
                                            "
                                        >
                                            JPG, PNG, WEBP up to 5 MB
                                        </p>

                                    </div>
                                )}

                            </div>

                            {/* FILE INPUT */}

                            <label
                                htmlFor="product-image"
                                className="
                                    flex
                                    h-12
                                    w-full
                                    cursor-pointer
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    text-sm
                                    font-bold
                                    text-slate-700
                                    transition
                                    hover:border-blue-500
                                    hover:bg-blue-50
                                    hover:text-blue-600
                                "
                            >
                                <Image size={18} />

                                {imageFile
                                    ? "Change Image"
                                    : "Choose Image"}
                            </label>

                            <input
                                id="product-image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />

                            {/* FILE NAME */}

                            {imageFile && (
                                <p
                                    className="
                                        mt-3
                                        truncate
                                        text-xs
                                        font-medium
                                        text-slate-500
                                    "
                                >
                                    Selected: {imageFile.name}
                                </p>
                            )}

                        </section>

                        {/* =================================================
                            CREATE PRODUCT
                        ================================================= */}

                        <section
                            className="
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                p-6
                                shadow-sm
                            "
                        >

                            <div className="mb-4">

                                <p className="text-sm font-bold text-slate-950">
                                    Ready to publish?
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        leading-5
                                        text-slate-500
                                    "
                                >
                                    Check all product information before
                                    creating it.
                                </p>

                            </div>

                            {/* CREATE */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="
                                    flex
                                    h-12
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-slate-950
                                    text-sm
                                    font-bold
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
                                                h-4
                                                w-4
                                                animate-spin
                                                rounded-full
                                                border-2
                                                border-white/30
                                                border-t-white
                                            "
                                        />

                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Create Product
                                    </>
                                )}

                            </button>

                            {/* CANCEL */}

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/admin/products")
                                }
                                disabled={loading}
                                className="
                                    mt-3
                                    h-12
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    text-sm
                                    font-bold
                                    text-slate-600
                                    transition
                                    hover:bg-slate-50
                                    disabled:opacity-50
                                "
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

export default AdminProductCreate;