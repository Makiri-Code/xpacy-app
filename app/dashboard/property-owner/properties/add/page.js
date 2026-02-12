
import AddNewPropertyForm from "@/app/_components/AddNewPropertyForm";
import { getCities, getUserProfile } from "@/app/_lib/data-services";
import { cookies } from "next/headers";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    
    // Fetch cities and user profile
    // We don't need allOwners for the property owner view as they are the owner
    const [cities, profile] = await Promise.all([getCities(), getUserProfile(token)]);

    return (
        <div className="flex items-center justify-center p-6">
            <AddNewPropertyForm 
                allCities={cities} 
                token={token} 
                preSelectedOwner={profile} 
            />
        </div>
    )
}
