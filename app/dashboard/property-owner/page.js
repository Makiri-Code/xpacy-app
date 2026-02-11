// app/dashboard/property-owner/page.jsx
import { 
  getProperties, 
  getSavedProperties, 
  getUserNotifications, 
  getPropertyOwner,
  getBookedServices 
} from "@/app/_lib/data-services"
import PropertyCard from "@/app/_components/PropertyCard"
import BookedServiceList from "@/app/_components/BookedServicesList" // Import the List component
import PropertyOwnerDashboard from "./PropertyOwnerDashboard"
import { cookies } from "next/headers";
import PaymentList from "@/app/_components/PaymentList"

const Page = async ({ searchParams }) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")
    
    const [
        properties, 
        savedProperties, 
        notifications, 
        propertyOwners,
        bookedServices
    ] = await Promise.all([
        getProperties(searchParams),
        getSavedProperties(token),
        getUserNotifications(token),
        getPropertyOwner(token),
        getBookedServices(token)
    ]);

    const totalpage = properties[1]?.totalPages;
    const currentPage = properties[1]?.page;
    const pageLimit = properties[1]?.limit;
    const totalProperties = properties[1]?.total;
    const totalResult = properties[0]?.length;

    // Pre-render PropertyCards
    const propertyCards = properties[0]?.map((property) => (
        <PropertyCard key={property.id || property._id} property={property} />
    )) || [];

    // PRE-RENDER the BookedServiceList component with the data
    const bookedServiceList = await BookedServiceList({ 
        bookedServices: bookedServices || [] 
    });

    return (
        <PropertyOwnerDashboard 
            savedProperties={savedProperties} 
            properties={properties} 
            totalpage={totalpage} 
            currentPage={currentPage} 
            pageLimit={pageLimit} 
            totalProperties={totalProperties} 
            totalResult={totalResult}
            notifications={notifications}
            propertyOwners={propertyOwners}
            paymentList={<PaymentList />}
            propertyCards={propertyCards}
            bookedServiceList={bookedServiceList} // Pass the prerendered list component
        />
    )
}

export default Page;