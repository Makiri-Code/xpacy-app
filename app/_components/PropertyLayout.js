import { Suspense } from "react";
import FilterSidebar from "./FilterSidebar";
import PropertiesSection from "./PropertiesSection";
import LoadingPropertiesCard from "./LoadingPropertiesCard";
import LatestPropertyList from "./LatestPropertyList";


export default function PropertyLayout({search}){
    return (
        <div className="flex gap-6 ">
            <div className="w-[347px] pt-14 flex flex-col gap-12 ">
                <FilterSidebar/>
                <LatestPropertyList/>
            </div>
            <Suspense fallback={<LoadingPropertiesCard/>}>
                <PropertiesSection search={search} />
            </Suspense>
        </div>
    )
}