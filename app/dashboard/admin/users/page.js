import AdminPropertyOwnersList from "@/app/_components/AdminPropertyOwnersList";
import AdminUsersList from "@/app/_components/AdminUsersList";
import UsersSummary from "@/app/_components/UsersSummary";
import { getPropertyOwner, getAllAdmin, getAllUsers } from "@/app/_lib/data-services";
import { UserPlus } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

export default async function Page(){
        const cookieStore = await cookies();
        const token = cookieStore.get("token")
        
        const [owners, admins, regularUsers] = await Promise.all([
            getPropertyOwner(token),
            getAllAdmin(token),
            getAllUsers(token)
        ]);

        // Normalize data structure if needed
        const ownersList = (owners || []).map(u => ({ ...u, role: 'property-owner' }));
        const adminsList = (admins || []).map(u => ({ ...u, role: 'admin' }));
        const usersList = (regularUsers || []).map(u => ({ ...u, role: 'user' }));

        // Deduplicate users for the "All Registered Users" list
        // Priority: Admin > Property Owner > User
        const allUsersMap = new Map();
        
        // Add users first (lowest priority)
        usersList.forEach(u => allUsersMap.set(u.id, u));
        
        // Add owners (overwrites user if ID matches)
        ownersList.forEach(u => allUsersMap.set(u.id, u));
        
        // Add admins (highest priority, overwrites others)
        adminsList.forEach(u => allUsersMap.set(u.id, u));

        const allUsers = Array.from(allUsersMap.values());

        const stats = {
            totalUsers: allUsers.length,
            propertyOwners: ownersList.length,
            admins: adminsList.length,
            regularUsers: usersList.length,
            approvedKyc: allUsers.filter(u => u.kyc_status === 'approved').length,
            pendingKyc: allUsers.filter(u => u.kyc_status === 'pending').length,
            rejectedKyc: allUsers.filter(u => u.kyc_status === 'declined').length,
            processedKyc: allUsers.filter(u => u.kyc_status === 'processing').length,
            activeUsers: allUsers.filter(u => u.status === 'active').length,
            inactiveUsers: allUsers.filter(u => u.status === 'inactive').length,
            unverifiedUsers: allUsers.filter(u => !u.email_verified_at).length 
        };

    return (
        <div className="p-6 space-y-6">
            <h1 className="lg:text-4xl text-[28px] text-primary font-bold capitalize mb-2"></h1>
            <UsersSummary {...stats} />
            <AdminUsersList users={usersList} title="Tenants / Buyers List" variant="tenant" />
            <AdminUsersList users={allUsers} title="All Registered Users List" variant="registered" />
            <AdminUsersList users={adminsList} title="Admins List" />
            <AdminPropertyOwnersList owners={ownersList}/>            
        </div>
    )
}