import Link from "next/link";
import SearchInput from "./SearchInput";
import ProfileDisplay from "./ProfileDisplay";
import DashboardHeading from "./DashboardHeading";
import MobileProfileMenu from "./MobileProfileMenu";
import { getUserProfile } from "../_lib/data-services";
import { cookies } from "next/headers";
import MobileNav from "./MobileNav";
export default async function SidebarHeader({role = "user"}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")
    const profile = await getUserProfile(token);
    return (
        <div className="py-4 px-6 flex items-center justify-between border-b border-primary-100 shadow-lg relative">
            <DashboardHeading />
            <MobileNav isSidebar={true} role={role} />
            {role === "user" && (
                <div className="flex gap-4 items-center relative">
                    <SearchInput />
                    <Link href="/book-service" className="p-4 rounded-lg bg-primary hidden lg:flex items-center justify-center text-white font-mono font-bold">Book A Service</Link>
                    <div className="w-0.5 h-10 bg-gray-300">
                    </div>
                    <ProfileDisplay role="user" />
                    <MobileProfileMenu profile={profile} />
                </div>
            )}
            {role === "admin" && (
                <div className="flex gap-4 items-center relative">
                    <Link href="/admin/add-new-property" className="p-4 rounded-lg bg-white border border-primary hidden lg:flex items-center justify-center text-primary font-mono font-bold">Manage Service Requests</Link>
                    <Link href="/admin/add-new-property" className="p-4 rounded-lg bg-primary hidden lg:flex items-center justify-center text-white font-mono font-bold">Add New Property</Link>
                    <div className="w-0.5 h-10 bg-gray-300">
                    </div>
                    <ProfileDisplay role={"admin"} />
                    <MobileProfileMenu profile={profile} />
                </div>
            )}
            {role === "property-owner" && (
                <div className="flex gap-4 items-center relative">
                    <Link href="/dashboard/property-owner/properties/add" className="p-4 rounded-lg bg-primary hidden lg:flex items-center justify-center text-white font-mono font-bold">Add New Property</Link>
                    <div className="w-0.5 h-10 bg-gray-300">
                    </div>
                    <ProfileDisplay role={"user"} /> 
                    <MobileProfileMenu profile={profile} />
                </div>
            )}
        </div>
    )
} 