import AdminPropertyList from "@/app/_components/AdminPropertyList";
import DashboardGridItem from "@/app/_components/DashboardGridItems";
import PropertiesSummary from "@/app/_components/PropertiesSummary";
// import AdminSummary from "@/app/_components/AdminSummary"; // Commented out in original
import Pagination from "@/app/_components/Pagination";
import { getAdminProperties } from "@/app/_lib/data-services";
import { cookies } from "next/headers";


export default async function Page({searchParams}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const page = (await searchParams)?.page;
    const {properties, pagination} = await getAdminProperties(token, page);

    return (
        <div className="space-y-6 p-4">
            <h1 className="lg:text-4xl text-[28px] text-primary font-bold capitalize mb-4">Properties</h1>
            
            <PropertiesSummary properties={properties || []} totalProperties={pagination?.totalProperties || pagination?.totalItems || pagination?.total || pagination?.count} />
            
            <DashboardGridItem title={"All Properties"}>
                <AdminPropertyList properties={properties || []} />
            </DashboardGridItem>
            
            <div className="mt-8 flex justify-center">
                <Pagination pagination={pagination || { page: 1, totalPages: 1 }} />
            </div>
        </div>
    )
}