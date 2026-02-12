import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/app/_lib/utils";
import EmptyState from "@/app/_components/EmptyState";
import { MapPin, Edit, Trash2, Plus, Bed, Bath } from "lucide-react";

export default function PropertiesTableList({ properties, baseUrl = "/dashboard/property-owner/properties", ctaLink = "/dashboard/property-owner/properties/add" }) {
    if (!properties?.length) return <EmptyState message={"No properties found."} cta={"Add Property"} link={ctaLink} />

    return (
        <div className="flex flex-col gap-6">
            <header className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">My Properties</h2>
                <Link href={ctaLink} className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm">
                    <Plus size={18} />
                    Add Property
                </Link>
            </header>

            <div className="flex flex-col gap-4">
                {properties.map((property) => (
                    <div key={property.id || property._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden flex flex-col md:flex-row group">
                        {/* Image Section */}
                        <div className="relative h-48 md:h-auto md:w-72 bg-gray-100 shrink-0">
                             {property.images?.[0] ? (
                                <Image 
                                    src={`https://app.xpacy.com/src/upload/properties/${property.images[0]}`} 
                                    alt={property.property_name} 
                                    className="object-cover transition-transform duration-300 group-hover:scale-105" 
                                    fill 
                                    unoptimized
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No Image</div>
                            )}
                            
                            {/* Status Badge */}
                            <div className="absolute top-3 left-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                                    property.property_status === 'active' ? 'bg-green-500 text-white' : 
                                    property.property_status === 'rented' ? 'bg-blue-500 text-white' :
                                    'bg-gray-500 text-white'
                                }`}>
                                    {property.property_status || 'Draft'}
                                </span>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-5 flex flex-col grow relative">
                             

                            <div className="mb-2">
                                <h3 className="font-bold text-lg text-gray-900 line-clamp-1" title={property.property_name}>
                                    {property.property_name}
                                </h3>
                                <div className="flex items-center text-gray-500 text-sm mt-1">
                                    <MapPin size={16} className="mr-1 shrink-0" />
                                    <span className="truncate">{property.city}, {property.state}</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-6 mb-4 text-sm text-gray-600 mt-2">
                                <div className="flex items-center gap-2">
                                    <Bed size={18} className="text-gray-400" />
                                    <span>{property.total_bedrooms || 0} Beds</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Bath size={18} className="text-gray-400" />
                                    <span>{property.total_bathrooms || 0} Baths</span>
                                </div>
                            </div>

                            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                <div className="flex flex-col gap-3">
                                    <div>
                                        <p className="text-xs text-gray-400 font-mono mb-0.5">PRICE</p>
                                        <p className="text-xl font-bold text-primary">
                                            {formatCurrency(property.property_price)}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link 
                                            href={`${baseUrl}/${property.id || property._id}/edit`} 
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-primary hover:text-white text-gray-600 rounded-md transition-colors text-xs font-semibold border border-gray-200"
                                        >
                                            <Edit size={14} />
                                            Edit
                                        </Link>
                                        <button 
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-red-600 hover:text-white text-gray-600 rounded-md transition-colors text-xs font-semibold border border-gray-200"
                                        >
                                            <Trash2 size={14} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-400 font-mono self-end mb-1">
                                    ID: {String(property.id || property._id || "").substring(0,8)}...
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
