import React, { useState } from "react";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { createCategoryUrl } from "@/src/Utils/Urls/ProductUrl";
import useProducts from "@/src/Hooks/useProducts";

const AddCategoryModal = ({ isCategoryModalOpen, setIsCategoryModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const cloud_api = process.env.NEXT_PUBLIC_CLOUDINARY_API;
  const cloud_folder = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER;
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [iconImage, setIconImage] = useState(null);

  const { refetchCategory } = useProducts();

  const handleCancel = () => {
    setIsCategoryModalOpen(false);
  };

  const uploadImage = async (file) => {
    const imageUploadData = new FormData();
    imageUploadData.append("file", file);
    imageUploadData.append("public_id", `${cloud_folder}/${file?.name}`);
    imageUploadData.append("upload_preset", `${upload_preset}`);
    imageUploadData.append("cloud_name", `${cloud_name}`);

    try {
      const imgRes = await fetch(`${cloud_api}`, {
        method: "POST",
        body: imageUploadData,
      });

      if (imgRes.ok) {
        const imgdata = await imgRes.json();
        return imgdata?.secure_url;
      } else {
        throw new Error(
          `Image upload failed: ${imgRes.status} ${imgRes.statusText}`
        );
      }
    } catch (error) {
      throw error;
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const imgurl = await uploadImage(imageFile);
      const iconurl = await uploadImage(iconImage);

      const res = await fetch(createCategoryUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          slug: data.slug,
          status: data.status,
          image: imgurl,
          icon: iconurl,
        }),
      });

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
          refetchCategory();
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
      title="Add Category"
      open={isCategoryModalOpen}
      onCancel={handleCancel}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className="shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 flex flex-col gap-4">
            <div className="w-full">
              <input
                type="text"
                className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                placeholder="Category Name"
                name="category"
                {...register("name")}
                required
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                placeholder="Slug"
                name="slug"
                {...register("slug")}
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                placeholder="Status"
                name="status"
                {...register("status")}
                required
              />
            </div>

            <div>
              <div class="w-full h-full my-4">
                <div class="rounded-lg shadow-xl bg-gray-50">
                  <div class="p-4">
                    <label class="inline-block mb-2 text-gray-500">
                      Upload Photo
                    </label>
                    <div class="flex items-center justify-center w-full">
                      <label class="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                        <div class="flex flex-col items-center justify-center pt-7">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                            fill="none"
                            viewdiv="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        <input
                          type="file"
                          className="px-4 pb-4"
                          name="imeage"
                          // {...register("imeage", { required: true })}
                          accept="image/*"
                          onChange={(e) => setImageFile(e.target.files[0])}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="w-full h-full my-4">
                <div class="rounded-lg shadow-xl bg-gray-50">
                  <div class="p-4">
                    <label class="inline-block mb-2 text-gray-500">
                      Upload Icon
                    </label>
                    <div class="flex items-center justify-center w-full">
                      <label class="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                        <div class="flex flex-col items-center justify-center pt-7">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                            fill="none"
                            viewdiv="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        <input
                          type="file"
                          className="px-4 pb-4"
                          name="imeage"
                          // {...register("imeage", { required: true })}
                          accept="image/*"
                          onChange={(e) => setIconImage(e.target.files[0])}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
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

export default AddCategoryModal;
