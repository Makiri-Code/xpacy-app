
import { getProperties, getUserProfile } from "@/app/_lib/data-services";
import PropertiesTableList from "@/app/_components/PropertiesTableList";
import { cookies } from "next/headers";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    
    // Fetch user profile and properties in parallel
    const [profile, propertiesData] = await Promise.all([
        getUserProfile(token),
        getProperties()
    ]);

    const allProperties = Array.isArray(propertiesData?.[0]) ? propertiesData[0] : [];
    // Filter properties to show only those owned by the logged-in user
    const properties = allProperties.filter(property => property.property_owner_id === profile?.id);

    return (
        <div className="space-y-6">
            <PropertiesTableList properties={properties} />
        </div>
    )
}
