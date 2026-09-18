import { apiRequest } from "./api";

export const getProducts = async (category = "") => {
    const query = category
        ? `?category=${encodeURIComponent(category)}`
        : "";

    return apiRequest(`/products${query}`);
};

export const getProductById = (id) =>
    apiRequest(`/products/${id}`);
