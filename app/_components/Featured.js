"use client"
import {ArrowLeftIcon} from "@heroicons/react/24/outline";
import {ArrowRightIcon} from "@heroicons/react/24/outline";
import FeaturedCard from "./FeaturedCard";
import { useRef } from "react";


export default function Featured({properties}) {
  const containerRef = useRef(null);
  const moveRight = () => {
    containerRef.current.scrollBy({left: 500, behaviour: 'smooth'})
  }
    const moveLeft = () => {
      containerRef.current.scrollBy({ left: -500, behaviour: "smooth" });
    };
  return (
    <div className="w-full  overflow-hidden relative flex">
      <div
        ref={containerRef}
        className="w-[95vw] overflow-x-scroll no-scrollbar flex  flex-nowrap "
      >
        <div className=" hidden w-full absolute top-1/2 md:justify-between md:flex z-10">
          <button onClick={moveLeft} className="bg-white rounded-full cursor-pointer p-3 border border-black flex items-center justify-center">
            <ArrowLeftIcon className="size-6" />
          </button>
          <button
            onClick={moveRight}
            className="bg-white rounded-full cursor-pointer p-3 border border-black flex items-center justify-center"
          >
            <ArrowRightIcon className="size-6" />
          </button>
        </div>
        <div className="min-w-fit flex space-x-6 py-5 px-2.5 ">
          {properties?.map((property, index) => (
            <FeaturedCard property={property} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
