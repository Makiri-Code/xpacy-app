"use client";

import { useEffect, useState, useTransition } from "react";
import ProgressBar from "./ProgressBar";
import SearchPropertyOwner from "./SearchPropertyOwner";
import FormInput from "./FormInput";
import { useForm } from "react-hook-form";

import { FaAngleLeft, FaAngleRight, FaNairaSign } from "react-icons/fa6";
import SelectAmeneties from "./SelectAmeneties";
import DragnDrop from './DragnDrop';
import CustomToogle from "./CustomToogle";
import axios from "axios";
import SpinnerMini from "./SpinnerMini";
import { url } from "../_lib/data-services";
import toast from "react-hot-toast";
import { progress } from "../_lib/utils";
import UploadingFileModal from "./UploadingFileModal";
import { useCompressImage } from "../_hooks/useCompressImage";
import { usePathname } from "next/navigation";


// options for property type
const propertyType = [
    {
        id: 1,
        type: "Commercial",
    },
    {
        id: 2,
        type: "Residential",
    },
    {
        id: 3,
        type: "Terrace",
    },
    {
        id: 4,
        type: "Flat/Apartment",
    },
    {
        id: 5,
        type: "Duplex",
    },
    {
        id: 6,
        type: "Semi-detached",
    },
    {
        id: 7,
        type: "Fully-detached",
    },
    {
        id: 9,
        type: "Villa",
    },
];
// Options for availability status
const availabilityStatus = [
    {
        id: 1,
        status: "Available",
    },
    {
        id: 2,
        status: "Unavailable",
    },
    {
        id: 3,
        status: "Sold",
    },
];
const propertyStatus = [
    {
        id: 1,
        status: "Sale",
    },
    {
        id: 2,
        status: "Rent",
    },
    {
        id: 3,
        status: "Lease",
    },
    {
        id: 4,
        status: "Shortlet",
    },
];
const bedroomCounts = [
    {
        id: 1,
        count: 1,
    },
    {
        id: 2,
        count: 2,
    },
    {
        id: 3,
        count: 3,
    },
    {
        id: 4,
        count: 4,
    },
    {
        id: 5,
        count: 5,
    },
    {
        id: 6,
        count: 6,
    },
];
const bathroomCounts = [
    {
        id: 1,
        count: 1,
    },
    {
        id: 2,
        count: 2,
    },
    {
        id: 3,
        count: 3,
    },
    {
        id: 4,
        count: 4,
    },
    {
        id: 5,
        count: 5,
    },
    {
        id: 6,
        count: 6,
    },
];
const toiletCounts = [
    {
        id: 1,
        count: 1,
    },
    {
        id: 2,
        count: 2,
    },
    {
        id: 3,
        count: 3,
    },
    {
        id: 4,
        count: 4,
    },
    {
        id: 5,
        count: 5,
    },
    {
        id: 6,
        count: 6,
    },
];
const parkingAreaCount = [
    {
        id: 1,
        count: "Fit 1 car",
    },
    {
        id: 2,
        count: "Fit 2 cars",
    },
    {
        id: 3,
        count: "Fit 3 cars",
    },
    {
        id: 4,
        count: "Fit 4 cars",
    },
    {
        id: 5,
        count: "Fit 5 cars",
    },
];
import AdminUsersList from "./AdminUsersList";
import PropertyOwnerServicesTable from "./PropertyOwnerServicesTable";
import PaymentsTableList from "./PaymentsTableList";

// ... (keep previous options)

const ViewPropertyForm = ({ 
    allOwners, 
    allCities, 
    token, 
    preSelectedOwner, 
    initialData, 
    isEditMode = false,
    propertyOwnerInfo = null, 
    disableSearch, 
    propertyObj = {},
    isReadOnly = true
}) => {
    // Merge props logic
    const effectiveOwner = preSelectedOwner || propertyOwnerInfo || null;
    const effectiveData = initialData || (Object.keys(propertyObj).length > 0 ? propertyObj : null) || {};

    const [activeStep, setActiveStep] = useState(1);
    const [propertyOwner, setPropertyOwner] = useState(() => effectiveOwner);
    const [propertyAmenities, setPropertyAmenities] = useState(() => effectiveData?.property_amenities || []);
    const [files, setFiles] = useState(() => effectiveData?.images || []); 
    const { files: selectedFiles } = useCompressImage(files, setFiles);
    const [isFeatured, setIsFeatured] = useState(() => effectiveData?.isFeatured || effectiveData?.is_featured || false);
    const [isPending, setIsPending] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [uploadingProgress, setUploadingProgress] = useState(0);
    const [estimatedTime, setEstimatedTime] = useState(0);
    const controller = new AbortController();

    const { register, handleSubmit, formState: { errors }, reset, getValues, setValue } = useForm({
        defaultValues: {
            firstname: propertyOwner?.first_name,
            lastname: propertyOwner?.last_name,
            email: propertyOwner?.email,
            phone: propertyOwner?.phone || "",
            owner_address: propertyOwner?.address || "",
            property_name: effectiveData?.property_name || "",
            address: effectiveData?.address || "",
            state: effectiveData?.state || "",
            city: effectiveData?.city || "",
            property_type: effectiveData?.property_type || "",
            availability_status: effectiveData?.availability_status || "",
            property_price: effectiveData?.property_price || "",
            reserve_amount: effectiveData?.reserve_amount || "",
            property_status: effectiveData?.property_status || "",
            description: effectiveData?.description || "",
            total_bedrooms: effectiveData?.total_bedrooms || "",
            total_bathrooms: effectiveData?.total_bathrooms || "",
            total_toilets: effectiveData?.total_toilets || "",
            parking_area: effectiveData?.parking_area || "",
            property_square_area: effectiveData?.property_square_area || "",
            land_area: effectiveData?.land_area || "",
            virtual_tour_url: effectiveData?.virtual_tour_url || "",
            lat: effectiveData?.lat || "",
            long: effectiveData?.long || "",
        }
    });

    const onSubmit = (data) => {
        // ... (existing onSubmit logic)
    }

    // ... (existing submitForm, useEffects)

    const pathname = usePathname();

    return (
        <div className="flex flex-col gap-12 w-[840px] mx-auto pb-12">
            {/* Header */}
            <header className="flex flex-col items-center justify-center gap-4">
                <h2 className="text-3xl font-bold text-primary">
                    {
                        pathname.includes("property-details") || pathname.includes("/dashboard/property-owner/properties/") && !pathname.includes("/add") ? "Property Details" : 
                        pathname.includes("edit-property") || isEditMode ? "Edit Property" : 
                        "Add New Property"
                    }
                </h2>
                {pathname.includes("property-details") || (pathname.includes("/dashboard/property-owner/properties/") && !pathname.includes("/add")) || isEditMode ? null : <p className="font-mono text-center">Fill in the correct detailed information for the new property.</p>}
            </header>

            <ProgressBar activeStep={activeStep} setActiveStep={setActiveStep} />

            <form className="p-6 flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
                {/* 1. Overview (Owner Info + Property Overview) */}
                {activeStep === 1 && (
                    <div className="flex flex-col gap-8">
                        <section className="flex flex-col gap-6">
                            <h3 className="text-xl font-bold font-mono text-primary pb-2 border-b border-primary-100">Owner Information</h3>
                            <SearchPropertyOwner disabled={disableSearch || isReadOnly} propertyOwner={propertyOwner} setPropertyOwner={setPropertyOwner} allOwners={allOwners} />
                            <div className="flex flex-col gap-6">
                                <div className="flex md:items-center items-start gap-6 flex-col md:flex-row">
                                    <FormInput label={"First Name"} id={"firstname"} >
                                        <input disabled {...register("firstname", { required: "Required" })} type={"text"} className={`rounded-lg border bg-[#FCFEFF] px-4.5 py-3 focus:outline-none ${errors.firstname ? "border-error" : "border-primary-200"}`} />
                                    </FormInput>
                                    <FormInput label={"Last Name"} id={"lastname"} >
                                        <input disabled {...register("lastname", { required: "Required" })} type={"text"} className={`rounded-lg border bg-[#FCFEFF] px-4.5 py-3 focus:outline-none ${errors.lastname ? "border-error" : "border-primary-200"}`} />
                                    </FormInput>
                                </div>
                                <FormInput label={"Email address"} id={"email"} >
                                    <input disabled {...register("email", { required: "Required" })} type={"email"} className={`rounded-lg border bg-[#FCFEFF] px-4.5 py-3 focus:outline-none ${errors.email ? "border-error" : "border-primary-200"}`} />
                                </FormInput>
                            </div>
                        </section>

                        <section className="flex flex-col gap-6">
                            <h3 className="text-xl font-bold font-mono text-primary pb-2 border-b border-primary-100">Property Overview</h3>
                            <div className="flex flex-col gap-6">
                                <FormInput label={"Property Name"} id={"property_name"} >
                                    <input disabled={isReadOnly} {...register("property_name", { required: "Required" })} type={"text"} className={`rounded-lg border bg-[#FCFEFF] px-4.5 py-3 focus:outline-none ${errors.property_name ? "border-error" : "border-primary-200"}`} />
                                </FormInput>
                                <FormInput label={"Property Address"} id={"address"} >
                                    <input disabled={isReadOnly} {...register("address", { required: "Required" })} type={"text"} className={`rounded-lg border bg-[#FCFEFF] px-4.5 py-3 focus:outline-none ${errors.address ? "border-error" : "border-primary-200"}`} />
                                </FormInput>
                                <div className="flex md:items-center items-start gap-6 flex-col md:flex-row">
                                    <FormInput label={"State"} id={"state"} >
                                        <input disabled={isReadOnly} {...register("state", { required: "Required" })} type="text" placeholder="State" className={`rounded-lg border bg-[#FCFEFF] px-4.5 py-3 focus:outline-none border-primary-200 w-full`} />
                                    </FormInput>
                                    <FormInput label={"City/Town"} id={"city"} >
                                        <input disabled={isReadOnly} {...register("city", { required: "Required" })} type={"text"} className={`rounded-lg border bg-[#FCFEFF] px-4.5 py-3 focus:outline-none border-primary-200`} />
                                    </FormInput>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {/* 2. Property Info */}
                {activeStep === 2 && (
                    <section className="flex flex-col gap-6">
                        <h3 className="text-xl font-bold font-mono text-primary pb-2 border-b border-primary-100">Property Details</h3>
                        <div className="flex flex-col gap-6">
                            <div className="flex md:items-center items-start gap-6 flex-col md:flex-row">
                                <FormInput label={"Property Type"} id={"property_type"} >
                                    <input disabled={isReadOnly} {...register("property_type", { required: "Required" })} type="text" placeholder="Property Type" className={`rounded-lg border bg-[#FCFEFF] px-4.5 py-3 focus:outline-none border-primary-200 w-full`} />
                                </FormInput>
                                <FormInput label={"Property Status"} id={"property_status"} >
                                    <input disabled={isReadOnly} {...register("property_status", { required: "Required" })} type="text" placeholder="Property Status" className={`rounded-lg border bg-[#FCFEFF] px-4.5 py-3 focus:outline-none border-primary-200 w-full`} />
                                </FormInput>
                            </div>
                            <div className="flex md:items-center items-start gap-6 flex-col md:flex-row">
                                <FormInput label={"Property Price"} id={"property_price"} >
                                    <div className={`flex items-center gap-2 rounded-lg border bg-[#FCFEFF] px-4.5 py-3 focus:outline-none border-primary-200 w-full`}>
                                        <span><FaNairaSign className="text-gray-500" /></span>
                                        <input disabled={isReadOnly} {...register("property_price")} type="text" placeholder="Price" className={`focus:outline-none flex-1 bg-transparent`} />
                                    </div>
                                </FormInput>
                                <FormInput label={"Reserve Amount"} id={"reserve_amount"} >
                                    <div className={`flex items-center gap-2 rounded-lg border bg-[#FCFEFF] px-4.5 py-3 focus:outline-none border-primary-200 w-full`}>
                                        <span><FaNairaSign className="text-gray-500" /></span>
                                        <input disabled={isReadOnly} {...register("reserve_amount")} type="text" placeholder="Reserve Amount" className={`focus:outline-none flex-1 bg-transparent`} />
                                    </div>
                                </FormInput>
                            </div>
                            <div className="flex md:items-center items-start gap-6 flex-col md:flex-row">
                                <FormInput label={"Views"} id={"views"} >
                                    <input disabled={true} value={effectiveData?.views || 0} type={"number"} name={"views"} id={"views"} placeholder={"0"} className={`rounded-lg border bg-[#FCFEFF] px-4.5 py-3 focus:outline-none border-primary-200 w-full`} />
                                </FormInput>
                                <div className="flex items-center justify-between font-mono w-full px-4 border border-primary-200 bg-[#FCFEFF] rounded-lg py-3 mt-6">
                                    <span className="text-gray-500 font-medium">Featured Property</span>
                                    <CustomToogle disabled={true} checked={isFeatured} onChange={() => {}} />
                                </div>
                            </div>
                            <div className="flex md:items-center items-start gap-6 flex-col md:flex-row">
                                <FormInput label={"Bedrooms"} id={"total_bedrooms"} >
                                    <input disabled={isReadOnly} {...register("total_bedrooms")} type="text" placeholder="Bedrooms" className={`rounded-lg border bg-[#FCFEFF] px-4.5 py-3 focus:outline-none border-primary-200 w-full`} />
                                </FormInput>
                                <FormInput label={"Bathrooms"} id={"total_bathrooms"} >
                                    <input disabled={isReadOnly} {...register("total_bathrooms")} type="text" placeholder="Bathrooms" className={`rounded-lg border bg-[#FCFEFF] px-4.5 py-3 focus:outline-none border-primary-200 w-full`} />
                                </FormInput>
                            </div>
                            <div className="flex md:items-center items-start gap-6 flex-col md:flex-row">
                                <FormInput label={"Property size (sqm)"} id={"property_square_area"} >
                                    <div className={`flex items-center gap-2 rounded-lg border bg-[#FCFEFF] px-4.5 py-3 focus:outline-none border-primary-200`}>
                                        <input disabled={isReadOnly}  {...register("property_square_area")} type={"number"} name={"property_square_area"} id={"property_square_area"} placeholder={"e.g. 500"} className={`focus:outline-none flex-1`} />
                                        <span className="text-gray-400">sqm</span>
                                    </div>
                                </FormInput>
                                <FormInput label={"Land area (sqm)"} id={"land_area"} >
                                    <div className={`flex items-center gap-2 rounded-lg border bg-[#FCFEFF] px-4.5 py-3 focus:outline-none border-primary-200`}>
                                        <input disabled={isReadOnly}  {...register("land_area")} type={"number"} name={"land_area"} id={"land_area"} placeholder={"e.g. 1000"} className={`focus:outline-none flex-1`} />
                                        <span className="text-gray-400">sqm</span>
                                    </div>
                                </FormInput>
                            </div>
                            <SelectAmeneties readOnly={isReadOnly} propertyAmenities={propertyAmenities} setPropertyAmenities={setPropertyAmenities} />
                        </div>
                    </section>
                )}

                {/* 3. Media */}
                {activeStep === 3 && (
                    <section className="flex flex-col gap-6">
                        <h3 className="text-xl font-bold font-mono text-primary capitalize">Media</h3>
                        <div className="space-y-4">
                            <p className="font-mono font-semibold text-gray-700"> Photos</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {files.map((file, index) => (
                                        <div key={index} className="aspect-image relative rounded-lg overflow-hidden  ">
                                            <img src={`https://app.xpacy.com/src/upload/properties/${file}`} alt={`Property Image ${index + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                    {effectiveData?.virtual_tour_url && (
                                        <div className="aspect-video relative rounded-lg overflow-hidden border border-primary-200 bg-primary-50 flex flex-col items-center justify-center p-4 text-center">
                                            <p className="text-primary font-bold text-xs mb-2">Virtual Tour</p>
                                            <a href={effectiveData.virtual_tour_url} target="_blank" className="bg-primary text-white text-xs px-4 py-2 rounded-lg">Watch Video</a>
                                        </div>
                                    )}
                                </div>
                        </div>
                        <FormInput label={"Virtual Tour URL"} id={"virtual_tour_url"} >
                            <input {...register("virtual_tour_url")} type={"text"} disabled={isReadOnly} placeholder={"e.g. https://youtube.com/..."} className={`rounded-lg border bg-[#FCFEFF] px-4.5 py-3 focus:outline-none border-primary-200`} />
                        </FormInput>
                    </section>
                )}

                {/* 4. Tenant Info */}
                {activeStep === 4 && (
                    <section className="flex flex-col gap-6">
                        <h3 className="text-xl font-bold font-mono text-primary pb-2 border-b border-primary-100">Tenant Information</h3>
                        <AdminUsersList 
                            users={(effectiveData?.bookings || effectiveData?.transactions || []).map(b => ({
                                id: b.id || b._id,
                                first_name: b.user?.firstname || b.user?.first_name || "Unknown",
                                last_name: b.user?.lastname || b.user?.last_name || "",
                                email: b.user?.email || "N/A",
                                phone: b.user?.phone || "N/A",
                                user_type: b.user?.role || b.user?.user_type || "Tenant",
                                display_picture: b.user?.display_picture || b.user?.profile_picture || "",
                                property_name: b.property?.property_name || effectiveData?.property_name || "N/A",
                                start_date: b.start_date || b.createdAt ? new Date(b.start_date || b.createdAt).toLocaleDateString() : "N/A",
                                end_date: b.end_date ? new Date(b.end_date).toLocaleDateString() : "N/A",
                                price: b.amount || b.property?.property_price ? `₦${Number(b.amount || b.property?.property_price).toLocaleString()}` : "N/A"
                            }))} 
                            variant="tenant" 
                            title="Property Tenants" 
                        />
                    </section>
                )}

                {/* 5. Service Request */}
                {activeStep === 5 && (
                    <section className="flex flex-col gap-6">
                        <h3 className="text-xl font-bold font-mono text-primary pb-2 border-b border-primary-100">Service Requests</h3>
                        <PropertyOwnerServicesTable services={effectiveData?.services || []} showFilters={false} />
                    </section>
                )}

                {/* 6. Transaction History */}
                {activeStep === 6 && (
                    <section className="flex flex-col gap-6">
                        <h3 className="text-xl font-bold font-mono text-primary pb-2 border-b border-primary-100">Transaction History</h3>
                        <PaymentsTableList bookings={effectiveData?.transactions || effectiveData?.bookings || []} />
                    </section>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <button 
                        type="button" 
                        disabled={activeStep === 1}
                        onClick={() => setActiveStep(prev => prev > 1 ? prev - 1 : 1)} 
                        className={`px-6 py-2.5 font-mono font-bold text-primary rounded-lg hover:bg-primary-50 transition flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed`}
                    >
                        <FaAngleLeft /><span>Previous</span>
                    </button>
                    
                    {activeStep < 6 ? (
                        <button 
                            type="button" 
                            onClick={() => setActiveStep(prev => prev + 1)} 
                            className={`px-6 py-2.5 font-mono font-bold text-primary rounded-lg  hover:bg-primary-50 transition flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed`}
                        >
                            <span>Next</span><FaAngleRight />
                        </button>
                    ) : (
                        !isReadOnly && (
                            <button 
                                disabled={isPending}
                                type="submit" 
                                className="bg-primary text-white px-10 py-2.5 rounded-lg font-mono font-bold hover:bg-primary-700 transition shadow-lg flex items-center gap-2"
                            >
                                {isPending && <SpinnerMini />}
                                <span>{isEditMode ? "Save Changes" : "Create Property"}</span>
                            </button>
                        )
                    )}
                </div>
            </form>
        </div>
    );
};

export default ViewPropertyForm;