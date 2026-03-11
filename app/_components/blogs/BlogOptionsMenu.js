import { MoreVertical, Edit2, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BlogOptionsMenu({ id }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
            >
                <MoreVertical className="w-4 h-4" />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <Link
                        href={`/dashboard/admin/blogs/${id}`}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <Eye className="w-4 h-4 text-gray-400" />
                        View Details
                    </Link>
                    <Link
                        href={`/dashboard/admin/blogs/${id}/edit`}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <Edit2 className="w-4 h-4 text-blue-500" />
                        Edit Blog
                    </Link>
                    <button
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete Blog
                    </button>
                </div>
            )}
        </div>
    );
}
