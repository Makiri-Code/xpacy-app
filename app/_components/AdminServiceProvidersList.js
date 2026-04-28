"use client";
import DataTable from "./DataTable";
import StatusChips from "./StatusChips";
import UserOptionsMenu from "./UserOptionsMenu";
import Image from "next/image";

const headings = [
    { heading: "Provider Name" },
    { heading: "Contact Info" },
    { heading: "Service Type" },
    {heading: "Location"},
    { heading: "Completed Services", center: true },
    { heading: "" }
];

export default function AdminServiceProvidersList({ providers = [] }) {
    const renderRow = (provider) => (
        <tr key={provider._id || provider.id} className="text-neutrals-900 text-sm font-mono border-b border-primary-100 hover:bg-gray-50 transition-colors last:border-0">
            <td className="p-4">
                <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 relative shrink-0">
                        <Image src={provider.display_picture ? `https://app.xpacy.com/src/upload/display_img/${provider.display_picture}` : "/avatar.png"} alt="provider-photo" className="object-cover rounded-full" unoptimized fill />
                    </div>
                    <div className="flex flex-col">
                        <span className="truncate font-semibold">{provider.company_name || provider.provider_name || provider.name || provider.firstname || "N/A"} {(!provider.company_name && !provider.business_name && !provider.name) ? provider.lastname : ""}</span>
                        </div>
                </div>
            </td>
            <td className="p-4">
                <span className="text-gray-500 text-xs">{provider.email}</span><br/>
                <span className="text-gray-500 text-[10px]">{provider.phone || "N/A"}</span>
            </td>
            <td className="p-4">
                <span className="text-gray-900 capitalize">{provider.service_type || provider.specialization || provider.category || "N/A"}</span>
            </td>
            <td className="p-4 ">
                <span className="text-gray-900 font-bold text-sm">{provider.city}</span><br/>
                <span className="text-gray-900 font-bold text-xs">{provider.address}</span>
            </td>
            <td className="p-4 text-center">
                <div className="flex justify-center capitalize">
                <span className="text-gray-900 font-bold text-base">{provider.completed_services || provider.completed_jobs || provider.jobs_completed || 0}</span>
                </div>
            </td>
            <td className="p-4 relative text-center">
                <div className="flex justify-center">
                    <UserOptionsMenu id={provider._id || provider.id} role={provider?.user_role || "provider"} /> 
                </div>
            </td>
        </tr>
    );

    const renderMobileCard = (provider) => (
        <div key={provider._id || provider.id} className="flex flex-col gap-4 p-4 border-b border-primary-100 bg-white last:border-0">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                     <div className="w-12 h-12 relative shrink-0">
                        <Image src={provider.display_picture ? `https://app.xpacy.com/src/upload/display_img/${provider.display_picture}` : "/avatar.png"} alt="provider-photo" className="object-cover rounded-full" unoptimized fill />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-bold text-sm text-neutrals-900 truncate">{provider.company_name || provider.business_name || provider.name || provider.firstname || "N/A"} {(!provider.company_name && !provider.business_name && !provider.name) ? provider.lastname : ""}</h3>
                        <p className="text-xs text-gray-500">{provider.email}</p>
                        <p className="text-[10px] text-gray-400">{provider.phone || "N/A"}</p>
                    </div>
                </div>
                <UserOptionsMenu id={provider._id || provider.id} role={provider?.user_role || "provider"} />
            </div>
            
            <div className="flex flex-col gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-gray-500 uppercase">Contact Name:</span>
                    <span className="font-medium text-gray-900">{provider.user?.name || provider.name || provider.firstname || provider.first_name || "N/A"} {provider.lastname || provider.last_name || ""}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-gray-500 uppercase">Service Type:</span>
                    <span className="font-medium text-gray-900 capitalize">{provider.service_type || provider.specialization || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-gray-500 uppercase">Completed Services:</span>
                    <span className="font-bold text-gray-900">{provider.completed_services || provider.completed_jobs || provider.jobs_completed || 0}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-gray-500 uppercase">Status:</span>
                    <StatusChips status={provider.status || "active"} />
                </div>
            </div>
        </div>
    );

    return (
        <DataTable
            headers={headings}
            data={providers}
            renderRow={renderRow}
            renderMobileCard={renderMobileCard}
            emptyMessage="No service providers found."
            showPagination={true}
        />
    );
}
