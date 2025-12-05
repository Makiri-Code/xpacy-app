import DashboardGridItem from "@/app/_components/DashboardGridItems";
import NotificationList from "@/app/_components/NotificationList";
import SavedPropCardList from "@/app/_components/SavedProCardList";
import { getUserProfile } from "@/app/_lib/data-services";
import { cookies } from "next/headers";
import BookedServiceList from '../../../_components/BookedServicesList';
import PaymentList from '../../../_components/PaymentList';

export default async function Page() {
     const cookieStore = await cookies();
    const token = cookieStore.get("token")
    const profile = await getUserProfile(token)
    return (
        <div className="p-6">
            <h1 className="text-4xl text-primary font-bold">Welcome {profile?.firstname},</h1>
            <div className="grid grid-cols-[1fr_370px] grid-rows-[auto  ] gap-12 mt-8">
                {/* Saved properties */}
                <DashboardGridItem title={"Saved Properties"} viewAllLink={"#"}>
                    <SavedPropCardList/>
                </DashboardGridItem>
                {/* Notifications */}
                <DashboardGridItem title={"Notifications"} viewAllLink={"#"}>
                    <NotificationList/>
                </DashboardGridItem>
                {/* Booked Services */}
                <DashboardGridItem title={"Booked Services"} viewAllLink={"#"}>
                    <BookedServiceList/>
                </DashboardGridItem>
                {/* Payments */}
                <DashboardGridItem title={"Payments"} viewAllLink={"/user/payments"}>
                    <PaymentList/>
                </DashboardGridItem>
            </div>
        </div>
    )
}