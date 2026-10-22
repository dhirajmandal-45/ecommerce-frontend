
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://ebcak.onrender.com";

export const getToken = () => localStorage.getItem("token");

export const isTokenUsable = () => {
    const token = getToken();

    if (!token) {
        return false;
    }

    try {
        const payload = JSON.parse(
            atob(
                token
                    .split(".")[1]
                    .replace(/-/g, "+")
                    .replace(/_/g, "/")
            )
        );

        if (!payload.exp) {
            return true;
        }

        if (Date.now() >= payload.exp * 1000) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("userEmail");
            return false;
        }

        return true;
    } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userEmail");
        return false;
    }
};

export const apiRequest = async (path, options = {}) => {
    const token = getToken();

    const headers = {
        Accept: "application/json",
        ...(options.headers || {}),
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
    });

    const text = await response.text();

    let data = null;

    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = text;
    }

    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("userEmail");
        }

        const message =
            typeof data === "string"
                ? data
                : data?.message ||
                  data?.error ||
                  `Request failed (${response.status})`;

        const error = new Error(message);
        error.status = response.status;
        throw error;
    }

    return data;
};

export default API_BASE_URL;
