"use client";

import FormInput from "./FormInput";

export default function ServiceRequestDetails({ service }) {
    if (!service) return <div className="p-8 text-center text-gray-500">Service request not found.</div>;

    const {
        service_type,
        service_status,
        address,
        scheduled_date,
        scheduled_time,
        service_description,
        building_type,
        owner,
        assigned_provider,
        serviceProvider,
        id
    } = service;

 
    return (
        <div className="flex flex-col gap-12 w-[796px] mx-auto pb-12">
            {/* Header */}
            <header className="flex flex-col items-center justify-center gap-4">
                <h2 className="text-3xl font-bold text-primary">Service Request Details</h2>
            </header>

            {/* Content Area */}
            <div className="p-8 flex flex-col gap-10 bg-white rounded-xl shadow-sm ">
                
                {/* 1. Customer Info Section */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6">
                        <div className="flex md:items-center items-start gap-6 flex-col md:flex-row">
                            <FormInput label={"First Name"} id={"firstname"}>
                                <input 
                                    disabled 
                                    value={service.user.firstname}
                                    className="rounded-lg border border-primary-200 bg-gray-50 px-4.5 py-3 focus:outline-none w-full text-gray-700 font-mono" 
                                />
                            </FormInput>
                            
                        </div>
                        <FormInput label={"Email address"} id={"email"}>
                            <input 
                                disabled 
                                value={service.user.email} 
                                className="rounded-lg border border-primary-200 bg-gray-50 px-4.5 py-3 focus:outline-none w-full text-gray-700 font-mono" 
                            />
                        </FormInput>
                        
                    </div>
                </div>


                {/* 2. Service Details Section */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6">
                        <FormInput label={"Service Type"} id={"service_type"}>
                            <input 
                                disabled 
                                value={service_type}
                                className="rounded-lg border border-primary-200 bg-gray-50 px-4.5 py-3 focus:outline-none w-full text-gray-700 font-mono" 
                            />
                        </FormInput>
                        
                        <div className="flex md:items-center items-start gap-6 flex-col md:flex-row">
                            <FormInput label={"Building Type"} id={"building_type"}>
                                <input 
                                    disabled 
                                    value={building_type || "Residential"}
                                    className="rounded-lg border border-primary-200 bg-gray-50 px-4.5 py-3 focus:outline-none w-full text-gray-700 font-mono" 
                                />
                            </FormInput>
                            <FormInput label={"Status"} id={"status"}>
                                <div className="rounded-lg border border-primary-200 bg-gray-50 px-4.5 py-2.5 focus:outline-none w-full">
                                    <span className="capitalize text-sm font-bold px-3 py-1 bg-primary-100 text-primary rounded-full">
                                        {service_status}
                                    </span>
                                </div>
                            </FormInput>
                        </div>

                        <FormInput label={"Property Address"} id={"address"}>
                            <input 
                                disabled 
                                value={address}
                                className="rounded-lg border border-primary-200 bg-gray-50 px-4.5 py-3 focus:outline-none w-full text-gray-700 font-mono" 
                            />
                        </FormInput>

                        <div className="flex md:items-center items-start gap-6 flex-col md:flex-row">
                            <FormInput label={"Scheduled Date"} id={"date"}>
                                <input 
                                    disabled 
                                    value={new Date(scheduled_date).toLocaleDateString()}
                                    className="rounded-lg border border-primary-200 bg-gray-50 px-4.5 py-3 focus:outline-none w-full text-gray-700 font-mono" 
                                />
                            </FormInput>
                            <FormInput label={"Scheduled Time"} id={"time"}>
                                <input 
                                    disabled 
                                    value={scheduled_time || "Not specified"}
                                    className="rounded-lg border border-primary-200 bg-gray-50 px-4.5 py-3 focus:outline-none w-full text-gray-700 font-mono" 
                                />
                            </FormInput>
                        </div>

                        <FormInput label={"Additional Information"} id={"description"}>
                            <textarea 
                                disabled 
                                value={service_description || "No description provided."}
                                className="rounded-lg border border-primary-200 bg-gray-50 px-4.5 py-3 h-32 resize-none focus:outline-none w-full text-gray-700 font-mono"
                            ></textarea>
                        </FormInput>
                    </div>
                </div>

                <div className="border-t border-primary-50"></div>

                {/* 3. Provider Details Section */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6">
                        <FormInput label={"Assigned Provider"} id={"provider"}>
                            <div className="rounded-lg border border-primary-400 bg-primary-50 px-4.5 py-3 focus:outline-none w-full">
                                <span className="font-bold text-primary-900">
                                    {serviceProvider || assigned_provider || "Not Assigned"}
                                </span>
                            </div>
                        </FormInput>
                        <div className="flex md:items-center items-start gap-6 flex-col md:flex-row">
                            <FormInput label={"Provider Email"} id={"provider_email"}>
                                <input 
                                    disabled 
                                    value={"N/A"} 
                                    className="rounded-lg border border-primary-200 bg-gray-50 px-4.5 py-3 focus:outline-none w-full text-gray-700 font-mono" 
                                />
                            </FormInput>
                            <FormInput label={"Provider Phone"} id={"provider_phone"}>
                                <input 
                                    disabled 
                                    value={"N/A"} 
                                    className="rounded-lg border border-primary-200 bg-gray-50 px-4.5 py-3 focus:outline-none w-full text-gray-700 font-mono" 
                                />
                            </FormInput>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
