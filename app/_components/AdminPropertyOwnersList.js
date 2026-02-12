"use client"
import Image from "next/image";
import DashboardGridItem from "./DashboardGridItems";
import TableHead from "./TableHeader";
import StatusChips from "./StatusChips";
import OwnerOptionsMenu from "./OwnerOptionsMenu";
import Modal from "./Modal";
import { HiOutlineUserAdd } from "react-icons/hi";
import AddNewOwnerForm from "./AddNewOwnerForm";
const tableHeadings = [
    {
        heading: "Owner’s Information",
    },
    {
        heading: "Contact Details",
        // center: true,
    },
    {
        heading: "User Status",
        center: true,
    },
    {

    }
];
export default function AdminPropertyOwnersList({ owners }) {

    return (
        <DashboardGridItem title={"Property Owners List"}>
            <TableHead tableCol="grid-cols-[1fr_1.5fr_1fr_0.5fr]" headingsArray={tableHeadings} />
            {owners?.map(({ first_name, last_name, email, display_picture, phone, id }) => (
                <div className="grid grid-cols-[1fr_1.5fr_1fr_0.5fr] text-neutrals-900 text-sm font-mono border-b border-primary-100  ">
                    <div className="p-4 flex items-center gap-2 text-sm">
                        <div className="w-8 h-8  relative">
                            <Image src={display_picture ? `https://app.xpacy.com/src/upload/display_img/${display_picture}` : "/avatar.png"} alt="owner-photo" className="object-cover rounded-full" unoptimized fill />
                        </div>
                        <span>{first_name} {last_name}</span>
                    </div>
                    <p className="p-4 flex ">
                        {phone} {email}
                    </p>
                    <p className="p-4 flex items-center justify-center capitalize">
                        <StatusChips status={"active"} />
                    </p>
                    <div className="p-4 flex items-center justify-center relative">
                        <OwnerOptionsMenu id={id} />
                    </div>
                </div>
            ))}
            <div className="self-end">
                <Modal>
                    <Modal.Open>
                        <button className="flex items-center justify-center cursor-pointer gap-2 px-4 py-3 bg-primary rounded-lg font-mono font-medium text-white">
                            <span className="text-2xl"><HiOutlineUserAdd /></span>
                            <span>Add New Owner</span>
                        </button>
                    </Modal.Open>
                    <Modal.Window>
                        <AddNewOwnerForm/>
                    </Modal.Window>
                </Modal>
            </div>
        </DashboardGridItem>
    )
}