import AddNewPropertyForm from "@/app/_components/AddNewPropertyForm";
import { getCities, getPropertyOwnerProfile } from "@/app/_lib/data-services";
import { cookies } from "next/headers";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    const [cities, userProfile] = await Promise.all([
        getCities(),
        getPropertyOwnerProfile(token)
    ]);

    return (
        <div className="max-w-7xl mx-auto">
            <AddNewPropertyForm 
                allCities={cities} 
                propertyOwnerInfo={userProfile} 
                token={token} 
                disableSearch={true}
            />
        </div>
    );
}
