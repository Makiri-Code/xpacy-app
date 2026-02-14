import { cookies } from "next/headers";
import { getPropertyOwnerBookings, getPropertyOwnerServices, getProperties, getPropertyOwnerProfile, getUserNotifications } from "@/app/_lib/data-services";
import PropertiesOverviewWrapper from "@/app/_components/PropertiesOverviewWrapper";
import ServicesOverviewWrapper from "@/app/_components/ServicesOverviewWrapper";
import PaymentsOverviewWrapper from "@/app/_components/PaymentsOverviewWrapper";
import NotificationsSummary from "@/app/_components/NotificationsSummary";
import PropertiesTableList from "@/app/_components/PropertiesTableList";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    
    // Fetch data in parallel using Promise.allSettled to prevent one failure from breaking the page
    const results = await Promise.allSettled([
        getPropertyOwnerProfile(token),
        getProperties(), // Note: Ideally should filter by owner ID if possible, but keeping logic consistent with existing pattern property fetching
        getPropertyOwnerServices(token),
        getPropertyOwnerBookings(token),
        getUserNotifications(token)
    ]);

    const profile = results[0].status === 'fulfilled' ? results[0].value : null;
    const propertiesData = results[1].status === 'fulfilled' ? results[1].value : [];
    const services = results[2].status === 'fulfilled' ? results[2].value : [];
    const bookings = results[3].status === 'fulfilled' ? results[3].value : [];
    const notifications = results[4].status === 'fulfilled' ? results[4].value : [];
    
    // getProperties returns [properties, meta]
    const allProperties = Array.isArray(propertiesData?.[0]) ? propertiesData[0] : [];
    const properties = allProperties.filter(p => p.property_owner_id === profile?.id);
    const myPropertyIds = properties.map(p => p.id || p._id);

    // Filter derived data
    const myServices = Array.isArray(services) ? services : [];
    
    const myBookings = Array.isArray(bookings) ? bookings : [];

    return (
        <div className="space-y-8 p-4">
            <h1 className="lg:text-4xl text-[28px] text-primary font-bold capitalize">
                Welcome {profile?.first_name || profile?.firstname || profile?.name || profile?.full_name || "Owner"},
            </h1>
            
            <div className="flex flex-col gap-8">
                <section>
                    <PropertiesOverviewWrapper properties={properties} showFilters={false} />
                </section>
                
                <section>
                    <ServicesOverviewWrapper services={myServices} showFilters={false} />
                </section>
                
                <section>
                    <PaymentsOverviewWrapper bookings={myBookings} showFilters={false} />
                </section>
                
                <section>
                    <NotificationsSummary notifications={Array.isArray(notifications) ? notifications : []} />
                </section>
                <section>
                    <PropertiesTableList properties={properties} recent={true} />
                </section>  
            </div>
        </div>
    );
}