"use client"
import { format, isPast } from "date-fns";
import toast from "react-hot-toast"
import { useEffect, useState, useTransition } from "react"
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { createBooking } from "../_lib/action";
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
function BookDayPicker({onClose, property_id}) {
    const [selected, setSelected] = useState({from: undefined, to: undefined});
    const [isPending, startTransition] = useTransition()
    const [bookingReason, setBookingReason] = useState("")
        
    const handleSubmit = (e) => {
        e.preventDefault();
        startTransition ( () => {
        if(!selected.from || !selected.to) {
            return toast.error("Please choose booking dates")
        }
        const bookingData = {
            property_id,
            start_date: format(selected.from, "dd-MM-yyyy"),
            end_date: format(selected.to, "dd-MM-yyyy"),
            bookingReason,
        }
        toast.promise( async () => await createBooking(bookingData), {
            loading: "Loading...",
            success: (data) => `${data.message}`,
            error: (error) => `${error.message}`
        })
    })
    }

    return (
        <div className="flex flex-col p-6 md:w-[500px] w-[350px] max-h-[500px] gap-6 font-mono ">
            <h3 className="text-primary md:text-xl text-md font-sans text-center ">Select booking dates</h3>
            <form className="flex flex-col gap-6 overflow-y-auto" onSubmit={handleSubmit}>
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
                    <select name="bookingReason" className="px-3 py-3.5 border border-gray-300 rounded-lg placeholder:text-gray-500 " onChange={(e) => {setBookingReason(e.target.value)}}>
                        <option value="">Please choose the reason for booking</option>
                        {selectOptions.map(option => <option value={option.label} key={option.label}>{option.label}</option>)}
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <button onClick={onClose} className="py-2 px-3.5 border border-gray-400 rounded-lg bg-white cursor-pointer">Cancel</button>
                    <button type="submit" className="py-2 px-5 border border-primary rounded-lg bg-primary cursor-pointer text-white">Book</button>
                </div>
            </form>
        </div>
    )
}

export default BookDayPicker
