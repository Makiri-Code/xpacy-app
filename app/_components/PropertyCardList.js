import PropertyCard from "./PropertyCard";
import PropertySavedIcon from "@/app/_components/ProperySavedIcon";
 export default async function PropertyCardLists({properties, pagination }) {

    return (
        <>
            <div className="flex justify-between items-center">
                <span className="text-base font-mono text-base-500 ">Showing <span>{(pagination.page - 1) * pagination.limit + 1}</span> - <span>{pagination?.page === pagination?.totalPages ? pagination.total : pagination?.page * pagination?.limit}</span> of <span>{pagination?.total}</span> results </span>
                <div className="flex items-center space-x-2.5 font-mono text-base-500">
                    <span>Sort by:</span>
                    <select className="p-2.5 border border-neutral-200 rounded-lg">
                        <option>Default</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-2  gap-x-6 gap-y-12">
                {
                    properties?.map((property, index) => <PropertyCard property={property} key={index}/>)
                }
            </div>
        </>
    )
}