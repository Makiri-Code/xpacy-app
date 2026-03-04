import AdminNotificationList from "@/app/_components/AdminNotificationList";
import AdminOverview from "@/app/_components/AdminOverview";
import AdminPropertyList from "@/app/_components/AdminPropertyList";
import AdminServiceList from "@/app/_components/AdminServiceList";
import DashboardGridItem from "@/app/_components/DashboardGridItems";
import PropertiesTableList from "@/app/_components/PropertiesTableList";
import PropertyOwnerServicesTable from "@/app/_components/PropertyOwnerServicesTable";
import ServicesTableList from "@/app/_components/ServicesTableList";
import AdminBookingList from "@/app/_components/AdminBookingList";
import { getAdminProfile, getAdminProperties, getAdminServices, getPropertyOwnerServices, getUserNotifications, getAdminBooking } from "@/app/_lib/data-services";
import { cookies } from "next/headers";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")
    
    // Parallel fetch for profile, properties, services, notifications, and bookings
    const [profile, propertiesData, services, notifications, bookings] = await Promise.all([
        getAdminProfile(token),
        getAdminProperties(token),
        getAdminServices(token),
        getUserNotifications(token),
        getAdminBooking(token)
    ]);

    const propertyList = (propertiesData?.properties || []).slice(0, 10);
    const slicedServices = (services || []).slice(0, 10);
    const slicedNotifications = (notifications || []).slice(0, 10);
    const slicedBookings = (bookings || []).slice(0, 10);

    return (
      <div className="p-6 space-y-6">
            <h1 className="lg:text-4xl text-[28px] text-primary font-bold capitalize">Welcome {profile?.username?.split(" ")[0]},</h1>
            <div className="flex flex-col gap-12">
                <DashboardGridItem title={"Quick Overview"}>
                    <AdminOverview />
                </DashboardGridItem>
                {/* Notifications */}
                <DashboardGridItem title={"Notifications"}>
                    <AdminNotificationList notifications={slicedNotifications} />
                </DashboardGridItem>
                <DashboardGridItem title={"Property List"} viewAllLink={"/dashboard/admin/properties"}>
                    <AdminPropertyList  
                        properties={propertyList} 
                        baseUrl="/dashboard/admin/properties" 
                        ctaLink="/admin/add-new-property"
                    />
                </DashboardGridItem>
                <DashboardGridItem title={"Services Requests"} viewAllLink={"/dashboard/admin/services"}>
                    <AdminServiceList services={slicedServices} />
                </DashboardGridItem>
                <DashboardGridItem title={"Recent Bookings"} viewAllLink={"/dashboard/admin/payments"}>
                    <AdminBookingList bookings={slicedBookings} />
                </DashboardGridItem>

            </div>
        </div>
    )
}