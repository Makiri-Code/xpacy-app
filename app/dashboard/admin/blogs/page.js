import AdminBlogsList from "@/app/_components/blogs/AdminBlogsList";
import BlogsSummary from "@/app/_components/blogs/BlogsSummary";
import { Plus } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    // Placeholder data until endpoint is ready
    const blogs = [];

    const stats = {
        totalBlogs: blogs.length,
        publishedBlogs: blogs.filter(b => b.status === 'published').length,
        draftBlogs: blogs.filter(b => b.status === 'draft').length,
        scheduledBlogs: blogs.filter(b => b.status === 'scheduled').length,
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center mb-2">
                <h1 className="lg:text-4xl text-[28px] text-primary font-bold capitalize">Blogs Management</h1>
                <Link 
                    href="/dashboard/admin/blogs/create" 
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm"
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Create New Blog</span>
                </Link>
            </div>
            
            <BlogsSummary {...stats} />
            
            <div className="mt-8">
                <AdminBlogsList blogs={blogs} title="All Blogs" />
            </div>
        </div>
    );
}
