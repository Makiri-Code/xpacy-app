"use client";
import { VscNote } from "react-icons/vsc";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineAssignmentInd } from "react-icons/md";
import TableItemOptionsMenu from "./TableItemOptionsMenu";

export default function ServiceOptionsMenu({ id, hasProvider }) {
    const actions = [
        {
            label: "View details",
            href: `/admin/service-details/${id}`,
            icon: <VscNote />,
        },
        {
            label: hasProvider ? "Reassign provider" : "Assign provider",
            href: `/admin/assign-provider/${id}`,
            icon: <MdOutlineAssignmentInd />,
        },
        {
            label: "Delete service request",
            icon: <RiDeleteBin6Line />,
            onClick: () => console.log("delete service", id),
        },
    ];

    return (
        <TableItemOptionsMenu actions={actions} menuId={`service-menu-${id}`} />
    );
}
