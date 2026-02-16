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
            {/* Desktop View */}
            <div className="hidden lg:block bg-white border border-primary-100 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-neutrals-900 text-sm font-mono font-bold border-b border-primary-100">
                        <tr>
                            {tableHeadings.map((h, i) => (
                                <th key={i} className={`p-4 font-bold ${h.center ? "text-center" : ""}`}>{h.heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property) => (
                            <tr key={property.id} className="text-neutrals-900 text-sm font-mono border-b border-primary-100 hover:bg-gray-50/50 transition-colors last:border-0">
                                <td className="p-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="w-16 h-12 relative shrink-0">
                                            <Image src={`https://app.xpacy.com/src/upload/properties/${property?.images[0]}`} alt="property-photo" className="object-cover rounded-md" unoptimized fill />
                                        </div>
                                        <span className="truncate block max-w-[200px]" title={property?.property_name}>{property?.property_name}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    {property?.city}, {property?.state}
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col justify-center">
                                        <strong>{property?.propertyOwner?.first_name} {property?.propertyOwner?.last_name}</strong>
                                        {property?.propertyOwner?.phone && <span className="text-xs text-gray-500">{property?.propertyOwner?.phone}</span>}
                                        <span className="text-xs text-gray-500 truncate block max-w-[150px]" title={property?.propertyOwner?.email}>{property?.propertyOwner?.email}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <div className="flex justify-center">
                                        <StatusChips status={property?.availability_status} />
                                    </div>
                                </td>
                                <td className="p-4 text-center font-bold text-primary">
                                    {formatCurrency(property?.property_price)}
                                </td>
                                <td className="p-4 relative text-center">
                                    <div className="flex justify-center">
                                        <TableOptionsMenu id={property?.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View - Cards */}
            <div className="lg:hidden flex flex-col bg-white border border-primary-100 rounded-lg overflow-hidden mt-4">
                {properties.map((property) => (
                    <div key={property.id} className="flex flex-col gap-4 p-4 border-b border-primary-100 bg-white last:border-0">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex gap-3">
                                <div className="w-20 h-20 relative shrink-0">
                                    <Image src={`https://app.xpacy.com/src/upload/properties/${property?.images[0]}`} alt="property-photo" className="object-cover rounded-md" unoptimized fill />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-bold text-sm text-neutrals-900">{property?.property_name}</h3>
                                    <p className="text-xs text-gray-500">{property?.city}, {property?.state}</p>
                                    <p className="text-sm font-bold text-primary">{formatCurrency(property?.property_price)}</p>
                                </div>
                            </div>
                            <TableOptionsMenu id={property?.id} />
                        </div>
                        
                        <div className="flex flex-col gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span>Owner:</span>
                                <span className="font-medium text-gray-900">{property?.propertyOwner?.first_name} {property?.propertyOwner?.last_name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Status:</span>
                                <StatusChips status={property?.availability_status} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
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