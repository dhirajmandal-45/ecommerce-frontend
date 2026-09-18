import { NavLink, useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Users,
    TrendingUp,
    Tag,
    FileText,
    Globe,
    Wallet,
    BarChart3,
    LogOut,
} from "lucide-react";

function AdminSidebar() {

    const navigate = useNavigate();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/admin",
            icon: LayoutDashboard,
            end: true,
        },
        {
            name: "Products",
            path: "/admin/products",
            icon: Package,
        },
        {
            name: "Orders",
            path: "/admin/orders",
            icon: ShoppingBag,
        },
        {
            name: "Customers",
            path: "/admin/customers",
            icon: Users,
        },
        {
            name: "Growth",
            path: "/admin/growth",
            icon: TrendingUp,
        },
        {
            name: "Discounts",
            path: "/admin/discounts",
            icon: Tag,
        },
        {
            name: "Content",
            path: "/admin/content",
            icon: FileText,
        },
        {
            name: "Markets",
            path: "/admin/markets",
            icon: Globe,
        },
        {
            name: "Finance",
            path: "/admin/finance",
            icon: Wallet,
        },
        {
            name: "Analytics",
            path: "/admin/analytics",
            icon: BarChart3,
        },
    ];

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("email");

        window.dispatchEvent(new Event("logoutChanged"));

        navigate("/login");
    };

    return (
        <aside className="
            fixed
            left-0
            top-0
            z-30
            hidden
            h-screen
            w-64
            border-r
            border-slate-200
            bg-white
            md:block
        ">

            {/* ================= LOGO ================= */}

            <div className="border-b border-slate-200 p-6">

                <h1 className="text-2xl font-black text-slate-950">
                    SHOPX
                </h1>

                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Admin Panel
                </p>

            </div>


            {/* ================= MENU ================= */}

            <nav className="space-y-1 p-4">

                {menuItems.map((item) => {

                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) => `
                                flex items-center gap-3
                                rounded-xl
                                px-4 py-3
                                text-sm font-semibold
                                transition
                                ${
                                    isActive
                                        ? "bg-slate-950 text-white shadow-lg"
                                        : "text-slate-600 hover:bg-slate-100"
                                }
                            `}
                        >

                            <Icon size={19} />

                            {item.name}

                        </NavLink>
                    );
                })}

            </nav>


            {/* ================= LOGOUT ================= */}

            <div className="absolute bottom-0 w-full border-t border-slate-200 p-4">

                <button
                    onClick={handleLogout}
                    className="
                        flex w-full
                        items-center gap-3
                        rounded-xl
                        px-4 py-3
                        text-sm font-semibold
                        text-red-600
                        hover:bg-red-50
                    "
                >
                    <LogOut size={19} />

                    Logout
                </button>

            </div>

        </aside>
    );
}

export default AdminSidebar;