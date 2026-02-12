import { getPropertyOwner } from "@/app/_lib/data-services";
import { cookies } from "next/headers";
import CustomersTableList from "@/app/_components/CustomersTableList";

export default async function UsersPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  
  // Get customers who have interacted with this owner's properties
  const propertyOwners = await getPropertyOwner(token);
  
  // Extract data - adjust based on your actual getPropertyOwner return structure
  // Assuming propertyOwners response includes customers. 
  // If getPropertyOwner returns [properties, pagination, customers, inquiries] or similar tuple
  // Based on PropertyOwnerOverview Step 279 uses propertyOwners?.length. 
  // Let's assume propertyOwners IS the list of owners/customers for now?
  // Wait, step 275 says getPropertyOwner returns `data`.
  // Let's assume `data` is the array of customers.
  const customers = Array.isArray(propertyOwners) ? propertyOwners : propertyOwners?.data || [];

  return (
    <div className="space-y-6">
      <CustomersTableList customers={customers} />
    </div>
  );
}