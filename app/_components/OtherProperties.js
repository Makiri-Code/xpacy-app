import { getOtherProperties } from "../_lib/data-services"
import PropertyCard from "./PropertyCard";

export default async function OtherProperties(){
    const properties = await getOtherProperties();
    return (
        <div className="grid grid-cols-3 grid-rows-2 gap-x-6 gap-y-16">
            {properties?.map((property) => <PropertyCard key={property?.id} property={property}/>)}
        </div>
    )
}