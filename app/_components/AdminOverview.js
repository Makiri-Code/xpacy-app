import { cookies } from "next/headers";
import { getAdminProperties, getAdminServices, getAllAdmin, getPropertyOwner } from "../_lib/data-services";
import { BiBuildings } from "react-icons/bi";
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { FaBuildingUser } from "react-icons/fa6";
const AdminOverview = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const [{ pagination }, services, propertyOwners, admins] = await Promise.all([
        getAdminProperties(token),
        getAdminServices(token),
        getPropertyOwner(token),
        getAllAdmin(token)
    ]);
    const overview = [
        { title: "Properties Managed", count: pagination?.total || 0, icon: <span className="flex items-center justify-center w-12 h-12 bg-white border border-secondary-100 rounded-full"><span className="text-2xl w-10 h-10 flex items-center justify-center bg-secondary-100 rounded-full"><BiBuildings /></span> </span> },
        { title: "Pending Services", count: services?.length || 0, icon: <span className="flex items-center justify-center w-12 h-12 bg-white border border-primary-100 rounded-full"><span className="text-2xl w-10 h-10 flex items-center justify-center bg-primary-100 rounded-full"><MdOutlineHomeRepairService /></span> </span> },
        { title: "Owners Managed", count: propertyOwners?.length || 0, icon: <span className="flex items-center justify-center w-12 h-12 bg-white border border-red-100 rounded-full"><span className="text-2xl w-10 h-10 flex items-center justify-center bg-red-100 rounded-full"><FaBuildingUser /></span> </span> },
        { title: "Admins", count: admins?.length || 0, icon: <span className="flex items-center justify-center w-12 h-12 bg-white border border-yellow-100 rounded-full"><span className="text-2xl w-10 h-10 flex items-center justify-center bg-yellow-100 rounded-full"><RiAdminLine /></span> </span> },
    ]
    return (
        <div className="grid grid-cols-4 gap-4">
            {overview.map((item, index) => {
                return (
                    <div key={index} className="py-6 min-w-[250px] border border-primary-100 font-mono px-4 bg-white  flex flex-col  items-center justify-center gap-4 rounded-lg shadow-lg">
                        {item.icon}
                        <p className=" text-primary">{item.title}</p>
                        <p className="text-2xl font-bold">{item.count}</p>
                    </div>
                )
            })}
            
        </div>
    );
};

export default AdminOverview;