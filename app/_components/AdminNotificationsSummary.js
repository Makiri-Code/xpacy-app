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
                <div className="flex flex-col border border-primary-200 rounded-lg px-6 py-7 relative overflow-hidden bg-white min-w-[250px] flex-1 justify-center">
                    <div className="relative z-20 flex flex-col lg:items-start items-center lg:w-max">
                        <div className="flex gap-3 items-center">
                            <span className="w-12 h-12 text-primary bg-primary-100/80 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl shadow-sm">
                                <FaBell />
                            </span>
                            <span className="font-mono text-primary-900 font-bold uppercase tracking-wide text-sm">Total Notifications</span>
                        </div>
                        <p className="text-center lg:text-left font-bold text-4xl font-mono mt-4 lg:ml-[60px] text-gray-800">{counts.total}</p>
                    </div>

                    {/* Decorative Background Circles */}
                    <div className="w-[220px] h-[220px] rounded-full absolute lg:-right-[10%] -right-[70%] lg:-top-4 -top-10 bg-primary-700 z-10 opacity-90 transition-transform duration-700 hover:scale-105"></div>
                    <div className="w-[220px] h-[220px] rounded-full absolute lg:right-[2%] -right-[65%] top-6 bg-[#73A0BE] z-0 opacity-70 transition-transform duration-700 hover:-translate-x-2"></div>
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
