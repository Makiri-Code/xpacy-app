"use client";
import { useState } from "react";
import AdminServiceList from "./AdminServiceList";
import AdminServiceProvidersList from "./AdminServiceProvidersList";

export default function AdminServicesTabs({ services, serviceProviders }) {
    const [activeTab, setActiveTab] = useState("requests");

    return (
        <div className="flex flex-col gap-6">
            <div className="flex gap-4 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab("requests")}
                    className={`py-2 px-4 font-bold border-b-2 transition-colors cursor-pointer ${activeTab === "requests" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                >
                    Service Requests
                </button>
                <button
                    onClick={() => setActiveTab("providers")}
                    className={`py-2 px-4 font-bold border-b-2 transition-colors cursor-pointer ${activeTab === "providers" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                >
                    Service Providers
                </button>
            </div>

            <div>
                {activeTab === "requests" ? (
                    <AdminServiceList services={services} />
                ) : (
                    <AdminServiceProvidersList providers={serviceProviders} />
                )}
            </div>
        </div>
    );
}
