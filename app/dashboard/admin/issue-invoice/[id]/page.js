import IssueInvoice from "@/app/_components/IssueInvoice";
import InvoiceNav from "@/app/_components/InvoiceNav";
import { getAdminBooking, getAllUsers } from "@/app/_lib/data-services";
import { cookies } from "next/headers";

export default async function Page({ params }) {
    const pageParam = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    
    // Fetch all bookings and users concurrently to populate the IssueInvoice form seamlessly
    const [allBookings, users] = await Promise.all([
        getAdminBooking(token),
        getAllUsers(token)
    ]);
    
    // Locate the specific booking that needs to be invoiced
    const booking = allBookings?.find(b => String(b.id || b._id) === String(pageParam.id));

    return (
        <div className="flex flex-col lg:px-[7%] gap-8 lg:pb-28 px-6 pb-12 w-full h-full min-h-screen bg-gray-50 border-x border-gray-100">
            <InvoiceNav />
            <IssueInvoice 
                token={token} 
                users={users?.data || users || []} 
                booking={booking} 
            />
        </div>
    );
}
