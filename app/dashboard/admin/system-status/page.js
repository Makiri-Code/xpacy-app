import { cookies } from "next/headers";
import { url } from "@/app/_lib/data-services";
import DashboardGridItem from "@/app/_components/DashboardGridItems";

async function checkEndpoint(name, path, method = "GET", token = null, body = null) {
    const start = Date.now();
    try {
        const headers = {
            "Content-Type": "application/json",
        };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const options = {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
            cache: "no-store", // Ensure fresh check
        };

        const response = await fetch(`${url}${path}`, options);
        const duration = Date.now() - start;
        let dataPreview = "";

        try {
            const data = await response.json();
            dataPreview = JSON.stringify(data).slice(0, 100) + (JSON.stringify(data).length > 100 ? "..." : "");
        } catch (e) {
            dataPreview = `Non-JSON response (${response.statusText})`;
        }

        return {
            name,
            path,
            method,
            status: response.status,
            statusText: response.statusText || (response.status === 200 ? "OK" : "Error"),
            duration,
            isHealthy: response.ok,
            dataPreview,
        };
    } catch (error) {
        return {
            name,
            path,
            method,
            status: 0, // Network error
            statusText: error.message,
            duration: Date.now() - start,
            isHealthy: false,
            dataPreview: "Network Error",
        };
    }
}

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const endpoints = [
        // --- Public Endpoints ---
        { category: "Public", name: "Get Banners", path: "/settings/homepage-sliders" },
        { category: "Public", name: "Get Featured Properties", path: "/property/fetch-featured-properties" },
        { category: "Public", name: "Get FAQs", path: "/settings/fetch-faq" },
        { category: "Public", name: "Get Latest Properties", path: "/property/latest-property" },
        { category: "Public", name: "Get Cities", path: "/settings/fetch-cities" },
        { category: "Public", name: "Referral Leaderboard", path: "/referral/leaderboard" },
        { category: "Public", name: "Booking Slots", path: "/booking/fetch-slots" },
        { category: "Public", name: "All Service Providers", path: "/service-provider/all-service-providers" },

        // --- Admin Endpoints ---
        { category: "Admin", name: "Get All Admins", path: "/admin/fetch-admin", token },
        { category: "Admin", name: "Get Profile", path: "/admin/fetch-admin-profile", token },
        { category: "Admin", name: "Get Properties", path: "/admin/fetch-all-propreties", token }, // Note typo in path
        { category: "Admin", name: "Get Services", path: "/service/fetch-services", token },
        { category: "Admin", name: "Get Payments (Known Issue)", path: "/admin/fetch-payments", token },
        { category: "Admin", name: "Get Users (Known Issue)", path: "/admin/fetch-users", token },
        { category: "Admin", name: "Get Property Owners (Known Issue)", path: "/admin/property-owner/fetch-propertowner", token },
        { category: "Admin", name: "Service Providers", path: "/admin/service-providers", token },

        // --- Property Owner Endpoints ---
        // Note: Using Admin token here might result in 401/403 if roles are strict, but good for connectivity check
        { category: "Property Owner", name: "Get Properties", path: "/property-owner/fetch-properties", token },
        { category: "Property Owner", name: "Get Services", path: "/property-owner/fetch-services", token },
        { category: "Property Owner", name: "Get Bookings (Known Issue)", path: "/property-owner/fetch-bookings", token },
        { category: "Property Owner", name: "Get Invoices (Known Issue)", path: "/property-owner/fetch-invoices", token },
        { category: "Property Owner", name: "Get Notifications (Known Issue)", path: "/property-owner/fetch-notifications", token },
        { category: "Property Owner", name: "Get Profile", path: "/property-owner/fetch-profile", token },
    ];

    const results = await Promise.all(
        endpoints.map(ep => checkEndpoint(ep.name, ep.path, "GET", ep.token))
    );

    const total = results.length;
    const healthy = results.filter(r => r.isHealthy).length;
    const unhealthy = total - healthy;

    // Grouping for UI
    const groupedResults = results.reduce((acc, curr) => {
        const category = endpoints.find(e => e.name === curr.name)?.category || "Other";
        if (!acc[category]) acc[category] = [];
        acc[category].push(curr);
        return acc;
    }, {});

    return (
        <div className="p-6 space-y-8">
            <header>
                <h1 className="lg:text-4xl text-[28px] text-primary font-bold capitalize mb-2">System Status Console</h1>
                <p className="font-mono text-gray-500">Live API Health Check • Base URL: <span className="p-1 bg-gray-100 rounded text-black">{url}</span></p>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <h3 className="text-gray-500 font-mono text-sm uppercase">Total Endpoints</h3>
                    <p className="text-3xl font-bold mt-2">{total}</p>
                </div>
                <div className="p-6 rounded-xl border border-green-100 bg-green-50/30 shadow-sm">
                    <h3 className="text-green-600 font-mono text-sm uppercase">Healthy (200 OK)</h3>
                    <p className="text-3xl font-bold mt-2 text-green-700">{healthy}</p>
                </div>
                 <div className="p-6 rounded-xl border border-red-100 bg-red-50/30 shadow-sm">
                    <h3 className="text-red-600 font-mono text-sm uppercase">Issues (4xx / 5xx)</h3>
                    <p className="text-3xl font-bold mt-2 text-red-700">{unhealthy}</p>
                </div>
            </div>

            {/* Detailed Tables */}
            {Object.entries(groupedResults).map(([category, items]) => (
                <div key={category} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
                        <h2 className="font-bold text-lg text-gray-800">{category} Endpoints</h2>
                         <span className={`text-xs px-2 py-1 rounded-full ${items.some(i => !i.isHealthy) ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                            {items.some(i => !i.isHealthy) ? "Has Issues" : "All Operational"}
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b">
                                <tr>
                                    <th className="px-6 py-3">Endpoint</th>
                                    <th className="px-6 py-3">Path</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Duration</th>
                                    <th className="px-6 py-3">Response Preview</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {items.map((result, idx) => (
                                    <tr key={idx} className={`hover:bg-gray-50/50 transition-colors ${!result.isHealthy ? "bg-red-50/10" : ""}`}>
                                        <td className="px-6 py-4 font-medium text-gray-900">{result.name}</td>
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500">{result.path}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                                                result.isHealthy 
                                                ? "bg-green-100 text-green-800 border-green-200" 
                                                : "bg-red-100 text-red-800 border-red-200"
                                            }`}>
                                                {result.status} {result.statusText}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 font-mono text-xs ${result.duration > 500 ? "text-amber-600 font-bold" : "text-gray-500"}`}>
                                            {result.duration}ms
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="max-w-xs truncate text-xs font-mono text-gray-500" title={result.dataPreview}>
                                                {result.dataPreview}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
}
