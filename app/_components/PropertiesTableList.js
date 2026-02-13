import Link from "next/link";
import { formatCurrency } from "@/app/_lib/utils";
import EmptyState from "@/app/_components/EmptyState";
import { FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import { format } from "date-fns";

export default function PropertiesTableList({ properties, bookings = [], baseUrl = "/dashboard/property-owner/properties", ctaLink = "/dashboard/property-owner/properties/add" }) {
    if (!properties?.length) return <EmptyState message={"No properties found."} />

    const getActiveBooking = (propertyId) => {
        if (!bookings.length) return null;
        // Find a booking for this property that is either 'active' or 'confirmed'
        return bookings.find(b => 
            (b.property_id === propertyId || b.property?._id === propertyId) && 
            ['active', 'confirmed'].includes(b.status?.toLowerCase())
        );
    };

    return (
        <div className="flex flex-col gap-6">
            <header className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">My Properties</h2>
            </header>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 text-gray-600 text-xs font-semibold uppercase tracking-wider border-b border-gray-200">
                            <tr>
                                <th className="p-4 min-w-[250px]">Property</th>
                                <th className="p-4 min-w-[150px]">Tenant Name</th>
                                <th className="p-4">Payment Status</th>
                                <th className="p-4">Availability</th>
                                <th className="p-4">Due Date</th>
                                <th className="p-4 text-right">Current Price</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {properties.map((property) => {
                                const activeBooking = getActiveBooking(property.id || property._id);
                                const tenantName = activeBooking?.user?.firstname ? `${activeBooking.user.firstname} ${activeBooking.user.lastname || ''}` : activeBooking ? "Occupied" : "-";
                                const paymentStatus = activeBooking?.payment_status || activeBooking?.status || "-";
                                const dueDate = activeBooking?.end_date ? format(new Date(activeBooking.end_date), "MMM dd, yyyy") : "-";
                                
                                return (
                                    <tr key={property.id || property._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                                                     {property.images?.[0] ? (
                                                        <Image 
                                                            src={`https://app.xpacy.com/src/upload/properties/${property.images[0]}`} 
                                                            alt={property.property_name} 
                                                            className="object-cover" 
                                                            fill 
                                                            unoptimized
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No Img</div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col max-w-[200px]">
                                                    <span className="font-semibold text-gray-900 truncate" title={property.property_name}>{property.property_name}</span>
                                                    <div className="flex items-center text-gray-500 text-xs mt-0.5">
                                                        <FaMapMarkerAlt size={10} className="mr-1 shrink-0" />
                                                        <span className="truncate">{property.city}, {property.state}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-700 font-medium whitespace-nowrap">
                                            {tenantName}
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                                paymentStatus.toLowerCase() === 'paid' || paymentStatus.toLowerCase() === 'active' || paymentStatus.toLowerCase() === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                paymentStatus === '-' ? 'text-gray-400' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {paymentStatus}
                                            </span>
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                                property.property_status === 'active' ? 'bg-blue-100 text-blue-700' : 
                                                property.property_status === 'rented' ? 'bg-purple-100 text-purple-700' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>
                                                {property.property_status || 'Draft'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-600 whitespace-nowrap font-mono text-xs">
                                            {dueDate}
                                        </td>
                                        <td className="p-4 text-right font-mono font-bold text-primary whitespace-nowrap">
                                            {formatCurrency(property.property_price)}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}