import React from "react";
import useBlogs from "@/src/Hooks/useBlogs";
import RootLayout from "@/src/Layouts/RootLayout";
import Link from "next/link";

const BlogPage = () => {
  const { blogData } = useBlogs();
  return (
    <RootLayout>
      <section className="my-6 container">
        <div className="mx-auto w-full flex flex-col items-center justify-center">
          <div className="title my-2">
            <h1>
              New <span>Blogs</span>
            </h1>
          </div>
            <p className="text-[1.2rem]">
              Exploring Insights, Ideas, and Inspiration in Our Latest Blog
              Posts
            </p>
        </div>

        <div className="my-10 p-4">
          <div>
            <div className=" grid gap-14 grid-cols-1 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
              {blogData &&
                blogData?.slice(0, 3)?.map((post) => {
                  return (
                    <div key={post?._id}>
                      <div>
                        <img
                          className="h-72 w-full object-cover rounded transition duration-200 ease-out transform hover:scale-105"
                          src={post.image}
                          alt=""
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-4">
                        {/* <time dateTime={post.datetime}>{post.date}</time> */}
                      </p>
                      <a href={post.href} className="mt-2 block">
                        <p className="text-xl font-semibold text-gray-900">
                          {post.title}
                        </p>
                        <p className="mt-3 text-base text-gray-500">
                          {post.subtitle}
                        </p>
                      </a>
                      <div className="mt-3">
                        <Link
                          href={`/blogs/${post?._id}`}
                          className="text-base font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          Read full story
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </RootLayout>
  );
};

export default BlogPage;
