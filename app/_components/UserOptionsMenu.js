"use client";
import { VscNote } from "react-icons/vsc";
import  ConfirmDeleteModal  from "./ConfirmDeleteModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import TableItemOptionsMenu from "./TableItemOptionsMenu";
import { TbInvoice } from "react-icons/tb";

export default function UserOptionsMenu({ id, role }){
    const isOwner = role === 'property-owner';

    const actions = [
        {
            label: "View details",
            href: isOwner ? `/admin/owner-details/${id}` : `/admin/users/${id}`, // Fallback for non-owners
            icon: <VscNote className="text-gray-400" />,
        },
        // Only show invoice option for owners for now, unless tenants also get invoices here
        ...(isOwner ? [{
            label: "Issue invoice",
            href: `/admin/issue-invoice/${id}`,
            icon: <TbInvoice className="text-gray-400" />,
        }] : []),
        {
            label: "Delete user",
            icon: <RiDeleteBin6Line className="text-gray-400" />,
            modal: 
                <ConfirmDeleteModal
                title={`Are you sure you want to delete this ${role ? role.replace('-', ' ') : 'user'}?`}
                onConfirm={() => console.log("delete", id)}
                />
            ,
        },
    ]

    return (
        <TableItemOptionsMenu actions={actions} menuId={`user-menu-${id}`}/>
    )
}
