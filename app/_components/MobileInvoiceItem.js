import { format } from "date-fns";
import Link from "next/link";
import { GiReceiveMoney } from "react-icons/gi";
import { IoCalendarOutline } from "react-icons/io5";
import { formatCurrency } from "../_lib/utils";


export default function MobileInvoiceItem({ invoice }) {
    const statusBg = {
        "paid": " bg-[#C3E5C4] text-[#357B38] ",
        "unpaid": " bg-[#F44336] text-[#F5F0E7] ",
        "incomplete": " bg-[#FFF8BE] text-[#9D7B40] ",

    }

    return (
        <div className="border-t border-b border-gray-200 text-sm grid grid-cols-2 gap-6 py-6 font-mono">
            <p className="col-span-2">{invoice?.invoiceNumber}</p>
            <div className="col-span-2">
                <div className="flex items-center space-x-1.5">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 ">
                        {invoice?.invoice_reason === "rent" && <span className="text-base w-6 h-6 text-primary bg-secondary-100 rounded-full flex items-center justify-center"><GiReceiveMoney /></span>}
                        {invoice?.invoice_reason === "shortlet" && <span className="text-base w-6 h-6 text-primary bg-[#C3E5C4] rounded-full flex items-center justify-center "><GiReceiveMoney /></span>}
                        {invoice?.invoice_reason === "service" && <span className="text-base w-6 h-6 text-primary bg-primary-100 rounded-full flex items-center justify-center "><IoCalendarOutline /></span>}
                    </div>
                    <span className="capitalize">{invoice?.invoice_reason}</span>
                </div>
            </div>
            <p className="col-span-2">{invoice?.description}</p>
            <p className="text-neutral-600">Payment Amount</p>
            <p className="font-bold text-right">{formatCurrency(invoice?.total)}</p>
            <p className="text-neutral-600">Issued Date</p>
            <p className="text-right font-bold">{format(invoice?.issuedDate, "dd/MM/yy")}</p>
            <p className="text-neutral-600">Due Date</p>
            <p className="text-right">{format(invoice?.dueDate, "dd/MM/yy")}</p>
            <p className="">
                <span className={`${statusBg[invoice?.status.toLowerCase()] || ""} w-max  px-1.5 py-1 flex items-center justify-center rounded-full  text-sm font-bold`}>{invoice?.status}</span>
            </p>
            <p className="text-right text-primary font-bold">
                <Link href={`/invoice/${invoice.id}`}>View</Link>
            </p>
        </div>
    )
}

