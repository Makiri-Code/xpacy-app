import Link from "next/link";
import { formatCurrency } from "@/app/_lib/utils";
import EmptyState from "@/app/_components/EmptyState";
import { FaMapMarkerAlt, FaList } from "react-icons/fa";
import Image from "next/image";
import { format } from "date-fns";
import StatusChips from "./StatusChips";
import PropertyOptionsMenu from "./PropertyOptionsMenu";
import Pagination from "./Pagination";
import SearchInput from "./SearchInput";
import DashboardFilter from "./DashboardFilter";

const tableHeadings = [
    { heading: "Property" },
    { heading: "Tenant Name" },
    { heading: "Payment Status", center: true },
    { heading: "Availability Status", center: true },
    { heading: "Due Date", center: true },
    { heading: "Price", center: true },
    { heading: "" }
];

export default function PropertiesTableList({ properties, bookings = [], pagination, baseUrl = "/dashboard/property-owner/properties", ctaLink = "/dashboard/property-owner/properties/add", recent = false }) {
    if (!properties?.length) return <EmptyState message={"No properties found."} />

    const getActiveBooking = (propertyId) => {
        if (!bookings.length) return null;
        return bookings.find(b => 
            (b.property_id === propertyId || b.property?._id === propertyId) && 
            ['active', 'confirmed'].includes(b.status?.toLowerCase())
        );
    };

    const gridCols = "grid-cols-[2fr_1.5fr_1fr_1fr_1fr_1fr_0.5fr]";

    return (
        <div className="flex flex-col gap-6 p-6 border-[1.5px] border-primary-200 rounded-lg">
            <header className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-primary-700 flex items-center gap-2">Property Overview</h2>
                {recent ? (
                    <Link href={baseUrl} className="text-sm text-primary hover:underline font-medium">
                        View All
                    </Link>
                ) : (   
                    <div className="flex justify-end gap-4">
                        <SearchInput />

                        <DashboardFilter />
                    </div>
                )}
            </header>

            {/* Desktop and Mobile View Container */}
            <div className="bg-white border border-primary-100 rounded-xl overflow-hidden shadow-sm">
                
                {/* Table Header - Hidden on Mobile */}
                <div className={`hidden lg:grid ${gridCols} text-neutrals-900 text-sm font-mono font-bold border-b border-primary-100 bg-gray-50`}>
                    {tableHeadings.map((h, i) => (
                        <p key={i} className={`p-4 ${h.center ? "text-center" : ""}`}>{h.heading}</p>
                    ))}
                </div>
                
                {(recent ? properties.slice(0, 4) : properties).map((property) => {
                    const activeBooking = getActiveBooking(property.id || property._id);
                    const tenantName = activeBooking?.user?.firstname ? `${activeBooking.user.firstname} ${activeBooking.user.lastname || ''}` : activeBooking ? "Occupied" : "N/A";
                    const paymentStatus = activeBooking?.payment_status || activeBooking?.status || "N/A";
                    const dueDate = activeBooking?.end_date ? format(new Date(activeBooking.end_date), "MMM dd, yyyy") : "N/A";
                    
                    const isPaid = ['paid', 'active', 'confirmed', 'success', 'successful'].includes((paymentStatus || '').toLowerCase());
                    const isPending = ['pending', 'processing'].includes((paymentStatus || '').toLowerCase());
                    const isFailed = ['failed', 'cancelled', 'expired'].includes((paymentStatus || '').toLowerCase());

                    let paymentStatusColor = "bg-gray-100 text-gray-500"; // default
                    if (isPaid) paymentStatusColor = "bg-[#C3E5C4] text-[#357B38]";
                    else if (isPending) paymentStatusColor = "bg-[#FFF8BE] text-[#9D7B40]";
                    else if (isFailed) paymentStatusColor = "bg-[#FBC0BC] text-[#C4170B]";
                    else if (paymentStatus !== "N/A") paymentStatusColor = "bg-[#FFF8BE] text-[#9D7B40]";

                    return (
                        <div key={property.id || property._id} className="contents">
                            {/* Desktop Row */}
                            <div className={`hidden lg:grid ${gridCols} text-neutrals-900 text-sm font-mono border-b border-primary-100 items-center hover:bg-gray-50/50 transition-colors`}>
                                <div className="p-4 flex items-center gap-3">
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

                                <div className="p-4 flex items-center justify-center text-center">
                                    {tenantName}
                                </div>

                                <div className="p-4 flex items-center justify-center">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${paymentStatusColor}`}>
                                        {paymentStatus}
                                    </span>
                                </div>

                                <div className="p-4 flex items-center justify-center">
                                    <StatusChips status={property.availability_status || 'N/A'} />
                                </div>

                                <div className="p-4 flex items-center justify-center text-gray-600 font-mono text-xs">
                                    {dueDate}
                                </div>

                                <div className="p-4 flex items-center justify-center text-primary font-bold">
                                    {property.property_price ? formatCurrency(property.property_price) : "N/A"}
                                </div>
                                
                                <div className="p-4 flex items-center justify-center relative">
                                    <PropertyOptionsMenu id={property.id || property._id} />
                                </div>
                            </div>

                            {/* Mobile Card View */}
                            <div className="lg:hidden flex flex-col gap-4 p-4 border-b border-primary-100 bg-white">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex gap-3 overflow-hidden">
                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
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
                                        <div className="flex flex-col gap-1 min-w-0">
                                            <h3 className="font-bold text-sm text-neutrals-900 truncate">{property.property_name}</h3>
                                            <div className="flex items-center text-gray-500 text-xs truncate">
                                                <FaMapMarkerAlt size={10} className="mr-1 shrink-0" />
                                                <span className="truncate">{property.city}, {property.state}</span>
                                            </div>
                                            <p className="text-sm font-bold text-primary mt-1">
                                                {property.property_price ? formatCurrency(property.property_price) : "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                    <PropertyOptionsMenu id={property.id || property._id} />
                                </div>

                                <div className="flex flex-col gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span>Tenant:</span>
                                        <span className="font-medium text-gray-900 text-right">{tenantName}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Payment:</span>
                                        <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${paymentStatusColor}`}>
                                            {paymentStatus}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Status:</span>
                                        <StatusChips status={property.availability_status || 'N/A'} />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Due Date:</span>
                                        <span className="font-medium text-gray-900">{dueDate}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {!recent && pagination && (
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