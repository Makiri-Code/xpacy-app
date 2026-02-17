import Image from "next/image";
import { getAdminServices, getBookedServices } from "../_lib/data-services";
import TableItem from "./TableItem";
import { cookies } from "next/headers";
import EmptyState from "./EmptyState";
import ServiceOptionsMenu from "./ServiceOptionsMenu";
import StatusChips from "./StatusChips";

export default async function AdminServiceList({ services }) {
    let bookedServices = services;
    
    if (!bookedServices) {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")
        bookedServices = await getAdminServices(token);
    }
    
    if (!bookedServices || bookedServices.length <= 0) return <EmptyState message={"Oops!... You have no booked services yet."} cta={"Book A Service"} />
    
    return (
        <>
            {/* Desktop View */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full font-mono border-collapse">
                    <thead>
                        <tr className="font-bold border-b border-gray-300 bg-gray-50">
                            <th className="p-4 text-left">Service Type</th>
                            <th className="p-4 text-left">Property Address</th>
                            <th className="p-4 text-left">Tenant/Owner</th>
                            <th className="p-4 text-left">Date/Time</th>
                            <th className="p-4 text-left">Service Status</th>
                            <th className="p-4 text-left">Assigned Provider</th>
                            <th className="p-4 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookedServices.map(({ service_status, address, scheduled_date, service_type, id, owner, serviceProvider, assigned_provider }) => (
                            <tr key={id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="p-4">{service_type}</td>
                                <td className="p-4">{address}</td>
                                <td className="p-4">{owner || "N/A"}</td>
                                <td className="p-4">{new Date(scheduled_date).toLocaleString()}</td>
                                <td className="p-4">
                                    <StatusChips status={service_status} />
                                </td>
                                <td className="p-4">{serviceProvider || assigned_provider || "Not Assigned"}</td>
                                <td className="p-4">
                                    <ServiceOptionsMenu id={id} hasProvider={!!(serviceProvider || assigned_provider)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="flex lg:hidden flex-col bg-white border border-primary-100 rounded-lg overflow-hidden mt-4 font-mono">
                {bookedServices.map(({ service_status, address, scheduled_date, service_type, id, owner, assigned_provider, serviceProvider }) => (
                    <div key={id} className="flex flex-col gap-4 p-4 border-b border-primary-100 bg-white last:border-0">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex flex-col gap-1">
                                <h3 className="font-bold text-base text-neutrals-900">{service_type}</h3>
                                <p className="text-sm text-gray-500">{new Date(scheduled_date).toLocaleString()}</p>
                            </div>
                            <ServiceOptionsMenu id={id} hasProvider={!!(serviceProvider || assigned_provider)} />
                        </div>
                        
                        <div className="flex flex-col gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span>Property:</span>
                                <span className="font-medium text-gray-900 truncate max-w-[200px]" title={address}>{address}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Owner:</span>
                                <span className="font-medium text-gray-900">{owner || "N/A"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Provider:</span>
                                <span className="font-medium text-gray-900">{serviceProvider || assigned_provider || "Not Assigned"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Status:</span>
                                <StatusChips status={service_status} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}