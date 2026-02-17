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
            
            <Suspense fallback={<HeaderSkeleton role={role} />}>
                <ProfileWrapper role={role} />
            </Suspense>
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
            {role === "user" && (
                <div className="flex gap-4 items-center relative">
                    <SearchInput />
                    <Link href="/book-service" className="p-4 rounded-lg bg-primary hidden lg:flex items-center justify-center text-white font-mono font-bold">Book A Service</Link>
                    <div className="w-0.5 h-10 bg-gray-300"></div>
                    <ProfileDisplay role="user" profile={profile} />
                    <MobileProfileMenu profile={profile} role="user" />
                </div>
            )}
            {role === "admin" && (
                <div className="flex gap-4 items-center relative">
                    <Link href="/admin/add-new-property" className="p-4 rounded-lg bg-white border border-primary hidden lg:flex items-center justify-center text-primary font-mono font-bold">Manage Service Requests</Link>
                    <Link href="/admin/add-new-property" className="p-4 rounded-lg bg-primary hidden lg:flex items-center justify-center text-white font-mono font-bold">Add New Property</Link>
                    <div className="w-0.5 h-10 bg-gray-300"></div>
                    <ProfileDisplay role={"admin"} profile={profile} />
                    <MobileProfileMenu profile={profile} role="admin" />
                </div>
            )}
            {role === "property-owner" && (
                <div className="flex gap-4 items-center relative">
                    <Link href="/book-service" className="p-4 rounded-lg bg-white border border-primary hidden lg:flex items-center justify-center text-primary font-mono font-bold">New Service Request</Link>
                    <div className="w-0.5 h-10 bg-gray-300"></div>
                    <ProfileDisplay role="property-owner" profile={profile} />
                    <MobileProfileMenu profile={profile} role="property-owner" />
                </div>
            )}
        </>
    );
}

function HeaderSkeleton({ role }) {
    return (
        <div className="flex gap-4 items-center opacity-50 animate-pulse">
            <div className="w-32 h-10 bg-gray-200 rounded-lg hidden lg:block"></div>
            <div className="w-32 h-10 bg-gray-200 rounded-lg hidden lg:block"></div>
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        </div>
    );
}