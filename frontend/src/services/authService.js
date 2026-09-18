import { apiRequest } from "./api";

export const login = async (email, password) => {
    const response = await fetch("http://localhost:8080/freshers/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "text/plain",
        },
        body: JSON.stringify({ email, password }),
    });

    const text = await response.text();

    if (!response.ok) {
        throw new Error(text || "Invalid email or password.");
    }

    if (!text || !text.startsWith("eyJ")) {
        throw new Error("Login failed. Invalid JWT token received.");
    }

    return text.trim();
};

export const signup = (formData) =>
    apiRequest("/freshers/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

export const getProfile = () =>
    apiRequest("/users/profile");
