import DashboardLayout from "@/src/Layouts/DashboardLayout"
import { addExploreBrandUrl } from "@/src/Utils/Urls/MediaUrl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddExploreBrand = () => {
    const { handleSubmit, register } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    // ==== Cloudinary ==== 
    const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const cloud_api = process.env.NEXT_PUBLIC_CLOUDINARY_API;
    const cloud_folder = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER;

    const handleOnSubmit = async (inputValue) => {
        console.log(inputValue);
        try {
            // -------- uplodad image in cloudinary --------------------

            // -------- uplodad vedio in cloudinary --------------------


            // =============================================================

            const brandData = {
                name: inputValue.name,
                vedio: "Vedio Url",
                image: "Image Url"

            }

            const response = await fetch(addExploreBrandUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(brandData),
            })


        } catch (error) {
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
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }



    return (
        <DashboardLayout>
            <section>
                <div className="container mx-auto px-4 flex flex-col gap-4">
                    <div>
                        <h1>Name</h1>
                        <div
                            className='border-2 border-gray-300 rounded-md p-2'
                        >
                            <input
                                type="text"
                                name="name"
                                {...register("name")}
                                className='border-2 border-gray-300 rounded-md p-2'
                            />
                        </div>
                    </div>
                    <div>
                        <h1>Video</h1>
                        <div className='border-2 border-gray-300 rounded-md p-2'>
                            <input
                                type="file"
                                name="video"
                                {...register("video")}
                                className='border-2 border-gray-300 rounded-md p-2'
                            />
                        </div>
                    </div>
                    <div>
                        <h1>Image</h1>
                        <div className='border-2 border-gray-300 rounded-md p-2'>
                            <input
                                type="file"
                                name="image"
                                {...register("image")}
                                className='border-2 border-gray-300 rounded-md p-2'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={handleSubmit(handleOnSubmit)}
                            className="common-btn"
                        >
                            Submit
                        </button>
                    </div>

                </div>
            </section>
        </DashboardLayout>
    )
}

export default AddExploreBrand