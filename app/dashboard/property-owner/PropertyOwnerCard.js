
import { formatCurrency } from "@/app/_lib/utils";
import bathIcon from "@/public/bath.svg";
import bedIcon from "@/public/bed.svg";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function PropertyOwnerCard({ property }) {
    return (
        <div className=" h-[522px] flex flex-col rounded-bl-md rounded-br-md shadow-lg">
            <Link href={`/${property.property_status.toLowerCase()}/${property?.property_slug}`} className="relative p-4 overflow-hidden h-[280px] rounded-tl-md rounded-tr-md">
                <div className="flex items-center justify-between">
                    <span className="rounded-full z-10 px-4 py-2 bg-primary text-white font-mono text-sm  text-center">
                        {property.property_status}
                    </span>
                    
                </div>
                <Image
                    fill
                    quality={"80%"}
                    src={`https://app.xpacy.com/src/upload/properties/${property?.images?.at(
                        0
                    )}`}
                    alt="Property image"
                    className="hover:scale-101 transition-all duration-150 object-cover"
                    unoptimized
                />
            </Link>
            <main className="p-4  space-y-6">
                <div className="flex flex-col space-y-2">
                    <p className="font-mono text-s text-neutrals-900">
                        {property.property_type}
                    </p>
                    <h1 className="text-base text-md">{property.property_name}</h1>
                    <div className="flex space-x-2 items-center font-mono">
                        <MapPinIcon className="size-6" />
                        <span>
                            {property.city}, {property.state}
                        </span>
                    </div>
                      <p className="font-mono font-bold text-2xl tracking-wide text-secondary">
                        {formatCurrency(property.property_price)}
                    </p>
                   
                </div>
                <div className="border border-neutrals" />
                <div className="flex items-center justify-between">
                    <div className="space-x-1 flex items-center font-mono text-[16px]">
                        <Image src={bedIcon} width="24" height="24" alt="bed icon"/>
                        <span>Bed: {property.total_bedrooms}</span>
                    </div>
                    <div className="space-x-1 flex items-center font-mono text-[16px]">
                        <Image src={bathIcon} width="24" height="24" alt="bath icon"/>
                        <span>Baths: {property.total_bathrooms}</span>
                    </div>
                    
                </div>
                {/* Add more property details here */}
{/* Add more property details here */}
                    <div className="flex md:justify-end justify-between gap-3 mt-4">
                      <Link href={`/${property.property_status.toLowerCase()}/${property?.property_slug}`} className="px-4 py-2 text-center text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                        View Details
                      </Link>
                      <button 
                        onClick={() => {
                            // Placeholder for remove logic
                            console.log("Remove property", property.id);
                            alert("Remove feature coming soon");
                        }}
                        className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                      >
                        Remove
                      </button>
                    </div>
            </main>
        </div>
    )
}