import InvoiceListTable from "@/app/_components/InvoiceListTable";
import InvoiceSummary from "@/app/_components/InvoiceSummary";
import { Suspense } from "react";



export default function Page(){
    return (
        <div className="p-6 flex flex-col gap-12">
            <InvoiceSummary/>
            <Suspense fallback={<div className="spinner"></div>}>
                <InvoiceListTable/>
            </Suspense>
        </div>
    )
}