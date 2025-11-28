import { cookies } from "next/headers";
import { getUserNotifications } from "@/app/_lib/data-services";
import CustomCheckbox from "@/app/_components/CustomCheckbox";
import DashboardFilter from "@/app/_components/DashboardFilter";
import EmptyState from "@/app/_components/EmptyState";
import NotificationTableItem from "@/app/_components/NotificationTableItem";
import SortBy from "@/app/_components/SortBy";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")
    const notifications = await getUserNotifications(token);
    if (notifications.length <= 0) return <div className="grid place-content-center"><EmptyState message={"Opps... No notification available"} /></div>
    return (
        <div className="p-6 flex flex-col gap-4">
            <div className="px-[38px] flex items-center justify-between font-mono">
                {/* Mark as read */}
                <CustomCheckbox label={"Mark as read "} />
                {/*Show only unread */}
                <CustomCheckbox label={"Show only unread"} />
                <div className=" relative flex items-center gap-2 ">
                    <SortBy>
                        <option>Default</option>
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                    </SortBy>
                    <DashboardFilter />
                </div>
            </div>
            {/* Notification Table */}
            <table className="table-auto font-mono">
                {/* Title */}
                <thead>
                    <tr className="font-bold border border-gray-300">
                        <td className="p-4">Mark as read</td>
                        <td className="p-4">Type</td>
                        <td className="p-4">Message</td>
                        <td className="p-4">Date</td>
                        <td className="p-4">Time</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {notifications.map((notification, i) => <NotificationTableItem notification={notification} key={i}/>)}
                </tbody>
            </table>
            <div className="flex justify-end font-mono">
                <button className="p-4 font-bold cursor-pointer text-base underline text-primary  ">Clear All Notificaitons</button>
            </div>
        </div>
    )
}