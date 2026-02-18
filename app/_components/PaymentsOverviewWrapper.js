"use client"
import { useState, useMemo } from "react";
import DateFilter from "./DateFilter";
import ExportButton from "./ExportButton";
import PaymentsSummary from "./PaymentsSummary";
import { checkDateInRange } from "@/app/_lib/utils";

export default function PaymentsOverviewWrapper({ bookings, showFilters = true }) {
    const [filterRange, setFilterRange] = useState("all_time");

    const filteredBookings = useMemo(() => {
        if (!filterRange || filterRange === "all_time") return bookings;
        return bookings.filter(b => {
             const dateStr = b.createdAt || b.created_at || b.payment_date || b.date; 
            return checkDateInRange(dateStr, filterRange); 
        });
    }, [bookings, filterRange]);

    return (
        <div className="flex flex-col gap-4">
            {showFilters && (
                <div className="flex justify-end gap-2 text-nowrap">
                    <DateFilter onFilterChange={setFilterRange} value={filterRange} />
                    <ExportButton 
                        data={filteredBookings} 
                        filename="payments_summary" 
                        options={[
                            { id: "all", label: "All" },
                            { id: "invoice_list", label: "Invoice list" }
                        ]}
                    />
                </div>
            )}
            <PaymentsSummary bookings={filteredBookings} showHeading={showFilters} />
        </div>
    )
}
