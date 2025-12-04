import { format, formatDate } from "date-fns";
import { GiReceiveMoney } from "react-icons/gi";
import { IoCalendarOutline } from "react-icons/io5";
import { formatCurrency } from "../_lib/utils";
import Link from "next/link";


export default function InvoiceTableItem({ invoice }) {
    const statusBg = {
        "paid": " bg-[#C3E5C4] text-[#357B38] ",
        "unpaid": " bg-[#F44336] text-[#F5F0E7] ",
        "incomplete": " bg-[#FFF8BE] text-[#9D7B40] ",

    }

    return (
        <tr className="border-b border-gray-200 text-sm">
            <td className="p-4">{invoice?.invoiceNumber}</td>
            <td className="p-4">
                <div className="flex items-center space-x-1.5">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 ">
                        {invoice?.invoice_reason === "rent" && <span className="text-base w-6 h-6 text-primary bg-secondary-100 rounded-full flex items-center justify-center"><GiReceiveMoney /></span>}
                        {invoice?.invoice_reason === "shortlet" && <span className="text-base w-6 h-6 text-primary bg-[#C3E5C4] rounded-full flex items-center justify-center "><GiReceiveMoney /></span>}
                        {invoice?.invoice_reason === "service" && <span className="text-base w-6 h-6 text-primary bg-primary-100 rounded-full flex items-center justify-center "><IoCalendarOutline /></span>}
                    </div>
                    <span className="capitalize">{invoice?.invoice_reason}</span>
                </div>
            </td>
            <td className="p-4">{invoice?.description}</td>
            <td className="p-4">{format(invoice?.issuedDate, "dd/MM/yy")}</td>
            <td className="p-4">{format(invoice?.dueDate, "dd/MM/yy")}</td>
            <td className="p-4 font-bold">{formatCurrency(invoice?.total)}</td>
            <td className="px-4">
                <span className={`${statusBg[invoice?.status.toLowerCase()] || ""} w-max  px-1.5 py-1 flex items-center justify-center rounded-full  text-sm font-bold`}>{invoice?.status}</span>
            </td>
            <td className="p-4 text-primary font-bold">
                <Link href={`/invoice/${invoice.id}`}>View</Link>
            </td>
        </tr>
    )
}