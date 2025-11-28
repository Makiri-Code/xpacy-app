import Image from "next/image";
import insightImg1 from "../../public/insight-image1.png";
export default function BlogCard() {
  return (
    <div className="flex flex-col gap-4 w-[378px]">
      <header className="w-[377px] h-[267px] relative overflow-hidden">
        <Image
          src={insightImg1}
          alt="blog post image"
          fill
          className="hover:scale-101 object-cover transition-all duration-300"
        />
      </header>
      <footer className="flex flex-col gap-2 font-mono">
        <h3 className="py-2.5 font-bold text-md text-black">
          Top Tips for First-Time Property Owners: Maximize Your Investment with
          Ease
        </h3>
        <p className="text-sm text-primary-700 font-normal">
          Property Investment
        </p>
        <p className="text-sm font-normal text-neutral-900">
          1st Oct, 2024 . 11 min read
        </p>
      </footer>
    </div>
  );
}
