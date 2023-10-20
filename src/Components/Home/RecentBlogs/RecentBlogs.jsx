import useBlogs from "@/src/Hooks/useBlogs";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa"

const RecentBlogs = () => {
  const { blogData } = useBlogs();

  return (
    <section className='container'>

      <section className="py-6 sm:py-8 lg:py-12">
        <div className=" max-w-screen-xl px-4 ">
          {/* Heading */}
          <div className="mb-10 md:mb-8">
            <div className='title text-center'>
              <h1>Most Recent <span>Posts </span></h1>
            </div>

            <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
              necessitatibus molestias explicabo.
            </p>
          </div>
          {/* /Heading */}

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
            {
              blogData && blogData?.slice(0, 4)?.map((blog) => {
                return (
                  <article className="flex flex-col items-center justify-center gap-4 md:flex-row lg:gap-6">
                    <a
                      href="#"
                      className="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
                    >
                      <img
                        src={blog?.image}
                        loading="lazy"
                        alt={blog?.title}
                        className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                      />
                    </a>
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-gray-400">April 2, 2023</span>
                      <h2 className="text-xl font-bold text-gray-800">
                        <a
                          href="#"
                          className="transition duration-100 hover:text-[#18568C] active:text-rose-600"
                        >
                          {blog?.title}
                        </a>
                      </h2>
                      <p className="text-gray-500">
                        {blog?.content.slice(0,80)}
                      </p>
                      <span>
                        {blog?.tags.slice(0, 2).map((tag) => {
                          return (
                            <span key={tag} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2"> #{tag} </span>
                          )
                        })}
                      </span>
                      <div>
                        <Link className="text-[#18568C]  text-center flex items-center gap-2 w-full text-left flex items-center gap-2 "
                          href={`/blogs/${blog?._id}`}
                        >
                          Read More <FaArrowRight />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })
            }
          </div>

        </div>
      </section>



      <div className="flex justify-end items-end">
        <Link className="text-[#18568C]  text-center flex items-center gap-2"
          href="/blogs"
        >
          View All Blogs <FaArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default RecentBlogs;