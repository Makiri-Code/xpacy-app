"use client";
import Image from "next/image";
import { useState } from "react";
import DashboardGridItem from "./DashboardGridItems";
import TableHead from "./TableHeader";
import StatusChips from "./StatusChips";
import UserOptionsMenu from "./UserOptionsMenu";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const defaultHeadings = [
    { heading: "Name" },
    { heading: "Contact Details" },
    { heading: "User Status", center: true },
    { heading: "" }
];

const registeredHeadings = [
    { heading: "Name" },
    { heading: "Contact Details" },
    { heading: "User Status", center: true },
    { heading: "KYC Status", center: true },
    { heading: "" }
];

const tenantHeadings = [
    { heading: "Name" },
    { heading: "Property" },
    { heading: "User Type", center: true },
    { heading: "Rent Status", center: true },
    { heading: "Due Date", center: true },
    { heading: "Current Price", center: true },
    { heading: "" }
];

export default function AdminUsersList({ users, title = "All Users List", variant = "default" }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    let headings = defaultHeadings;

    if (variant === 'tenant') {
        headings = tenantHeadings;
    } else if (variant === 'registered') {
        headings = registeredHeadings;
    }

    // Pagination Logic
    const totalPages = Math.ceil((users?.length || 0) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsers = users?.slice(startIndex, startIndex + itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    return (
        <DashboardGridItem title={title}>
            {/* Desktop View */}
            <div className="hidden lg:block bg-white border border-primary-100 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-neutrals-900 text-sm font-mono font-bold border-b border-primary-100">
                        <tr>
                            {headings.map((h, i) => (
                                <th key={i} className={`p-4 font-bold ${h.center ? "text-center" : ""}`}>{h.heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers?.map(({ first_name, last_name, email, display_picture, phone, id, role, status = "active", kyc_status }) => (
                            <tr key={id} className="text-neutrals-900 text-sm font-mono border-b border-primary-100 hover:bg-gray-50/50 transition-colors last:border-0">
                                <td className="p-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="w-8 h-8 relative shrink-0">
                                            <Image src={display_picture ? `https://app.xpacy.com/src/upload/display_img/${display_picture}` : "/avatar.png"} alt="user-photo" className="object-cover rounded-full" unoptimized fill />
                                        </div>
                                        <span className="truncate font-semibold">{first_name} {last_name}</span>
                                    </div>
                                </td>

                                {variant === 'tenant' ? (
                                    <>
                                        <td className="p-4">
                                            <div className="flex flex-col justify-center">
                                                <span className="text-gray-500 italic">N/A</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">N/A</span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className="text-gray-500">N/A</span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className="text-gray-500">N/A</span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className="text-gray-500">N/A</span>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="p-4">
                                            <div className="flex flex-col justify-center">
                                                <span>{email}</span>
                                                <span className="text-gray-500 text-xs">{phone || "N/A"}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="flex justify-center capitalize">
                                                <StatusChips status={status} />
                                            </div>
                                        </td>
                                        {variant === 'registered' && (
                                            <td className="p-4 text-center">
                                                <div className="flex justify-center capitalize">
                                                    <StatusChips status={kyc_status || 'N/A'} />
                                                </div>
                                            </td>
                                        )}
                                    </>
                                )}

                                <td className="p-4 relative text-center">
                                    <div className="flex justify-center">
                                         <UserOptionsMenu id={id} role={role} /> 
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="lg:hidden flex flex-col bg-white border border-primary-100 rounded-lg overflow-hidden mt-4">
                {currentUsers?.map(({ first_name, last_name, email, display_picture, phone, id, role, status = "active", kyc_status }) => (
                    <div key={id} className="flex flex-col gap-4 p-4 border-b border-primary-100 bg-white last:border-0">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 relative shrink-0">
                                    <Image src={display_picture ? `https://app.xpacy.com/src/upload/display_img/${display_picture}` : "/avatar.png"} alt="user-photo" className="object-cover rounded-full" unoptimized fill />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-sm text-neutrals-900">{first_name} {last_name}</h3>
                                    {variant !== 'tenant' && <p className="text-xs text-gray-500">{email}</p>}
                                    <span className={`mt-1 inline-block px-2 py-0.5 rounded text-[10px] font-bold capitalize w-fit ${
                                        role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                        role === 'property-owner' ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                        {role?.replace('-', ' ') || 'User'}
                                    </span>
                                </div>
                            </div>
                            <UserOptionsMenu id={id} role={role} />
                        </div>
                        
                        <div className="flex flex-col gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                             {variant === 'tenant' ? (
                                <>
                                    <div className="flex justify-between items-center">
                                        <span>Property:</span>
                                        <span className="font-medium text-gray-900">N/A</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Rent Status:</span>
                                        <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">N/A</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Price:</span>
                                        <span className="font-medium text-gray-900">N/A</span>
                                    </div>
                                </>
                             ) : (
                                <>
                                    <div className="flex justify-between items-center">
                                        <span>Phone:</span>
                                        <span className="font-medium text-gray-900">{phone || "N/A"}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Status:</span>
                                        <StatusChips status={status} />
                                    </div>
                                    {variant === 'registered' && (
                                        <div className="flex justify-between items-center">
                                            <span>KYC Status:</span>
                                            <StatusChips status={kyc_status || 'N/A'} />
                                        </div>
                                    )}
                                </>
                             )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {(!users || users.length === 0) && (
                <div className="p-8 text-center text-gray-500">
                    No users found.
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="p-4 flex items-center justify-end font-mono gap-4 border-t border-primary-100">
                    <button 
                        className="flex gap-1 p-2 cursor-pointer items-center justify-center border border-primary-200 rounded-lg text-sm font-bold text-black hover:bg-primary-200 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400" 
                        disabled={currentPage === 1} 
                        onClick={handlePrevious}
                    >
                        <span><FaAngleLeft /></span>
                        <span>Previous</span>
                    </button>
                    <span className="text-sm font-medium text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button 
                        className="flex gap-1 p-2 cursor-pointer justify-center items-center border border-primary-200 rounded-lg text-sm font-bold text-black hover:bg-primary-200 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400" 
                        onClick={handleNext} 
                        disabled={currentPage === totalPages}
                    >
                        <span>Next</span>
                        <span><FaAngleRight /></span>
                    </button>
                </div>
            )}
        </DashboardGridItem>
    )
}