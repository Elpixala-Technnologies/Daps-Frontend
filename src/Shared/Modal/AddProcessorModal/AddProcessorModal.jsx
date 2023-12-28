import React, { useState } from "react";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { addProcessorsUrl } from "@/src/Utils/Urls/CommonUrl";
import useProcessor from "@/src/Hooks/useProcessor";
 
const AddProcessorModal = ({ isProcessorModalOpen, setIsProcessorModalOpen }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const {refetchProcessor} = useProcessor()

  const handleCancel = () => {
    setIsProcessorModalOpen(false);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(addProcessorsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          processorName: data?.name,
          processorRank: data?.processorRank
        }),
      });

      console.log(res, "res++ res")

      if (res.ok) {
        const dataRes = await res.json();
        if (dataRes) {
          Swal.fire({
            position: "center",
            timerProgressBar: true,
            title: "Successfully Product Added!",
            iconColor: "#ED1C24",
            toast: true,
            icon: "success",
            showClass: {
              popup: "animate__animated animate__fadeInRight",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutRight",
            },
            showConfirmButton: false,
            timer: 3500,
          });
          refetchProcessor();
          // reset()
        } else {
          throw new Error("Something went wrong!");
        }
      } else {
        throw new Error(`Server error: ${res.status} ${res.statusText}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      Swal.fire({
        position: "center",
        timerProgressBar: true,
        title: "Something went wrong!",
        iconColor: "#ED1C24",
        toast: true,
        icon: "error",
        showClass: {
          popup: "animate__animated animate__fadeInRight",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutRight",
        },
        showConfirmButton: false,
        timer: 3500,
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add Processor"
      open={isProcessorModalOpen}
      onCancel={handleCancel}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className="shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 flex flex-col gap-4">
            <div className="border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md ">
              <input
                type="text"
                className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                placeholder="Processor Name"
                name="Processor Name"
                {...register("name")}
                required
              />
            </div>

            <div className="border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md ">
              <input
                type="number"
                className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                placeholder="Processor Rank"
                name="processorRank"
                {...register("processorRank")}
                required
              />
            </div>
          </div>

          <div className="">
            <button className="mb-5 common-btn">
              {loading ? "Loading..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddProcessorModal;
