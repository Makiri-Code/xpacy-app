import { IoDocumentTextOutline } from "react-icons/io5"
import { CiEdit } from "react-icons/ci"
import { RiDeleteBin6Line } from "react-icons/ri"
import TableItemOptionsMenu from "./TableItemOptionsMenu";


export default function TableOptionsMenu({ id }) {
    const tableOptions = [
        {
            label: "View property details",
            href: `/admin/property-details/${id}`,
            icon: <IoDocumentTextOutline className="text-gray-400" />
        },
        {
            label: "Edit property",
            href: `/admin/edit-property/${id}`,
            icon: <CiEdit className="text-gray-400" />
        },
        {
            label: "Delete property",
            icon: <RiDeleteBin6Line className="text-gray-400" />,
            modal: <DeleteWindow />
        },
    ];

    return (
        <TableItemOptionsMenu actions={tableOptions} menuId={`table-menu-${id}`} />
    );
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