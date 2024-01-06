import ManageBlog from '@/src/Components/Dashboard/Blog/ManageBlog/ManageBlog';
import DashboardLayout from '@/src/Layouts/DashboardLayout';
import React from 'react';

const ManageBlogPage = () => {
    return (
        <DashboardLayout>
            <section>
                <div className='flex flex-col items-center justify-center w-full '>
                
                       <ManageBlog/>
                     
                </div>
            </section>
        </DashboardLayout>
    );
};

export default ManageBlogPage;