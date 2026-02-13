import { cookies } from "next/headers";
import { getBookingList, getBookedServices, getProperties, getUserProfile, getUserNotifications } from "@/app/_lib/data-services";
import PropertiesSummary from "@/app/_components/PropertiesSummary";
import ServicesSummary from "@/app/_components/ServicesSummary";
import PaymentsSummary from "@/app/_components/PaymentsSummary";
import NotificationsSummary from "@/app/_components/NotificationsSummary";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    
    // Fetch data in parallel using Promise.allSettled to prevent one failure from breaking the page
    const results = await Promise.allSettled([
        getUserProfile(token),
        getProperties(),
        getBookedServices(token),
        getBookingList(token),
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
    const myServices = Array.isArray(services) 
        ? services.filter(s => myPropertyIds.includes(s.property_id || s.propertyId))
        : [];
    
    const myBookings = Array.isArray(bookings)
        ? bookings.filter(b => myPropertyIds.includes(b.property_id || b.property?._id))
        : [];

    return (
        <div className="space-y-8 p-4">
            <h1 className="lg:text-4xl text-[28px] text-primary font-bold capitalize">
                Welcome {profile?.firstname || "Owner"},
            </h1>
            
            <div className="flex flex-col gap-8">
                <section>
                    <PropertiesSummary properties={properties} />
                </section>
                
                <section>
                    <ServicesSummary services={myServices} />
                </section>
                
                <section>
                    <PaymentsSummary bookings={myBookings} />
                </section>
                
                <section>
                    <NotificationsSummary notifications={Array.isArray(notifications) ? notifications : []} />
                </section>
            </div>
        </div>
    );
}