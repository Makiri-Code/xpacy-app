import { format } from "date-fns";
import { formatCurrency } from "@/app/_lib/utils";
import EmptyState from "@/app/_components/EmptyState";
import DataTable from "./DataTable";
import BookingOptionsMenu from "./BookingOptionsMenu";

const tableHeadings = [
    { heading: "Property" },
    { heading: "Payer" },
    { heading: "Date" },
    { heading: "Status" },
    { heading: "Amount", right: true },
    { heading: "" }
];

export default function PaymentsTableList({ bookings }) {
    if (!bookings?.length) return <EmptyState message={"No payment history found."} />

    const renderRow = (booking) => {
        const status = (booking.payment_status || booking.status || "N/A");
        const statusLower = status.toLowerCase();
        
        let statusColor = "bg-gray-100 text-gray-500";
        if (['paid', 'completed', 'active', 'confirmed', 'success', 'successful'].includes(statusLower)) statusColor = "bg-green-100 text-green-700";
        else if (['pending', 'processing'].includes(statusLower)) statusColor = "bg-yellow-100 text-yellow-700";
        else if (['failed', 'cancelled', 'expired'].includes(statusLower)) statusColor = "bg-red-100 text-red-700";

        return (
            <tr key={booking.id || booking._id} className="text-gray-700 text-sm font-mono border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-0">
                <td className="p-4 font-semibold text-gray-900">
                    {booking.property?.property_name || "N/A"}
                </td>
                <td className="p-4">
                    {booking.user?.firstname ? `${booking.user.firstname} ${booking.user.lastname || ''}` : "N/A"}
                </td>
                <td className="p-4 text-gray-500">
                    {booking.createdAt || booking.start_date ? format(new Date(booking.createdAt || booking.start_date), "MMM dd, yyyy") : "N/A"}
                </td>
                <td className="p-4">
                     <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase whitespace-nowrap ${statusColor}`}>
                        {status}
                    </span>
                </td>
                <td className="p-4 text-right font-bold text-primary">
                    {booking.amount || booking.property?.property_price ? formatCurrency(booking.amount || booking.property?.property_price) : "N/A"}
                </td>
                <td className="p-4 text-center">
                    <BookingOptionsMenu id={booking.id || booking._id} />
                </td>
            </tr>
        );
    };

    const renderMobileCard = (booking) => {
        const status = (booking.payment_status || booking.status || "N/A");
        const statusLower = status.toLowerCase();
        
        let statusColor = "bg-gray-100 text-gray-500";
        if (['paid', 'completed', 'active', 'confirmed', 'success', 'successful'].includes(statusLower)) statusColor = "bg-green-100 text-green-700";
        else if (['pending', 'processing'].includes(statusLower)) statusColor = "bg-yellow-100 text-yellow-700";
        else if (['failed', 'cancelled', 'expired'].includes(statusLower)) statusColor = "bg-red-100 text-red-700";

        return (
            <div key={booking.id || booking._id} className="flex flex-col gap-4 p-4 border-b border-gray-100 bg-white last:border-0 font-mono">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-sm text-gray-900">{booking.property?.property_name || "N/A"}</h3>
                        <p className="text-xs text-gray-500">{booking.user?.firstname ? `${booking.user.firstname} ${booking.user.lastname || ''}` : "N/A"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusColor}`}>
                            {status}
                        </span>
                        <BookingOptionsMenu id={booking.id || booking._id} />
                    </div>
                </div>
                
                <div className="flex justify-between items-center text-xs bg-gray-50 p-3 rounded-lg">
                    <span className="text-gray-500 font-bold uppercase text-[9px]">Date</span>
                    <span className="text-gray-700 font-medium">
                        {booking.createdAt || booking.start_date ? format(new Date(booking.createdAt || booking.start_date), "MMM dd, yyyy") : "N/A"}
                    </span>
                </div>

                <div className="flex justify-between items-center text-sm px-1">
                    <span className="text-gray-400 font-bold uppercase text-[9px]">Amount Paid</span>
                    <span className="font-bold text-primary">
                        {booking.amount || booking.property?.property_price ? formatCurrency(booking.amount || booking.property?.property_price) : "N/A"}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <DataTable
            headers={tableHeadings}
            data={bookings}
            renderRow={renderRow}
            renderMobileCard={renderMobileCard}
            showPagination={false}
        />
    );
}
