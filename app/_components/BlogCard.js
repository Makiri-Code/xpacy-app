import Image from "next/image";
import { format } from "date-fns";
import insightImg1 from "../../public/insight-image1.png";
import Link from "next/link";
import BlogOptionsMenu from "./blogs/BlogOptionsMenu";

export default function BlogCard({ blog, isAdmin = false }) {
  const rawImage = blog.image || (Array.isArray(blog.images) ? blog.images[0] : null);
  const baseImageUrl = "https://app.xpacy.com/src/upload/blog";
  
  const imageSrc = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : `${baseImageUrl}/${rawImage.startsWith("/") ? rawImage.slice(1) : rawImage}`
    : insightImg1;
    
  const formattedDate = blog.created_at || blog.createdAt
    ? format(new Date(blog.created_at || blog.createdAt), "dd MMMM yyyy") 
    : "Unknown Date";

  return (
    <div className="relative bg-gray-100 flex flex-row md:flex-col gap-4 md:gap-5 w-full group p-2 md:p-0 rounded-2xl hover:bg-gray-50 transition-colors">
      {isAdmin && (
        <div className="absolute top-2 right-2 md:top-3 md:right-3 z-30">
          <div className="bg-white/95 backdrop-blur-sm rounded-full shadow-lg p-0.5 hover:bg-white transition-all transform hover:scale-110 border border-gray-100">
            <BlogOptionsMenu id={blog._id || blog.id} slug={blog.slug} />
          </div>
        </div>
      )}

      <header className="w-32 h-32 md:w-full md:h-[267px] relative shrink-0 overflow-hidden rounded-2xl border border-gray-100 shadow-sm transition-all duration-300">
        <Image
          src={imageSrc}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {blog.is_featured && (
          <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 bg-primary/95 backdrop-blur-sm text-[8px] md:text-[10px] text-white px-2 md:px-2.5 py-0.5 md:py-1 rounded-full font-bold uppercase tracking-widest shadow-lg">
            Featured
          </div>
        )}
      </header>
      
      <footer className="flex flex-col gap-1 md:gap-2 font-mono px-1 flex-1 justify-center md:justify-start pr-8 md:pr-0">
        <div className="flex items-center gap-2">
           {blog.slug ? (
            <Link href={`/blogs/${blog.slug}`}>
              <p className="text-[10px] md:text-xs text-primary font-bold hover:text-primary-dark transition-colors uppercase tracking-widest">
                {blog.category?.name || blog.category || "Uncategorized"}
              </p>
            </Link>
          ) : (
            <p className="text-[10px] md:text-xs text-primary font-bold uppercase tracking-widest">
              {blog.category?.name || blog.category || "Uncategorized"}
            </p>
          )}
        </div>

        <h3 className="font-bold text-sm md:text-lg text-gray-900 line-clamp-2 md:line-clamp-2 min-h-0 md:min-h-14 leading-tight md:leading-snug group-hover:text-primary transition-colors">
          {blog.title}
        </h3> 
        
        <div className="flex items-center justify-between mt-1 md:mt-2 pt-1 md:pt-2 border-t border-gray-50">
          <p className="text-[9px] md:text-[11px] font-medium text-gray-400 uppercase tracking-tight">
            {formattedDate}
          </p>
          <p className="text-[9px] md:text-[11px] font-bold text-gray-400 uppercase tracking-tight italic hidden sm:block">
             {blog.readTime || "5 min read"}
          </p>
        </div>
      </footer>
    </div>
  );
}
