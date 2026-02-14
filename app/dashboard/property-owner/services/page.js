import { cookies } from "next/headers";
import Link from "next/link";
import PropertyOwnerServicesTable from "@/app/_components/PropertyOwnerServicesTable";
import ServicesOverviewWrapper from "@/app/_components/ServicesOverviewWrapper";
import { getUserProfile, getProperties, getPropertyOwnerServices } from "@/app/_lib/data-services";
import { MdAdd } from "react-icons/md";

export default async function Page({ searchParams }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const [user, propertiesData, services] = await Promise.all([
      getUserProfile(token),
      getProperties(),
      getPropertyOwnerServices(token) 
  ]);

  const allProperties = Array.isArray(propertiesData?.[0]) ? propertiesData[0] : [];
  const myProperties = allProperties.filter(property => property.property_owner_id === user?.id);
  const myPropertyIds = myProperties.map(p => p.id || p._id);

  // Filter services that are linked to my properties
  let myServices = Array.isArray(services) ? services : [];

    // Pagination (mock for now as API support is unclear from context, using similar logic to properties)
    const page = Number(searchParams?.page) || 1;
    const limit = 10;
    const total = myServices.length;
    const totalPages = Math.ceil(total / limit);
    
    // Slice for local pagination if API doesn't paginated
    const paginatedServices = myServices.slice((page - 1) * limit, page * limit);

    const pagination = {
        page,
        limit,
        totalPages,
        total
    };

  return (
    <div className="space-y-6 p-4">

      <h2 className="text-xl font-bold text-gray-900">Service Overview</h2>
        <ServicesOverviewWrapper services={myServices} />
        <PropertyOwnerServicesTable services={paginatedServices} pagination={pagination} />
        
        <div className="flex justify-start mt-8 pb-8">
            <Link 
                href="/dashboard/property-owner/services/add" 
                className="flex items-center gap-2 "
            >
                <MdAdd className="text-2xl" />
                <span className="font-semibold">Request New Service</span>
            </Link>
        </div>
        
    </div>
  );
};
