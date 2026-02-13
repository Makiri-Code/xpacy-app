import { FaHome, FaCheckCircle, FaTools, FaTag, FaHandshake } from "react-icons/fa";

export default function PropertiesSummary({ properties }) {
    // Calculate counts
    const counts = {
        rented: properties.filter(p => p.property_status?.toLowerCase() === 'rented').length,
        vacant: properties.filter(p => p.property_status?.toLowerCase() === 'active' && p.purpose?.toLowerCase() === 'rent').length,
        maintenance: properties.filter(p => p.property_status?.toLowerCase() === 'maintenance').length,
        forSale: properties.filter(p => p.property_status?.toLowerCase() === 'active' && p.purpose?.toLowerCase() === 'sell').length,
        sold: properties.filter(p => p.property_status?.toLowerCase() === 'sold').length,
    };

    const summaryItems = [
        {
            title: "Rented",
            count: counts.rented,
            icon: <FaHome className="text-blue-500" size={20} />,
            color: "bg-blue-50 border-blue-100"
        },
        {
            title: "Vacant",
            count: counts.vacant,
            icon: <FaCheckCircle className="text-green-500" size={20} />,
            color: "bg-green-50 border-green-100"
        },
        {
            title: "Under Maintenance",
            count: counts.maintenance,
            icon: <FaTools className="text-orange-500" size={20} />,
            color: "bg-orange-50 border-orange-100"
        },
        {
            title: "For Sale",
            count: counts.forSale,
            icon: <FaTag className="text-purple-500" size={20} />,
            color: "bg-purple-50 border-purple-100"
        },
        {
            title: "Sold",
            count: counts.sold,
            icon: <FaHandshake className="text-gray-500" size={20} />,
            color: "bg-gray-50 border-gray-100"
        }
    ];

    return (
        <div className="flex flex-col gap-4 p-4 shadow-sm rounded-lg">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between p-4">
                <div className="flex flex-col gap-3">
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">Properties Owned</h3>
                    <p className="text-3xl font-bold text-gray-900">{properties.length}</p>
                </div>
               
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
                {summaryItems.map((item, index) => (
                    <div key={index} className={`p-4 rounded-xl  flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow bg-white`}>
                        <div className="flex items-center justify-between text-center">
                            <span className="text-sm font-medium text-gray-600">{item.title}</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-800">{item.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
