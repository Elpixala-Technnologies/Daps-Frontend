import AddSocket from '@/src/Components/Dashboard/Socket/AddSocket/AddSocket';
import DashboardLayout from '@/src/Layouts/DashboardLayout';
import React from 'react';

const AddSoketPage = () => {
    return (
        <DashboardLayout>
            <section>
              <AddSocket/>  
            </section>
        </DashboardLayout>
    );
};

export default AddSoketPage;