import AddCar from "@/src/Components/Dashboard/Car/AddCar/AddCar";
import DashboardLayout from "@/src/Layouts/DashboardLayout";
import React from "react";

const AddCarPage = () => {
  return (
    <DashboardLayout>
      <section>
        <AddCar/>
      </section>
    </DashboardLayout>
  );
};

export default AddCarPage;
