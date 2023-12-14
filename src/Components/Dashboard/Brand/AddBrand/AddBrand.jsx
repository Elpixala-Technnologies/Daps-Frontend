import { Divider } from "@mui/material";
import React, { useState } from "react";
import ManageBrand from "../ManageBrand/ManageBrand";
import AddBrandModal from "@/src/Shared/Modal/AddBrandModal/AddBrandModal";

const AddBrand = () => {
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  // === modal ===
  const showBrandModal = () => {
    setIsBrandModalOpen(true);
  };

  return (
    <section>
      <div className="lg:w-[100%] md:w-[100%] w-[90%]  px-[60px] py-[50px] xxs:px-[25px] xs:px-[30px] sm:px-[60px]  mx-auto bg-[#F7F7F7] shadow-md rounded-lg md:flex justify-center items-center gap-6 ">
        <button className="common-btn" onClick={showBrandModal}>
          Add Brand
        </button>
      </div>

      <Divider className="my-4" />

      <section>
        <ManageBrand />
      </section>

      {/* === modal === */}
      <AddBrandModal
        isBrandModalOpen={isBrandModalOpen}
        setIsBrandModalOpen={setIsBrandModalOpen}
      />
    </section>
  );
};

export default AddBrand;
