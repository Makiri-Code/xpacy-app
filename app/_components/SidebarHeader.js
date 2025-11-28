import Link from "next/link";
import SearchInput from "./SearchInput";
import ProfileDisplay from "./ProfileDisplay";
import DashboardHeading from "./DashboardHeading";
export default function SidebarHeader(){
    return (
        <div className="py-4 px-6 flex items-center justify-between border-b border-primary-100 shadow-lg">
            <DashboardHeading/>
            <div className="flex gap-4 items-center">
                <SearchInput/>
                <Link href="#" className="p-4 rounded-lg bg-primary flex items-center justify-center text-white font-mono font-bold">Book A Service</Link>
                <div className="w-0.5 h-10 bg-gray-300">
                </div>
                <ProfileDisplay/>
            </div>
        </div>
    )
} 