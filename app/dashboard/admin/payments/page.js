import PaymentsTableList from "@/app/_components/PaymentsTableList";
import DashboardGridItem from "@/app/_components/DashboardGridItems";
import PaymentsOverviewWrapper from "@/app/_components/PaymentsOverviewWrapper";
import { getAdminPayments } from "@/app/_lib/data-services";
import { cookies } from "next/headers";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    // Placeholder data until endpoint is ready
    const bookings = await getAdminPayments(token) || [];

    return (
        <div className="p-6">
            <h1 className="lg:text-4xl text-[28px] text-primary font-bold capitalize mb-8">Payments</h1>
            
            <div className="mb-8">
                <PaymentsOverviewWrapper bookings={bookings} />
            </div>

            <DashboardGridItem title={"Payment History"}>
                <PaymentsTableList bookings={bookings} /> 
            </DashboardGridItem>
        </div>
    );
}
