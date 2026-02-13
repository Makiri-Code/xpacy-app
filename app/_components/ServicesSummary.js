import { FaTools, FaClock, FaSpinner, FaCheckCircle } from "react-icons/fa";

export default function ServicesSummary({ services }) {
    // Calculate counts
    const counts = {
        total: services.length,
        pending: services.filter(s => s.service_status?.toLowerCase() === 'pending').length,
        inProgress: services.filter(s => s.service_status?.toLowerCase() === 'in-progress').length,
        completed: services.filter(s => s.service_status?.toLowerCase() === 'completed').length,
    };

    const summaryItems = [
         {
            title: "Completed",
            count: counts.completed,
            icon: <FaCheckCircle className="text-green-500" size={20} />,
            color: "bg-green-50 border-green-100"
        },

        {
            title: "In Progress",
            count: counts.inProgress,
            icon: <FaSpinner className="text-blue-500" size={20} />,
            color: "bg-blue-50 border-blue-100"
        },
        {
            title: "upcomming",
            count: counts.upcomming,
            icon: <FaSpinner className="text-blue-500" size={20} />,
            color: "bg-blue-50 border-blue-100"
        },
        {
            title: "Pending",
            count: counts.pending,
            icon: <FaClock className="text-orange-500" size={20} />,
            color: "bg-orange-50 border-orange-100"
        },
       
       
        
         {
            title: "Cancelled",
            count: counts.cancelled,
            icon: <FaSpinner className="text-blue-500" size={20} />,
            color: "bg-blue-50 border-blue-100"
        },
    ];

    return (
        <div className="flex flex-col gap-4 p-4 shadow-sm rounded-lg">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div className="flex flex-col gap-3">
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Services Booked</h3>
                    <p className="text-3xl font-bold text-gray-900">{counts.total}</p>
                </div>
               
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {summaryItems.map((item, index) => (
                    <div key={index} className={`p-4 rounded-xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow bg-white`}>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">{item.title}</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-800">{item.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
