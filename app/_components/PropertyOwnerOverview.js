import { cookies } from "next/headers";
import { getProperties, getBookedServices, getSavedProperties, getUserProfile } from "@/app/_lib/data-services";
import { FaHome, FaCalendarCheck, FaRegHeart } from "react-icons/fa";

const PropertyOwnerOverview = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token"); // Fetch data relevant to the property owner
    
    const [
        propertiesData, 
        bookedServices, 
        savedPropertiesData,
        user
    ] = await Promise.all([
        getProperties(), 
        getBookedServices(token),
        getSavedProperties(token),
        getUserProfile(token)
    ]);

    // Filter properties for this owner
    const allProperties = Array.isArray(propertiesData?.[0]) ? propertiesData[0] : [];
    const myProperties = allProperties.filter(p => p.property_owner_id === user?.id);

    const propertiesCount = myProperties.length;
    const bookedServicesCount = bookedServices?.length || 0;
    const savedPropertiesCount = savedPropertiesData?.pagination?.total || 0;

    const overview = [
        { 
            title: "Properties Listed", 
            count: propertiesCount, 
            change: "Active",
            icon: <FaHome className="text-green-500" size={24} />,
            color: "bg-gray-100",
            bgColor: "bg-gray-100"
        },
        { 
            title: "Booked Services", 
            count: bookedServicesCount, 
            change: "Total",
            icon: <FaCalendarCheck className="text-purple-500" size={24} />,
            color: "bg-gray-100",
            bgColor: "bg-gray-100"
        },
        { 
            title: "Saved Properties", 
            count: savedPropertiesCount, 
            change: "Favorites",
            icon: <FaRegHeart className="text-blue-500" size={24} />,
            color: "bg-gray-100",
            bgColor: "bg-gray-100"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {overview.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-600 text-sm">{item.title}</p>
                            <p className="text-2xl font-bold mt-2">{item.count.toLocaleString()}</p>
                            <p className="text-sm mt-1 text-gray-600">
                                {item.change}
                            </p>
                        </div>
                        <div className={`p-3 rounded-full ${item.color}`}>
                            {item.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PropertyOwnerOverview;