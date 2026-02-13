import { cookies } from "next/headers";
import Link from "next/link";
import ServicesTableList from "@/app/_components/ServicesTableList";
import ServicesOverviewWrapper from "@/app/_components/ServicesOverviewWrapper";
import { getUserProfile, getProperties, getBookedServices } from "@/app/_lib/data-services";
import { MdAdd } from "react-icons/md";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const [user, propertiesData, services] = await Promise.all([
      getUserProfile(token),
      getProperties(),
      getBookedServices(token) // Assuming this returns all services for now, or user-specific
  ]);

  const allProperties = Array.isArray(propertiesData?.[0]) ? propertiesData[0] : [];
  const myProperties = allProperties.filter(property => property.property_owner_id === user?.id);
  const myPropertyIds = myProperties.map(p => p.id || p._id);

  // Filter services that are linked to my properties
  // Note: We are assuming service object has property_id or similar field. 
  // If getBookedServices returns "my bookings", this logic finds "bookings on my properties" ONLY IF the API returns ALL bookings.
  // Since we don't have a specific "getServicesForOwner", we rely on this or empty if API is strict to "my bookings as consumer".
  const myServices = Array.isArray(services) 
    ? services.filter(service => myPropertyIds.includes(service.property_id || service.propertyId)) 
    : [];

  return (
    <div className="space-y-6 p-4">

      <h2 className="text-xl font-bold text-gray-900">Service Overview</h2>
        <ServicesOverviewWrapper services={myServices} />
        <ServicesTableList services={myServices} />
        
    </div>
  );
};
