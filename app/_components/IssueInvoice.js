"use client"
import { useState, useRef } from "react"
import { toPng } from "html-to-image"
import { saveAs } from "file-saver"
import Invoice from "./Invoice"
import InvoiceNav from "./InvoiceNav"
import toast from "react-hot-toast"
import { submitInvoiceAction } from "../_lib/action"
import { useParams } from "next/navigation"

export default function IssueInvoice({ token }) {
  const targetRef = useRef(null)
const params = useParams();
  const defaultInvoice = {
    recipientId: params?.userId, 
    invoiceNumber: "",
    issuedDate: new Date(),
    dueDate: new Date(),
    status: "Pending",
    user: {
      firstname: "",
      lastname: "",
      address: "",
      email: "",
      phone: "",
    },
    items: [
      {
        description: "",
        unitPrice: 0,
        quantity: 1,
      },
    ],
    subTotal: 0,
    tax: 0,
    total: 0,
    invoiceReason: "Shortlet"
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

  return (
    <div className="flex flex-col gap-8 px-6 lg:px-[7%] pb-12">

      <InvoiceNav />
      <Invoice
        ref={targetRef}
        invoice={invoice}
        mode="edit"
        onChange={updateInvoice}
      />
      <div className="flex gap-4 flex-1 justify-between">
        <button
          onClick={downloadPng}
          className="border border-primary text-primary px-4 py-2 rounded-lg font-mono cursor-pointer"
        >
          Download PNG
        </button>
        <button
          onClick={submitInvoice}
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded-lg font-mono cursor-pointer"
        >
          {loading ? "Submitting..." : "Submit Invoice"}
        </button>
      </div>
    </div>
  )
}