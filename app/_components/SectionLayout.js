

export default function SectionLayout({children, heading, subheading, bgColor}){

    return (
      <section
        className={`py-[120px] px-[7%] flex flex-col space-y-16 ${
          bgColor && "bg-linear-180 from-[#E3ECF2] to-[#FCFCFC]"
        }`}
      >
        <div className="flex flex-col text-center space-y-4">
          <h2 className="font-bold text-primary text-4xl ">{heading}</h2>
          <p className="font-normal text-md text-black">{subheading}</p>
        </div>
        {children}
      </section>
    );
}