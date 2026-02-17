import { cookies } from "next/headers";
import { getAdminProperties, getAdminServices, getPropertyOwner, getAllAdmin } from "../_lib/data-services";
import { FaHome, FaUsers, FaCalendarCheck } from "react-icons/fa";
import { BiBuildings } from "react-icons/bi";
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { FaBuildingUser } from "react-icons/fa6";
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
            icon: <FaHome className="text-green-500" size={24} />,
            color: "bg-green-50",
            bgColor: "bg-green-100"
        },
        { 
            title: "Pending Services", 
            count: services?.length || 0, 
            icon: <FaCalendarCheck className="text-purple-500" size={24} />,
            color: "bg-purple-50",
            bgColor: "bg-purple-100"
        },
        { 
            title: "Owners Managed", 
            count: propertyOwners?.length || 0, 
            icon: <FaUsers className="text-blue-500" size={24} />,
            color: "bg-blue-50",
            bgColor: "bg-blue-100"
        },
        { 
            title: "Admins", 
            count: admins?.length || 0, 
            icon: <BiBuildings className="text-orange-500" size={24} />, // Changed from FaUsers to BiBuildings
            color: "bg-orange-50",
            bgColor: "bg-orange-100"
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {overview.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex justify-center items-center">
                        <div className="flex flex-col gap-3 items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${item.color}`}>{item.icon}</div>
                            <p className="text-gray-600 text-sm capitalize">{item.title}</p>
                            <p className="text-2xl font-bold mt-2">{item.count.toLocaleString()}</p>
                           
                        </div>
                        
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminOverview;