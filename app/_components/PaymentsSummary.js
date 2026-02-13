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
        <div className="p-6 flex flex-col gap-4 border border-primary-200 rounded-lg">
            {/* Main Hero Card */}
            <div className="flex flex-col border border-primary-200 rounded-lg px-6 py-7 relative overflow-hidden">
                <div className="flex gap-2 items-center lg:w-[256px] w-full" >
                    <span className="w-12 h-12 text-primary bg-primary-100 rounded-full flex items-center justify-center text-2xl "><FaMoneyBillWave /></span>
                    <span className="font-mono text-primary-900 uppercase">Total Revenue</span>
                </div>
                <p className="text-center font-bold text-2xl font-mono w-[256px]">{formatCurrency(counts.totalRevenue)}</p>
                <div className="w-[220px] h-[220px] rounded-full absolute lg:-right-[7%] -right-[70%] lg:-top-1 -top-10 bg-[#477899] z-10"></div>
                <div className="w-[220px] h-[220px] rounded-full absolute lg:right-[4%] -right-[65%] top-2 bg-[#73A0BE]"></div>
            </div>

            {/* Grid Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {summaryItems.map((item, index) => (
                    <div key={index} className="flex flex-col items-center justify-center p-6 rounded-lg shadow-lg bg-white border border-primary-100 w-full">
                        <p className="font-mono text-[#477899] text-base text-center">{item.title}</p>
                        <p className="text-center font-bold text-lg font-mono">{item.count}</p>
                        {item.subtext && <span className="text-xs text-gray-500 font-mono mt-1">{item.subtext}</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}
