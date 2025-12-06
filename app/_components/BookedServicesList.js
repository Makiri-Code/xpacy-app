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

    if (bookedServices.length <= 0) return <EmptyState message={"Oops!... You have no booked services yet."} cta={"Book A Service"} />
    return (
        <>
            <table className="table-auto lg:table font-mono hidden">
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
                    {bookedServices.map(({ service_status, address, scheduled_date, service_type, id }) => <TableItem key={id} service_status={service_status} address={address} scheduled_date={scheduled_date} service_type={service_type} />)}
                </tbody>
            </table>
            <div className="flex lg:hidden flex-col gap-4 font-mono">
                {bookedServices.map(({ service_status, address, scheduled_date, service_type, id }) => <MobileTableItem key={id} service_status={service_status} address={address} scheduled_date={scheduled_date} service_type={service_type} />)}
            </div>
        </>
    )
}


const MobileTableItem =({ service_status, address, scheduled_date, service_type }) => {
        const statusBg = {
        "pending": "bg-[#FBC0BC] text-[#C4170B] ",
        "in-progress": "bg-[#FFF8BE] text-[#9D7B40] ",
        "completed": "bg-[#C3E5C4] text-[#357B38] ",

    }
    return (
        <div className="py-6 grid grid-cols-2 gap-y-6 gap-x-4 grid-rows-[auto]">
            <p className="col-span-full text-sm">{scheduled_date}</p>
            <p className="text-sm">{service_type}</p>
            <p className={`${statusBg[service_status.toLowerCase()] || ""} px-0.5 py-1 flex items-center justify-center rounded-full  text-sm font-bold`}>{service_status}</p>
            <p className="text-sm text-neutral-600">Property</p>
            <p className="text-right text-sm">{address} </p>
        </div>
    )
}

