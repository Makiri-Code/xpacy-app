import AdminOverview from "@/app/_components/AdminOverview";
import DashboardGridItem from "@/app/_components/DashboardGridItems";
import PropertiesPieChart from "@/app/_components/PropertiesPieChart"; 

export default function Page() {
    return (
        <div className="p-6">
            <h1 className="lg:text-4xl text-[28px] text-primary font-bold capitalize mb-8">Reports & Analytics</h1>
            <div className="flex flex-col gap-8">
                <DashboardGridItem title={"Key Metrics"}>
                    <AdminOverview />
                </DashboardGridItem>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <DashboardGridItem title={"Properties Distribution"}>
                        <div className="bg-white p-4 rounded-lg border border-primary-100 shadow-sm flex items-center justify-center">
                            <PropertiesPieChart />
                        </div>
                    </DashboardGridItem>
                    {/* Add more charts here as needed */}
                </div>
            </div>
        </div>
    );
}
