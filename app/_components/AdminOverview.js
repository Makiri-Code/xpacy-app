import { cookies } from "next/headers";
import { getAdminProperties, getAdminServices, getPropertyOwner, getAllAdmin } from "../_lib/data-services";
import { FaHome, FaUsers, FaCalendarCheck } from "react-icons/fa";
import { BiBuildings } from "react-icons/bi";

const AdminOverview = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    
    const [
        propertiesResponse, 
        services, 
        propertyOwners, 
        admins
    ] = await Promise.all([
        getAdminProperties(token),
        getAdminServices(token),
        getPropertyOwner(token),
        getAllAdmin(token)
    ]);

    const overview = [
        { 
            title: "Properties Managed", 
            count: propertiesResponse?.pagination?.total || 0, 
            change: "+8%",
            icon: <FaHome className="text-green-500" size={24} />,
            color: "bg-green-50",
            bgColor: "bg-green-100"
        },
        { 
            title: "Pending Services", 
            count: services?.length || 0, 
            change: services?.length > 0 ? "+12%" : "0%",
            icon: <FaCalendarCheck className="text-purple-500" size={24} />,
            color: "bg-purple-50",
            bgColor: "bg-purple-100"
        },
        { 
            title: "Owners Managed", 
            count: propertyOwners?.length || 0, 
            change: "+5%",
            icon: <FaUsers className="text-blue-500" size={24} />,
            color: "bg-blue-50",
            bgColor: "bg-blue-100"
        },
        { 
            title: "Admins", 
            count: admins?.length || 0, 
            change: "+2%",
            icon: <BiBuildings className="text-orange-500" size={24} />, // Changed from FaUsers to BiBuildings
            color: "bg-orange-50",
            bgColor: "bg-orange-100"
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {overview.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-600 text-sm">{item.title}</p>
                            <p className="text-2xl font-bold mt-2">{item.count.toLocaleString()}</p>
                            <p className={`text-sm mt-1 ${item.change.startsWith('+') ? 'text-green-600' : item.change === '0%' ? 'text-gray-600' : 'text-red-600'}`}>
                                {item.change} from last month
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

export default AdminOverview;