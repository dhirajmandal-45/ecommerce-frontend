import { Users } from "lucide-react";

function AdminCustomers() {

    return (
        <div>

            <h2 className="text-3xl font-black text-slate-950">
                Customers
            </h2>

            <p className="mt-2 text-slate-500">
                Manage registered customers.
            </p>

            <div className="
                mt-8
                rounded-2xl
                border border-slate-200
                bg-white
                p-12
                text-center
            ">

                <Users
                    size={50}
                    className="mx-auto text-slate-300"
                />

                <h3 className="mt-4 text-xl font-bold">
                    No customers yet
                </h3>

                <p className="mt-2 text-slate-500">
                    Registered users will appear here.
                </p>

            </div>

        </div>
    );
}

export default AdminCustomers;