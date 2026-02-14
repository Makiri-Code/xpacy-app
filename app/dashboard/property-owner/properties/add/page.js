import AddNewPropertyForm from "@/app/_components/AddNewPropertyForm";
import { getPropertyOwnerProfile, getCities } from "@/app/_lib/data-services";
import { cookies } from "next/headers";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const [user, cities] = await Promise.all([
        getPropertyOwnerProfile(token),
        getCities()
    ]);
    
    return (
        <div className="max-w-4xl mx-auto pb-12 flex justify-center">
             <AddNewPropertyForm 
                token={token} 
                allCities={cities} 
                preSelectedOwner={user} 
                disableSearch={true}
             />
        </div>
    )
}
