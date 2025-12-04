"use client"
import Invoice from "@/app/_components/Invoice";
import InvoiceBtn from "@/app/_components/InvoiceBtns";
import {usePDF, Margin} from 'react-to-pdf';

export default function InvoiceContainer({invoice, token}){
    const {toPDF, targetRef} = usePDF({
    filename: `Invoice_${invoice?.invoiceNumber || "invoice"}`,
    page: { margin: Margin.MEDIUM, orientation: 'portrait' },
    canvas: {
      // default is 'image/jpeg' for better size performance
      mimeType: 'image/png',
      qualityRatio: 1
   },
  })
    return (
        <>
            <Invoice invoice={invoice} ref={targetRef} />
            <InvoiceBtn token={token} onDownload={toPDF}  />
        </>
    )
}