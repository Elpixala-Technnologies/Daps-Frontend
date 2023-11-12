// import RootLayout from '@/src/Layouts/RootLayout';
// import React from 'react';
// import useBlogs from "@/src/Hooks/useBlogs";
// import Link from "next/link";
// import { FaArrowRight } from "react-icons/fa"

// const BlogPage = () => {
//     const { blogData } = useBlogs();
//     return (
//         <RootLayout>
//             <section className='px-4  md:container'>
//                 <div className='title my-10 text-center'>
//                     <h1>All <span>Blogs</span></h1>
//                 </div>

//                 <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
//                     {
//                         blogData && blogData?.map((blog) => {
//                             return (
//                                 <article className="flex flex-col items-center justify-center gap-4 md:flex-row lg:gap-6">
//                                 <a
//                                   href="#"
//                                   className="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
//                                 >
//                                   <img
//                                     src={blog?.image}
//                                     loading="lazy"
//                                     alt={blog?.title}
//                                     className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
//                                   />
//                                 </a>
//                                 <div className="flex flex-col gap-2">
//                                   <span className="text-sm text-gray-400">April 2, 2023</span>
//                                   <h2 className="text-xl font-bold text-gray-800">
//                                     <a
//                                       href="#"
//                                       className="transition duration-100 hover:text-[#18568C] active:text-rose-600"
//                                     >
//                                      {blog?.title}
//                                     </a>
//                                   </h2>
//                                   <p className="text-gray-500">
//                                   {blog?.content}
//                                   </p>
//                                   <span>
//                                             {blog?.tags.slice(0, 2).map((tag) => {
//                                                 return (
//                                                     <span key={tag} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2"> #{tag} </span>
//                                                 )
//                                             })}
//                                         </span>
//                                   <div>
//                                   <Link className="common-btn-outline w-full text-left flex items-center gap-2 "
//                                             href={`/blogs/${blog?._id}`}
//                                         >
//                                             Read More <FaArrowRight />
//                                         </Link>
//                                   </div>
//                                 </div>
//                               </article>
//                             )
//                         })
//                     }
//                 </div>
//             </section>
//         </RootLayout>
//     );
// };

// export default BlogPage;


import { blogData } from '@/src/Utils/Mock/CommonData';
import React from 'react';

const BlogPage = () => {
    return (
        <section className='my-6'>
            <div className="mx-auto max-w-screen-sm">
                <div className='title my-2'>
                <h1>New <span>Blogs</span></h1>
                </div>
                <p className="mb-8 font-light text-center text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
                    Exploring the Unseen: Latest Insights into Quantum Computing
                </p>
            </div>


            <div className="my-10 p-4">
                <div>
                    <div className=" grid gap-14 grid-cols-1 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
                        {blogData && blogData?.slice(0, 3)?.map((post) => {
                            return (
                                <div key={post.id}
                                >
                                    <div>
                                        <a href={post.id}>
                                            <img className="h-72 w-full object-cover rounded transition duration-200 ease-out transform hover:scale-105" src={post.images[0]} alt="" />
                                        </a>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-4">
                                        <time dateTime={post.datetime}>{post.date}</time>
                                    </p>
                                    <a href={post.href} className="mt-2 block">
                                        <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                                        <p className="mt-3 text-base text-gray-500">{post.description}</p>
                                    </a>
                                    <div className="mt-3">
                                        <a href={post.href} className="text-base font-semibold text-indigo-600 hover:text-indigo-500">
                                            Read full story
                                        </a>
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

export BlogPage;