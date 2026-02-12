
import AddNewPropertyForm from "@/app/_components/AddNewPropertyForm";
import { getCities, getProperty, getUserProfile } from "@/app/_lib/data-services";
import { cookies } from "next/headers";

export default async function Page({ params }) {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    
    // Fetch data in parallel
    const [cities, profile, property] = await Promise.all([
        getCities(), 
        getUserProfile(token),
        getProperty(id)
    ]);

    return (
        <div className="flex items-center justify-center p-6">
            <AddNewPropertyForm 
                allCities={cities} 
                token={token} 
                preSelectedOwner={profile}
                initialData={property}
                isEditMode={true}
            />
        </div>
    )
}