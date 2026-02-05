import AdminPropertyList from "@/app/_components/AdminPropertyList";
import DashboardGridItem from "@/app/_components/DashboardGridItems";
import PropertiesPieChart from "@/app/_components/PropertiesPieChart";
import { getAdminProperties } from "@/app/_lib/data-services";
import { cookies } from "next/headers";
import { BiBuildings } from "react-icons/bi";


export default async function Page({searchParams}) {
    const searchParam = await searchParams;
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const { pagination, properties } = await getAdminProperties(token, searchParam?.page);
    return (
        <div className="p-6 flex flex-col gap-6">
            {/* <DashboardGridItem title={"Summarry"}>
                <div className="grid grid-cols-[1fr_2fr_1fr]">

                    <div className="border border-primary-100 bg-white shadow-2xl py-6 px-4">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 font-mono">
                                <span className="flex items-center justify-center w-12 h-12 bg-white border border-secondary-100 rounded-full">
                                    <span className="text-2xl w-10 h-10 flex items-center justify-center bg-secondary-100 rounded-full"><BiBuildings /></span>
                                </span>
                                <span className="font-bold text-lg" >Total Properties</span>
                            </div>
                            <div className="self-center flex items-center justify-between flex-1">
                                <p className="font-bold font-mono text-2xl">45</p>
                            </div>
                        </div>
                        <PropertiesPieChart />
                    </div>
                </div>
            </DashboardGridItem> */}
            <DashboardGridItem title={"Property List"}>
                <AdminPropertyList properties={properties} pagination={pagination} />
            </DashboardGridItem>
        </div>
    )
}