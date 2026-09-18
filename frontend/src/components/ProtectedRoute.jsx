import { Navigate, Outlet } from "react-router-dom";
import { isTokenUsable } from "../services/api";

function ProtectedRoute() {

    const token = isTokenUsable();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;