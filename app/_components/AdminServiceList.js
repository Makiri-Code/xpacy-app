
import EmptyState from "./EmptyState";
import ServiceOptionsMenu from "./ServiceOptionsMenu";
import StatusChips from "./StatusChips";
import DataTable from "./DataTable";

const tableHeadings = [
    { heading: "Service Type" },
    { heading: "Property Address" },
    { heading: "User" },
    { heading: "Date/Time" },
    { heading: "Status", center: true },
    { heading: "Assigned Provider" },
    { heading: "" }
];

export default function AdminServiceList({ services }) {
    let bookedServices = services;
    
    if (!bookedServices || bookedServices.length <= 0) return <EmptyState message={"Oops!... You have no booked services yet."} cta={"Book A Service"} />

    const renderRow = (service) => {

        return (
            
        <tr key={service._id || service.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors last:border-0 text-sm font-mono">

            <td className="p-4">{service.service_type}</td>
            <td className="p-4">{service.address}</td>
            <td className="p-4">{service.user?.firstname || "N/A"}</td>
            <td className="p-4">{new Date(service.scheduled_date).toLocaleDateString("en-GB")}, {service.scheduled_time}</td>
            <td className="p-4 text-center">
                <div className="flex justify-center">
                    <StatusChips status={service.service_status} />
                </div>
            </td>
            <td className="p-4">{service.serviceProvider || service.assigned_provider || "Not Assigned"}</td>
            <td className="p-4 text-center">
                <ServiceOptionsMenu id={service.id} hasProvider={!!(service.serviceProvider || service.assigned_provider)} />
            </td>
        </tr>
        );
    };

    const renderMobileCard = (service) => (
        <div key={service._id || service.id} className="py-6 flex flex-col gap-4 border-b border-gray-100 bg-white last:border-0 font-mono">

            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-bold text-gray-800">{service.service_type}</h3>
                    <p className="text-xs text-gray-500">{new Date(service.scheduled_date).toLocaleDateString("en-GB")}</p>
                    <p className="text-xs text-gray-500">{service.scheduled_time}</p>
                </div>
                <ServiceOptionsMenu id={service._id || service.id} hasProvider={!!(service.serviceProvider || service.assigned_provider)} />
            </div>

            <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg text-xs">
                <div className="flex flex-col gap-1">
                    <p className="text-neutral-500 text-[10px] uppercase font-bold">User</p>
                    <p className="text-gray-700">{service.user?.firstname || "N/A"}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-neutral-500 text-[10px] uppercase font-bold">Status</p>
                    <div className="flex">
                        <StatusChips status={service.service_status} />
                    </div>
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                    <p className="text-neutral-500 text-[10px] uppercase font-bold">Property Address</p>
                    <p className="text-gray-700 truncate" title={service.address}>{service.address}</p>
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                    <p className="text-neutral-500 text-[10px] uppercase font-bold">Assigned Provider</p>
                    <p className="text-gray-700">{service.serviceProvider || service.assigned_provider || "Not Assigned"}</p>
                </div>
            </div>
        </div>
    );

    return (
        <DataTable
            headers={tableHeadings}
            data={bookedServices}
            renderRow={renderRow}
            renderMobileCard={renderMobileCard}
            showPagination={false}
            className="p-0! border-none shadow-none"
        />
    );
}