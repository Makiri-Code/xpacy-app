import { FaBell, FaEnvelopeOpen, FaEnvelope } from "react-icons/fa";

export default function AdminNotificationsSummary({ notifications }) {
    const counts = {
        total: notifications?.length || 0,
        read: notifications?.filter(n => n.read_at || n.isRead).length || 0,
        unread: notifications?.filter(n => !n.read_at && !n.isRead).length || 0,
        // Assuming we might have types later, but for now just read/unread
    };

    const summaryItems = [
        {
            title: "Unread",
            count: counts.unread,
            icon: <FaEnvelope className="text-orange-500" />
        },
        {
            title: "Read",
            count: counts.read,
             icon: <FaEnvelopeOpen className="text-green-500" />
        }
    ];

    return (
        <div className="p-6 flex flex-col gap-4 border border-primary-200 rounded-lg bg-white mb-6">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800">Notifications Summary</h3>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Main Hero Card */}
                <div className="flex flex-col border border-primary-200 rounded-lg px-6 py-7 relative overflow-hidden bg-white min-w-[250px] flex-1">
                    <div className="flex gap-2 items-center" >
                        <span className="w-12 h-12 text-primary bg-primary-100 rounded-full flex items-center justify-center text-2xl "><FaBell /></span>
                        <span className="font-mono text-primary-900 uppercase">Total Notifications</span>
                    </div>
                    <p className="text-center font-bold text-2xl font-mono mt-4">{counts.total}</p>
                    <div className="w-[150px] h-[150px] rounded-full absolute -right-10 -top-10 bg-primary-700 opacity-10 z-10"></div>
                </div>

                 {/* Grid Items */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-2">
                    {summaryItems.map((item, index) => (
                        <div key={index} className="flex flex-col items-center justify-center p-6 rounded-lg shadow-sm bg-gray-50 border border-primary-100 w-full hover:shadow-md transition-shadow">
                            <div className="mb-2 text-xl">{item.icon}</div>
                            <p className="font-mono text-gray-600 text-base text-center">{item.title}</p>
                            <p className="text-center font-bold text-lg font-mono text-primary">{item.count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
