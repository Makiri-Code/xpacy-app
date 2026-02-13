"use client"
import Filter from "@/app/_components/Filter";

export default function Page() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Search Properties</h1>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <p className="mb-4 text-gray-600">Search for properties across the marketplace.</p>
                <Filter />
            </div>
        </div>
    )
}
