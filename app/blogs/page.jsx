import AppHeader from '../_components/AppHeader';
import BlogCard from '../_components/BlogCard';
import Footer from '../_components/Footer';
import { getBlogs } from '../_lib/data-services';

const page = async () => {
    const blogs = await getBlogs();


    
  return (
    <div className=''>
        <AppHeader />
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10 max-w-7xl mx-auto'>
            {blogs.filter((blog) => blog.is_featured === true).map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
            ))}

        </section>
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10 max-w-7xl mx-auto'>
            {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
            ))}


        </section>
        <Footer />
        
    </div>
  )
}

export default page