"use client"
import { useState, useMemo } from "react";
import DateFilter from "./DateFilter";
import ExportButton from "./ExportButton";
import ServicesSummary from "./ServicesSummary";
import { checkDateInRange } from "@/app/_lib/utils";

export default function ServicesOverviewWrapper({ services, showFilters = true }) {
    const [filterRange, setFilterRange] = useState("all_time");

    const filteredServices = useMemo(() => {
        if (!filterRange || filterRange === "all_time") return services;
        return services.filter(s => {
            const dateStr = s.createdAt || s.created_at || s.date || s.booking_date; 
            return checkDateInRange(dateStr, filterRange); 
        });
    }, [services, filterRange]);

    return (
        <div className="flex flex-col gap-4">
            {showFilters && (
                <div className="flex justify-end gap-2">
                    <DateFilter onFilterChange={setFilterRange} value={filterRange} />
                    <ExportButton data={filteredServices} filename="services_summary" />
                </div>
            )}
            <ServicesSummary services={filteredServices} showHeading={showFilters} />
        </div>
    )
}
