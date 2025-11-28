import Image from "next/image";
import { getBookedServices } from "../_lib/data-services";
import TableItem from "./TableItem";
import { cookies } from "next/headers";
import EmptyState from "./EmptyState";

export default async function BookedServiceList() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")
    const bookedServices = await getBookedServices(token);
    const { service_type, address, scheduled_date, service_status, } = bookedServices;
    
    if(bookedServices.length <= 0 ) return <EmptyState message={"Oops!... You have no booked services yet."} cta={"Book A Service"}/>
    return (
        <table className="table-auto font-mono">
            {/* Title */}
            <thead>
                <tr className="font-bold border-b border-gray-300">
                    <td className="p-4">Service Type</td>
                    <td className="p-4">Property</td>
                    <td className="p-4">Date</td>
                    <td className="p-4">Status</td>
                </tr>
            </thead>
            <tbody>
                {bookedServices.map(() =>  <TableItem key={i} service_status={service_status} address={address} scheduled_date={scheduled_date} service_type={service_type} />)}
            </tbody>
        </table>
    )
}