"use client"
import { formatCurrency } from "../_lib/utils";
import BookDayPicker from "./BookDayPicker";
import Modal from "./Modal";
import VideoTour from "./VideoTour";
import BookShortletButton from "./BookShortletButton";
import { FiPhone } from "react-icons/fi";

export default function PropertyDetailsSidebar({property}){
    console.log(property.id)
    return (
        <div className="flex flex-col gap-8 py-[38px]">
            <div className="px-4 pt-8 pb-8 flex flex-col gap-4 shadow-lg rounded-lg">
                <p className="text-[1.5rem] text-center tracking-widest font-mono font-bold text-secondary-500 ">{formatCurrency(property?.property_price)} {property?.property_status === "Shortlet" && "/night"}</p>
                <Modal>
                    <Modal.Open name="booking" >
                        <BookShortletButton>
                            {property?.property_status === "Shortlet" ? "Book This Shortlet" : "Continue"}
                        </BookShortletButton>
                    </Modal.Open>
                    <Modal.Window property_id={property?.id} name="booking">
                        <BookDayPicker/>
                    </Modal.Window>
                </Modal> 
                
            </div>
            {property?.virtual_tour_url && <VideoTour property={property} />}
            <div className="flex flex-col p-4 shadow-lg items-center gap-6 rounded-lg">
                <p className="text-center text-md">For Enquires</p>
                <p className="font-mono flex items-center gap-1 text-base">
                    <span><FiPhone/></span>
                    <span>Call +234 906 855 7780</span>
                </p>
            </div>
        </div>
    )
}