"use client"

import {usePathname} from "next/navigation";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

import PropertySearchBtn from "./PropertySearchBtn";
import PropertySaveBtn from "./PropertySaveBtn";
import Modal from "./Modal";

import ShareBtnCard from "./ShareBtnCard";
import ShareBtn from "./ShareBtn";


export default function PropertyDetailsHeader({propertyName, propertyAddress, propertyStatus,  viewPhotos = null, children}){
    return ( 
        <header className="flex flex-col gap-12 py-6">
            <div className="flex items-center space-x-2 font-mono text-black text-base">
                <span>Home</span>
                <span className="text-md"><MdKeyboardArrowRight /></span>
                <span className={"capitalize"}>{propertyStatus}</span>
                <span className="text-md"><MdKeyboardArrowRight /></span>
                { viewPhotos && 
                (<> 
                    <span className={"capitalize"}>Property Details</span>
                    <span className="text-md"><MdKeyboardArrowRight /></span>
                 </>)}
                <span className={"text-blue-400 capitalize"}>{viewPhotos ?  "View Photos" : "Property Details"}</span>
            </div>
            <div className="space-y-2 flex flex-col">
                <h1 className="font-bold text-4xl capitalize">{propertyName}</h1>
                <div className="flex items-center justify-between">
                    <p className="text-md flex items-center gap-2 text-primary-700">
                        <span className="text-2xl"><IoLocationOutline/></span>
                        {propertyAddress}
                    </p>
                    <div className="space-x-2 flex">
                        <PropertySearchBtn />
                        {children}
                        <Modal>
                            <Modal.Open>
                                <ShareBtn/>
                            </Modal.Open>
                            <Modal.Window name="share">
                                <ShareBtnCard/>
                            </Modal.Window>
                        </Modal>
                    </div>
                </div>

            </div>
        </header>
    )
}