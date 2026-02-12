
import Image from "next/image";
import EmptyState from "@/app/_components/EmptyState";
import { Fragment } from "react";
import { Mail, Phone, User } from "lucide-react";

export default function CustomersTableList({ customers }) {
    if (!customers?.length) return <EmptyState message={"You don't have any customers yet."} />

    return (
        <div className="flex flex-col p-6 gap-4 lg:gap-6 border border-primary-200 bg-white rounded-lg shadow-sm">
            <header className="flex items-center justify-between relative border-b border-gray-100 pb-4">
                <h2 className="text-base lg:text-lg font-bold text-gray-800">My Customers</h2>
            </header>
            <section className="lg:py-2">
                {/* Table Header */}
                <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1fr] text-gray-500 text-sm font-medium border-b border-gray-100 pb-4">
                    <p className="pl-4">Customer Name</p>
                    <p>Email</p>
                    <p>Phone</p>
                    <p className="text-center">Status</p>
                </div>
                {/* Body */}
                <div className="space-y-4 lg:space-y-0">
                    {customers.map((customer, index) => (
                        <Fragment key={customer.id || index}>
                            {/* Desktop Row */}
                            <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1fr] items-center text-gray-700 text-sm border-b border-gray-50 py-4 hover:bg-gray-50 transition-colors">
                                <div className="pl-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                        {customer.image ? (
                                            <Image 
                                                src={customer.image} 
                                                alt={customer.name || "Customer"} 
                                                className="object-cover rounded-full" 
                                                width={40} 
                                                height={40}
                                                unoptimized
                                            />
                                        ) : (
                                            <User size={20} />
                                        )}
                                    </div>
                                    <div className="font-medium text-gray-900">
                                        {customer.firstname} {customer.lastname}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail size={14} className="text-gray-400" />
                                    <span className="truncate">{customer.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={14} className="text-gray-400" />
                                    <span>{customer.phone || 'N/A'}</span>
                                </div>
                                <div className="flex justify-center">
                                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 capitalize">
                                        Active
                                    </span>
                                </div>
                            </div>

                            {/* Mobile Card */}
                            <div className="lg:hidden bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                        {customer.image ? (
                                             <Image 
                                                src={customer.image} 
                                                alt={customer.name || "Customer"} 
                                                className="object-cover rounded-full" 
                                                width={48} 
                                                height={48}
                                                unoptimized
                                            />
                                        ) : (
                                            <User size={24} />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{customer.firstname} {customer.lastname}</h3>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2 mt-4 pt-4 border-t border-gray-50 text-sm">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Mail size={16} />
                                        <span>{customer.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Phone size={16} />
                                        <span>{customer.phone || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    ))}
                </div>
            </section>
        </div>
    )
}
