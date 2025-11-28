import Image from "next/image";
import Link from "next/link"
import { SlPicture } from "react-icons/sl";
import ViewPhotos from "@/app/_components/ViewPhotos";
export default function PropertyPhotoSection({property}){
    return (
        <div className="grid grid-cols-4 grid-rows-3 gap-6">
            <div className="col-span-3 row-span-3 relative h-[615px]">
                <Image
                    fill
                    src={`https://app.xpacy.com/src/upload/properties/${property?.images.at(0)}`}
                    unoptimized
                    alt="Property image"
                    className="object-cover rounded-lg"
                />
            </div>
            <div className="relative">
                <Image
                    fill
                    src={`https://app.xpacy.com/src/upload/properties/${property?.images.at(1)}`}
                    unoptimized
                    alt="Property image"
                    className="object-cover rounded-lg"
                />
            </div>
            <div className="relative">
                <Image
                    fill
                    src={`https://app.xpacy.com/src/upload/properties/${property?.images.at(2)}`}
                    unoptimized
                    alt="Property image"
                    className="object-cover rounded-lg"
                />
            </div>
            <div className="relative">
                <Image
                    fill
                    src={`https://app.xpacy.com/src/upload/properties/${property?.images.at(3)}`}
                    unoptimized
                    alt="Property image"
                    className="object-cover rounded-lg"
                />
                <ViewPhotos propertySlug={property?.property_slug}/>
            </div>
        </div>
    )
}