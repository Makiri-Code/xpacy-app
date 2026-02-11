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
           
        </div>
    )
}