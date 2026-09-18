import { Navigate, Outlet } from "react-router-dom";
import { isTokenUsable } from "../services/api";

function PublicRoute() {

    const token = isTokenUsable();

    if (token) {
        return <Navigate to="/profile" replace />;
    }

    return <Outlet />;
}

export default PublicRoute;