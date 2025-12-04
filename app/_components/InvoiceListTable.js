import EmptyState from "./EmptyState";
import InvoiceTableItem from "./InvoiceTableItem";
import UserFilterMenu from "./UserFilterMenu";
import { getInvoiceList } from "@/app/_lib/data-services";
import { cookies } from "next/headers";

export default async function InvoiceListTable() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const invoices = await getInvoiceList(token);
    if (invoices?.length === 0) return <div className="grid place-content-center p-6 border border-primary-200 bg-white rounded-lg"><EmptyState message={"Opps... No invoices available"} /></div>
    return (
        <div className="flex flex-col p-6 gap-6 border border-primary-200 bg-white rounded-lg">
            <header className="flex items-center justify-between relative">
                <h2 className="text-md">Invoice list</h2>
                <div className="flex items-center gap-2">
                    {/* Sortby */}
                    <div className="flex items-center space-x-2.5 font-mono text-base-500">
                        <span>Sort by:</span>
                        <select className="p-2.5 border border-neutral-200 rounded-lg">
                            <option>Default</option>
                            <option>Oldest to newest </option>
                            <option>Newest to oldest</option>
                        </select>
                    </div>
                    {/* Filter */}
                    <UserFilterMenu />
                </div>
            </header>
            <table className="table-auto font-mono">
                <thead>
                    <tr className="font-bold border-b border-gray-300">
                        <td className="p-4">Invoice No</td>
                        <td className="p-4">Type</td>
                        <td className="p-4">Description</td>
                        <td className="p-4">Issued Date</td>
                        <td className="p-4">Due Date</td>
                        <td className="p-4">Payment Amount</td>
                        <td className="p-4">Payment Status</td>
                        <td className="p-4"></td>
                    </tr>
                </thead>
                <tbody>
                    {invoices?.map((invoice) => <InvoiceTableItem invoice={invoice} key={invoice.id} />)}
                </tbody>
            </table>
        </div>
    )
}