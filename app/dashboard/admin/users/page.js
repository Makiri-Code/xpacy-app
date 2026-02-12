import AdminPropertyOwnersList from "@/app/_components/AdminPropertyOwnersList";
import AdminUsersSummary from "@/app/_components/AdminUsersSummary";
import { getPropertyOwner } from "@/app/_lib/data-services";
import { cookies } from "next/headers";



export default async function Page(){
        const cookieStore = await cookies();
        const token = cookieStore.get("token")
        const owners = await getPropertyOwner(token);
        console.log(owners)
    return (
        <div className="p-6 space-y-6">
            <AdminUsersSummary/>
            <AdminPropertyOwnersList owners={owners}/>
        </div>
    )
}