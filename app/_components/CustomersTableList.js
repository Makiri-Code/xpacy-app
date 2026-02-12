"use client";
import Pagination from "./Pagination";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CustomersTableList({ usersData, count }) {
    const searchParams = useSearchParams();
    // Default page is 1 if not specified
    const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1; 
    
    // Simple pagination logic if needed
    // Assuming backend handles pagination via page and limit query params

    if (!usersData || usersData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm border border-gray-100">
                 <p className="text-gray-500 font-medium">No customers found.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-semibold border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Phone</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {usersData.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {user.first_name} {user.last_name}
                                </td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.phone || "N/A"}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        user.isVerified 
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                    }`}>
                                        {user.isVerified ? "Verified" : "Pending"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <Link 
                                        href={`/dashboard/property-owner/users/${user.id}`}
                                        className="text-primary hover:text-primary-700 font-medium text-xs border border-primary px-3 py-1 rounded-md transition-colors"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination controls */}
            {count > 0 && <div className="p-4 border-t border-gray-100">
                <Pagination count={count} />
            </div>}
        </div>
    );
}
