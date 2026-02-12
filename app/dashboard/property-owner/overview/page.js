import { cookies } from "next/headers";
import Link from "next/link";
import PropertyOwnerOverview from "@/app/_components/PropertyOwnerOverview";
import { getBookingList, getBookedServices, getProperties, getUserProfile } from "@/app/_lib/data-services";
import DashboardGridItem from "@/app/_components/DashboardGridItems";
import PropertiesTableList from "@/app/_components/PropertiesTableList";
import { FaCalendarCheck, FaHome } from "react-icons/fa";

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
    const properties = allProperties.filter(p => p.property_owner_id === profile?.id);
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
        <div className="p-6 space-y-6">
            <h1 className="lg:text-4xl text-[28px] text-primary font-bold capitalize">
                Welcome {profile?.firstname || "Owner"},
            </h1>
            <div className="flex flex-col gap-12">
                <DashboardGridItem title={"Quick Overview"}>
                    <PropertyOwnerOverview />
                </DashboardGridItem>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <DashboardGridItem title={"Property List"} viewAllLink={"/dashboard/property-owner/properties"}>
                        <PropertiesTableList properties={properties.slice(0, 5)} />
                    </DashboardGridItem>
                    
                    <DashboardGridItem title={"Recent Activity"}>
                        {recentActivity.length > 0 ? (
                            <div className="flex flex-col">
                                {recentActivity.map((activity, i) => (
                                    <div key={i} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-none hover:bg-gray-50/50 transition-colors px-2 -mx-2 rounded-md">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-full bg-gray-100 text-gray-500">
                                                 {activity.type === 'Booking' ? <FaCalendarCheck size={16} /> : <FaHome size={16} />}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm text-gray-800">{activity.type === 'Booking' ? 'New Booking' : 'Service Request'}</p>
                                                <p className="text-xs text-gray-500">{activity.property_name || activity.property?.property_name || "Unknown Property"}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-medium text-gray-900">
                                                {new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </p>
                                            <p className={`text-[10px] font-medium mt-0.5 capitalize ${
                                                (activity.status || activity.service_status) === 'pending' ? 'text-orange-600' :
                                                (activity.status || activity.service_status) === 'confirmed' ? 'text-green-600' : 
                                                'text-gray-500'
                                            }`}>
                                                {activity.status || activity.service_status || 'Pending'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-40 flex flex-col items-center justify-center text-gray-500">
                                <p>No recent activity</p>
                            </div>
                        )}
                    </DashboardGridItem>
                </div>
            </div>
        </div>
    )
}