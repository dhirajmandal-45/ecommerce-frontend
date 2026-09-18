import { FileText } from "lucide-react";

function AdminContent() {

    return (
        <div>

            <h2 className="text-3xl font-black text-slate-950">
                Content
            </h2>

            <p className="mt-2 text-slate-500">
                Manage store content.
            </p>

            <div className="
                mt-8
                rounded-2xl
                border border-slate-200
                bg-white
                p-12
                text-center
            ">

                <FileText
                    size={50}
                    className="mx-auto text-slate-300"
                />

                <h3 className="mt-4 text-xl font-bold">
                    Content Management
                </h3>

                <p className="mt-2 text-slate-500">
                    Banners, pages and content will appear here.
                </p>

            </div>

        </div>
    );
}

export default AdminContent;