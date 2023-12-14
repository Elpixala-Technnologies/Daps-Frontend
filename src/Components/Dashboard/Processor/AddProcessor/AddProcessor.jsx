import { Divider } from "@mui/material";
import React, { useState } from "react";
import ManageProcessor from "../ManageProcessor/ManageProcessor";
import AddProcessorModal from "@/src/Shared/Modal/AddProcessorModal/AddProcessorModal";

const AddProcessor = () => {
  const [isProcessorModalOpen, setIsProcessorModalOpen] = useState(false);

  // === modal ===
  const showProcessorModal = () => {
    setIsProcessorModalOpen(true);
  };

  return (
    <section>
      <div className="lg:w-[100%] md:w-[100%] w-[90%]  px-[60px] py-[50px] xxs:px-[25px] xs:px-[30px] sm:px-[60px]  mx-auto bg-[#F7F7F7] shadow-md rounded-lg md:flex justify-center items-center gap-6 ">
        <button className="common-btn" onClick={showProcessorModal}>
          Add Processor
        </button>
      </div>

      <Divider className="my-4" />

      <section>
        <ManageProcessor />
      </section>

      {/* === modal === */}
      <AddProcessorModal
        isProcessorModalOpen={isProcessorModalOpen}
        setIsProcessorModalOpen={setIsProcessorModalOpen}
      />
    </section>
  );
};

export default AddProcessor;
