import React from 'react';
import Link from "next/link";
import useBlogs from "@/src/Hooks/useBlogs";

const RecentBlog = () => {
const {blogData} = useBlogs()

console.log(blogData, "blogDatablogData")


  return (
    <section className='container my-6'>
      <div className="">
      <h3 className="font-light  text-3xl text-black">Latest <strong className='font-extrabold text-[#29679e]'>Blogs</strong></h3>
      </div>


      <div className="my-6">
        <div>
          <div className=" grid gap-14 grid-cols-1 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
            {blogData && blogData?.slice(0, 3)?.map((post) => {
              return (
                <div key={post?._id}
                >
                  <div>
                    <a href={`/blogs/${post?._id}`}>
                      <img 
                       src={post?.image}
                      className="h-72 w-full rounded transition duration-200 ease-out transform hover:scale-105" alt="" />
                    </a>
                  </div>
                 
                  <div className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                    <p className="mt-3 text-base text-gray-500">{post.subtitle}</p>
                  </div>
                  <div className="mt-3">
                    <Link href={`/blogs/${post?._id}`} className="text-base font-semibold text-indigo-600 hover:text-indigo-500">
                      Read full story
                    </Link>
                  </div>
                </div>
              )
            })
            }
          </div>
        </div>
      </div>

    </section>
  );
};

export default RecentBlog;