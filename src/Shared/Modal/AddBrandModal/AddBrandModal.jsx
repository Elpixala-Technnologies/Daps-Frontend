import React, { useState } from "react";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { addBrandsUrl } from "@/src/Utils/Urls/CommonUrl";
import useBrand from "@/src/Hooks/useBrand";
 
const AddBrandModal = ({ isBrandModalOpen, setIsBrandModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const {refetchBrand} = useBrand()

  const handleCancel = () => {
    setIsBrandModalOpen(false);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(addBrandsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brandName: data.name,
        }),
      });

      console.log(res, "res++")

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
          refetchBrand();
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
      title="Add Brand"
      open={isBrandModalOpen}
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
                placeholder="Brand Name"
                name="Brand"
                {...register("name")}
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

export default AddBrandModal;
