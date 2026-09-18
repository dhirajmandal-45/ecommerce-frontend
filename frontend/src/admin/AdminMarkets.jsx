import { Globe } from "lucide-react";

function AdminMarkets() {

    return (
        <div>

            <h2 className="text-3xl font-black text-slate-950">
                Markets
            </h2>

            <p className="mt-2 text-slate-500">
                Manage your selling markets.
            </p>

            <div className="
                mt-8
                rounded-2xl
                border border-slate-200
                bg-white
                p-12
                text-center
            ">

                <Globe
                    size={50}
                    className="mx-auto text-slate-300"
                />

                <h3 className="mt-4 text-xl font-bold">
                    Market Management
                </h3>

                <p className="mt-2 text-slate-500">
                    Market information will appear here.
                </p>

            </div>

        </div>
    );
}

export default AdminMarkets;