import { Wallet } from "lucide-react";

function AdminFinance() {

    return (
        <div>

            <h2 className="text-3xl font-black text-slate-950">
                Finance
            </h2>

            <p className="mt-2 text-slate-500">
                Track revenue and financial information.
            </p>

            <div className="
                mt-8
                rounded-2xl
                border border-slate-200
                bg-white
                p-12
                text-center
            ">

                <Wallet
                    size={50}
                    className="mx-auto text-slate-300"
                />

                <h3 className="mt-4 text-xl font-bold">
                    Financial Overview
                </h3>

                <p className="mt-2 text-slate-500">
                    Revenue and transaction data will appear here.
                </p>

            </div>

        </div>
    );
}

export default AdminFinance;