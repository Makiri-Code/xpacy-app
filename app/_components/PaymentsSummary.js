import { FaMoneyBillWave, FaClock, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { formatCurrency } from "@/app/_lib/utils";
import { FaSpinner } from "react-icons/fa6";

export default function PaymentsSummary({ bookings }) {
    // Calculate counts and totals
    const counts = {
        totalRevenue: bookings
            .filter(b => b.payment_status?.toLowerCase() === 'paid' || b.payment_status?.toLowerCase() === 'completed')
            .reduce((acc, curr) => acc + (curr.amount || curr.property?.property_price || 0), 0),
        pendingAmount: bookings
            .filter(b => b.payment_status?.toLowerCase() === 'pending')
            .reduce((acc, curr) => acc + (curr.amount || curr.property?.property_price || 0), 0),
        completedCount: bookings.filter(b => b.payment_status?.toLowerCase() === 'paid' || b.payment_status?.toLowerCase() === 'completed').length,
        pendingCount: bookings.filter(b => b.payment_status?.toLowerCase() === 'pending').length,
    };

    const summaryItems = [
        {
            title: "Pending Payments",
            count: formatCurrency(counts.pendingAmount),
            subtext: `${counts.pendingCount} transactions`,
            icon: <FaClock className="text-orange-500" size={20} />,
            color: "bg-orange-50 border-orange-100"
        },
        {
            title: "Upcoming Payments",
            count: counts.upcomingCount,
            subtext: "Payments due",
            icon: <FaSpinner className="text-green-500" size={20} />,
            color: "bg-green-50 border-green-100"
        },
        {
            title: "Expenditure",
            count: counts.expenditure,
            subtext: "Total expenses",
            icon: <FaExclamationCircle className="text-red-500" size={20} />,
            color: "bg-red-50 border-red-100"
        }
    ];

    return (
        <div className="flex flex-col gap-4 p-4 shadow-sm rounded-lg">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div className="flex flex-col gap-3">
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Revenue</h3>
                    <p className="text-3xl font-bold text-gray-900">{formatCurrency(counts.totalRevenue)}</p>
                </div>
                
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3">
                {summaryItems.map((item, index) => (
                    <div key={index} className={`p-4 rounded-xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow bg-white`}>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">{item.title}</span>
                        </div>
                        <span className="text-xl font-bold text-gray-800">{item.count}</span>
                        {item.subtext && <span className="text-xs text-gray-500">{item.subtext}</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}
