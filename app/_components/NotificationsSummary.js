import { FaBell } from "react-icons/fa";
import Link from "next/link";
import { format } from "date-fns";

export default function NotificationsSummary({ notifications }) {
    const recentNotifications = notifications.slice(0, 5);

    return (
        <div className="flex flex-col gap-4 p-4 shadow-sm rounded-lg bg-white border border-gray-100">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FaBell className="text-primary" />
                    Recent Notifications
                </h2>
                <Link href="/dashboard/property-owner/notifications" className="text-sm text-primary hover:underline font-medium">
                    View All
                </Link>
            </div>
            
            {recentNotifications.length === 0 ? (
                <p className="text-gray-500 text-sm py-4">No new notifications.</p>
            ) : (
                <div className="flex flex-col gap-3">
                    {recentNotifications.map((note, index) => (
                        <div key={index} className="flex flex-col gap-1 p-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors">
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-semibold text-gray-800">{note.title || "Notification"}</span>
                                <span className="text-xs text-gray-500 whitespace-nowrap">
                                    {note.createdAt ? format(new Date(note.createdAt), "MMM dd, HH:mm") : ""}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2">{note.message}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
