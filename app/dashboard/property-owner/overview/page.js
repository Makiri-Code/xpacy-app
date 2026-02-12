import { cookies } from "next/headers";
import Link from "next/link";
import PropertyOwnerOverview from "@/app/_components/PropertyOwnerOverview";
import { getBookingList, getBookedServices, getProperties, getUserProfile } from "@/app/_lib/data-services";
import DashboardGridItem from "@/app/_components/DashboardGridItems";
import PropertiesTableList from "@/app/_components/PropertiesTableList";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    
    // Fetch data in parallel
    const [profile, propertiesData, services, bookings] = await Promise.all([
        getUserProfile(token),
        getProperties(),
        getBookedServices(token),
        getBookingList(token)
    ]);
    
    // getProperties returns [properties, meta]
    const allProperties = Array.isArray(propertiesData?.[0]) ? propertiesData[0] : [];
    const properties = allProperties.filter(p => p.property_owner_id == profile?.id);
    const myPropertyIds = properties.map(p => p.id || p._id);

    // Filter derived data
    const myServices = Array.isArray(services) 
        ? services.filter(s => myPropertyIds.includes(s.property_id || s.propertyId)).map(s => ({...s, type: 'Service', date: s.createdAt || s.created_at}))
        : [];
    
    const myBookings = Array.isArray(bookings)
        ? bookings.filter(b => myPropertyIds.includes(b.property_id || b.property?._id)).map(b => ({...b, type: 'Booking', date: b.createdAt || b.created_at}))
        : [];

    // Combine and sort by date descending
    const recentActivity = [...myServices, ...myBookings]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    return (
        <div className="space-y-6">
            <h1 className="lg:text-4xl text-[28px] text-primary font-bold capitalize">
                Welcome {profile?.firstname || "Owner"},
            </h1>
            <div className="flex flex-col gap-12">
                <DashboardGridItem title={"Quick Overview"}>
                    <PropertyOwnerOverview />
                </DashboardGridItem>
                
                <div className="grid grid-cols-1 gap-8">
                     <DashboardGridItem title={"Property List"} viewAllLink={"/dashboard/property-owner/properties"}>
                        <PropertiesTableList properties={properties.slice(0, 5)} />
                    </DashboardGridItem>
                </div>
            </div>
        </div>
    );
}