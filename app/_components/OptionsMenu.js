"use client"

import FilterMenu from "./FilterMenu"
import { SlOptions } from "react-icons/sl";
import { RiUserSettingsLine } from "react-icons/ri";
import Link from "next/link";
export default function OptionsMenu({id}){
    return (
        <FilterMenu>
            <FilterMenu.Open name={id}>
                <button className="flex items-center p-2 cursor-pointer justify-center text-2xl">
                    <SlOptions/>
                </button>
            </FilterMenu.Open>
            <FilterMenu.Window name={id} top={"top-[60%]"}>
                <div className="flex flex-col gap-2 items-center bg-white shadow-lg rounded-lg p-4">
                    <Link href={"#"} className="flex items-center gap-4 justify-center hover:bg-gray-50">
                        <span className="text-[20px]"><RiUserSettingsLine/></span>
                        <span>Submit service request</span>
                    </Link>
                </div>
            </FilterMenu.Window>
        </FilterMenu>
    )
}