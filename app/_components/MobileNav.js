"use client"
import { FaBarsStaggered } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import NavMenu from "./NavMenu";
import Link from "next/link";


export default function MobileNav() {

    return (
        <NavMenu>
            <NavMenu.Open>
                <MobileNavBtns/>
            </NavMenu.Open>
            <NavMenu.Window>
                <ul className="border border-primary-200 rounded-lg font-mono">
                    <li className="py-2 border-b border-primary-100">
                        <Link href={"/"}>Home</Link>
                    </li>
                     <li className="py-2 border-b border-primary-100">
                        <Link href={"/shortlet"}>Shortlet</Link>
                    </li>
                     <li className="py-2 border-b border-primary-100">
                        <Link href={"/rent"}>Rent</Link>
                    </li>
                     <li className="py-2 border-b border-primary-100">
                        <Link href={"/buy"}>Buy</Link>
                    </li>
                     <li className="py-2 border-b border-primary-100">
                        <Link href={"/management"}>Management</Link>
                    </li>
                     <li className="py-2 border-b border-primary-100">
                        <Link href={"/management"}>Management</Link>
                    </li>
                     <li className="py-2 border-b border-primary-100">
                         <Link href={"/contact"}>Contact </Link>
                    </li>
                    <li className="py-2 border-b border-primary-100 text-secondary font-bold">
                         <Link href={"/auth/log-in"}>Log In </Link>
                    </li>
                    <li className="py-2 border-b border-primary-100 text-primary font-bold">
                         <Link href={"/auth/sign-up"}>Sign Up </Link>
                    </li>
                </ul>
            </NavMenu.Window>
        </NavMenu>
    )
}

const MobileNavBtns = ({isOpen, open}) => {
    return (

        <>
            {isOpen ? (
                 <button onClick={open} className="text-2xl"><IoCloseSharp/></button>
            ): (
                <button onClick={open} className="text-2xl"><FaBarsStaggered/></button>
            ) 
            }
        </>
    )
}