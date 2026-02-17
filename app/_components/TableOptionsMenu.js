"use client"
import Link from "next/link"
import Modal from "./Modal"
import OptionsMenu from "./OptionsMenu"
import { IoDocumentTextOutline } from "react-icons/io5"
import { CiEdit } from "react-icons/ci"
import { RiDeleteBin6Line } from "react-icons/ri"


export default function TableOptionsMenu({ id }) {
    const tableOptions = [
    {
        text: "View property details",
        link: `/admin/property-details/${id}`,
        icon: <IoDocumentTextOutline />
    },
    {
        text: "Edit property",
        link: `/admin/edit-property/${id}`,
        icon: <CiEdit />
    },
    {
        text: "Delete property",
        link: "#",
        icon: <RiDeleteBin6Line />
    },

]
    return (
        <OptionsMenu id={"list"}>
            {tableOptions.map(({ text, link, icon }, i) => {
                return (
                    text === "Delete property" ? (
                        <Modal key={i}>
                            <Modal.Open>
                                <button className="flex items-center px-2 py-3 gap-2 cursor-pointer hover:bg-gray-100 w-full text-left">
                                    <span className="text-2xl">{icon}</span>
                                    <span className="text-md">{text}</span>
                                </button>
                            </Modal.Open>
                            <Modal.Window>
                                <DeleteWindow/>
                            </Modal.Window>
                        </Modal>
                    ) : (
                        <Link key={i} href={link} className="flex items-center px-2 py-3 gap-2 cursor-pointer hover:bg-gray-100">
                            <span className="text-2xl">{icon}</span>
                            <span className="text-md">{text}</span>
                        </Link>)
                )
            })}
        </OptionsMenu>
    )
}


const DeleteWindow = ({ onClose }) => {
    return (
        <div className="flex flex-col">
            <p className="px-6 pt-6 font-mono text-error font-bold ">Are you sure you want to delete this property?</p>
            <div className="flex items-center justify-between p-6">
                <button className="px-4 py-2 bg-red-100 text-primary rounded-lg font-medium cursor-pointer">Yes, delete</button>
                <button onClick={onClose} className="px-4 py-2 bg-primary text-white rounded-lg  font-medium cursor-pointer">No, undo</button>
            </div>
        </div>
    )
}