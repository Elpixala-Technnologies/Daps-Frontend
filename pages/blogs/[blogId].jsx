import React from "react";
import { useRouter } from "next/router";
import useBlogs from "@/src/Hooks/useBlogs";
import Link from "next/link";
import RootLayout from "@/src/Layouts/RootLayout";

const BlogDetailPage = () => {
  const { blogData } = useBlogs();
  const router = useRouter();
  const { blogId } = router?.query;

  const filterBlogData = blogData?.filter((data) => {
    return data?._id === blogId;
  });

  let blogs;

  if (filterBlogData && filterBlogData?.length > 0) {
    blogs = filterBlogData[0];
    // Access other properties of 'product' as needed
    const { title, subtitle, content, image, author, publisheDate } = blogs;
    console.log(blogs);
  } else {
    console.error(`No data found for ID: ${blogId}`);
  }

  return (
    <RootLayout>
      <section className="container">
        <div className="mx-auto">
          <main className="mt-12">
            <div className="flex justify-between gap-8">
              {/* main post */}
              <div className="md:w-[75%] w-full rounded">
                <img
                  src={blogs?.image}
                  className="rounded-md object-cover w-full h-64"
                />
                <span className="text-green-700 text-sm hidden md:block mt-4">
                  {" "}
                  Technology{" "}
                </span>
                <h1 className="text-gray-800 text-4xl font-bold mt-2 mb-2 leading-tight">
                  {blogs?.title}
                </h1>
                <div
                  className="text-gray-600 mb-4"
                  dangerouslySetInnerHTML={{ __html: blogs?.content }}
                />
              </div>
              {/* sub-main posts */}
              <div className="md:w-[25%] md:block hidden">
                <div className="w-full relative flex pb-5 items-center">
                  <div className="flex-grow border-t border-orange-400 border-2 rounded-xl"></div><span className="flex-shrink mx-4 text-[#05175E] text-base">Latest Post</span><div className="flex-grow border-t border-orange-400 border-2 rounded-xl"></div>
                </div>
                {blogData?.slice(0.7)?.map((blog) => {
                  return (
                    <div className="rounded w-full mb-4 flex flex-col md:flex-row">
                      <img
                        src={blog?.image}
                        className="w-32 h-32  object-cover rounded-md m-2 md:m-0"
                      />
                      <div className="bg-white rounded px-4">
                        <div className="md:mt-0 text-gray-800 font-semibold text-[12px] mb-2">
                          {blog?.title}
                        </div>
                        <p className="block md:hidden p-2 pl-0 pt-1 text-sm text-gray-600">
                          {blog?.subtitle?.slice(0, 100)}
                        </p>
                        <Link href={`/blog/${blog?._id}`}>
                          <span className="text-blue-500 text-sm">Read More</span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
                <div className="rounded flex md:shadow mt-12">

                  <div className="px-4 py-2">
                    <h3 className="text-3xl text-gray-800 font-bold">
                      Subscribe to newsletter
                    </h3>
                    <p className="text-xl text-gray-700">
                      We sent latest news and posts once in every week, fresh from
                      the oven
                    </p>
                    <form className="mt-4 mb-10">
                      <input
                        type="email"
                        className="rounded bg-gray-100 px-4 py-2 border focus:border-green-400"
                        placeholder="john@tech.com"
                      />
                      <button className="px-4 py-2 my-3 rounded bg-green-800 text-gray-100">
                        Subscribe
                        <i className="bx bx-right-arrow-alt" />
                      </button>
                      <p className="text-green-900 opacity-50 text-sm mt-1">
                        No spam. We promise
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex mt-16 mb-4 px-4 lg:px-0 items-center justify-between">
              <h2 className="font-bold text-3xl">Latest blogs</h2>
              <Link
                href="/blogs"
                className="bg-gray-200 hover:bg-green-200 text-gray-800 px-3 py-1 rounded cursor-pointer"
              >
                View all
              </Link>
            </div>
            <div className="block space-x-0 lg:flex lg:space-x-6">
              {blogData &&
                blogData?.slice(0, 3).map((post) => {
                  return (
                    <div key={post?._id}>
                      <div>
                        <a href={`/blogs/${post?._id}`}>
                          <img
                            className="h-72 w-full object-cover rounded transition duration-200 ease-out transform hover:scale-105"
                            src={post.image}
                            alt=""
                          />
                        </a>
                      </div>
                      <p className="text-sm text-gray-500 mt-4">
                        {/* <time dateTime={post.datetime}>{post.date}</time> */}
                      </p>
                      <div className="mt-2 block">
                        <p className="text-xl font-semibold text-gray-900">
                          {post.title}
                        </p>
                        <p className="mt-3 text-base text-gray-500">
                          {post.subtitle}
                        </p>
                      </div>
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

            <div className="rounded hidden md:flex md:shadow mt-12">
              <img
                src="https://images.unsplash.com/photo-1579275542618-a1dfed5f54ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                className="w-0 md:w-1/4 object-cover rounded-l"
              />
              <div className="px-4 py-2">
                <h3 className="text-3xl text-gray-800 font-bold">
                  Subscribe to newsletter
                </h3>
                <p className="text-xl text-gray-700">
                  We sent latest news and posts once in every week, fresh from
                  the oven
                </p>
                <form className="mt-4 mb-10">
                  <input
                    type="email"
                    className="rounded bg-gray-100 px-4 py-2 border focus:border-green-400"
                    placeholder="john@tech.com"
                  />
                  <button className="px-4 py-2 rounded bg-green-800 text-gray-100">
                    Subscribe
                    <i className="bx bx-right-arrow-alt" />
                  </button>
                  <p className="text-green-900 opacity-50 text-sm mt-1">
                    No spam. We promise
                  </p>
                </form>
              </div>
            </div>

            <div className="flex mt-16 mb-4 px-4 lg:px-0 items-center justify-between">
              <h2 className="font-bold text-3xl">Popular news</h2>
              <Link
                href={"/blogs"}
                className="bg-gray-200 hover:bg-green-200 text-gray-800 px-3 py-1 rounded cursor-pointer"
              >
                View all
              </Link>
            </div>
            <div className="block space-x-0 lg:flex lg:space-x-6">
              {blogData &&
                blogData?.slice(0, 3).map((post) => {
                  return (
                    <div key={post?._id}>
                      <div>
                        <a href={`/blogs/${post?._id}`}>
                          <img
                            className="h-72 w-full object-cover rounded transition duration-200 ease-out transform hover:scale-105"
                            src={post.image}
                            alt=""
                          />
                        </a>
                      </div>
                      <p className="text-sm text-gray-500 mt-4">
                        {/* <time dateTime={post.datetime}>{post.date}</time> */}
                      </p>
                      <div className="mt-2 block">
                        <p className="text-xl font-semibold text-gray-900">
                          {post.title}
                        </p>
                        <p className="mt-3 text-base text-gray-500">
                          {post.subtitle}
                        </p>
                      </div>
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
            {/* end popular posts */}
          </main>

        </div>
      </section>
    </RootLayout>
  );
};

export default BlogDetailPage;
