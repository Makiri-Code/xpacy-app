

export default function TableItem({ service_type, address, scheduled_date, service_status, }) {
    const statusBg = {
        "upcoming": "bg-[#FBC0BC] text-[#C4170B] ",
        "in-progress": "bg-[#FFF8BE] text-[#9D7B40] ",
        "completed": "bg-[#C3E5C4] text-[#357B38] ",

    }
    const keys = Object.keys(statusBg);
    return (
        <tr className=" border-b border-gray-300">
            <td className="p-4">{service_type}</td>
            <td className="p-4">{address}</td>
            <td className="p-4">{scheduled_date}</td>
            <td className="px-4">
                <span className={`${keys.map((key) => key === service_status && statusBg[service_status.toLowerCase()])} px-0.5 py-1 flex items-center justify-center rounded-full  text-sm font-bold`}>Upcoming</span>
            </td>
        </tr>
    )
}