import dynamic from "next/dynamic";
import React, { useState, useRef, useMemo } from "react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import LinearProgress from "@mui/material/LinearProgress";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { addBlogsUrl } from "@/src/Utils/Urls/BlogUrl";

const AddBlog = () => {
  const { handleSubmit, register } = useForm();
  const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const cloud_api = process.env.NEXT_PUBLIC_CLOUDINARY_API;
  const cloud_folder = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER;
  const [loading, setLoading] = useState(false);
  const [headerBanner, setHeaderBanner] = useState(null);
  const [headerBannerPreview, setHeaderBannerPreview] = useState(null);
  const [headerBannerUploadProgress, setHeaderBannerUploadProgress] =
    useState(0);

  const handleFileChange = (e, setImageFile, setImagePreview) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const uploadImageToCloudinary = async (file, setProgress) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("public_id", `${cloud_folder}/Blog/${file.name}`);
    formData.append("upload_preset", upload_preset);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", cloud_api, true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setProgress(progress);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          resolve(response.secure_url);
        } else {
          reject("Upload failed");
        }
      };

      xhr.onerror = () => reject("Error during upload");
      xhr.send(formData);
    });
  };
  const removeHeaderBanner = () => {
    setHeaderBanner(null);
    setHeaderBannerPreview(null);
    setHeaderBannerUploadProgress(0);
  };

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
      toolbarAdaptive: true,
    }),
    []
  );

  console.log(content, "content");
  const onSubmit = async (dataValue) => {
    try {
      setLoading(true);
      const headerImageUrl = await uploadImageToCloudinary(
        headerBanner,
        setHeaderBannerUploadProgress
      );

      const res = await fetch(addBlogsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: dataValue?.title,
          subtitle: dataValue?.subtitle,
          image: headerImageUrl,
          content: content,
          author: dataValue?.author,
          publisheDate: new Date(),
        }),
      });
      const dataRes = await res.json();

      if (dataRes.success) {
        Swal.fire({
          position: "center",
          timerProgressBar: true,
          title: "Successfully   Added!",
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

        setLoading(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Error: ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to upload image!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 ">
      <div className="border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md ">
        <input
          type="text"
          className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
          placeholder="Blog Title"
          name="blogTitle"
          {...register("title")}
        />
      </div>

      <div className="border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md ">
        <input
          type="text"
          className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
          placeholder="Blog Subtitle"
          name="blogTitle"
          {...register("subtitle")}
        />
      </div>

      <div className="border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md ">
        <input
          type="text"
          className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
          placeholder="Author"
          name="author"
          {...register("author")}
        />
      </div>

      <div>
        <div className="w-full h-full my-4">
          <div className="rounded-lg shadow-xl bg-gray-50">
            <div className="p-4">
              <label className="inline-block mb-2 text-gray-500">
                Upload Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <input
                      type="file"
                      className="px-4 pb-4"
                      name="image"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileChange(
                          e,
                          setHeaderBanner,
                          setHeaderBannerPreview
                        )
                      }
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
        {headerBannerPreview && (
          <div className="flex items-center justify-between mt-2">
            <img
              src={headerBannerPreview}
              alt="Desktop Preview"
              className="w-[60%] h-[10rem] object-cover"
            />
            <button
              onClick={removeHeaderBanner}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Remove Image
            </button>
          </div>
        )}

        {headerBannerUploadProgress > 0 && (
          <LinearProgress
            variant="determinate"
            value={headerBannerUploadProgress}
          />
        )}
      </div>

      <div>
        <JoditEditor
          config={config}
          ref={editor}
          value={content}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          onChange={(newContent) => {}}
        />
      </div>

      <div>
        <button
          onClick={handleSubmit(onSubmit)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
        >
          {loading ? "Loading..." : "Post Blog"}
        </button>
      </div>
    </div>
  );
};

export default AddBlog;
