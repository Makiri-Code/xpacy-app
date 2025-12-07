import Image from "next/image";
import UserFilterMenu from "./UserFilterMenu";
import { format } from "date-fns";
import OptionsMenu from "./OptionsMenu";
import { formatCurrency } from "../_lib/utils";
import EmptyState from "./EmptyState";
import { Fragment } from "react";


export default function BookingsTableList({ bookings }) {
    if (!bookings.length) return <EmptyState message={"Opps you don't have any bookings yet."} />
    return (
        <div className="flex flex-col p-6 gap-4 lg:gap-6 border border-primary-200 bg-white rounded-lg">
            <header className="flex items-center justify-between relative">
                <h2 className="text-base lg:text-md">Properties Overview</h2>
                <div className="flex items-center gap-2">
                    {/* Sortby */}
                    <div className="lg:flex items-center space-x-2.5 font-mono text-base-500 hidden">
                        <span>Sort by:</span>
                        <select className="p-2.5 border border-neutral-200 rounded-lg">
                            <option>Default</option>
                            <option>Oldest to newest </option>
                            <option>Newest to oldest</option>
                        </select>
                    </div>
                    {/* Filter */}
                    <UserFilterMenu />
                </div>
            </header>
            <section className="lg:py-6 py-4">
                {/* Table Header */}
                <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0.5fr] text-neutrals-900 text-sm font-mono font-bold border-b border-primary-100">
                    <p className="p-4 ">Property Name/Address</p>
                    <p className="p-4 text-center">Payment Status</p>
                    <p className="p-4 text-center">Property Status</p>
                    <p className="p-4 text-center">Start Date</p>
                    <p className="p-4 text-center">Current Price</p>
                    <p className="p-4 text-center"></p>
                </div>
                {/* Body */}
                {
                    bookings?.map((booking) => {
                        return (
                            <Fragment key={booking.id}>
                                {/* For large screens only */}
                                <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0.5fr] text-neutrals-900 text-sm font-mono border-b border-primary-100">
                                    <div className="p-4 flex items-center gap-2 text-sm">
                                        <div className="w-16 h-12 relative">
                                            <Image src={`https://app.xpacy.com/src/upload/properties/${booking?.property.images[0]}`} alt="property-photo" className="object-cover" unoptimized fill />
                                        </div>
                                        <span>{booking?.property?.property_name}, {booking?.property?.city}, {booking?.property?.state} </span>
                                    </div>
                                    <p className="p-4 flex items-center justify-center">
                                        <span className={`bg-error text-secondary-100 w-max  px-1.5 py-1 flex items-center justify-center rounded-full  text-sm font-bold font-mono capitalize`}>{booking?.status}</span>
                                    </p>
                                    <p className="p-4 flex items-center justify-center">
                                        <span className={`bg-[#EBE1CE] text-[#816535]  px-1.5 py-1 flex items-center justify-center rounded-full  text-sm font-bold font-mono`}>{booking?.property?.property_status}</span>
                                    </p>
                                    <p className="p-4 text-center flex items-center justify-center">{format(booking?.start_date, "dd/MM/yy")}</p>
                                    <p className="p-4 font-bold text-center flex items-center justify-center">{formatCurrency(booking?.property?.property_price)}</p>
                                    <div className="p-4 flex items-center justify-center relative">
                                        <OptionsMenu id={"booking"} />
                                    </div>
                                </div>
                                {/* For mobile screens only */}
                                <div className="grid grid-cols-2 grid-rows-[auto] place-content-center lg:hidden gap-y-6 border-t border-primary-200 py-6 font-mono">
                                    <p className="flex items-center ">
                                        <span className={`bg-[#EBE1CE] text-[#816535]  px-1.5 py-1 flex items-center justify-center rounded-full  text-sm font-bold font-mono`}>{booking?.property?.property_status}</span>
                                    </p>
                                    <div className="flex justify-end relative">
                                        <OptionsMenu id={"booking"} />
                                    </div>
                                    <div className="flex items-center gap-2 text-sm col-span-full font-mono">
                                        <div className="w-16 h-12 relative">
                                            <Image src={`https://app.xpacy.com/src/upload/properties/${booking?.property.images[0]}`} alt="property-photo" className="object-cover" unoptimized fill />
                                        </div>
                                        <span>{booking?.property?.property_name}, {booking?.property?.city}, {booking?.property?.state} </span>
                                    </div>
                                    <p className="font-mono text-sm text-neutral-600">Current Price</p>
                                    <p className="font-bold text-center flex items-center justify-end font-mono text-sm">{formatCurrency(booking?.property?.property_price)}</p>
                                    <p className="font-mono text-sm text-neutral-600">Booking Status</p>
                                    <p className="flex items-center justify-end font-mono">
                                        <span className={`bg-error text-secondary-100 w-max  px-1.5 py-1 flex items-center justify-center rounded-full  text-sm font-bold font-mono capitalize`}>{booking?.status}</span>
                                    </p>
                                    <p className="font-mono text-sm text-neutral-600">Booking Date</p>
                                    <p className="font-mono text-sm text-neutral-600 text-right">{format(booking?.start_date, "dd/MM/yy")}</p>
                                </div>
                            </Fragment>
                        )
                    })
                }
            </section>
        </div >
    )
}