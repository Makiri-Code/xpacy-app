import FaqSection from "@/app/_components/FaqSection";
import SupportForm from "@/app/_components/SupportForm"
import { getUserProfile } from "@/app/_lib/data-services";
import { cookies } from "next/headers";


export default async function Page() {
      const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const profile = await getUserProfile(token)
    return (
        <div className="px-6 pt-6 pb-[109px] ">
            <div className="flex flex-col gap-12 max-w-[796px] mx-auto px-6">
                <Section title={"Need Help?"} subtitle={"Have a question or need assistance? Fill out the form below, and we'll get back to you shortly."}>
                    <SupportForm profile={profile}/>
                </Section>
                <Section title={"Personal Information"}>
                    <FaqSection faqWidth={"w-full"}/>
                </Section>

            </div>
        </div>
    )
}



const Section = ({ children, title, subtitle }) => {
    return (
        <section className="flex flex-col p-6 gap-8 rounded-lg border-2 bg-white border-primary-200">
            <div className="space-y-4">
                <h3 className="text-md text-black">{title}</h3>
                {subtitle && <p className="text-neutral-800 font-mono">{subtitle}</p>}
            </div>
            {children}
        </section>
    )
}