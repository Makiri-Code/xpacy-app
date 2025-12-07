import MobileDashboardHeader from "@/app/_components/MobileDashboardHeader";
import ServicesTableList from "@/app/_components/ServicesTableList";



export default function Page(){

    return (
        <div className="grid grid-cols-1 grid-rows-[auto] p-6 lg:gap-12">
            <MobileDashboardHeader/>
            <ServicesTableList/>
        </div>
    )
}