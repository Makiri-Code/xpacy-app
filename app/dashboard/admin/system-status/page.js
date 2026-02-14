import { cookies } from "next/headers";
import { 
    getBanners, 
    getFeaturedProperties, 
    getFaqs, 
    getProperties, 
    getLatestProperties, 
    getCities, 
    getAllAdmin,
    getAdminProfile,
    getAdminProperties,
    getAdminServices, 
    getAdminPayments,
    getPropertyOwner,
    getPropertyOwnerBookings,
    getPropertyOwnerServices,
    getPropertyOwnerInvoices,
    getPropertyOwnerNotifications
} from "@/app/_lib/data-services";
import DashboardGridItem from "@/app/_components/DashboardGridItems";

async function testEndpoint(name, fn, ...args) {
    const start = Date.now();
    try {
        const result = await fn(...args);
        const duration = Date.now() - start;
        
        const isEmpty = Array.isArray(result) && result.length === 0;
        const isNull = result === null || result === undefined;
        
        // Define failure conditions
        // 404s often return null or empty array with a warning in data-services
        // We consider it an 'issue' if it's null (often actual failure) or if we know it's a missing endpoint
        // You might want to categorize "Empty Array" as separate from "Error", but for "what doesn't work",
        // getting NO data is often the sign.
        
        let status = "Success";
        let isIssue = false;

        if (isNull) {
            status = "Failed";
            isIssue = true;
        }

        return {
            name,
            status,
            duration: `${duration}ms`,
            message: isIssue ? "Endpoint returned null/failed" : isEmpty ? "Returned empty array" : "Data received",
            dataPreview: result ? (JSON.stringify(result).slice(0, 50) + (JSON.stringify(result).length > 50 ? "..." : "")) : "No Data",
            isIssue
        };
    } catch (error) {
        return {
            name,
            status: "Error",
            duration: `${Date.now() - start}ms`,
            message: error.message,
            dataPreview: "Error",
            isIssue: true
        };
    }
}

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    const tests = [
        { name: "Public: Get Banners", fn: getBanners, args: [] },
        { name: "Public: Get Featured Properties", fn: getFeaturedProperties, args: [] },
        { name: "Public: Get FAQs", fn: getFaqs, args: [] },
        { name: "Public: Get Latest Properties", fn: getLatestProperties, args: [] },
        { name: "Public: Get Cities", fn: getCities, args: [] },
        { name: "Admin: Get All Admins", fn: getAllAdmin, args: [token] },
        { name: "Admin: Get Profile", fn: getAdminProfile, args: [token] },
        { name: "Admin: Get Properties", fn: getAdminProperties, args: [token] },
        { name: "Admin: Get Services", fn: getAdminServices, args: [token] },
        { name: "Admin: Get Payments", fn: getAdminPayments, args: [token] },
        { name: "Admin: Get Property Owners", fn: getPropertyOwner, args: [token] },
        { name: "Prop Owner: Bookings", fn: getPropertyOwnerBookings, args: [token] },
        { name: "Prop Owner: Services", fn: getPropertyOwnerServices, args: [token] },
        { name: "Prop Owner: Invoices", fn: getPropertyOwnerInvoices, args: [token] },
        { name: "Prop Owner: Notifications", fn: getPropertyOwnerNotifications, args: [token] },
    ];

    const results = await Promise.all(tests.map(test => testEndpoint(test.name, test.fn, ...test.args)));
    
    const operational = results.filter(r => !r.isIssue);
    const issues = results.filter(r => r.isIssue);

    return (
        <div className="p-6">
            <h1 className="lg:text-4xl text-[28px] text-primary font-bold capitalize mb-8">System Status</h1>
            
            <div className="flex flex-col gap-8">
                {issues.length > 0 && (
                    <DashboardGridItem title={`Issues Detected (${issues.length})`}>
                         <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs uppercase bg-red-50 text-red-700">
                                    <tr>
                                        <th className="px-6 py-3">Endpoint Name</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3">Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {issues.map((result, index) => (
                                        <tr key={index} className="bg-white border-b hover:bg-red-50">
                                            <td className="px-6 py-4 font-medium text-red-900">{result.name}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
                                                    {result.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-red-700">{result.message}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </DashboardGridItem>
                )}

                <DashboardGridItem title={`Operational Endpoints (${operational.length})`}>
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3">Endpoint Name</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Duration</th>
                                    <th className="px-6 py-3">Data Preview</th>
                                </tr>
                            </thead>
                            <tbody>
                                {operational.map((result, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{result.name}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                                                {result.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{result.duration}</td>
                                        <td className="px-6 py-4 font-mono text-xs truncate max-w-xs">{result.dataPreview}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </DashboardGridItem>
            </div>
        </div>
    );
}
