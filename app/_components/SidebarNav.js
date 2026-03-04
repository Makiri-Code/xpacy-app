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
import { RiHome2Line, RiSearchLine, RiSettings3Line, RiPulseLine } from "react-icons/ri";
import { Settings, User } from "lucide-react";
import { FaCheck } from "react-icons/fa6";


const userNavList = [
    {
        text: "Go to Homepage",
        link: "/",
        icon: <RiHome2Line />
    },
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
        link: "/dashboard/user/my-properties",
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
        link: "/dashboard/user/profile-settings",
        icon: <RiUserSettingsLine />
    },
    {
        text: "Help/Support",
        link: "/contact",
        icon: <LuMessageCircleQuestion />
    }
]

const adminNavList = [
  
    {
        text: "Dashboard",
        link: "/dashboard/admin",
        icon: <RxDashboard />
    },
    {
        text: "Notifications",
        link: "/dashboard/admin/notifications",
        icon: <FiBell />
    },
    {
        text: "Properties",
        link: "/dashboard/admin/properties",
        icon: <BiBuildingHouse />
    },
    {
        text: "Services",
        link: "/dashboard/admin/services",
        icon: <IoCalendarOutline />
    },
    {
        text: "Users",
        link: "/dashboard/admin/users",
        icon: <User />
    },
    {
        text: "Bookings",
        link: "/dashboard/admin/bookings",
        icon: <IoCalendarOutline />
    },
    {
        text: "Payments",
        link: "/dashboard/admin/payments",
        icon: <IoCardOutline />
    },
    {
        text: "Reports & Analytics",
        link: "/dashboard/admin/reports-analytics",
        icon: <RiUserSettingsLine />
    },
    {
        text: "Settings",
        link: "/dashboard/admin/settings",
        icon: <Settings />
    },
    {
        text: "FAQs",
        link: "/dashboard/admin/faqs",
        icon: <LuMessageCircleQuestion />
    }
]

const propertyOwnerNavList = [
    
    {
        text: "Dashboard",
        link: "/dashboard/property-owner",
        icon: <RxDashboard />
    },
    {
        text: "Notifications",
        link: "/dashboard/property-owner/notifications",
        icon: <FiBell />
    },
    {
        text: "My Properties",
        link: "/dashboard/property-owner/properties",
        icon: <BiBuildingHouse />
    },
    {
        text: "Services Requests",
        link: "/dashboard/property-owner/services",
        icon: <IoCalendarOutline />
    },
    {
        text: "Bookings",
        link: "/dashboard/property-owner/bookings",
        icon: <FaCheck />
    },
    {
        text: "Payments",
        link: "/dashboard/property-owner/payments",
        icon: <IoCardOutline />
    },
     {
        text: "Profile Settings",
        link: "/dashboard/property-owner/settings",
        icon: <RiSettings3Line className='w-5 h-5' />
    },
    {
        text: "Help/Support",
        link: "/contact",
        icon: <LuMessageCircleQuestion />
    }
]

export default function SidebarNav({ role = "user" }) {
    let navList = [];
    if (role?.toLowerCase() === "admin") navList = adminNavList;
    else if (role?.toLowerCase() === "property-owner" || role?.toLowerCase() === "propertyowner") navList = propertyOwnerNavList;
    else navList = userNavList;

    const pathname = usePathname();
    return (
        <ul className="flex flex-col gap-4 h-full">
            {navList.map((list, index) => (
                <li key={index} className={`${pathname === list.link && "bg-primary-700"} px-4 py-2 rounded-lg hover:bg-primary-700 group transition-all duration-300`}>
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