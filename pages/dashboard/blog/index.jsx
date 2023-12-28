import AddBlog from "@/src/Components/Dashboard/Blog/AddBlog/AddBlog";
import DashboardLayout from "@/src/Layouts/DashboardLayout";
import Link from "next/link";
import React from "react";

const BlogPage = () => {
  return (
    <DashboardLayout>
      <section>
        <div className="flex flex-col items-center justify-center w-full ">
          <div className="text-4xl font-bold text-center text-gray-700">
            <Link
              href={'/dashboard/blog/manage-blog'}
              className="border px-4 py-2"
            >
             Manage Blog
            </Link>
          </div>
        </div>
        <div>
          <div className='my-4'>
            <AddBlog />
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default BlogPage;
