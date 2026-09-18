import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

function AdminLayout() {
    return (
        <div className="min-h-screen bg-slate-100">

            {/* ================= SIDEBAR ================= */}
            <AdminSidebar />

            {/* ================= MAIN CONTENT ================= */}
            <main className="md:ml-64 min-h-screen">

                {/* Top Header */}
                <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur">

                    <div className="flex items-center justify-between">

                        <div>

                            <h1 className="text-xl font-bold text-slate-900">
                                SHOPX Admin
                            </h1>

                            <p className="text-sm text-slate-500">
                                Manage your store
                            </p>
                        </div>

                        <div className="  px-4 py-2 text-sm font-semibold text-blue-600">
                            <Link
                                to="/"
                                className="text-sm font-semibold text-slate-500 hover:text-blue-600"
                            >
                                <Home />
                            </Link>
                        </div>

                    </div>

                </header>

                {/* Page changes here */}
                <div className="p-6">
                    <Outlet />
                </div>

            </main>

        </div>
    );
}

export default AdminLayout;