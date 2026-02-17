import ServiceRequestDetails from "@/app/_components/ServiceRequestDetails";
import BackBtn from "@/app/_components/BackBtn";
import Logo from "@/app/_components/Logo";
import { getServiceRequestById } from "@/app/_lib/data-services";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const { serviceId } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    
    const service = await getServiceRequestById(token, serviceId);

    if (!service) {
        notFound();
    }

    return (
        <div className="flex-1 flex flex-col gap-8 min-h-screen bg-neutrals-50">
            {/* Header Navigation */}
            <nav className="flex items-center justify-between px-[7%] py-6 bg-white border-b border-primary-100 sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-8">
                    <BackBtn />
                    <div className="h-8 w-px bg-primary-100"></div>
                    <h2 className="text-xl font-bold text-primary">Service Request Details</h2>
                </div>
                <Logo />
            </nav>

            {/* Content Area */}
            <main className="flex-1 px-[7%] py-8">
                <ServiceRequestDetails service={service} />
            </main>
        </div>
    );
}
