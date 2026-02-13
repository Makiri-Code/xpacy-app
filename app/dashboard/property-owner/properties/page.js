import Link from "next/link";
import { getProperties, getUserProfile, getBookingList } from "@/app/_lib/data-services";
import PropertiesTableList from "@/app/_components/PropertiesTableList";
import { cookies } from "next/headers";
import DashboardFilter from "@/app/_components/DashboardFilter";
import PropertiesSummary from "@/app/_components/PropertiesSummary";
import { MdAdd } from "react-icons/md";
import SearchInput from "@/app/_components/SearchInput";

export default async function Page({searchParams}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    
    // Fetch user profile first to get ID
    const profile = await getUserProfile(token);
    
    // Construct search params with owner ID
    const search = { ...await searchParams, property_owner_id: profile?.id };

    // Fetch properties and bookings in parallel
    const [[propertiesData, paginationData], bookings_] = await Promise.all([
        getProperties(search),
        getBookingList(token)
    ]);
    const bookings = Array.isArray(bookings_) ? bookings_ : [];
    const properties = Array.isArray(propertiesData) ? propertiesData : [];
    
    // No client-side filtering needed for properties unless API fails to filter
    const propertiesByOwner = properties // For summary, we can use the fetched list directly if API filters correctly
    
    // Pagination from API
    const pagination = paginationData || { 
        page: Number(search.page) || 1, 
        limit: 10, 
        totalPages: Math.ceil(properties.length / 10) || 1, 
        total: properties.length 
    };

    return (
        <div className="space-y-6 p-4">
            <h2 className="text-xl font-bold text-gray-900"> Property Summary</h2>
            <PropertiesSummary properties={properties} />
            <div className="flex justify-end gap-4">
                <SearchInput />

                <DashboardFilter />
            </div>
            <PropertiesTableList 
                properties={properties} 
                bookings={bookings} 
                pagination={pagination} 
            />
            <div className="flex justify-start mt-8 pb-8">
                <Link 
                    href="/dashboard/property-owner/properties/add" 
                    className="flex items-center gap-2 text-primary px-6 py-3 rounded-lg font-bold hover:bg-primary-600 transition-colors "
                >
                    <MdAdd className="text-xl"/>
                    Request New Property Listing
                </Link>
            </div>
        </div>
    )
}
