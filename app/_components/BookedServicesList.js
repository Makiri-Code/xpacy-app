import Image from "next/image";
import { getBookedServices } from "../_lib/data-services";
import TableItem from "./TableItem";
import { cookies } from "next/headers";
import EmptyState from "./EmptyState";
import StatusChips from "./StatusChips";
import ServiceOptionsMenu from "./ServiceOptionsMenu";

export default async function BookedServiceList({ services }) {
    let bookedServices = services;
    
    if (!bookedServices) {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")
        bookedServices = await getBookedServices(token);
    }
    
    // const { service_type, address, scheduled_date, service_status, } = bookedServices;

    if (!bookedServices || bookedServices.length <= 0) return <EmptyState message={"Oops!... You have no booked services yet."} cta={"Book A Service"} />
    return (
        <>
            <table className="table-auto lg:table font-mono hidden w-full">
                {/* Title */}
                <thead>
                    <tr className="font-bold border-b border-gray-300">
                        <td className="p-4">Service Type</td>
                        <td className="p-4">Property</td>
                        <td className="p-4">Date</td>
                        <td className="p-4">Status</td>
                        <td className="p-4"></td>
                    </tr>
                </thead>
                <tbody>
                    {bookedServices.map(({ service_status, address, scheduled_date, service_type, id }) => (
                        <TableItem 
                            key={id} 
                            id={id}
                            service_status={service_status} 
                            address={address} 
                            scheduled_date={scheduled_date} 
                            service_type={service_type} 
                        />
                    ))}
                </tbody>
            </table>
            <div className="flex lg:hidden flex-col gap-4 font-mono">
                {bookedServices.map(({ service_status, address, scheduled_date, service_type, id }) => <MobileTableItem key={id} service_status={service_status} address={address} scheduled_date={scheduled_date} service_type={service_type} />)}
            </div>
        </>
    )
}


const MobileTableItem =({ id, service_status, address, scheduled_date, service_type }) => {
    return (
        <div className="py-6 grid grid-cols-2 gap-y-6 gap-x-4 grid-rows-[auto] border-b border-gray-100 last:border-0">
            <div className="col-span-full flex justify-between items-center">
                <p className="text-sm font-bold">{new Date(scheduled_date).toLocaleDateString()}</p>
                <ServiceOptionsMenu id={id} />
            </div>
            <p className="text-sm">{service_type}</p>
            <div className="flex justify-end">
                <StatusChips status={service_status} />
            </div>
            <p className="text-sm text-neutral-600">Property</p>
            <p className="text-right text-sm">{address} </p>
        </div>
    )
}

