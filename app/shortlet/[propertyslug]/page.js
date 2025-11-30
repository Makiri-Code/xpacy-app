import AppHeader from "@/app/_components/AppHeader";
import Footer from "@/app/_components/Footer";
import PropertiesDetailsSection from "@/app/_components/PropertiesDetailsSection";
import PropertyDetailsHeader from "@/app/_components/PropertyDetailsHeader";
import PropertyPhotoSection from "@/app/_components/PropertyPhotosSection";
import PropertySavedIcon from "@/app/_components/ProperySavedIcon";
import { getProperty } from "@/app/_lib/data-services"

export async function generateMetadata({params}){
    const {propertySlug} =  params;
    const property = await getProperty(propertySlug);
    return {
        title: property.property_name,
        description: property.description,
        openGraph: {
            title: property.property_name,
            description: property.description,
            images: [
                {url: `https://app.xpacy.com/src/upload/properties/${property?.images.at(0)}`,
                    width: 1200,
                    height: 630
                }
            ]
        }
    }
}
export default async function Page({ params }) {
    const pageParams = await params;
    const property = await getProperty(pageParams.propertyslug)
    return (
        <>
            <AppHeader />
            <main className="flex flex-col px-[7%]">
                <PropertyDetailsHeader propertyName={property?.property_name} propertyStatus={property?.property_status} propertyAddress={property?.address}>
                    <PropertySavedIcon propertyId={property?.id} />
                </PropertyDetailsHeader>
                <PropertyPhotoSection property={property} />
                <div className="grid grid-cols-4 gap-12 py-12">
                    <PropertiesDetailsSection property={property} />
                </div>
            </main>
            <Footer />
        </>
    )
}