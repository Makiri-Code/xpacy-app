import Image from "next/image";
import { formatCurrency } from "../_lib/utils";
import Pagination from "./Pagination";
import StatusChips from "./StatusChips";
import TableHead from "./TableHeader";
import TableOptionsMenu from "./TableOptionsMenu";



const tableHeadings = [
    {
        heading: "Property",
    },
    {
        heading: "Location",
        center: true,
    },
    {
        heading: "Owner’s Information",
    },
    {
        heading: "Availability Status",
        center: true,
    },
    {
        heading: "Current Price",
        center: true,
    },
    {

    }
];


export default async function AdminPropertyList({ properties, pagination }) {

    return (
        <div>
            <TableHead headingsArray={tableHeadings} />
            {properties.map((property) => (
                <div key={property.id} className="hidden lg:grid grid-cols-[2fr_1fr_2fr_1fr_1fr_0.5fr] text-neutrals-900 text-sm font-mono border-b border-primary-100">
                    <div className="p-4 flex items-center gap-2 text-sm">
                        <div className="w-16 h-12 relative">
                            <Image src={`https://app.xpacy.com/src/upload/properties/${property?.images[0]}`} alt="property-photo" className="object-cover" unoptimized fill />
                        </div>
                        <span>{property?.property_name}</span>
                    </div>
                    <p className="p-4 flex items-center justify-center">
                        {property?.city} {property?.state}
                    </p>
                    <p className="p-4 flex flex-col justify-center">
                        <strong>{property?.propertyOwner?.first_name} {property?.propertyOwner?.last_name}</strong>
                        {property?.propertyOwner?.phone && <span>{property?.propertyOwner?.phone}</span>}
                        <span>{property?.propertyOwner?.email}</span>
                    </p>
                    <p className="p-4 flex items-center justify-center">
                        <StatusChips status={property?.availability_status} />
                    </p>
                    <p className="p-4 flex items-center justify-center">
                        <strong>{formatCurrency(property?.property_price)}</strong>
                    </p>
                    <div className="p-4 flex items-center justify-center relative">
                        <TableOptionsMenu id={property?.id} />
                    </div>
                </div>
            ))}
            {pagination && (
                <div className="mt-3">
                    <div className="flex items-center justify-between">
                        <span className="text-base font-mono text-base-500 ">Showing <span>{(pagination.page - 1) * pagination.limit + 1}</span> - <span>{pagination?.page === pagination?.totalPages ? pagination.total : pagination?.page * pagination?.limit}</span> of <span>{pagination?.total}</span> results </span>
                        <Pagination pagination={pagination} />
                    </div>
                </div>
            )}
        </div>
    )
}