import { IoCardOutline } from "react-icons/io5";
import { formatCurrency } from "../_lib/utils";


export default function InvoiceSummary() {

    return (
        <div className="p-6 flex flex-col gap-4 border border-primary-200 rounded-lg">
            <p className="text-md">Summary</p>
            <div className="flex flex-col gap-4">
                {/* Total payments card */}
                <div className="flex flex-col border border-primary-200 rounded-lg  px-6 py-7 relative overflow-hidden">
                    <div className="flex gap-2 items-center w-[256px]" >
                        <span className="w-12 h-12 text-primary bg-[#C3E5C4] rounded-full flex items-center justify-center text-2xl "><IoCardOutline /></span>
                        <span className="font-mono text-primary-900">TOTAL PAYMENTS</span>
                    </div>
                    <p className="text-center font-bold text-2xl font-mono w-[256px]">{formatCurrency(5000000)}</p>
                    <div className="w-[220px] h-[220px] rounded-full absolute -right-[7%] -top-1 bg-[#477899] z-10"></div>
                    <div className="w-[220px] h-[220px] rounded-full absolute right-[4%] top-2 bg-[#73A0BE]"></div>
                </div>
                {/*  */}
                <div className="flex items-center justify-between">
                    {/* Rent */}
                    <div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-lg bg-white border border-primary-100 w-[322px]">
                        <p className="font-mono text-[#477899] text-base">Rent</p>
                        <p className="text-center font-bold text-lg font-mono">{formatCurrency(4500000)}</p>
                    </div>
                    {/* Purchases */}
                     <div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-lg bg-white border border-primary-100 w-[322px]">
                        <p className="font-mono text-[#477899] text-base">Purchases</p>
                        <p className="text-center font-bold text-lg font-mono">{formatCurrency(4500000)}</p>
                    </div>
                    {/* Services */}
                    <div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-lg bg-white border border-primary-100 w-[322px]">
                        <p className="font-mono text-[#477899] text-base">Services</p>
                        <p className="text-center font-bold text-lg font-mono">{formatCurrency(4500000)}</p>
                    </div>
                </div>
            </div>
        </div>
            )
}