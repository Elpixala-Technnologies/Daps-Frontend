import { Divider } from "@mui/material";
import React, { useState } from "react";
import ManageSocket from "../ManageSocket/ManageSocket";
import AddSocketModal from "@/src/Shared/Modal/AddSocketModal/AddSocketModal";

const AddSocket = () => {
  const [isSocketModalOpen, setIsSocketModalOpen] = useState(false);

  // === modal ===
  const showSocketModal = () => {
    setIsSocketModalOpen(true);
  };

  return (
    <section>
      <div className="lg:w-[100%] md:w-[100%] w-[90%]  px-[60px] py-[50px] xxs:px-[25px] xs:px-[30px] sm:px-[60px]  mx-auto bg-[#F7F7F7] shadow-md rounded-lg md:flex justify-center items-center gap-6 ">
        <button className="common-btn" onClick={showSocketModal}>
          Add Socket
        </button>
      </div>

      <Divider className="my-4" />

      <section>
        <ManageSocket />
      </section>

      {/* === modal === */}
      <AddSocketModal
        isSocketModalOpen={isSocketModalOpen}
        setIsSocketModalOpen={setIsSocketModalOpen}
      />
    </section>
  );
};

export default AddSocket;
