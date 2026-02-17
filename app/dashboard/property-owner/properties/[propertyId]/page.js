import AddNewPropertyForm from "@/app/_components/AddNewPropertyForm";
import { getProperty, getPropertyOwnerProfile, getCities } from "@/app/_lib/data-services";
import { cookies } from "next/headers";

export default async function Page({ params }) {
    const { propertyId } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    const [property, propertyOwner, allCities] = await Promise.all([
        getProperty(propertyId),
        getPropertyOwnerProfile(token),
        getCities()
    ]);

    return (
        <div className="flex-1 py-12 bg-neutrals-50">
            <AddNewPropertyForm 
                allOwners={null}
                allCities={allCities}
                token={token}
                propertyOwnerInfo={propertyOwner}
                disableSearch={true}
                propertyObj={property}
                isReadOnly={true}
            />
        </div>
    );
}
