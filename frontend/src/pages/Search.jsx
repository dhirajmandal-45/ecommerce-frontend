import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
    Search as SearchIcon,
    SlidersHorizontal,
    X,
    ShoppingBag,
    
} from "lucide-react";
import { useCart } from "../context/CartContext";

function Search() {
    const [searchParams, setSearchParams] = useSearchParams();

    const queryFromUrl = searchParams.get("q") || "";

    const [searchText, setSearchText] = useState(queryFromUrl);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { addToCart } = useCart();

    // ============================================================
    // KEEP INPUT IN SYNC WITH URL
    // ============================================================

    useEffect(() => {
        setSearchText(queryFromUrl);
    }, [queryFromUrl]);

    // ============================================================
    // FETCH PRODUCTS
    // ============================================================

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    "http://localhost:8080/products"
                );

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch products: ${response.status}`
                    );
                }

                const data = await response.json();

                // Support different backend response formats

                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (Array.isArray(data.content)) {
                    setProducts(data.content);
                } else if (Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    console.warn(
                        "Unexpected products response:",
                        data
                    );

                    setProducts([]);
                }
            } catch (error) {
                console.error(
                    "Search products error:",
                    error
                );

                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // ============================================================
    // SEARCH PRODUCTS
    // ============================================================

    const filteredProducts = useMemo(() => {
        const keyword = queryFromUrl
            .trim()
            .toLowerCase();

        if (!keyword) {
            return products;
        }

        return products.filter((product) => {
            const name = String(
                product.name ||
                product.productName ||
                ""
            ).toLowerCase();

            const category = String(
                product.category || ""
            ).toLowerCase();

            const brand = String(
                product.brand || ""
            ).toLowerCase();

            const description = String(
                product.description || ""
            ).toLowerCase();

            return (
                name.includes(keyword) ||
                category.includes(keyword) ||
                brand.includes(keyword) ||
                description.includes(keyword)
            );
        });
    }, [products, queryFromUrl]);

    // ============================================================
    // SEARCH SUBMIT
    // ============================================================

    const handleSearch = (event) => {
        event.preventDefault();

        const value = searchText.trim();

        if (!value) {
            setSearchParams({});
            return;
        }

        setSearchParams({
            q: value,
        });
    };

    // ============================================================
    // CLEAR SEARCH
    // ============================================================

    const clearSearch = () => {
        setSearchText("");
        setSearchParams({});
    };

    // ============================================================
    // PRODUCT HELPERS
    // ============================================================

    const getProductName = (product) => {
        return (
            product.name ||
            product.productName ||
            "Product"
        );
    };

    const getProductImage = (product) => {
        return (
            product.imageUrl ||
            product.image ||
            product.productImage ||
            "https://via.placeholder.com/300"
        );
    };

    const getProductPrice = (product) => {
        return Number(
            product.price ??
            product.sellingPrice ??
            0
        );
    };

    const getProductId = (product) => {
        return (
            product.id ||
            product.productId
        );
    };

    // ============================================================
    // ADD TO CART
    // ============================================================

    const handleAddToCart = (product) => {
        if (typeof addToCart !== "function") {
            console.error(
                "addToCart is not available from CartContext"
            );
            return;
        }

        addToCart(product);
    };

    // ============================================================
    // UI
    // ============================================================

    return (
        <div className="min-h-screen bg-slate-50">

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className="mb-8">

                    <h1 className="text-3xl font-black tracking-tight text-slate-950">
                        Search Products
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Find products across the SHOPX catalog.
                    </p>

                </div>

                {/* ==================================================
                    SEARCH BAR
                ================================================== */}

                <form
                    onSubmit={handleSearch}
                    className="mb-8"
                >

                    <div className="relative">

                        <SearchIcon
                            size={20}
                            className="
                                absolute left-4 top-1/2
                                -translate-y-1/2
                                text-slate-400
                            "
                        />

                        <input
                            type="text"
                            value={searchText}
                            onChange={(event) =>
                                setSearchText(
                                    event.target.value
                                )
                            }
                            placeholder="Search products, brands, categories..."
                            className="
                                h-14 w-full
                                rounded-2xl
                                border border-slate-200
                                bg-white
                                pl-12 pr-28
                                text-sm
                                text-slate-900
                                outline-none
                                shadow-sm
                                transition
                                focus:border-blue-500
                                focus:ring-4
                                focus:ring-blue-500/10
                            "
                        />

                        {searchText && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="
                                    absolute right-20 top-1/2
                                    -translate-y-1/2
                                    rounded-lg p-2
                                    text-slate-400
                                    hover:bg-slate-100
                                    hover:text-slate-700
                                "
                            >
                                <X size={18} />
                            </button>
                        )}

                        <button
                            type="submit"
                            className="
                                absolute right-2 top-2
                                h-10 rounded-xl
                                bg-slate-950
                                px-5
                                text-sm font-bold
                                text-white
                                transition
                                hover:bg-blue-600
                            "
                        >
                            <SearchIcon size={18}/>
                        </button>

                    </div>

                </form>

                {/* ==================================================
                    RESULT HEADER
                ================================================== */}

                <div className="mb-6 flex items-center justify-between">

                    <div>

                        {queryFromUrl ? (
                            <>
                                <h2 className="text-xl font-black text-slate-950">
                                    Results for "{queryFromUrl}"
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    {filteredProducts.length} product
                                    {filteredProducts.length !== 1
                                        ? "s"
                                        : ""}{" "}
                                    found
                                </p>
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl font-black text-slate-950">
                                    All Products
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    {products.length} product
                                    {products.length !== 1
                                        ? "s"
                                        : ""}{" "}
                                    available
                                </p>
                            </>
                        )}

                    </div>

                    <button
                        type="button"
                        className="
                            hidden items-center gap-2
                            rounded-xl
                            border border-slate-200
                            bg-white
                            px-4 py-2.5
                            text-sm font-semibold
                            text-slate-700
                            transition
                            hover:border-blue-500
                            hover:text-blue-600
                            sm:flex
                        "
                    >
                        <SlidersHorizontal size={17} />
                        Filters
                    </button>

                </div>

                {/* ==================================================
                    LOADING
                ================================================== */}

                {loading && (
                    <div
                        className="
                            flex min-h-[300px]
                            items-center justify-center
                        "
                    >
                        <div className="text-center">

                            <div
                                className="
                                    mx-auto h-10 w-10
                                    animate-spin
                                    rounded-full
                                    border-4
                                    border-slate-200
                                    border-t-blue-600
                                "
                            />

                            <p className="mt-4 text-sm text-slate-500">
                                Loading products...
                            </p>

                        </div>
                    </div>
                )}

                {/* ==================================================
                    NO RESULTS
                ================================================== */}

                {!loading &&
                    filteredProducts.length === 0 && (
                        <div
                            className="
                                flex min-h-[350px]
                                items-center justify-center
                            "
                        >

                            <div className="text-center">

                                <div
                                    className="
                                        mx-auto flex h-16 w-16
                                        items-center justify-center
                                        rounded-2xl
                                        bg-slate-100
                                        text-slate-400
                                    "
                                >
                                    <SearchIcon size={28} />
                                </div>

                                <h2
                                    className="
                                        mt-5 text-2xl
                                        font-black
                                        text-slate-950
                                    "
                                >
                                    No products found
                                </h2>

                                <p
                                    className="
                                        mt-2 max-w-md
                                        text-sm leading-6
                                        text-slate-500
                                    "
                                >
                                    We couldn't find any products
                                    matching your search.
                                </p>

                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className="
                                        mt-6 rounded-xl
                                        bg-slate-950
                                        px-6 py-3
                                        text-sm font-bold
                                        text-white
                                        transition
                                        hover:bg-blue-600
                                    "
                                >
                                    View All Products
                                </button>

                            </div>

                        </div>
                    )}

                {/* ==================================================
                    PRODUCTS
                ================================================== */}

                {!loading &&
                    filteredProducts.length > 0 && (

                        <div
                            className="
                                grid grid-cols-2 gap-4
                                sm:grid-cols-3
                                lg:grid-cols-4
                            "
                        >

                            {filteredProducts.map(
                                (product, index) => {

                                    const id =
                                        getProductId(product);

                                    const name =
                                        getProductName(product);

                                    const image =
                                        getProductImage(product);

                                    const price =
                                        getProductPrice(product);

                                    return (
                                        <div
                                            key={
                                                id || index
                                            }
                                            className="
                                                group
                                                overflow-hidden
                                                rounded-2xl
                                                border
                                                border-slate-200
                                                bg-white
                                                shadow-sm
                                                transition
                                                duration-300
                                                hover:-translate-y-1
                                                hover:shadow-xl
                                            "
                                        >

                                            {/* IMAGE */}

                                            <Link
                                                to={`/products/${id}`}
                                                className="
                                                    block
                                                    aspect-square
                                                    overflow-hidden
                                                    bg-slate-50
                                                "
                                            >
                                                <img
                                                    src={image}
                                                    alt={name}
                                                    className="
                                                        h-full w-full
                                                        object-contain
                                                        p-4
                                                        transition
                                                        duration-500
                                                        group-hover:scale-105
                                                    "
                                                />
                                            </Link>

                                            {/* CONTENT */}

                                            <div className="p-4">

                                                <p
                                                    className="
                                                        mb-1 text-xs
                                                        font-medium
                                                        text-slate-400
                                                    "
                                                >
                                                    {product.category ||
                                                        "Product"}
                                                </p>

                                                <Link
                                                    to={`/products/${id}`}
                                                >
                                                    <h3
                                                        className="
                                                            line-clamp-2
                                                            min-h-[40px]
                                                            text-sm
                                                            font-bold
                                                            text-slate-900
                                                            transition
                                                            hover:text-blue-600
                                                        "
                                                    >
                                                        {name}
                                                    </h3>
                                                </Link>

                                                <div
                                                    className="
                                                        mt-4 flex
                                                        items-center
                                                        justify-between
                                                        gap-2
                                                    "
                                                >

                                                    <span
                                                        className="
                                                            text-lg
                                                            font-black
                                                            text-slate-950
                                                        "
                                                    >
                                                        ₹
                                                        {price.toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleAddToCart(
                                                                product
                                                            )
                                                        }
                                                        className="
                                                            flex h-9 w-9
                                                            items-center
                                                            justify-center
                                                            rounded-xl
                                                            bg-slate-950
                                                            text-white
                                                            transition
                                                            hover:bg-blue-600
                                                        "
                                                        title="Add to cart"
                                                    >
                                                        <ShoppingBag
                                                            size={17}
                                                        />
                                                    </button>

                                                </div>

                                            </div>

                                        </div>
                                    );
                                }
                            )}

                        </div>
                    )}

            </div>

        </div>
    );
}

export default Search;