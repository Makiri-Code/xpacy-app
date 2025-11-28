"use client"
import { IoFilter } from "react-icons/io5";
import FilterMenu from "./FilterMenu";


export default function DashboardFilter() {

    return (
        <FilterMenu>
            <FilterMenu.Open>
                <button className='flex items-center justify-center p-3 text-2xl border border-primary-200 rounded-lg'>
                    <IoFilter />
                </button>
            </FilterMenu.Open>
            <FilterMenu.Window>
                <div className="flex flex-col w-[138px] z-10 rounded-lg p-3 border-primary-200 bg-white shadow-lg [&>*]:p-2.5   [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-neutral-300">
                    <span>General</span>
                    <span>Services</span>
                    <span>Properties</span>
                    <span>Payments</span>
                </div>
            </FilterMenu.Window>
        </FilterMenu>
    )
}