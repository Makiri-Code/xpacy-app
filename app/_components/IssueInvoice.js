"use client"
import { useState, useRef, useEffect } from "react"
import { toPng } from "html-to-image"
import { saveAs } from "file-saver"
import Invoice from "./Invoice"
import InvoiceNav from "./InvoiceNav"
import toast from "react-hot-toast"
import { submitInvoiceAction } from "../_lib/action"
import { useParams } from "next/navigation"

export default function IssueInvoice({ token, users, booking }) {
  const targetRef = useRef(null)
  const params = useParams();
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Extract booking details if available
  const bUser = booking?.user || {};
  let rawAmount = booking?.amount || booking?.property?.property_price || booking?.property?.price || 0;
  // If the price comes in as a formatted string (e.g. "1,000,000"), strip the commas before converting.
  let bAmount = typeof rawAmount === 'string' ? Number(rawAmount.replace(/,/g, '')) : Number(rawAmount);
  if (isNaN(bAmount)) bAmount = 0;
  const bPropertyTitle = booking?.property?.property_name || booking?.property?.title ? `Booking for ${booking.property.property_name || booking.property.title}` : "";

  const defaultInvoice = {
    recipientId: params?.userId || booking?.user?.id || booking?.user?._id || "", 
    invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
    issuedDate: new Date(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 days from now
    status: "Pending",
    user: {
      firstname: bUser.firstname || bUser.first_name || "",
      lastname: bUser.lastname || bUser.last_name || "",
      address: booking?.property?.address || "",
      email: bUser.email || "",
      phone: bUser.phone || "",
    },
    items: [
      {
        description: bPropertyTitle || "Standard Booking",
        unitPrice: bAmount,
        quantity: 1,
      },
    ],
    subTotal: bAmount,
    tax: 0,
    total: bAmount,
    invoiceReason: "Shortlet" // Or "Services" based on needs
  }

  const [invoice, setInvoice] = useState(defaultInvoice)
  const [loading, setLoading] = useState(false)

  const updateInvoice = (path, value) => {
    setInvoice(prev => {
      const copy = structuredClone(prev)
      const keys = path.split(".")
      let obj = copy
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]]
      }
      obj[keys[keys.length - 1]] = value
      return copy
    })
  }

  const submitInvoice = async () => {
    try {
      setLoading(true)
      const res = await submitInvoiceAction(invoice, token)
      toast.success("Invoice created successfully")
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const downloadPng = async () => {
    if (!targetRef.current) return
    try {
      const dataUrl = await toPng(targetRef.current, { cacheBust: true })
      const res = await fetch(dataUrl)
      const blob = await res.blob()
      saveAs(blob, `Invoice_${invoice.invoiceNumber || "invoice"}.png`)
    } catch {
      toast.success("Image download failed")
    }
  }

  if (!mounted) return null;

  return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <Invoice
          ref={targetRef}
          invoice={invoice}
          mode="edit"
          className="flex"
          users={users}
          onChange={updateInvoice}
        />
        
        <div className="flex gap-4 p-6 justify-end items-center border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={downloadPng}
            className="border border-primary-200 hover:bg-primary-50 text-primary px-6 py-2.5 rounded-lg font-bold font-mono transition-colors"
          >
            Download PNG
          </button>
          <button
            onClick={submitInvoice}
            disabled={loading}
            className="bg-primary hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg font-bold font-mono transition-colors disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Invoice"}
          </button>
        </div>
      </div>
  )
}