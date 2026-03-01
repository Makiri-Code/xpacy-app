import IssueInvoice from "@/app/_components/IssueInvoice";
import { cookies } from "next/headers";
import { getAllUsers } from "@/app/_lib/data-services";



export default async function Page() {

    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const users = await getAllUsers(token);
    // const invoice = await getInvoice(token, pageParam.userId)
    return (
        <IssueInvoice token={token} users={users?.data || []}/>
    )
}