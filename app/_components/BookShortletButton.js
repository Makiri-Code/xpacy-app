"use client"
import toast from "react-hot-toast";
import {useRouter} from "next/navigation" 
import { handleBookProperty } from "../_lib/action";

export default function BookShortletButton({ onOpen, children }) {
    const router = useRouter();
    const handleClick = async () => {
        toast.promise( () =>  handleBookProperty(), {
            loading: "Loading...",
            success: (data) => {
                onOpen("booking")
            },
            error: (err) => {
                router.push("/auth/log-in")
                return `${err.message}`
            }
        })
    }

    return <button onClick={handleClick} className="py-2 font-mono bg-primary rounded-lg text-white cursor-pointer">{children}</button>
}