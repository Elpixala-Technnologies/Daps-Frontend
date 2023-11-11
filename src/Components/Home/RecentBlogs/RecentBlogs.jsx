import useBlogs from "@/src/Hooks/useBlogs";
import Link from "next/link";
import { FaArrowRight, FaRegComment } from "react-icons/fa";
import Image from 'next/image';

const RecentBlogs = () => {
  const { blogData } = useBlogs();

  return (
    <section className='bg-[#F6F6F6] py-10 mt-[4rem]'>

      <section className="container py-6 sm:py-8 lg:py-12">
        <div className="  px-4 ">
          {/* Heading */}
          <div className="mb-10 md:mb-8">
            <div className='title text-center'>
              <h1>Latest <span>Blogs </span></h1>
            </div>

            <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
              necessitatibus molestias explicabo.
            </p>
          </div>
          {/* /Heading */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  mx-14 flex-col ">
            {
              blogData && blogData?.slice(0, 4)?.map((blog) => {
                return (

                  <div
                    className="cardBody md:m-0 flex flex-col   duration-200  "
                    key={blog._id}
                  >
                    <div className="blogImage">
                      <Image
                        src={blog?.image}
                        width={"500"}
                        height={"200"}
                        alt="blog Image"
                        className="w-full h-[15rem] rounded-t object-cover"
                      />
                    </div>
                    <hr className="w-full bg-slate-400" />
                    <div className="blogIntarection flex text-gray-500  py-2 items-center gap-4">
                      <div>{blog?.author}</div>
                      <div>{blog?.publushDate || Date.now()}</div>
                      <div className="blogLike">
                        <div className="flex justify-center items-center gap-2">
                          <FaRegComment /> 25
                        </div>
                      </div>
                    </div>
                    <div className="blogInfo mt-2 p-2">
                      <h2 className="blogName font-bold ">{blog?.title}</h2>
                      <p className="blogDescription py-3">{blog?.content}</p>
                    </div>

                    <div className="blogAddToCart flex gap-5 items-center">
                      <div>
                        <Link href={`/blogs/${blog?._id}`} className="border w-full px-4 py-4 flex justify-center items-center gap-4  hover:border-red-500 color-b bg-white p-2 md:p-3 text-center rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-[#29679e]">
                          Read More <FaArrowRight />
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>

        </div>
        <div className="flex justify-end items-end">
          <Link className="text-[#18568C]  text-center flex items-center gap-2"
            href="/blogs"
          >
            View All Blogs <FaArrowRight />
          </Link>
        </div>
      </section>
    </section>
  );
};

export default RecentBlogs;