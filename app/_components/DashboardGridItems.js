import Link from "next/link";


export default function DashboardGridItem({ children, viewAllLink, title }) {

    return (
        <div className="p-6 border-[1.5px] border-primary-200 flex flex-col gap-4 rounded-lg">
            <div className="flex items-center justify-between">
                <h3 className="text-md text-black">{title}</h3>
                <Link href={viewAllLink} className="p-2 border-b border-primary text-primary font-mono font-semibold">View All</Link>
            </div>
            {children}
        </div>
    )
}