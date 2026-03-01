import { Suspense } from "react";
import Link from "next/link";
import SearchInput from "./SearchInput";
import ProfileDisplay from "./ProfileDisplay";
import DashboardHeading from "./DashboardHeading";
import MobileProfileMenu from "./MobileProfileMenu";
import { getAdminProfile, getPropertyOwnerProfile, getUserProfile } from "../_lib/data-services";
import { cookies } from "next/headers";
import MobileNav from "./MobileNav";

export default function SidebarHeader({ role = "user" }) {
    return (
        <div className="py-4 px-6 flex items-center justify-between border-b border-primary-100 shadow-lg relative">
            <DashboardHeading />
            <MobileNav isSidebar={true} role={role} />
            
            <div className="flex gap-4 items-center relative">
                {/* Static Navigations hoisted out of Suspense to ensure they always load instantly */}
                {role === "user" && (
                    <>
                        <SearchInput />
                        <Link href="/book-service" className="p-4 rounded-lg bg-primary hidden lg:flex items-center justify-center text-white font-mono font-bold">Book A Service</Link>
                        <div className="w-0.5 h-10 bg-gray-300 hidden lg:block"></div>
                    </>
                )}
                
                {role === "admin" && (
                    <>
                        <Link href="/admin/add-new-property" className="p-4 rounded-lg bg-white border border-primary hidden lg:flex items-center justify-center text-primary font-mono font-bold">Manage Service Requests</Link>
                        <Link href="/admin/add-new-property" className="p-4 rounded-lg bg-primary hidden lg:flex items-center justify-center text-white font-mono font-bold">Add New Property</Link>
                        <div className="w-0.5 h-10 bg-gray-300 hidden lg:block"></div>
                    </>
                )}
                
                {role === "property-owner" && (
                    <>
                        <Link href="/book-service" className="p-4 rounded-lg bg-white border border-primary hidden lg:flex items-center justify-center text-primary font-mono font-bold">New Service Request</Link>
                        <div className="w-0.5 h-10 bg-gray-300 hidden lg:block"></div>
                    </>
                )}

                <Suspense fallback={<HeaderSkeleton />}>
                    <ProfileWrapper role={role} />
                </Suspense>
            </div>
        </div>
    );
}

async function ProfileWrapper({ role }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    let profile;
    if (role === "property-owner") {
        profile = await getPropertyOwnerProfile(token);
    } else if (role === "admin") {
        profile = await getAdminProfile(token);
    } else {
        profile = await getUserProfile(token);
    }

    return (
        <>
            <ProfileDisplay role={role} profile={profile} />
            <MobileProfileMenu profile={profile} role={role} />
        </>
    );
}

function HeaderSkeleton() {
    return (
        <div className="flex gap-4 items-center opacity-50 animate-pulse">
            <div className="w-10 h-10 bg-gray-200 rounded-full lg:block hidden"></div>
            <div className="w-24 h-5 bg-gray-200 rounded-md lg:block hidden"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full lg:hidden block"></div>
        </div>
    );
}