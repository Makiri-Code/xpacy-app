import { cookies } from "next/headers";
import ServicesTableList from "@/app/_components/ServicesTableList";
import { getUserProfile, getProperties, getBookedServices } from "@/app/_lib/data-services";
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
    <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Booked Services</h1>
        <ServicesTableList services={myServices} />
    </div>
  );
};