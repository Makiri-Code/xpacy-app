import AdminOverview from "@/app/_components/AdminOverview";
import DashboardGridItem from "@/app/_components/DashboardGridItems";
import { getAdminProfile } from "@/app/_lib/data-services";
import { cookies } from "next/headers";
export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")
    const profile = await getAdminProfile(token);
    return (
        <div className="p-6 space-y-6">
            {/* <MobileDashboardHeader/> */}
            <h1 className="lg:text-4xl text-[28px] text-primary font-bold capitalize">Welcome {profile?.username?.split(" ")[0]},</h1>
            <div className="flex flex-col gap-12">
                <DashboardGridItem title={"Quick Overview"}>
                    <AdminOverview />
                </DashboardGridItem>
            </div>
        </div>
    )
}