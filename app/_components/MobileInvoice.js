
import Image from "next/image";
import { formatCurrency } from "../_lib/utils";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";
import { format } from "date-fns";


export default function MobileInvoice({ invoice }) {
    return (
        <div className="flex flex-col gap-16 lg:p-6 rounded-lg lg:border-2 lg:border-primary-200 bg-white lg:hidden w-full">
            {/* Invoice Header */}
            <header className="flex items-start lg:flex-row flex-col justify-between gap-12 lg:gap-0 ">
                <div className="lg:w-[180px] lg:h-[123px] w-[90px] h-[61px] self-center lg:self-auto relative">
                    <Image src={"/invoice-logo.png"} alt="logo" fill className="object-cover" />
                </div>
                <div className="flex flex-col lg:gap-8 gap-6">
                    <h1 className="lg:text-[64px] text-[32px] text-primary font-bold">INVOICE</h1>
                    {/* Invoice number & dates */}
                    <div className="flex flex-col lg:items-end lg:gap-6 gap-4">
                        <p className="text-base lg:text-md text-black">Invoice Number: <span className="text-base font-mono"> {invoice?.invoiceNumber}</span></p>
                        <p className="text-base lg:text-md text-black">Issued Date: <span className="text-base font-mono"> {format(invoice?.issuedDate, "dd/MM/yy")}</span></p>
                        <p className="text-base lg:text-md text-black">Due Date:  <span className="text-base font-mono"> {format(invoice?.dueDate, "dd/MM/yy")} </span></p>
                    </div>
                </div>
            </header>
            {/* Recipent section */}
            <section className="flex items-start justify-between flex-col lg:flex-row gap-8 lg:gap-0">
                <div className="flex flex-col items-start gap-6">
                    <h2 className="text-primary">Recipient&apos;s Details</h2>
                    <div className="space-y-2 font-mono">
                        <p>{invoice?.user.firstname} {invoice?.user.lastname}</p>
                        <p>{invoice?.user?.address}</p>
                        <p>{invoice?.user?.email}</p>
                        <p>{invoice?.user?.phone}</p>
                    </div>
                </div>
                <p className={`-order-1 bg-error text-secondary-100 w-max  px-2.5 py-2  rounded-full text-center text-2xl font-bold font-mono`}><span className="block my-auto">{invoice?.status}</span></p>
            </section>
            {/* Invoice details table */}
            <section className="py-6">
                {/* Header */}
                <div className="grid grid-cols-[3fr_1fr_1fr_2fr] text-neutrals-900 text-sm font-mono font-bold border-b border-primary-100">
                    <p className="p-4 ">Description</p>
                    <p className="p-4 text-right">Price</p>
                    <p className="p-4 text-right">Qty</p>
                    <p className="p-4 text-right">Total Amount</p>
                </div>
                {/* Body */}
                {invoice?.items.map((item) => (
                    <div className="grid grid-cols-[3fr_1fr_1fr_2fr] text-neutrals-900 text-sm font-mono border-b border-primary-100" key={item?.id}>
                        <p className="p-4 ">{item?.description}</p>
                        <p className="p-4 text-right">{formatCurrency(item?.unitPrice)}</p>
                        <p className="p-4 text-right">{item?.quantity}</p>
                        <p className="p-4 text-right font-bold">{formatCurrency(item?.total)}</p>
                    </div>
                ))}
                <div className="grid grid-cols-[3fr_1fr_1fr_2fr] text-neutrals-900 text-sm font-mono border-b border-primary-100">
                    <p className="p-4 "></p>
                    <p className="p-4 text-right"></p>
                    <p className="p-4 text-right"></p>
                    <p className="p-4 text-right font-bold"></p>
                </div>
                {/* Sub-total */}
                <div className="flex items-center justify-between text-neutrals-900 text-sm font-bold font-mono border-b border-primary-100">
                    <p className="p-4 ">Sub-total</p>
                    <p className="p-4 text-right">{formatCurrency(invoice?.subTotal)}</p>
                </div>
                {/* tax */}
                <div className="flex items-center justify-between text-neutrals-900 text-sm font-bold font-mono border-b border-primary-100">
                    <p className="p-4 ">Tax (7.5%)</p>
                    <p className="p-4 text-right">{formatCurrency(invoice?.tax)}</p>
                </div>
                {/* Total */}
                <div className="flex items-center justify-between text-neutrals-900 text-md font-bold font-mono bg-primary-200 border-b border-primary-100">
                    <p className="p-4 ">TOTAL</p>
                    <p className="p-4 text-right">{formatCurrency(invoice?.total)}</p>
                </div>
            </section>
            {/* Terms and Conditions */}
            <section className="flex flex-col gap-4 ">
                <p className="text-md">Terms & Conditions</p>
                <p className="font-mono">Payments made into Xpacy account cannot be refunded.</p>
            </section>
            {/* Invoice Payment Information */}
            <section className="flex lg:items-center justify-between lg:flex-row flex-col gap-8 lg:gap-0">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2 font-mono text-base text-black">
                        <p>
                            <span className="font-bold">Address:</span> No. 1 Joe Akonobi
                            Street, Ojodu Berger.
                        </p>
                        <p>
                            <span className="font-bold">Email:</span> info@xpacy.com
                        </p>
                        <p>
                            <span className="font-bold">Phone:</span> 09068557780
                        </p>
                    </div>
                    <div className="flex space-x-6">
                        <Link href={"#"} className="text-black text-2xl">
                            <FaFacebook />
                        </Link>
                        <Link href={"#"} className="text-black text-2xl">
                            <FaXTwitter />
                        </Link>
                        <Link href={"#"} className="text-black text-2xl">
                            <FaInstagram />
                        </Link>
                        <Link href={"#"} className="text-black text-2xl">
                            <FaTiktok />
                        </Link>
                    </div>
                </div>
                <div className="w-[217px] h-[217px] relative">
                    <Image src={'/invoice-stamp.png'} alt="stamp" fill className="object-cover" />
                </div>
            </section>
        </div>
    )
}