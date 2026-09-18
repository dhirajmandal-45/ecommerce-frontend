import { TrendingUp } from "lucide-react";

function AdminGrowth() {

    return (
        <div>

            <h2 className="text-3xl font-black text-slate-950">
                Growth
            </h2>

            <p className="mt-2 text-slate-500">
                Track your store growth.
            </p>

            <div className="
                mt-8
                rounded-2xl
                border border-slate-200
                bg-white
                p-12
                text-center
            ">

                <TrendingUp
                    size={50}
                    className="mx-auto text-blue-500"
                />

                <h3 className="mt-4 text-xl font-bold">
                    Growth Analytics
                </h3>

                <p className="mt-2 text-slate-500">
                    Growth data will appear here.
                </p>

            </div>

        </div>
    );
}

export default AdminGrowth;
