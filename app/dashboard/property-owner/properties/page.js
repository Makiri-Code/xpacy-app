import { cookies } from "next/headers";
import Link from "next/link";
import PropertiesTableList from "@/app/_components/PropertiesTableList";
import { getBookingList, getProperties, getUserProfile, getBookedServices } from "@/app/_lib/data-services";
import PropertiesSummary from "@/app/_components/PropertiesSummary";
import { MdAdd } from "react-icons/md";
import SearchInput from "@/app/_components/SearchInput";
import ExportButton from "@/app/_components/ExportButton";
import DateFilter from "@/app/_components/DateFilter";
import { checkDateInRange } from "@/app/_lib/utils";

export default async function Page({searchParams}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    
    // Fetch data
    const [user, propertiesData, bookings, services] = await Promise.all([
        getUserProfile(token),
        getProperties(),
        getBookingList(token),
        getBookedServices(token)
    ]);

    const allProperties = Array.isArray(propertiesData?.[0]) ? propertiesData[0] : [];
    
    // 1. Filter by Owner
    let properties = allProperties.filter(property => property.property_owner_id === user?.id);

    // 2. Filter by Date Range (if present in URL)
    const filterRange = (await searchParams)?.range;
    if (filterRange && filterRange !== 'all_time') {
        properties = properties.filter(p => {
            const dateStr = p.createdAt || p.created_at || p.date_added; 
            return checkDateInRange(dateStr, filterRange);
        });
    }
    
    // Pagination data from API (if available) or manual
    const pagination = propertiesData?.[1] || {
        page: 1,
        limit: 10,
        totalPages: Math.ceil(properties.length / 10),
        total: properties.length
    };

    return (
        <div className="space-y-6 p-4">
            <div className="flex justify-end gap-2">
                <DateFilter />
                <ExportButton data={properties} filename="property_summary" />
            </div>
            <PropertiesSummary properties={properties} />
           
            <PropertiesTableList 
                properties={properties} 
                bookings={Array.isArray(bookings) ? bookings : []}
                services={Array.isArray(services) ? services : []}
                pagination={pagination}
                recent={false} 
            />
            <div className="flex justify-start mt-8 pb-8">
                <Link 
                    href="/dashboard/property-owner/properties/add" 
                    className="flex items-center gap-2 "
                >
                    <MdAdd className="text-2xl" />
                    <span className="font-semibold">Request New Property Listing</span>
                </Link>
            </div>
        </div>
    );
};
