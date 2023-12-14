import AddBrand from "@/src/Components/Dashboard/Brand/AddBrand/AddBrand";
import DashboardLayout from "@/src/Layouts/DashboardLayout";
import React from "react";

const AddBrandPage = () => {
  return (
    <DashboardLayout>
      <section className='container'>
        <AddBrand/>
      </section>
    </DashboardLayout>
  );
};

export default AddBrandPage;
