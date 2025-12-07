import InvoiceListTable from "@/app/_components/InvoiceListTable";
import InvoiceSummary from "@/app/_components/InvoiceSummary";
import MobileDashboardHeader from "@/app/_components/MobileDashboardHeader";
import { Suspense } from "react";



export default function Page(){
    return (
        <div className="p-6 flex flex-col lg:gap-12">
            <MobileDashboardHeader/>
            <InvoiceSummary/>
            <Suspense fallback={<div className="spinner"></div>}>
                <InvoiceListTable/>
            </Suspense>
        </div>
    )
}