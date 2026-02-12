
import { getBookingList, getProperties, getUserProfile } from "@/app/_lib/data-services";
import { cookies } from "next/headers";
import BookingsTableList from "@/app/_components/BookingsTableList";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    
    const [user, propertiesData, bookingsData] = await Promise.all([
        getUserProfile(token),
        getProperties(),
        getBookingList(token)
    ]);

    const allProperties = Array.isArray(propertiesData?.[0]) ? propertiesData[0] : [];
    const myProperties = allProperties.filter(property => property.property_owner_id === user?.id);
    const myPropertyIds = myProperties.map(p => p.id || p._id);

    // Bookings for my properties
    const myBookings = Array.isArray(bookingsData) 
        ? bookingsData.filter(booking => myPropertyIds.includes(booking.property_id || booking.property?._id))
        : [];

    return (
        <div className="space-y-6 p-6">
            <h1 className="text-2xl font-bold text-gray-800">Payment History</h1>
            <div className="border border-primary-200 rounded-lg overflow-hidden">
                <BookingsTableList bookings={myBookings} />
            </div>
        </div>
    )
}