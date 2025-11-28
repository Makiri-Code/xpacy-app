"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";
import { RxDashboard } from "react-icons/rx";
import { FiBell } from "react-icons/fi";
import { BiBuildingHouse } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { IoCardOutline } from "react-icons/io5";
import { RiUserSettingsLine } from "react-icons/ri";
import { LuMessageCircleQuestion } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";

const navList = [
    {
        text: "Dashboard",
        link: "/dashboard/user",
        icon: <RxDashboard />
    },
    {
        text: "Notifications",
        link: "/dashboard/user/notifications",
        icon: <FiBell />
    },
    {
        text: "My Properties",
        link: "/dashboard/user/properties",
        icon: <BiBuildingHouse />
    },
    {
        text: "Saved Properties",
        link: "/dashboard/user/saved-properties",
        icon: <FaRegHeart />
    },
    {
        text: "Booked Services",
        link: "/dashboard/user/booked-services",
        icon: <IoCalendarOutline />
    },
    {
        text: "Payments",
        link: "/dashboard/user/payments",
        icon: <IoCardOutline />
    },
    {
        text: "Profile Settings",
        link: "/dashboard/user/settings",
        icon: <RiUserSettingsLine />
    },
    {
        text: "Help/Support",
        link: "/dashboard/user/help",
        icon: <LuMessageCircleQuestion />
    }
]


export default function SidebarNav() {
    const pathname = usePathname();
    console.log(pathname)
    return (
        <ul className="flex flex-col gap-4">
            {navList.map((list, index) => (
                <li key={index} className={`${pathname === list.link && "bg-[#477899]"} px-4 py-2 rounded-lg hover:bg-[#477899] group transition-all duration-300`}>
                    <Link href={list.link} className="flex gap-4 items-center ">
                        <span className={`${pathname === list.link ? "text-secondary" : "text-white"} text-2xl group-hover:text-secondary`}>{list.icon}</span>
                        <span className="text-base text-white font-mono">{list.text}</span>
                    </Link>
                </li>
            )
            )}
        </ul>
    )
}