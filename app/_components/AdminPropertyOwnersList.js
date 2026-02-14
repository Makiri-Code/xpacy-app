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
            <TableHead tableCol="grid-cols-[1fr_1.5fr_1fr_0.5fr]" headingsArray={tableHeadings} />
            {owners?.map(({ first_name, last_name, email, display_picture, phone, id }) => (
                <div key={id} className="contents">
                    {/* Desktop View */}
                    <div className="hidden lg:grid grid-cols-[1fr_1.5fr_1fr_0.5fr] text-neutrals-900 text-sm font-mono border-b border-primary-100 items-center">
                        <div className="p-4 flex items-center gap-2 text-sm">
                            <div className="w-8 h-8 relative shrink-0">
                                <Image src={display_picture ? `https://app.xpacy.com/src/upload/display_img/${display_picture}` : "/avatar.png"} alt="owner-photo" className="object-cover rounded-full" unoptimized fill />
                            </div>
                            <span className="truncate">{first_name} {last_name}</span>
                        </div>
                        <div className="p-4 flex flex-col justify-center">
                            <span>{phone}</span>
                            <span className="text-gray-500 text-xs">{email}</span>
                        </div>
                        <div className="p-4 flex items-center justify-center capitalize">
                            <StatusChips status={"active"} />
                        </div>
                        <div className="p-4 flex items-center justify-center relative">
                            <OwnerOptionsMenu id={id} />
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className="lg:hidden flex flex-col gap-4 p-4 border-b border-primary-100 bg-white">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 relative shrink-0">
                                    <Image src={display_picture ? `https://app.xpacy.com/src/upload/display_img/${display_picture}` : "/avatar.png"} alt="owner-photo" className="object-cover rounded-full" unoptimized fill />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-sm text-neutrals-900">{first_name} {last_name}</h3>
                                    <p className="text-xs text-gray-500">{email}</p>
                                </div>
                            </div>
                            <OwnerOptionsMenu id={id} />
                        </div>
                        
                        <div className="flex flex-col gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span>Phone:</span>
                                <span className="font-medium text-gray-900">{phone || "N/A"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Status:</span>
                                <StatusChips status={"active"} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            
        </DashboardGridItem>
    )
}