"use client";
import DataTable from "../DataTable";
import Image from "next/image";
import { format } from "date-fns";
import StatusChips from "../StatusChips";
import BlogOptionsMenu from "./BlogOptionsMenu";

const headings = [
    { heading: "Title & Author" },
    { heading: "Category" },
    { heading: "Published Date" },
    { heading: "Status", center: true },
    { heading: "" }
];

export default function AdminBlogsList({ blogs = [], title = "All Blogs List" }) {
    
    const safeFormatDate = (dateStr) => {
        if (!dateStr) return "N/A";
        try {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return "Invalid Date";
            return format(d, "MMM dd, yyyy");
        } catch {
            return "Invalid Date";
        }
    };

    const renderRow = (blog) => (
        <tr key={blog._id || blog.id} className="text-neutrals-900 text-sm font-mono border-b border-primary-100 hover:bg-gray-50 transition-colors last:border-0">
            <td className="p-4">
                <div className="flex items-center gap-3 w-full max-w-[300px]">
                    <div className="w-10 h-10 relative shrink-0 rounded-md overflow-hidden bg-gray-100">
                        <Image src={blog.cover_image ? `https://app.xpacy.com/src/upload/blog_img/${blog.cover_image}` : "/property-placeholder.jpg"} alt={blog.title || "Blog cover"} className="object-cover" unoptimized fill />
                    </div>
                    <div className="flex flex-col truncate">
                        <span className="font-semibold text-gray-900 truncate">{blog.title || "Untitled Blog"}</span>
                        <span className="text-xs text-gray-500 truncate">By {blog.author?.name || blog.author || "Unknown Author"}</span>
                    </div>
                </div>
            </td>
            <td className="p-4 text-gray-600">
                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">{blog.category || "Uncategorized"}</span>
            </td>
            <td className="p-4 text-gray-500">
                 {safeFormatDate(blog.createdAt || blog.published_at || blog.date)}
            </td>
            <td className="p-4 text-center">
                <div className="flex justify-center capitalize">
                    <StatusChips status={blog.status || "draft"} />
                </div>
            </td>
            <td className="p-4 relative text-center">
                <div className="flex justify-center">
                    <BlogOptionsMenu id={blog._id || blog.id} /> 
                </div>
            </td>
        </tr>
    );

    const renderMobileCard = (blog) => (
        <div key={blog._id || blog.id} className="flex flex-col gap-4 p-4 border-b border-primary-100 bg-white last:border-0 font-mono">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 overflow-hidden">
                    <div className="w-12 h-12 relative shrink-0 rounded-md overflow-hidden bg-gray-100">
                        <Image src={blog.cover_image ? `https://app.xpacy.com/src/upload/blog_img/${blog.cover_image}` : "/property-placeholder.jpg"} alt={blog.title || "Blog cover"} className="object-cover" unoptimized fill />
                    </div>
                    <div className="flex flex-col flex-1 truncate">
                        <h3 className="font-bold text-sm text-neutrals-900 truncate">{blog.title || "Untitled Blog"}</h3>
                        <p className="text-xs text-gray-500 truncate">By {blog.author?.name || blog.author || "Unknown Author"}</p>
                    </div>
                </div>
                <BlogOptionsMenu id={blog._id || blog.id} />
            </div>
            
            <div className="flex flex-col gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-gray-500 uppercase">Category:</span>
                    <span className="font-medium text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-200">{blog.category || "Uncategorized"}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-gray-500 uppercase">Date:</span>
                    <span className="font-medium text-gray-900">{safeFormatDate(blog.createdAt || blog.published_at || blog.date)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-gray-500 uppercase">Status:</span>
                    <StatusChips status={blog.status || "draft"} />
                </div>
            </div>
        </div>
    );

    return (
        <DataTable
            title={title}
            headers={headings}
            data={blogs}
            renderRow={renderRow}
            renderMobileCard={renderMobileCard}
            emptyMessage="No blogs found."
            showPagination={true}
        />
    );
}
