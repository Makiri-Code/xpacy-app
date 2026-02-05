
const statusBg = {
    "vacant": "bg-[#FBC0BC] text-[#C4170B] ",
    "available": "bg-[#FFF8BE] text-[#9D7B40] ",
    "rented": "bg-[#C3E5C4] text-[#357B38] ",
    "active": "bg-[#C3E5C4] text-[#357B38] ",
}

export default function StatusChips({status}) {
    return (  
            <span className={`${statusBg[status.toLowerCase()] || ""} px-1.5 py-1 flex items-center justify-center rounded-full  text-sm font-bold font-mono`}>{status}</span>
    )
}