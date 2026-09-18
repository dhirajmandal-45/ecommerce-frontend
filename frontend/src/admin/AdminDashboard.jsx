import {
    DollarSign,
    ShoppingBag,
    Package,
    Users,
} from "lucide-react";

function AdminDashboard() {

    const stats = [
        {
            title: "Total Sales",
            value: "₹0",
            description: "This month",
            icon: DollarSign,
        },
        {
            title: "Orders",
            value: "0",
            description: "Total orders",
            icon: ShoppingBag,
        },
        {
            title: "Products",
            value: "0",
            description: "Active products",
            icon: Package,
        },
        {
            title: "Customers",
            value: "0",
            description: "Registered customers",
            icon: Users,
        },
    ];

    return (
        <div>

            <div className="mb-8">

                <h2 className="text-3xl font-black text-slate-950">
                    Dashboard
                </h2>

                <p className="mt-2 text-slate-500">
                    Welcome to your SHOPX admin panel.
                </p>

            </div>


            {/* ================= STATS ================= */}

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                {stats.map((stat) => {

                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="
                                rounded-2xl
                                border border-slate-200
                                bg-white
                                p-6
                                shadow-sm
                            "
                        >

                            <div className="flex items-center justify-between">

                                <p className="text-sm font-semibold text-slate-500">
                                    {stat.title}
                                </p>

                                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                                    <Icon size={20} />
                                </div>

                            </div>

                            <h3 className="mt-5 text-3xl font-black text-slate-950">
                                {stat.value}
                            </h3>

                            <p className="mt-2 text-sm text-slate-400">
                                {stat.description}
                            </p>

                        </div>
                    );
                })}

            </div>


            {/* ================= RECENT ORDERS ================= */}

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">

                <h3 className="text-xl font-bold text-slate-950">
                    Recent Orders
                </h3>

                <div className="flex min-h-64 items-center justify-center">

                    <p className="text-slate-400">
                        No orders yet
                    </p>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;