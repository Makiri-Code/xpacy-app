import InvoiceSummary from "@/app/_components/InvoiceSummary";
import { getInvoiceList } from "@/app/_lib/data-services";
import { cookies } from "next/headers";


export default async function Page(){
         const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const invoices = await getInvoiceList(token);
    return (
        <div className="p-6 flex flex-col gap-12">
            <InvoiceSummary/>
        </div>
    )
}