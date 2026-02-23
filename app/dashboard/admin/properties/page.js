import AdminPropertyList from "@/app/_components/AdminPropertyList";
import PropertiesSummary from "@/app/_components/PropertiesSummary";
// import AdminSummary from "@/app/_components/AdminSummary"; // Commented out in original
import Pagination from "@/app/_components/Pagination";
import { getAdminProperties } from "@/app/_lib/data-services";
import { cookies } from "next/headers";
import SearchInput from "@/app/_components/SearchInput";
import DashboardFilter from "@/app/_components/DashboardFilter";


export default async function Page({searchParams}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const params = await searchParams;
    const {properties, pagination} = await getAdminProperties(token, params);
    
    // Fetch unpaginated properties to calculate global stats
    const {properties: allProperties} = await getAdminProperties(token, { limit: 10000 });

    return (
        <div className="space-y-6 p-4">
            
            <PropertiesSummary properties={allProperties || []} totalProperties={pagination?.totalProperties || pagination?.totalItems || pagination?.total || pagination?.count} />
            
            <div className={`border-[1.5px] border-primary-200 p-6 flex flex-col gap-4 rounded-lg`}>
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between border-b border-primary-100 pb-4">
                    <h3 className="lg:text-md text-black text-base font-sans font-bold">All Properties</h3>
                    <div className="flex items-center gap-4">
                        <SearchInput placeholder="Search location..." />
                        <DashboardFilter />
                    </div>
                </div>
                
                <AdminPropertyList properties={properties || []} />
            </div>
            
            <div className="mt-8 flex justify-center">
                <Pagination pagination={pagination || { page: 1, totalPages: 1 }} />
            </div>
        </div>
    )
}