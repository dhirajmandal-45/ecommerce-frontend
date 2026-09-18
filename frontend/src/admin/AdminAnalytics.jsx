import { BarChart3 } from "lucide-react";

function AdminAnalytics() {

    return (
        <div>

            <h2 className="text-3xl font-black text-slate-950">
                Analytics
            </h2>

            <p className="mt-2 text-slate-500">
                Analyze your store performance.
            </p>

            <div className="
                mt-8
                rounded-2xl
                border border-slate-200
                bg-white
                p-12
                text-center
            ">

                <BarChart3
                    size={50}
                    className="mx-auto text-blue-500"
                />

                <h3 className="mt-4 text-xl font-bold">
                    Store Analytics
                </h3>

                <p className="mt-2 text-slate-500">
                    Analytics data will appear here.
                </p>

            </div>

        </div>
    );
}

export default AdminAnalytics;