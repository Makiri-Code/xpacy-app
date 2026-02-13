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
        <div className="p-6 flex flex-col gap-4 border border-primary-200 rounded-lg">
            {/* Main Hero Card */}
            <div className="flex flex-col border border-primary-200 rounded-lg px-6 py-7 relative overflow-hidden">
                <div className="flex gap-2 items-center lg:w-[256px] w-full" >
                    <span className="w-12 h-12 text-primary bg-primary-100 rounded-full flex items-center justify-center text-2xl "><FaTools /></span>
                    <span className="font-mono text-primary-900 uppercase">Total Services</span>
                </div>
                <p className="text-center font-bold text-2xl font-mono w-[256px]">{counts.total}</p>
                <div className="w-[220px] h-[220px] rounded-full absolute lg:-right-[7%] -right-[70%] lg:-top-1 -top-10 bg-[#477899] z-10"></div>
                <div className="w-[220px] h-[220px] rounded-full absolute lg:right-[4%] -right-[65%] top-2 bg-[#73A0BE]"></div>
            </div>

             {/* Grid Items */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {summaryItems.map((item, index) => (
                    <div key={index} className="flex flex-col items-center justify-center p-6 rounded-lg shadow-lg bg-white border border-primary-100 w-full">
                        <p className="font-mono text-[#477899] text-base text-center">{item.title}</p>
                        <p className="text-center font-bold text-lg font-mono">{item.count}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
