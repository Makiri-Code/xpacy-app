import { format } from "date-fns";
import { formatCurrency } from "@/app/_lib/utils";
import EmptyState from "@/app/_components/EmptyState";

export default function PaymentsTableList({ bookings }) {
    if (!bookings?.length) return <EmptyState message={"No payment history found."} />

    return (
        <div className="flex flex-col border border-primary-200 bg-white rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-primary-100 text-gray-600 font-medium text-sm uppercase tracking-wider">
                        <tr>
                            <th className="p-4">Property</th>
                            <th className="p-4">Payer</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                        {bookings.map((booking) => (
                            <tr key={booking.id || booking._id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-medium text-gray-900">
                                    {booking.property?.property_name || "N/A"}
                                </td>
                                <td className="p-4">
                                    {booking.user?.firstname ? `${booking.user.firstname} ${booking.user.lastname || ''}` : "N/A"}
                                </td>
                                <td className="p-4 text-gray-500">
                                    {booking.createdAt || booking.start_date ? format(new Date(booking.createdAt || booking.start_date), "MMM dd, yyyy") : "N/A"}
                                </td>
                                <td className="p-4">
                                     <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
                                        (booking.payment_status || booking.status || '').toLowerCase() === 'paid' || (booking.payment_status || booking.status || '').toLowerCase() === 'completed' 
                                            ? "bg-green-100 text-green-700" 
                                            : (booking.payment_status || booking.status || '').toLowerCase() === 'pending' 
                                            ? "bg-yellow-100 text-yellow-700" 
                                            : (booking.payment_status || booking.status || '').toLowerCase() === 'failed'
                                            ? "bg-red-100 text-red-700"
                                            : "bg-gray-100 text-gray-500"
                                    }`}>
                                        {booking.payment_status || booking.status || "N/A"}
                                    </span>
                                </td>
                                <td className="p-4 text-right font-bold text-gray-900">
                                    {booking.amount || booking.property?.property_price ? formatCurrency(booking.amount || booking.property?.property_price) : "N/A"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
