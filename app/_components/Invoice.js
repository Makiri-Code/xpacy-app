"use client"
import Image from "next/image"
import { FaFacebook, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6"
import { format } from "date-fns"
import { formatCurrency } from "../_lib/utils"
import { useEffect } from "react"

export default function Invoice({
  invoice,
  mode = "view",
  onChange,
  ref
}) {
  const isEdit = mode === "edit"

  const update = (path, value) => {
    onChange?.(path, value)
  }

  // Recalculate subtotal, tax, total whenever items change
  useEffect(() => {
    const itemsList = invoice?.items || []
    const subTotal = itemsList.reduce(
      (sum, i) => sum + Number(i?.unitPrice || 0) * Number(i?.quantity || 0),
      0
    )
    const tax = subTotal * 0.075
    const total = subTotal + tax

    onChange?.("subTotal", subTotal)
    onChange?.("tax", tax)
    onChange?.("total", total)
  }, [invoice?.items])

  return (
    <div ref={ref} className="hidden lg:flex flex-col gap-16 p-6 rounded-lg border-2 border-primary-200 bg-white">
      {/* Header */}
      <header className="flex items-start justify-between">
        <div className="w-[180px] h-[123px] relative">
          <Image src="/invoice-logo.png" alt="logo" fill className="object-cover" />
        </div>

        <div className="flex flex-col gap-8">
          <h1 className="text-[64px] text-primary font-bold">INVOICE</h1>
          <div className="flex flex-col items-end gap-6 font-mono">
            <Field label="Invoice Number" value={invoice?.invoiceNumber || ""} />
            <Field label="Issued Date" value={invoice?.issuedDate || new Date()} type="date" isEdit={isEdit} onChange={v => update("issuedDate", v)} />
            <Field label="Due Date" value={invoice?.dueDate || new Date()} type="date" isEdit={isEdit} onChange={v => update("dueDate", v)} />
          </div>
        </div>
      </header>

      {/* Recipient */}
      <section className="flex justify-between items-center">
        <div className="flex flex-col gap-6">
          <h2 className="text-primary">Recipient&apos;s Details</h2>
          <div className="space-y-2 font-mono">
            <EditableText value={invoice?.user?.firstname || ""} isEdit={isEdit} onChange={v => update("user.firstname", v)} placeholder={"Enter Recipent's first name"} />
            <EditableText value={invoice?.user?.lastname || ""} isEdit={isEdit} onChange={v => update("user.lastname", v)} placeholder={"Enter Recipent's last name"} />
            <EditableText value={invoice?.user?.address || ""} isEdit={isEdit} onChange={v => update("user.address", v)} placeholder={"Enter Recipent's address"} />
            <EditableText value={invoice?.user?.email || ""} isEdit={isEdit} onChange={v => update("user.email", v)} placeholder={"Enter Recipent's email"} />
            <EditableText value={invoice?.user?.phone || ""} isEdit={isEdit} onChange={v => update("user.phone", v)} placeholder={"Enter Recipent's phone number"} />
          </div>
        </div>
        <span className="bg-error w-max text-secondary-100 px-4 py-2 rounded-full text-2xl font-bold font-mono">
          {invoice?.status || "Pending"}
        </span>
      </section>

      {/* Items */}
      <section className="py-6">
        <div className="grid grid-cols-[3fr_1fr_1fr_2fr] font-mono font-bold border-b">
          <p className="p-4 text-left">Description</p>
          <p className="p-4 text-right">Price</p>
          <p className="p-4 text-right">Qty</p>
          <p className="p-4 text-right">Total</p>
        </div>

        {(invoice?.items || []).map((item, i) => (
          <div key={i} className="grid grid-cols-[3fr_1fr_1fr_2fr] font-mono border-b">
            <Cell value={item?.description || ""} isEdit={isEdit} onChange={v => update(`items.${i}.description`, v)} align="left" />
            <Cell value={item?.unitPrice || 0} isEdit={isEdit} onChange={v => update(`items.${i}.unitPrice`, Number(v))} type="number" />
            <Cell value={item?.quantity || 1} isEdit={isEdit} onChange={v => update(`items.${i}.quantity`, Number(v))} type="number" />
            <p className="p-4 text-right font-bold">{formatCurrency((item?.unitPrice || 0) * (item?.quantity || 1))}</p>
          </div>
        ))}

        <TotalRow label="Sub-total" value={invoice?.subTotal || 0} />
        <TotalRow label="Tax (7.5%)" value={invoice?.tax || 0} />
        <TotalRow label="TOTAL" value={invoice?.total || 0} highlight />
      </section>

      {/* Footer */}
      <section className="flex justify-between">
        <div className="flex flex-col gap-6 font-mono">
          <p><b>Address:</b> No. 1 Joe Akonobi Street</p>
          <p><b>Email:</b> info@xpacy.com</p>
          <p><b>Phone:</b> 09068557780</p>
          <div className="flex space-x-6 text-2xl">
            <FaFacebook />
            <FaXTwitter />
            <FaInstagram />
            <FaTiktok />
          </div>
        </div>
        <div className="w-[217px] h-[217px] relative">
          <Image src="/invoice-stamp.png" alt="stamp" fill />
        </div>
      </section>
    </div>
  )
}

/* ---------- Primitives ---------- */

const Field = ({ label, value, isEdit, onChange, type="text" }) => {
  const displayValue = () => {
    if (type === "date") {
      if (!value) return "N/A"
      try {
        return format(new Date(value), "dd/MM/yy")
      } catch (e) {
        return "Invalid Date"
      }
    }
    return value || ""
  }

  const inputValue = () => {
    if (type === "date") {
      if (!value) return ""
      try {
        return new Date(value).toISOString().slice(0, 10)
      } catch (e) {
        return ""
      }
    }
    return value || ""
  }

  return (
    <p>
      {label}:{" "}
      {isEdit ? (
        <input
          type={type}
          value={inputValue()}
          onChange={e => onChange(type === "date" ? new Date(e.target.value) : e.target.value)}
          className="border border-primary-700 px-3 py-2 rounded-lg outline-none"
        />
      ) : (
        <span>{displayValue()}</span>
      )}
    </p>
  )
}

const EditableText = ({ value, isEdit, onChange, placeholder }) =>
  isEdit ? (
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="border-b border-primary-200 outline-none w-full" />
  ) : (
    <p>{value}</p>
  )

const Cell = ({ value, isEdit, onChange, type="text", align="right" }) => (
  <div className="p-4">
    {isEdit ? (
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full border py-2 px-3 rounded-lg border-primary-100 outline-none text-${align}`}
      />
    ) : (
      <p className={`text-${align}`}>{value}</p>
    )}
  </div>
)

const TotalRow = ({ label, value, highlight }) => (
  <div className={`flex justify-between font-mono font-bold border-b ${highlight ? "bg-primary-200" : ""}`}>
    <p className="p-4">{label}</p>
    <p className="p-4">{formatCurrency(value)}</p>
  </div>
)