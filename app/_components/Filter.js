import LinkBtn from "./LinkBtn";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {handleSearch} from "@/app/_lib/action"
export default function Filter(){

    return (
      <form action={handleSearch} className="md:p-6 bg-white md:flex md:space-x-14 rounded-md md:items-center grid grid-cols-2 grid-rows-[auto] gap-y-4 md:gap-y-0">
        <div className="md:flex  md:space-x-4 col-[1/-1] grid grid-cols-2 grid-rows-auto gap-4 ">
          <select className="px-4 py-2 border rounded-md border-neutrals font-mono font-normal text-neutrals-900 text-md" name="purpose">
            <option value={""}>Purpose</option>
            <option value={"buy"}>Buy</option>
            <option value={"rent"}>Rent</option>
            <option value={"shortlet"}>Shortlet</option>
          </select>
          <select name="location" className="px-4 py-2 border rounded-md border-neutrals font-mono font-normal text-neutrals-900 text-md">
            <option value={""}>Location</option>
            <option value={"Abuja"}>Abuja</option>
            <option value={"Aba"}>Aba</option>
            <option value={"Benin"}>Benin</option>
            <option value={"Calabar"}>Calabar</option>
            <option value={"Enugu"}>Enugu</option>
            <option value={"Ibadan"}>Ibadan</option>
            <option value={"Ilorin"}>Ilorin</option>
            <option value={"Lagos"}>Lagos</option>
            <option value={"Minna"}>Minna</option>
            <option value={"Port Harcourt"}>Port Harcourt</option>
            <option value={"Uyo"}>Uyo</option>
            <option value={"Warri"}>Warri</option>
          </select>
          <select name="type" className="px-4 py-2 border rounded-md border-neutrals font-mono font-normal text-neutrals-900 text-md">
            <option value={""}>Type</option>
            <option value={"All types"}>All types</option>
            <option value={"Commercial"}>Commercial</option>
            <option value={"Residential"}>Residential</option>
            <option value={"Terrace"}>Terrace</option>
            <option value={"Flat/Apartment"}>Flat/Apartment</option>
            <option value={"Duplex"}>Duplex</option>
            <option value={"Semi-detached"}>Semi-detached</option>
            <option value={"Fully-detached"}>Fully-detached</option>
            <option value={"Villa"}>Villa</option>
          </select>
          <select name="minBedrooms" className="px-4 py-2 border rounded-md border-neutrals font-mono font-normal text-neutrals-900 text-md">
            <option value={""}>Bedrooms</option>
            <option value={"1"}>1</option>
            <option value={"2"}>2</option>
            <option value={"3"}>3</option>
            <option value={"4"}>4</option>
            <option value={"5"}>5</option>
            <option value={"6"}>6</option>
          </select>
          <select name="minPrice" className="px-4 py-2 border rounded-md border-neutrals font-mono font-normal text-neutrals-900 text-md">
            <option value={""}>Min Price</option>
            <option value={100000}>{"N100k"}</option>
            <option value={200000}>{"N200k"}</option>
            <option value={500000}>{"N500k"}</option>
            <option value={1000000}>{"N1m"}</option>
            <option value={2000000}>{"N2m"}</option>
            <option value={3000000}>{"N3m"}</option>
            <option value={4000000}>{"N4m"}</option>
            <option value={5000000}>{"N5m"}</option>
            <option value={6000000}>{"N6m"}</option>
            <option value={7000000}>{"N7m"}</option>
            <option value={8000000}>{"N8m"}</option>
            <option value={9000000}>{"N9m"}</option>
            <option value={10000000}>{"N10m"}</option>
            <option value={20000000}>{"N20m"}</option>
            <option value={30000000}>{"N30m"}</option>
            <option value={40000000}>{"N40m"}</option>
            <option value={50000000}>{"N50m"}</option>
            <option value={100000000}>{"N100m"}</option>
          </select>
          <select name="maxPrice" className="px-4 py-2 border rounded-md border-neutrals font-mono font-normal text-neutrals-900 text-md">
            <option value={""}>Max Price</option>
            <option value={500000}>{"N500k"}</option>
            <option value={1000000}>{"N1m"}</option>
            <option value={2000000}>{"N2m"}</option>
            <option value={3000000}>{"N3m"}</option>
            <option value={4000000}>{"N4m"}</option>
            <option value={5000000}>{"N5m"}</option>
            <option value={6000000}>{"N6m"}</option>
            <option value={7000000}>{"N7m"}</option>
            <option value={8000000}>{"N8m"}</option>
            <option value={9000000}>{"N9m"}</option>
            <option value={10000000}>{"N10m"}</option>
            <option value={20000000}>{"N20m"}</option>
            <option value={30000000}>{"N30m"}</option>
            <option value={40000000}>{"N40m"}</option>
            <option value={50000000}>{"N50m"}</option>
            <option value={100000000}>{"N100m"}</option>
            <option value={200000000}>{"200m"}</option>
          </select>
        </div>
        <div className="col-span-2 grid place-content-center md:flex ">
          <LinkBtn>
            <MagnifyingGlassIcon className="size-6" />
            <span>Search</span>
          </LinkBtn>
        </div>

      </form>
    );
}