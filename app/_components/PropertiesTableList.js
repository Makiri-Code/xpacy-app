"use client";
import Pagination from "./Pagination";
import Link from "next/link";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

export default function PropertiesTableList({ properties, count }) {
    const searchParams = useSearchParams();
    
    if (!properties || properties.length === 0) {
         return (
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm border border-gray-100">
                 <p className="text-gray-500 font-medium">No properties found. Add your first property!</p>
                 <Link href="/dashboard/property-owner/properties/add" className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
                    Add Property
                 </Link>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-semibold border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4">Property Name</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {properties.map((property) => (
                            <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {property.property_name}
                                </td>
                                <td className="px-6 py-4">{property.city}, {property.state}</td>
                                <td className="px-6 py-4">{property.property_type}</td>
                                <td className="px-6 py-4 font-mono">
                                    ₦{property.property_price?.toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        property.availability_status === 'Available'
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                    }`}>
                                        {property.availability_status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex items-center justify-center gap-3">
                                    <Link href={`/property/${property.id}`} target="_blank" className="text-gray-500 hover:text-primary transition" title="View Public Page">
                                        <FaEye />
                                    </Link>
                                    <Link href={`/dashboard/property-owner/properties/${property.id}/edit`} className="text-blue-500 hover:text-blue-700 transition" title="Edit">
                                        <FaEdit />
                                    </Link>
                                    {/* Delete action would typically open a modal */}
                                    <button className="text-red-500 hover:text-red-700 transition" title="Delete">
                                        <FaTrash />
                                    </button>
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
