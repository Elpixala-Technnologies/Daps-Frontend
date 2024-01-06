import DashboardLayout from "@/src/Layouts/DashboardLayout";
import { addBestsellersProductUrl, addBestsellersUrl } from "@/src/Utils/Urls/MediaUrl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Card, CardActions, CardContent, CardMedia, IconButton ,Typography} from "@mui/material";
import { FaRegTrashAlt } from "react-icons/fa";
import useBestsellers from "@/src/Hooks/useBestsellers";
import useProducts from "@/src/Hooks/useProducts";

const AddBestsellers = () => {
  const { handleSubmit, register, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { BestsellersData,
    BestsellersLoaded,
    refetchBestsellers,
    handelBestsellersDelete } = useBestsellers()
  const {categoryData} = useProducts()

  const cloudinaryUpload = async (file, resourceType) => {
    const cloudinaryApi = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType === "video" ? "video/upload" : "image/upload"}`;
    const cloudinaryUploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryUploadPreset);
    formData.append("cloud_name", cloudinaryCloudName);

    try {
      const response = await fetch(cloudinaryApi, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        return responseData.secure_url;
      } else {
        const errorData = await response.json();
        throw new Error(`Error uploading to Cloudinary: ${errorData.message}`);
      } Bestsellers
    } catch (error) {
      console.error("Cloudinary Upload Error:", error.message);
      throw error;
    }
  };

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    setValue("video", file);

    try {
      // Display preloader while uploading
      setVideoPreview("loading");

      const videoUrl = await cloudinaryUpload(file, "video", (progressEvent) => {
        // Update progress bar
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        setUploadProgress(progress);
      });

      setVideoPreview(videoUrl);
    } catch (error) {
      console.error("Error uploading video:", error.message);
      // Handle error and update UI accordingly
      setVideoPreview(null);
    } finally {
      // Reset progress bar after upload is complete
      setUploadProgress(0);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setValue("image", file);

    try {
      const imageUrl = await cloudinaryUpload(file);
      setImagePreview(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };

  const handleRemoveVideo = () => {
    setVideoPreview(null);
    setValue("video", null);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setValue("image", null);
  };

  const handleOnSubmit = async (inputValue) => {
    setIsLoading(true);

    try {
      const videoUrl = videoPreview;
      const imageUrl = imagePreview;

      const BestsellersProductData = {
        category: inputValue.category,
        image: imageUrl,
      };

      // Submit data to your server
      const response = await fetch(addBestsellersUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(BestsellersProductData),
      });

      if (response.ok) {
        Swal.fire({
          position: "center",
          timerProgressBar: true,
          title: "Successfully Added!",
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
        refetchBestsellers()
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error.message);
      Swal.fire({
        position: "center",
        timerProgressBar: true,
        title: "Error",
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
      setImagePreview(null);
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <section>
        <div className="container mx-auto px-4 flex flex-col gap-4">
          <div>
            <div>
              <select className="border-2 p-2 border-gray-300 rounded-md  w-full"
                {...register("category")}
              >
                <option className='my-2'>Select Category</option>
                {categoryData && categoryData?.map((category) => (
                  <option key={category?._id} value={category?.name}>{category?.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <h1>Image</h1>
            <div className="border-2 border-gray-300 rounded-md p-2">
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="border-2 border-gray-300 rounded-md p-2"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="h-[8rem]"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="text-red-500 hover:underline"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              onClick={handleSubmit(handleOnSubmit)}
              className="common-btn"
            >
              {isLoading ? "Loading" : "Submit"}
            </button>
          </div>
        </div>


        {/* ====== */}

        <div className="my-4">
          <div className="grid md:grid-cols-3 gap-4 justify-center items-center">
            {BestsellersData &&
              BestsellersData?.length &&
              BestsellersData?.map((pd) => {
                const { _id, image, category } = pd;
                return (
                  <Card sx={{ maxWidth: 400 }} key={_id}>
                    <CardMedia
                      component="img"
                      image={image}
                      alt={"Brand Image"}
                      className="w-auto h-auto object-cover"
                    />
                    <div>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {category}
                        </Typography>
                      </CardContent>
                    </div>

                    <CardActions disableSpacing>
                      <IconButton
                        aria-label="Delete"
                        onClick={() => handelBestsellersDelete(_id)}
                      >
                        <FaRegTrashAlt className="text-[2.3rem] mr-3 text-red-500" />
                      </IconButton>
                    </CardActions>
                  </Card>
                );
              })}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default AddBestsellers;
