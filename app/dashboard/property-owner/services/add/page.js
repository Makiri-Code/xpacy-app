import BookServiceForm from "@/app/_components/BookServiceForm";
import { getPropertyOwnerProfile } from "@/app/_lib/data-services";
import { cookies } from "next/headers";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const user = await getPropertyOwnerProfile(token);
    
    return (
        <div className="max-w-4xl mx-auto pb-12">
             <BookServiceForm user={user} />
        </div>
    )
}
