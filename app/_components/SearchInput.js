import { IoSearch } from "react-icons/io5";

export default function SearchInput(){

    return (
        <form className="relative w-[330px] ">
            <input type="search" className="border w-full font-mono border-primary rounded-lg pl-10 py-3.5 placeholder:text-gray-700 " placeholder="Search properties e.g type, location" />
            <span className="text-2xl absolute left-3 top-1/4"><IoSearch/></span>
        </form>
    )
}