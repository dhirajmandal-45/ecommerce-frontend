import { Navigate, Outlet } from "react-router-dom";
import { isTokenUsable } from "../services/api";

function AdminRoute() {

    const token = isTokenUsable();
    const role = localStorage.getItem("role");

    // ============================================
    // USER IS NOT LOGGED IN
    // ============================================

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // ============================================
    // USER IS LOGGED IN BUT NOT ADMIN
    // ============================================

    if (role !== "ADMIN") {
        return <Navigate to="/" replace />;
    }

    // ============================================
    // USER IS ADMIN
    // ============================================

    return <Outlet />;
}

export default AdminRoute;