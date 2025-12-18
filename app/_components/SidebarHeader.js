import Link from "next/link";
import SearchInput from "./SearchInput";
import ProfileDisplay from "./ProfileDisplay";
import DashboardHeading from "./DashboardHeading";
import MobileProfileMenu from "./MobileProfileMenu";
import { getUserProfile } from "../_lib/data-services";
import { cookies } from "next/headers";
import MobileNav from "./MobileNav";
export default async function SidebarHeader() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")
    const profile = await getUserProfile(token);
    return (
        <div className="py-4 px-6 flex items-center justify-between border-b border-primary-100 shadow-lg relative">
            <DashboardHeading />
            <MobileNav isSidebar={true} />
            <div className="flex gap-4 items-center relative">
                <SearchInput />
                <Link href="/book-service" className="p-4 rounded-lg bg-primary hidden lg:flex items-center justify-center text-white font-mono font-bold">Book A Service</Link>
                <div className="w-0.5 h-10 bg-gray-300">
                </div>
                <ProfileDisplay />
                <MobileProfileMenu profile={profile} />
            </div>
        </div>
    )
} 