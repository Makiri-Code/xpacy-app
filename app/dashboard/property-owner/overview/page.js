import { cookies } from "next/headers";
import PropertyOwnerOverview from "@/app/_components/PropertyOwnerOverview";
import { getBookingList, getBookedServices, getProperties, getUserProfile, getUserNotifications } from "@/app/_lib/data-services";
import PropertiesSummary from "@/app/_components/PropertiesSummary";
import ServicesSummary from "@/app/_components/ServicesSummary";
import PaymentsSummary from "@/app/_components/PaymentsSummary";
import NotificationsSummary from "@/app/_components/NotificationsSummary";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    
    // Fetch data in parallel
    const [profile, propertiesData, services, bookings, notifications] = await Promise.all([
        getUserProfile(token),
        getProperties(),
        getBookedServices(token),
        getBookingList(token),
        getUserNotifications(token)
    ]);
    
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