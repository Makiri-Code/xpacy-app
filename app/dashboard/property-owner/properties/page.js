import Link from "next/link";
import { getProperties, getUserProfile, getBookingList } from "@/app/_lib/data-services";
import PropertiesTableList from "@/app/_components/PropertiesTableList";
import { cookies } from "next/headers";
import DashboardFilter from "@/app/_components/DashboardFilter";
import PropertiesSummary from "@/app/_components/PropertiesSummary";
import { MdAdd } from "react-icons/md";

export default async function Page({searchParams}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    
    // Fetch user profile and properties in parallel
    const [profile, propertiesData, bookings_] = await Promise.all([
        getUserProfile(token),
        getProperties(),
        getBookingList(token)
    ]);
    const bookings = Array.isArray(bookings_) ? bookings_ : [];

    const allProperties = Array.isArray(propertiesData?.[0]) ? propertiesData[0] : [];
    
    // 1. Filter by Owner
    const propertiesByOwner = allProperties.filter(property => property.property_owner_id === profile?.id);
    let properties = [...propertiesByOwner];

    // 2. Filter by Search Params
    const { status, type, minPrice, maxPrice } = await searchParams;

    if (status) {
        properties = properties.filter(p => p.property_status?.toLowerCase() === status.toLowerCase());
    }

    if (type) {
        properties = properties.filter(p => p.property_type?.toLowerCase() === type.toLowerCase());
    }

    if (minPrice) {
        properties = properties.filter(p => p.property_price >= Number(minPrice));
    }

    if (maxPrice) {
        properties = properties.filter(p => p.property_price <= Number(maxPrice));
    }

    return (
        <div className="space-y-6 p-4">
            <h2 className="text-xl font-bold text-gray-900"> Property Summary</h2>
            <PropertiesSummary properties={propertiesByOwner} />
            <div className="flex justify-end">
                <DashboardFilter />
            </div>
            <PropertiesTableList properties={properties} bookings={bookings} pagination={{ page: 1, limit: 10, totalPages: Math.ceil(properties.length / 10), total: properties.length }} />
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
