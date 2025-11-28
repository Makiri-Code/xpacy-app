import Image from "next/image";
import bg01 from "@/public/service-img01.jpeg"
import ic01 from "@/public/icon-1.svg";
export default function ServicesCard({service}){
    const {bg, icon, title, body} = service;
    return (
      <div className="group flex-1 h-full relative hover:flex-2 transition-all duration-300">
        <div
          className={` h-full rounded-md  bg-cover flex items-center justify-center`}
          style={{ backgroundImage: `url(${bg})` }}
        >
          <Image src={icon} alt="Naira bag" width={160} height={160} />
        </div>
        <div className="hidden h-full bg-primary absolute left-0 right-0 bottom-0 top-0 group-hover:flex group-hover:flex-col group-hover:items-center group-hover:justify-center space-y-4 text-white text-center p-4 font-mono">
          <h3 className="text-md font-semibold rounded-md">{title}</h3>
          <p className="text-base">{body}</p>
        </div>
      </div>
    );
}