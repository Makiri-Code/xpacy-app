
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/app/_lib/utils";
import EmptyState from "@/app/_components/EmptyState";
import { Fragment } from "react";
import { Edit, Trash2, Eye } from "lucide-react";

export default function PropertiesTableList({ properties, baseUrl = "/dashboard/property-owner/properties", ctaLink = "/dashboard/property-owner/properties/add" }) {
    if (!properties?.length) return <EmptyState message={"No properties found."} cta={"Add Property"} link={ctaLink} />

    return (
        <div className="flex flex-col p-6 gap-4 lg:gap-6 border border-primary-200 bg-white rounded-lg shadow-sm">
            <header className="flex items-center justify-between relative">
                <h2 className="text-base lg:text-lg font-bold text-gray-800">Properties Overview</h2>
                <div className="flex items-center gap-2">
                    <Link href={ctaLink} className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors">
                        Add Property
                    </Link>
                </div>
            </header>
            <section className="lg:py-6 py-4">
                {/* Table Header */}
                <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1fr_0.5fr] text-gray-500 text-sm font-medium border-b border-gray-100 pb-4">
                    <p className="pl-4">Property</p>
                    <p className="text-center">Location</p>
                    <p className="text-center">Price</p>
                    <p className="text-center">Status</p>
                    <p className="text-center">Actions</p>
                </div>
                {/* Body */}
                <div className="space-y-4 lg:space-y-0">
                    {properties.map((property) => (
                        <Fragment key={property.id || property._id}>
                            {/* Desktop Row */}
                            <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1fr_0.5fr] items-center text-gray-700 text-sm border-b border-gray-50 py-4 hover:bg-gray-50 transition-colors">
                                <div className="pl-4 flex items-center gap-3">
                                    <div className="w-16 h-12 relative rounded-md overflow-hidden bg-gray-100">
                                       {property.images?.[0] ? (
                                            <Image 
                                                src={`https://app.xpacy.com/src/upload/properties/${property.images[0]}`} 
                                                alt={property.property_name} 
                                                className="object-cover" 
                                                fill 
                                                unoptimized
                                            />
                                       ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                                       )}
                                    </div>
                                    <div className="font-medium text-gray-900 truncate max-w-[200px]" title={property.property_name}>
                                        {property.property_name}
                                    </div>
                                </div>
                                <div className="text-center truncate px-2">
                                    {property.city}, {property.state}
                                </div>
                                <div className="text-center font-bold">
                                    {formatCurrency(property.property_price)}
                                </div>
                                <div className="flex justify-center">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                                        property.property_status === 'active' ? 'bg-green-100 text-green-700' : 
                                        property.property_status === 'rented' ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                        {property.property_status || 'Draft'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <Link href={`${baseUrl}/${property.id || property._id}/edit`} className="p-1.5 hover:bg-gray-100 rounded-full text-blue-600 transition-colors" title="Edit">
                                        <Edit size={16} />
                                    </Link>
                                    <button className="p-1.5 hover:bg-gray-100 rounded-full text-red-600 transition-colors" title="Delete">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Mobile Card */}
                            <div className="lg:hidden bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-16 h-16 relative rounded-md overflow-hidden bg-gray-100">
                                            {property.images?.[0] && (
                                                <Image 
                                                    src={`https://app.xpacy.com/src/upload/properties/${property.images[0]}`} 
                                                    alt={property.property_name} 
                                                    className="object-cover" 
                                                    fill 
                                                    unoptimized
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 line-clamp-1">{property.property_name}</h3>
                                            <p className="text-xs text-gray-500">{property.city}, {property.state}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                                        property.property_status === 'active' ? 'bg-green-100 text-green-700' : 
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                        {property.property_status || 'Draft'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div className="font-bold text-lg text-primary">
                                        {formatCurrency(property.property_price)}
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href={`${baseUrl}/${property.id || property._id}/edit`} className="p-2 hover:bg-gray-100 rounded-full text-blue-600">
                                            <Edit size={18} />
                                        </Link>
                                        <button className="p-2 hover:bg-gray-100 rounded-full text-red-600">
                                            <Trash2 size={18} />
                                        </button>
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
