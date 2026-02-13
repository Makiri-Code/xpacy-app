"use client"
import { Upload } from "lucide-react";
import { FaFileExport } from "react-icons/fa";
import * as XLSX from "xlsx";

export default function ExportButton({ data, filename = "export" }) {
    const handleExport = () => {
        if (!data || !data.length) return;

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);

        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `${filename}.xlsx`);
    }

    return (
        <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 font-medium text-primary border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
        >
            <Upload/>
            <span>Export Data</span>
        </button>
    )
}
