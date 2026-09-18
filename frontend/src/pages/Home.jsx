import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Banner from "../features/home/Banner";
import TrendingProducts from "../features/home/TrendingProducts";
import CategorySection from "../features/home/CategorySection";

import { getProducts } from "../services/productService";
import FeaturedProducts from "../features/home/FeaturedProducts";
import OfferBanner from "../features/home/OfferBanner";
import Newsletter from "../features/home/Newsletter";
import Footer from "../components/Footer";

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error("Failed to load products:", error);
            });
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main>
                {/* Promotional banners */}
                <Banner />

                {/* Trending products from API */}
                <TrendingProducts products={products} />

                <FeaturedProducts products={products} />
                {/* Categories - API connection later */}
                <CategorySection categories={[]} />
                <OfferBanner />
                <Newsletter />
                <Footer />

            </main>
        </div>
    );
}

export default Home;