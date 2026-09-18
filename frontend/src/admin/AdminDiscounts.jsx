import { Tag, Plus } from "lucide-react";

function AdminDiscounts() {

    return (
        <div>

            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-3xl font-black text-slate-950">
                        Discounts
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Manage coupons and discounts.
                    </p>
                </div>

                <button className="
                    flex items-center gap-2
                    rounded-xl
                    bg-slate-950
                    px-5 py-3
                    text-sm font-bold
                    text-white
                ">
                    <Plus size={18} />
                    Add Discount
                </button>

            </div>


            <div className="
                mt-8
                rounded-2xl
                border border-slate-200
                bg-white
                p-12
                text-center
            ">

                <Tag
                    size={50}
                    className="mx-auto text-slate-300"
                />

                <h3 className="mt-4 text-xl font-bold">
                    No discounts
                </h3>

                <p className="mt-2 text-slate-500">
                    Create your first discount.
                </p>

            </div>

        </div>
    );
}

export default AdminDiscounts;