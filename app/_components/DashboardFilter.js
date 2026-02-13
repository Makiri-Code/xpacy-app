"use client"
import { IoFilter } from "react-icons/io5";
import FilterMenu from "./FilterMenu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export default function DashboardFilter() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleFilter = (term, value) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(term, value);
        } else {
            params.delete(term);
        }
        replace(`${pathname}?${params.toString()}`);
    }

    // Initialize with current URL params
    const currentStatus = searchParams.get('status') || '';
    const currentType = searchParams.get('type') || '';
    const currentMinPrice = searchParams.get('minPrice') || '';
    const currentMaxPrice = searchParams.get('maxPrice') || '';

    return (
        <FilterMenu>
            <FilterMenu.Open name="filter">
                <button className='flex items-center justify-center p-3 text-2xl border border-primary-200 rounded-lg hover:bg-gray-50 transition-colors'>
                    <IoFilter />
                </button>
            </FilterMenu.Open>
            <FilterMenu.Window name="filter">
                <div className="flex flex-col w-[300px] z-50 rounded-lg p-4 border border-primary-200 bg-white shadow-xl gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Status</label>
                        <select 
                            value={currentStatus}
                            onChange={(e) => handleFilter("status", e.target.value)}
                            className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            <option value="">All Statuses</option>
                            <option value="active">Active</option>
                            <option value="rented">Rented</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Property Type</label>
                        <select 
                            value={currentType}
                            onChange={(e) => handleFilter("type", e.target.value)}
                            className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            <option value="">All Types</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Residential">Residential</option>
                            <option value="Terrace">Terrace</option>
                            <option value="Flat/Apartment">Flat/Apartment</option>
                            <option value="Duplex">Duplex</option>
                            <option value="Semi-detached">Semi-detached</option>
                            <option value="Fully-detached">Fully-detached</option>
                            <option value="Villa">Villa</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Price Range</label>
                        <div className="flex gap-2">
                            <input 
                                type="number" 
                                placeholder="Min" 
                                value={currentMinPrice}
                                onChange={(e) => handleFilter("minPrice", e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            <input 
                                type="number" 
                                placeholder="Max" 
                                value={currentMaxPrice}
                                onChange={(e) => handleFilter("maxPrice", e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex justify-end">
                        <button 
                            onClick={() => replace(pathname)}
                            className="text-xs text-red-500 hover:text-red-700 font-medium underline"
                        >
                            Clear All Filters
                        </button>
                    </div>
                </div>
            </FilterMenu.Window>
        </FilterMenu>
    )
}


