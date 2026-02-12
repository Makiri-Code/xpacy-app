import IssueInvoice from "@/app/_components/IssueInvoice";
import { cookies } from "next/headers";



export default async function Page() {

    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    // const invoice = await getInvoice(token, pageParam.userId)
    return (
        <IssueInvoice token={token}/>
    )
}