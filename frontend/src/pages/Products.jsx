import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../features/products/ProductCard";
import { getProducts } from "../services/productService";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchParams] = useSearchParams();

    const category = searchParams.get("category");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                const data = await getProducts(category || "");

                console.log("Products received:", data);

                setProducts(data);
            } catch (error) {
                console.error("Failed to load products:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    return (
        <div className="min-h-screen bg-slate-50">

            <Navbar />

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* HEADER */}
                <div className="mb-8">

                    <p className="text-sm font-semibold text-violet-600">
                        SHOPX
                    </p>

                    <h1 className="mt-1 text-3xl font-black text-slate-950 sm:text-4xl">
                        {category || "All Products"}
                    </h1>

                    {!loading && (
                        <p className="mt-2 text-sm text-slate-500">
                            {products.length} products found
                        </p>
                    )}

                </div>

                {/* LOADING */}
                {loading && (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                            <div
                                key={item}
                                className="overflow-hidden rounded-2xl bg-white"
                            >
                                <div className="aspect-square animate-pulse bg-slate-200" />

                                <div className="space-y-3 p-4">
                                    <div className="h-4 animate-pulse rounded bg-slate-200" />
                                    <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
                                    <div className="h-8 animate-pulse rounded bg-slate-200" />
                                </div>
                            </div>
                        ))}

                    </div>
                )}

                {/* NO PRODUCTS */}
                {!loading && products.length === 0 && (
                    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white text-center">

                        <h2 className="text-xl font-bold text-slate-900">
                            No products found
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            We couldn't find products in this category.
                        </p>

                    </div>
                )}

                {/* PRODUCTS */}
                {!loading && products.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}

                    </div>
                )}

            </main>

            <Footer />

        </div>
    );
}

export default Products;