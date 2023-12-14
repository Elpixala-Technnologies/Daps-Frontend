import AddProcessor from '@/src/Components/Dashboard/Processor/AddProcessor/AddProcessor';
import DashboardLayout from '@/src/Layouts/DashboardLayout';
import React from 'react';

const AddProcessorsPage = () => {
    return (
        <DashboardLayout>
            <section>
                <AddProcessor/>
            </section>
        </DashboardLayout>
    );
};

export default AddProcessorsPage;