import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { addHomeSliderUrl } from "@/src/Utils/Urls/HomeSliderUrl";
import useProducts from "@/src/Hooks/useProducts";
import { addBannersUrl } from "@/src/Utils/Urls/MediaUrl";
import Link from 'next/link';
import DashboardLayout from "@/src/Layouts/DashboardLayout";

const HomeSlider = () => {
  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [leftBanner, setLeftBanner] = useState(null);
  const [rightBanner, setRightBanner] = useState(null);
  const [centerBannerOne, setCenterBannerOne] = useState(null);
  const [centerBannerTwo, setCenterBannerTwo] = useState(null);
  const [leftBannerPreview, setLeftBannerPreview] = useState(null);
  const [rightBannerPreview, setRightBannerPreview] = useState(null);
  const [centerBannerOnePreview, setCenterBannerOnePreview] = useState(null);
  const [centerBannerTwoPreview, setCenterBannerTwoPreview] = useState(null);
  const [leftBannerProgress, setLeftBannerProgress] = useState(0);
  const [rightBannerProgress, setRrightBannerProgress] = useState(0);
  const [centerBannerOneProgress, setCenterBannerOneProgress] = useState(0);
  const [centerBannerTwoProgress, setCenterBannerTwoProgress] = useState(0);

  const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const cloud_api = process.env.NEXT_PUBLIC_CLOUDINARY_API;
  const cloud_folder = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER;

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
    formData.append("public_id", `${cloud_folder}/Slider/${file.name}`);
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

  const onSubmit = async (dataValue) => {
    try {
      setLoading(true);
      const uploadedLeftBanner = await uploadImageToCloudinary(
        leftBanner,
        setLeftBannerProgress
      );
      const uploadedRightBanner = await uploadImageToCloudinary(
        rightBanner,
        setRrightBannerProgress
      );
  
      const uploadedCenterBannerOne = await uploadImageToCloudinary(
        centerBannerOne,
        setCenterBannerOneProgress
      );
      const uploadedCenterBannerTwo = await uploadImageToCloudinary(
        centerBannerTwo,
        setCenterBannerTwoProgress
      );
  
      const res = await fetch(addBannersUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bannerOne: uploadedLeftBanner,
          bannerTow: uploadedCenterBannerOne,
          bannerThree: uploadedCenterBannerTwo,
          bannerFour: uploadedRightBanner,
        }),
      });
      const dataRes = await res.json();
  
      if (dataRes.success) {
        Swal.fire({
          position: "center",
          timerProgressBar: true,
          title: "Successfully Photo Gallery Added!",
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
  
        setLeftBanner(null);
        setRightBanner(null);
        setCenterBannerOne(null);
        setCenterBannerTwo(null);
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
    <DashboardLayout>
    <section className="flex flex-col gap-6">
      <div>
        <Link 
        className="border px-4 py-2"
        href={'/dashboard/home-offer-banner/manage-home-offer-banner'}>
          Manage Home Offer Four
        </Link>
      </div>


      {/* Desktop Image Upload Section */}
      <div>
        <div className="w-full h-full my-4">
          <div className="rounded-lg shadow-xl bg-gray-50">
            <div className="p-4">
              <label className="inline-block mb-2 text-gray-500">
                Upload Left Banner
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
                        handleFileChange(e, setLeftBanner, setLeftBannerPreview)
                      }
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
        {leftBannerPreview && (
          <img
            src={leftBannerPreview}
            alt="Desktop Preview"
            className="w-[60%] h-[10rem] object-cover"
          />
        )}
        {leftBannerProgress > 0 && (
          <LinearProgress variant="determinate" value={leftBannerProgress} />
        )}
      </div>

      <div>
        <div className="w-full h-full my-4">
          <div className="rounded-lg shadow-xl bg-gray-50">
            <div className="p-4">
              <label className="inline-block mb-2 text-gray-500">
                Upload Right Banner
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
                          setRightBanner,
                          setRightBannerPreview
                        )
                      }
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
        {rightBannerPreview && (
          <img
            src={rightBannerPreview}
            alt="Desktop Preview"
            className="w-[60%] h-[10rem] object-cover"
          />
        )}
        {rightBannerProgress > 0 && (
          <LinearProgress variant="determinate" value={rightBannerProgress} />
        )}
      </div>

      <div>
        <div className="w-full h-full my-4">
          <div className="rounded-lg shadow-xl bg-gray-50">
            <div className="p-4">
              <label className="inline-block mb-2 text-gray-500">
                Upload Center Banner One
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
                          setCenterBannerOne,
                          setCenterBannerOnePreview
                        )
                      }
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
        {centerBannerOnePreview && (
          <img
            src={centerBannerOnePreview}
            alt="Desktop Preview"
            className="w-[60%] h-[10rem] object-cover"
          />
        )}
        {centerBannerOneProgress > 0 && (
          <LinearProgress
            variant="determinate"
            value={centerBannerOneProgress}
          />
        )}
      </div>

      <div>
        <div className="w-full h-full my-4">
          <div className="rounded-lg shadow-xl bg-gray-50">
            <div className="p-4">
              <label className="inline-block mb-2 text-gray-500">
                Upload Center Banner Tow
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
                          setCenterBannerTwo,
                          setCenterBannerTwoPreview
                        )
                      }
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
        {centerBannerTwoPreview && (
          <img
            src={centerBannerTwoPreview}
            alt="Desktop Preview"
            className="w-[60%] h-[10rem] object-cover"
          />
        )}
        {centerBannerTwoProgress > 0 && (
          <LinearProgress
            variant="determinate"
            value={centerBannerTwoProgress}
          />
        )}
      </div>

      <div className="py-6">
        <Button
          variant="contained"
          className="common-btn "
          endIcon={<SendIcon />}
          onClick={handleSubmit(onSubmit)}
        >
          {loading ? "Uploading..." : "Submit"}
        </Button>
      </div>
    </section>
    </DashboardLayout>
  );
};

export default HomeSlider;
