import AdminOverview from "@/app/_components/AdminOverview";
import AdminPropertyList from "@/app/_components/AdminPropertyList";
import DashboardGridItem from "@/app/_components/DashboardGridItems";
<<<<<<< HEAD
import PropertiesTableList from "@/app/_components/PropertiesTableList";
=======
>>>>>>> 0269a06 (Fixed bugs and added new features)
import { getAdminProfile, getAdminProperties } from "@/app/_lib/data-services";
import { cookies } from "next/headers";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")
<<<<<<< HEAD
    
    // Parallel fetch for profile and properties
    const [profile, propertiesData] = await Promise.all([
        getAdminProfile(token),
        getAdminProperties(token)
    ]);

    const propertyList = propertiesData?.properties || [];

=======
    const profile = await getAdminProfile(token);
    const { pagination, properties} = await getAdminProperties(token);
    const propertyList = properties?.toSpliced(0, 5) || [];
>>>>>>> 0269a06 (Fixed bugs and added new features)
    return (
      <div className="p-6 space-y-6">
            {/* <MobileDashboardHeader/> */}
            <h1 className="lg:text-4xl text-[28px] text-primary font-bold capitalize">Welcome {profile?.username?.split(" ")[0]},</h1>
            <div className="flex flex-col gap-12">
                <DashboardGridItem title={"Quick Overview"}>
                    <AdminOverview />
                </DashboardGridItem>
                {/* Notifications */}
<<<<<<< HEAD
                <DashboardGridItem title={"Property List"} viewAllLink={"/dashboard/admin/properties"}>
                    <PropertiesTableList 
                        properties={propertyList.slice(0, 5)} 
                        baseUrl="/dashboard/admin/properties" 
                        ctaLink="/admin/add-new-property"
                    />
=======
                <DashboardGridItem title={"Property List"} viewAllLink={"#"}>
                    <AdminPropertyList properties={propertyList}  />
>>>>>>> 0269a06 (Fixed bugs and added new features)
                </DashboardGridItem>
            </div>
        </div>
    )
}