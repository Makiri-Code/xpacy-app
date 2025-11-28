import { TiStarFullOutline } from "react-icons/ti";
import { TiStarHalfOutline } from "react-icons/ti";
import StarRating from "./StarRating";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import CustomerRatings from "./CustomerRatings";
export default function ReviewsBox({ totalRating = 4.5 }) {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-primary-900 text-[1.375rem] font-normal ">Reviews and Ratings</h3>
            <div className="grid auto-rows-auto grid-cols-[250px_1fr] gap-6 text-base text-black font-mono">
                <div className="flex flex-col gap-3">
                    <h3 className="text-lg uppercase mt-2">Verified Ratings (10)</h3>
                    <div className="p-4 flex flex-col gap-4 items-center bg-gray-100 rounded-lg shadow-lg border border-gray-200">
                        <p className="text-2xl font-semibold text-primary">{totalRating}/5</p>
                        <div className="flex text-2xl text-secondary-500">
                            {Array.from({ length: 5 }, (_, i) => {
                                if ((i + 1) % totalRating === 0.5) {
                                    return <span key={i}><TiStarHalfOutline /></span>
                                } else {
                                    return <span key={i}><TiStarFullOutline /></span>
                                }
                            })}
                        </div>
                        <p>10 Verified ratings</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3 ">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg uppercase">Comments from verified bookings (10)</h3>
                        <button className="px-3.5 py-1 flex items-center gap-2 text-lg text-secondary rounded-lg hover:bg-gray-200 cursor-pointer">
                            <span>See all</span>
                            <span><MdKeyboardArrowRight /></span>
                        </button>
                    </div>
                    <div className="border border-gray-100"></div>
                    {/* Customer comments and ratings */}
                    {Array.from({length: 5}, (_, i) => (<CustomerRatings key={i}/>))}
                </div>
            </div>
        </div>
    )
}