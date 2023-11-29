// import useBlogs from "@/src/Hooks/useBlogs";
// import Link from "next/link";
// import { FaArrowRight, FaRegComment } from "react-icons/fa";
// import Image from 'next/image';

// const RecentBlogs = () => {
//   const { blogData } = useBlogs();

//   return (
//     <section className='bg-[#F6F6F6] py-10 mt-[4rem]'>

//       <section className="container py-6 sm:py-8 lg:py-12">
//         <div className="  px-4 ">
//           {/* Heading */}
//           <div className="mb-10 md:mb-8">
            // <div className='title text-center'>
            //   <h1>Latest <span>Blogs </span></h1>
            // </div>

//             <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
//               Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
//               necessitatibus molestias explicabo.
//             </p>
//           </div>
//           {/* /Heading */}

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  mx-14 flex-col ">
//             {
//               blogData && blogData?.slice(0, 4)?.map((blog) => {
//                 return (

//                   <div
//                     className="cardBody md:m-0 flex flex-col   duration-200  "
//                     key={blog._id}
//                   >
//                     <div className="blogImage">
//                       <Image
//                         src={blog?.image}
//                         width={"500"}
//                         height={"200"}
//                         alt="blog Image"
//                         className="w-full h-[15rem] rounded-t object-cover"
//                       />
//                     </div>
//                     <hr className="w-full bg-slate-400" />
//                     <div className="blogIntarection flex text-gray-500  py-2 items-center gap-4">
//                       <div>{blog?.author}</div>
//                       <div>{blog?.publushDate || Date.now()}</div>
//                       <div className="blogLike">
//                         <div className="flex justify-center items-center gap-2">
//                           <FaRegComment /> 25
//                         </div>
//                       </div>
//                     </div>
//                     <div className="blogInfo mt-2 p-2">
//                       <h2 className="blogName font-bold ">{blog?.title}</h2>
//                       <p className="blogDescription py-3">{blog?.content}</p>
//                     </div>

//                     <div className="blogAddToCart flex gap-5 items-center">
//                       <div>
//                         <Link href={`/blogs/${blog?._id}`} className="border w-full px-4 py-4 flex justify-center items-center gap-4  hover:border-red-500 color-b bg-white p-2 md:p-3 text-center rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-[#29679e]">
//                           Read More <FaArrowRight />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 )
//               })
//             }
//           </div>

//         </div>
//         <div className="flex justify-end items-end">
//           <Link className="text-[#18568C]  text-center flex items-center gap-2"
//             href="/blogs"
//           >
//             View All Blogs <FaArrowRight />
//           </Link>
//         </div>
//       </section>
//     </section>
//   );
// };

// export default RecentBlogs;

export const blogData = [
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    images: [
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/khelxh6q8pupq8vwm1st.webp",
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/nzwhoufrs5npnbnp3jyt.webp",
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/l1la2kr8rknt2ggvu853.webp"
    ],
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    images: [
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/nzwhoufrs5npnbnp3jyt.webp",
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/khelxh6q8pupq8vwm1st.webp",
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/l1la2kr8rknt2ggvu853.webp"
    ],
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    images: [
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/l1la2kr8rknt2ggvu853.webp",
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/khelxh6q8pupq8vwm1st.webp",
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/nzwhoufrs5npnbnp3jyt.webp",
    ],
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 4,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    images: [
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/khelxh6q8pupq8vwm1st.webp",
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/nzwhoufrs5npnbnp3jyt.webp",
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/l1la2kr8rknt2ggvu853.webp"
    ],
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 5,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    images: [
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/nzwhoufrs5npnbnp3jyt.webp",
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/khelxh6q8pupq8vwm1st.webp",
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/l1la2kr8rknt2ggvu853.webp"
    ],
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 6,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    images: [
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/l1la2kr8rknt2ggvu853.webp",
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/nzwhoufrs5npnbnp3jyt.webp",
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/khelxh6q8pupq8vwm1st.webp",
    ],
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 7,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    images: [
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/nzwhoufrs5npnbnp3jyt.webp",
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/khelxh6q8pupq8vwm1st.webp",
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/l1la2kr8rknt2ggvu853.webp"
    ],
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 7,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    images: [
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/l1la2kr8rknt2ggvu853.webp",
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/nzwhoufrs5npnbnp3jyt.webp",
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/khelxh6q8pupq8vwm1st.webp",
    ],
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 8,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    images: [
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/l1la2kr8rknt2ggvu853.webp",
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/nzwhoufrs5npnbnp3jyt.webp",
      "https://res.cloudinary.com/elpixala/image/upload/v1698948143/koburg/blog/khelxh6q8pupq8vwm1st.webp",
    ],
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]



import React from 'react';
import Link from "next/link";

const RecentBlog = () => {

  return (
    <section className='my-6'>
      <div className="container">
      <h3 className="font-light  text-3xl text-black">Latest <strong className='font-extrabold text-[#29679e]'>Blogs</strong></h3>
      </div>


      <div className="my-6 p-2">
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
                    <Link href={post.href} className="text-base font-semibold text-indigo-600 hover:text-indigo-500">
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