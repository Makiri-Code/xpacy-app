import { Building, Building2 } from "lucide-react";
import { BiBuildings } from "react-icons/bi";
import { FaHome, FaCheckCircle, FaTools, FaTag, FaHandshake } from "react-icons/fa";

export default function PropertiesSummary({ properties, totalProperties, showHeading = true }) {
    // Calculate counts based on passed properties (which are already filtered if needed)
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
        <div className="p-6 flex flex-col gap-4 border border-primary-200 rounded-lg bg-white">
            {showHeading && (
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800">Summary</h3>
                </div>
            )}

            <div className="flex flex-col gap-4">
                {/* Main Hero Card */}
                <div className="flex flex-col border border-primary-200 rounded-lg px-6 py-7 relative overflow-hidden bg-white">
                    <div className="flex gap-2 items-center lg:w-[256px] w-full" >
                        <span className="w-12 h-12 text-primary bg-primary-100 rounded-full flex items-center justify-center text-2xl "><BiBuildings /></span>
                        <span className="font-mono text-primary-900 uppercase">Properties Owned</span>
                    </div>
                    <p className="text-center font-bold text-2xl font-mono w-[256px]">{totalProperties || properties.length}</p>
                    <div className="w-[220px] h-[220px] rounded-full absolute lg:-right-[7%] -right-[70%] lg:-top-1 -top-10 bg-primary-700 z-10"></div>
                    <div className="w-[220px] h-[220px] rounded-full absolute lg:right-[4%] -right-[65%] top-2 bg-[#73A0BE]"></div>
                </div>

                {/* Grid Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {summaryItems.map((item, index) => (
                        <div key={index} className="flex flex-col items-center justify-center p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white border border-primary-100 w-full">
                            <p className="font-mono text-primary-700 text-base text-center">{item.title}</p>
                            <p className="text-center font-bold text-lg font-mono">{item.count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
