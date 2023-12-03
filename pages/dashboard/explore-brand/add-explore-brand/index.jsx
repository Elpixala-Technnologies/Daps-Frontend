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
            // Upload video to Cloudinary
            let videoUrl = '';
            if (inputValue.video[0]) {
                const videoUploadData = new FormData();
                videoUploadData.append("file", inputValue.video[0]);
                videoUploadData.append(
                    "public_id",
                    `${cloud_folder}/Category/${inputValue.video[0].name}`
                );
                videoUploadData.append("upload_preset", upload_preset);
                videoUploadData.append("cloud_name", cloud_name);

                const videoRes = await fetch(cloud_api, {
                    method: "POST",
                    body: videoUploadData,
                });
                const videoData = await videoRes.json();
                videoUrl = videoData.secure_url;
            }

            // Upload image to Cloudinary
            let imageUrl = '';
            if (inputValue.image[0]) {
                const imageUploadData = new FormData();
                imageUploadData.append("file", inputValue.image[0]);
                imageUploadData.append(
                    "public_id",
                    `${cloud_folder}/Category/${inputValue.image[0].name}`
                );
                imageUploadData.append("upload_preset", upload_preset);
                imageUploadData.append("cloud_name", cloud_name);

                const imageRes = await fetch(cloud_api, {
                    method: "POST",
                    body: imageUploadData,
                });
                const imageData = await imageRes.json();
                imageUrl = imageData.secure_url;
            }


            
            // =============================================================

            const brandData = {
                name: inputValue.name,
                vedio: videoUrl,
                image: imageUrl
            }

            const response = await fetch(addExploreBrandUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(brandData),
            })

            console.log(response)

            if(response){
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
            }



        } catch (error) {
            Swal.fire({
                position: "center",
                timerProgressBar: true,
                title: "Error",
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