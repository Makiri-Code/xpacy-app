import PropertyOwnerServicesTable from "@/app/_components/PropertyOwnerServicesTable";
import DashboardGridItem from "@/app/_components/DashboardGridItems";
import ServicesOverviewWrapper from "@/app/_components/ServicesOverviewWrapper";
import { getAdminServices } from "@/app/_lib/data-services";
import { cookies } from "next/headers";
import ServicesTableList from "@/app/_components/ServicesTableList";
import AdminServiceList from "@/app/_components/AdminServiceList";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const services = await getAdminServices(token) || [];

    return (
        <div className="p-6">
            <h1 className="lg:text-4xl text-[28px] text-primary font-bold capitalize mb-8">Services</h1>
            
            <div className="mb-8">
               <ServicesOverviewWrapper services={services} />
            </div>

            <DashboardGridItem title={"All Service Requests"}>
                <AdminServiceList services={services} />
            </DashboardGridItem>
        </div>
    );
}
