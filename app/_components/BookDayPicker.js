"use client"
import { isPast } from "date-fns";
import { useState } from "react"
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
const selectOptions = [
    {
        label: "Lodging",
    },
    {
        label: "House party",
    },
    {
        label: "Get together",
    },
    {
        label: "Photoshoot/Videoshoot",
    },
    {
        label: "Others",
    }
]
function BookDayPicker() {
    const [selected, setSelected] = useState(null)
    console.log(selected)
    return (
        <div className="flex flex-col p-6 w-[500px] max-h-[500px] gap-6 font-mono ">
            <h3 className="text-primary text-xl font-sans text-center ">Select booking dates</h3>
            <form className="flex flex-col gap-6 overflow-y-auto">
                <div className="self-center">
                    <DayPicker
                        animate
                        mode="range"
                        selected={selected}
                        onSelect={setSelected}
                        disabled={(currDate) => isPast(currDate)}
                    />
                </div>
                <div className="flex-1 flex-col flex gap-2">
                    <label className="text-gray-700">Reason for booking</label>
                    <select className="px-3 py-3.5 border border-gray-300 rounded-lg placeholder:text-gray-500 ">
                        <option value="">Please choose the reason for booking</option>
                        {selectOptions.map(option => <option value={option.label} key={option.label}>{option.label}</option>)}
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <button className="py-2 px-3.5 border border-gray-400 rounded-lg bg-white cursor-pointer">Cancel</button>
                    <button className="py-2 px-5 border border-primary rounded-lg bg-primary cursor-pointer text-white">Book</button>
                </div>
            </form>
        </div>
    )
}

export default BookDayPicker
