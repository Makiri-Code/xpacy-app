import { FaCheck } from "react-icons/fa6";

export default function CustomCheckbox({label}) {

    return (
        <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" className="hidden peer" id="custom_checkbox" />
            <div className="h-6 w-6 border-2 border-gray-400 flex items-center justify-center rounded-xs peer-checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:[&>span]:opacity-100">
                <span className="opacity-0 text-white text-sm"> <FaCheck /></span>
            </div>
            <span className="text-sm" >{label}</span>
        </label>
    )
}