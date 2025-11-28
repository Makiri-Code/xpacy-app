import SidebarLogo from "@/app/_components/SidebarLogo";
import SidebarNav from "@/app/_components/SidebarNav";
import ReferralSidebarNav from "@/app/_components/ReferralSidebarNav";
import SidebarHeader from "@/app/_components/SidebarHeader";
export default function Layout({children}){
    return (
        <section className="grid grid-cols-[265px_1fr] grid-rows-[auto_1fr] h-dvh overflow-hidden ">
            <div className="row-span-full max-h-max bg-primary-900 flex flex-col p-6 items-center gap-8 overflow-y-auto">
                <SidebarLogo/>
                <SidebarNav/>
                <ReferralSidebarNav/>
            </div>
            <SidebarHeader/>
            <main className=" overflow-y-auto row-[2/3] col-[2/-2]">
                <div>
                    {children}
                </div>
            </main>
        </section>
    )
}