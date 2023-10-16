import useBlogs from "@/src/Hooks/useBlogs";
import Link from "next/link";
import {FaArrowRight} from "react-icons/fa"

const RecentBlogs = () => {
    const { blogData } = useBlogs();

    return (
        <section>
            <div className='title'>
                <h1>Recents <span>Blogs</span></h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 my-4">
                {
                    blogData && blogData?.slice(0, 3)?.map((blog) => {
                        return (
                            <div className="max-w-sm bg-[#EFF4F7] rounded overflow-hidden shadow-lg"
                                key={blog?._id}
                            >
                                <img
                                    className="w-full"
                                    src={blog?.image}
                                    alt={blog?.title}
                                />
                                <div className="px-6 py-4">
                                    <div className="font-bold  mb-2">{
                                        blog?.title.slice(0, 56) + "..."
                                    }</div>
                                    <p className="text-gray-700 text-base">
                                        {blog?.subtitle?.slice(0, 100)}...
                                    </p>
                                </div>
                                <div className="px-6 w-full">
                                    <span>
                                        {blog?.tags.slice(0, 2).map((tag) => {
                                            return (
                                                <span key={tag} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2"> #{tag} </span>
                                            )
                                        })}
                                    </span>
                                </div>
                                <div className="py-4 flex justify-center items-center mx-4">
                                    <Link className="common-btn-outline w-full text-center flex items-center gap-2 justify-center"
                                        href={`/blog/${blog?._id}`}
                                    >
                                        Read More <FaArrowRight/>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex justify-end items-end">
                <Link className="text-[#18568C]  text-center flex items-center gap-2"
                    href="/blogs"
                >
                    View All Blogs <FaArrowRight/>
                </Link>
            </div>
        </section>
    );
};

export default RecentBlogs;