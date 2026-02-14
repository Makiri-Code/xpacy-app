"use client";
import { VscNote } from "react-icons/vsc";
import  ConfirmDeleteModal  from "./ConfirmDeleteModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import TableItemOptionsMenu from "./TableItemOptionsMenu";
import { TbInvoice } from "react-icons/tb";

export default function OwnerOptionsMenu({id}){
    const  actions = [
        {
      label: "View owner details",
      href: `/admin/owner-details/${id}`,
      icon: <VscNote />,
    },
    {
      label: "Issue invoice",
      href: `/admin/issue-invoice/${id}`,
      icon: <TbInvoice />,
    },
    {
      label: "Delete owner",
      icon: <RiDeleteBin6Line />,
      modal: 
        <ConfirmDeleteModal
          title="Are you sure you want to delete this property?"
          onConfirm={() => console.log("delete", id)}
        />
      ,
    },
    ]
    return (
        <TableItemOptionsMenu actions={actions} menuId="owners-menu"/>
    )
}