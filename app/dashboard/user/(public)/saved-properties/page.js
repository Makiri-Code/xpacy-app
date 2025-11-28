import SavedPropertyCard from "@/app/_components/SavedPropertyCard";
import Pagination from "@/app/_components/Pagination";
import { getSavedProperties } from "@/app/_lib/data-services";
import {cookies } from "next/headers"

export default async function Page() {
        const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const {data, pagination} = await getSavedProperties(token);
    
    return (
        <main className="p-6 flex flex-col gap-4">
            {/* Pagination */}
            <header className="col-span-3 flex justify-between items-center">
                <span className="text-base font-mono text-base-500 ">Showing <span>{(pagination.page - 1) * pagination.limit + 1}</span> - <span>{pagination?.page === pagination?.totalPages ? pagination.total : pagination?.page * pagination?.limit}</span> of <span>{pagination?.total}</span> results </span>
                <div className="flex items-center space-x-2.5 font-mono text-base-500">
                    <span>Sort by:</span>
                    <select className="p-2.5 border border-neutral-200 rounded-lg">
                        <option>Default</option>
                    </select>
                </div>
            </header>
            <div className="grid grid-cols-3 gap-x-6 gap-y-12 ">
                {
                    data?.map((property) => <SavedPropertyCard key={property.id} property={property.propertySaved} id={property.property_id} />)
                }
            </div>
            <Pagination pagination={pagination} />
        </main>
    )
}