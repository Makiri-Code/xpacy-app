import Link from "next/link";
import EmptyState from "@/app/_components/EmptyState";
import { format } from "date-fns";
import StatusChips from "./StatusChips";
import Pagination from "./Pagination";
import SearchInput from "./SearchInput";
import DashboardFilter from "./DashboardFilter";
import DateFilter from "./DateFilter";
import ExportButton from "./ExportButton";

const tableHeadings = [
    { heading: "Service Type" },
    { heading: "Property Address" },
    { heading: "Initiated By" },
    { heading: "Date/Time", center: true },
    { heading: "Service Status", center: true },
    { heading: "" }
];

export default function PropertyOwnerServicesTable({ services, pagination, showFilters = true }) {
    if (!services?.length) return <EmptyState message={"No services found."} cta={"Request Service"} ctaLink={"/dashboard/property-owner/services/request"} />

    const gridCols = "grid-cols-[1.5fr_2fr_1.5fr_1.5fr_1fr_0.5fr]";

    return (
        <div className="flex flex-col gap-6 p-6 border-[1.5px] border-primary-200 rounded-lg">
            <header className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-primary-700 flex items-center gap-2">Service Requests</h2>
                {showFilters && (
                    <div className="flex justify-end gap-2">
                        <DateFilter />
                        <ExportButton data={services} filename="services_summary" />
                        <SearchInput />
                    </div>
                )}
            </header>

            <div className="bg-white border border-primary-100 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <div className="min-w-[1000px]">
                        <div className={`grid ${gridCols} text-neutrals-900 text-sm font-mono font-bold border-b border-primary-100 bg-gray-50`}>
                            {tableHeadings.map((h, i) => (
                                <p key={i} className={`p-4 ${h.center ? "text-center" : ""}`}>{h.heading}</p>
                            ))}
                        </div>
                        
                        {services.map((service) => {
                            const date = service.created_at || service.createdAt || service.date_added;
                            const formattedDate = date ? format(new Date(date), "MMM dd, yyyy HH:mm") : "-";
                            const propertyAddress = service.property ? `${service.property.address}, ${service.property.city}` : service.address || "-";
                            // Assuming service.user contains initiator info, or service.initiated_by
                            const initiator = service.user ? `${service.user.firstname} ${service.user.lastname || ''}` : "Unknown";

                            return (
                                <div key={service.id || service._id} className={`grid ${gridCols} text-neutrals-900 text-sm font-mono border-b border-primary-100 hover:bg-gray-50/50 transition-colors`}>
                                    <div className="p-4 flex items-center gap-3 font-semibold text-gray-900">
                                        {service.service_type || service.type || "Service"}
                                    </div>

                                    <div className="p-4 flex items-center text-gray-600">
                                        {propertyAddress}
                                    </div>

                                    <div className="p-4 flex items-center text-gray-600">
                                        {initiator}
                                    </div>

                                    <div className="p-4 flex items-center justify-center text-gray-600 text-xs">
                                        {formattedDate}
                                    </div>

                                    <div className="p-4 flex items-center justify-center capitalize">
                                        <StatusChips status={service.service_status || service.status || 'pending'} />
                                    </div>
                                    
                                    <div className="p-4 flex items-center justify-center relative">
                                        {/* Placeholder for future actions like View Details */}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
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
