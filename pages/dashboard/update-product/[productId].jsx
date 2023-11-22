import useProducts from '@/src/Hooks/useProducts';
import DashboardLayout from '@/src/Layouts/DashboardLayout';
import { getSingelProductUrl, updateProductsUrl } from '@/src/Utils/Urls/ProductUrl';
import { Button, Cascader, Select } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const UpdatePorductPage = () => {
    // ==== Cloudinary ==== 
    const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const cloud_api = process.env.NEXT_PUBLIC_CLOUDINARY_API;
    const cloud_folder = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER;
    const router = useRouter();

    const { productId } = router.query;
    const [singleProductData, setSingleProductData] = useState({});
    const [couponSelected, setCouponSelected] = useState([]);
    const { handleSubmit, register, setValue,
        getValues, } = useForm();
    const { couponData, categoryData, refetchProducts } = useProducts();
    const [loading, setLoading] = useState(false);
    const [prevValues, setPrevValues] = useState({});


    useEffect(() => {
        if (productId) {
            const getProduct = async () => {
                try {
                    const reqProduct = await fetch(getSingelProductUrl(productId));
                    const resProduct = await reqProduct.json();
                    console.log(resProduct, "resProduct");

                    // Store the previous values when the product data is fetched
                    setPrevValues(resProduct?.data || {});
                    setSingleProductData(resProduct?.data || {});
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            };
            getProduct();
        }
    }, [productId]);

    const {
        name,
        categories,
        images,
        brand,
        price,
        discount,
        type,
        status,
        details,
        features,
        coupon,
        quantity,
        _id,
        isAndroid,
        processor,
        ram,
        rom,
        displaySize,
        wlcpaa,
        dvr,
        camera360,
        sim,
        opticalInput,
        qled,
        warranty 
    } = singleProductData;

    useEffect(() => {
        setValue("name", name);
        setValue("category", categories);
        setValue("brand", brand);
        setValue("price", price);
        setValue("discount", discount);
        setValue("type", type);
        setValue("status", status);
        setValue("details", details);
        setValue("features", features?.join(', '));
        setValue("coupon", coupon);
        setValue("quantity", quantity)
        setValue("isAndroid", isAndroid);
        setValue("processor", processor);
        setValue("ram", ram);
        setValue("rom", rom);
        setValue("displaySize", displaySize);
        setValue("wlcpaa", wlcpaa);
        setValue("dvr", dvr);
        setValue("camera360", camera360);
        setValue("sim", sim);
        setValue("opticalInput", opticalInput);
        setValue("qled", qled);
        setValue("warranty", warranty);


    }, [
        name,
        categories,
        images,
        brand,
        price,
        discount,
        type,
        status,
        details,
        features,
        coupon,
        quantity,
        isAndroid,
        processor,
        ram,
        rom,
        displaySize,
        wlcpaa,
        dvr,
        camera360,
        sim,
        opticalInput,
        qled,
        warranty

    ]);

    const couponOptions = couponData?.map((couponResponse) => {
        const { _id, coupon } = couponResponse;
        return {
            label: coupon,
            value: _id,
        };
    });
    const handleCouponChange = (value) => {
        setCouponSelected(value);
    };

    const [imageFiles, setImageFiles] = useState([]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const updatedFiles = selectedFiles.map((file) => {
            const publicId = `${cloud_folder}/${file.name.replace(/\s+/g, '_')}`;
            file.uploadPreset = publicId;
            return file;
        });
        setImageFiles(updatedFiles);
    };

    const onSubmit = async (inputValue) => {
        try {
            setLoading(true);
            let featuresArray; // Declare it in a higher scope

            const uploadedUrls = [];

            // Check if new images are uploaded
            if (imageFiles.length > 0) {
                for (const imageFile of imageFiles) {
                    const formData = new FormData();
                    formData.append('file', imageFile);
                    formData.append(
                        'upload_preset',
                        `${cloud_folder}/Products/${imageFile?.name}`
                    );
                    formData.append('upload_preset', upload_preset);
                    formData.append('cloud_name', cloud_name);

                    const imgRes = await fetch(cloud_api, {
                        method: 'POST',
                        body: formData,
                    });

                    if (!imgRes.ok) {
                        const errorResponse = await imgRes.text();
                        throw new Error(
                            `Error uploading image: ${imgRes.status} - ${imgRes.statusText}\n${errorResponse}`
                        );
                    }

                    const imgdata = await imgRes.json();
                    const imgurl = imgdata?.secure_url;
                    if (imgurl) {
                        uploadedUrls.push(imgurl);
                    } else {
                        throw new Error(
                            'Failed to retrieve the image URL from Cloudinary response.'
                        );
                    }
                }
            } else {
                // No new images uploaded, use the existing image URLs
                uploadedUrls.push(...(images || []));
            }
            // Split the features string into an array
            if (typeof inputValue.features === 'string') {
                featuresArray = inputValue.features.split(',');
                // Use featuresArray as needed
            } else {
                featuresArray = inputValue.features;
            }

            const productData = {
                name: inputValue?.name,
                categories: inputValue?.category,
                images: uploadedUrls || images,
                brand: inputValue?.brand,
                price: inputValue?.price,
                discount: inputValue?.discount,
                type: inputValue?.type,
                status: inputValue?.status,
                details: inputValue?.description,
                features: featuresArray,
                coupon: couponSelected,
                quantity: inputValue?.quantity,
                processor: inputValue?.android[0]?.processor,
                ram: inputValue?.android[0]?.ram,
                rom: inputValue?.android[0]?.rom,
                displaySize: inputValue?.android[0]?.displaySize,
                wlcpaa: inputValue?.android[0]?.wlcpaa,
                dvr: inputValue?.android[0]?.dvr,
                camera360: inputValue?.android[0]?.camera360,
                sim: inputValue?.android[0]?.sim,
                opticalInput: inputValue?.android[0]?.opticalInput,
                qled: inputValue?.android[0]?.qled,
                warranty: inputValue?.android[0]?.warranty,
                
            }

            const res = await fetch(updateProductsUrl(_id), {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });
            const dataRes = await res.json();
            if (!dataRes) {
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
            } else {
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
                setLoading(false);
            }
        } catch (error) {
            console.error('Error uploading images to Cloudinary:', error);
        } finally {
            setLoading(false);
        }
    };




    return (
        <DashboardLayout>
            <section>
                <div>
                    <h1>
                        Update Porduct
                    </h1>
                </div>
                <section className="my-4">
                    <div className="flex flex-col w-full gap-4 mx-auto add-Porduct-form">
                        <div
                            className="add-Porduct-form w-full md:w-full mx-auto flex flex-col gap-4 "
                        >
                            <div className='border'>
                            <input
                                placeholder="Porduct Name"
                                name="name"
                                type="text"
                                className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                                defaultValue={name}
                                {...register("name")}
                            />
                            </div>
                            <select
                                id="category"
                                className="border-2 border-gray-300 rounded-md p-2"
                                name="category"
                                defaultValue={categories}
                                {...register("category")}
                            >
                                <option className='my-2'>{categories}</option>
                                <hr className='my-2 p-4' />
                                {categoryData?.map((category) => (
                                    <option
                                        key={category?._id}
                                        value={category?.name}
                                        className="border-2 border-gray-300 rounded-md p-4 my-2"
                                    >
                                        {category?.name}
                                    </option>
                                ))}
                            </select>


                            <div className='border-2 border-gray-300 rounded-md p-2'>
                                <input type="text"
                                    placeholder="Brand"
                                    className='border-2 border-gray-300 rounded-md p-2'
                                    defaultValue={brand}
                                    {...register("brand")}
                                />
                            </div>
                            <div className='border-2 border-gray-300 rounded-md p-2'>
                                <input type="text"
                                    placeholder="Product Type"
                                    className='border-2 border-gray-300 rounded-md p-2'
                                    defaultValue={type}
                                    {...register("type")}
                                />
                            </div>
                            <div className='border-2 border-gray-300 rounded-md p-2'>
                                <input type="number"
                                    placeholder="Price"
                                    className='border-2 border-gray-300 rounded-md p-2'
                                    defaultValue={price}
                                    {...register("price")}
                                />
                            </div>
                            <div className='border-2 border-gray-300 rounded-md p-2'>
                                <input type="number"
                                    placeholder="Quantity"
                                    className='border-2 border-gray-300 rounded-md p-2'
                                    defaultValue={quantity}
                                    {...register("quantity")}
                                />
                            </div>
                            <div className='border-2 border-gray-300 rounded-md p-2'>
                                <input type="number"
                                    placeholder="Discount Percentage"
                                    className='border-2 border-gray-300 rounded-md p-2'
                                    defaultValue={discount}
                                    {...register("discount")}
                                />
                            </div>

                            <select name="status" id="status"
                                className='border-2 border-gray-300 rounded-md p-2'
                                {...register("status")}
                            >
                                <option value={status}>
                                    {status}
                                </option>
                                <hr />
                                <option value="Tranding"
                                    className='border-2 border-gray-300 rounded-md p-4 my-2'
                                >Tranding</option>
                                <option value="New Arrival"
                                    className='border-2 border-gray-300 rounded-md p-4 my-2'
                                >New Arrival</option>
                                <option value="Best Seller"
                                    className='border-2 border-gray-300 rounded-md p-4 my-2'>Best Seller</option>
                                <option value="Featured"
                                    className='border-2 border-gray-300 rounded-md p-4 my-2'>Featured</option>

                                <option value="Popular"
                                    className='border-2 border-gray-300 rounded-md p-4 my-2'>Popular</option>
                            </select>

                            <Select
                                mode="tags"
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Coupon"
                                defaultValue={coupon}
                                onChange={handleCouponChange}
                                options={couponOptions}
                            />

                            <div className='flex flex-col gap-3'>
                                {
                                   details && details?.map((detail, index) => {
                                        return (
                                            <div key={index}>
                                                <div className='border-2 border-gray-300 rounded-md p-2 my-3'>
                                                <input type="text"
                                                    placeholder="Details"
                                                    className=' p-2'
                                                    defaultValue={detail.heading}
                                                    {...register("details")}
                                                />
                                                </div>
                                                <div className='border-2 border-gray-300 rounded-md p-2'>
                                                <input type="text"
                                                    placeholder="Details"
                                                    className='  rounded-md p-2'
                                                    defaultValue={detail.description}
                                                    {...register("details")}
                                                />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            
                            </div>

                            <div className='flex flex-col gap-3'>
                                {
                                   features && features?.map((feature, index) => {
                                        return (
                                            <div key={index}>
                                                <div className='border-2 border-gray-300 rounded-md p-2 my-2'>
                                                <input type="text"
                                                    placeholder="Details"
                                                    className='border-2 border-gray-300 rounded-md p-2'
                                                    defaultValue={feature.heading}
                                                    {...register("features")}
                                                />
                                                </div>
                                                <div className='border-2 border-gray-300 rounded-md p-2'>
                                                <input type="text"
                                                    placeholder="Details"
                                                    className='border-2 border-gray-300 rounded-md p-2'
                                                    defaultValue={feature.description}
                                                    {...register("features")}
                                                />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                                <div>
                                    {
                                        isAndroid && (
                                            <div>
<div className='border-2 border-gray-300 rounded-md p-2'>
                <input
                    type="text"
                    placeholder="Processor"
                    defaultValue={processor}
                    {...register("processor")}
                />
            </div>
            <div className='border-2 border-gray-300 rounded-md p-2'>
                <input
                    type="text"
                    placeholder="RAM"
                    defaultValue={ram}
                    {...register("ram")}
                />
            </div>
            <div className='border-2 border-gray-300 rounded-md p-2'>
                <input
                    type="text"
                    placeholder="ROM"
                    defaultValue={rom}
                    {...register("rom")}
                />
            </div>
            <div className='border-2 border-gray-300 rounded-md p-2'>
                <input
                    type="text"
                    placeholder="Display Size"
                    defaultValue={displaySize}
                    {...register("displaySize")}
                />
            </div>
            <div className='border-2 border-gray-300 rounded-md p-2'>
                <input
                    type="text"
                    placeholder="wlcpaa"
                    defaultValue={wlcpaa}
                    {...register("wlcpaa")}
                />
            </div>
            <div className='border-2 border-gray-300 rounded-md p-2'>
                <input
                    type="text"
                    placeholder="Dvr"
                    defaultValue={dvr}
                    {...register("dvr")}
                />
            </div>
            <div className='border-2 border-gray-300 rounded-md p-2'>
                <input
                    type="text"
                    placeholder="Camera 360"
                    defaultValue={camera360}
                    {...register("camera360")}
                />
            </div>
            <div className='border-2 border-gray-300 rounded-md p-2'>
                <input
                    type="text"
                    placeholder="Sim"
                    defaultValue={sim}
                    {...register("sim")}
                />
            </div>
            <div className='border-2 border-gray-300 rounded-md p-2'>
                <input
                    type="text"
                    placeholder="Optical Input"
                    defaultValue={opticalInput}
                    {...register("opticalInput")}
                />
            </div>
            <div className='border-2 border-gray-300 rounded-md p-2'>
                <input
                    type="text"
                    placeholder="Qled"
                    defaultValue={qled}
                    {...register("qled")}
                />
            </div>
            <div className='border-2 border-gray-300 rounded-md p-2'>
                <input
                    type="text"
                    placeholder="Warranty"
                    defaultValue={warranty}
                    {...register("warranty")}
                />
            </div>
                                            </div>
                                        )
                                    }
                                </div>

                            {/* <textarea id="txtid" name="txtname" rows="4" cols="50" maxlength="200"
                                placeholder="Description"
                                defaultValue={details}
                                {...register("details")}
                                className="border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                            >
                            </textarea> */}



                            {/* <textarea name="txtname" rows="4" cols="50" maxlength="200"
                                placeholder="Features"
                                defaultValue={features}
                                {...register("productFeatures", {
                                    setValueAs: (value) => {
                                        // Split the value into an array
                                        const featuresArray = value.split(',');
                                        // Set the value as the array
                                        return featuresArray;
                                    }
                                })}
                                className="border-[2px] border-[#090606] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                            >
                            </textarea> */}

                            <div className="w-full h-full">
                                <div className="p-4 rounded-lg shadow-xl bg-gray-50">
                                    <label className="inline-block mb-2 text-gray-500">Upload book Image</label>
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col w-full h-32 max-w-xs border-4 border-blue-200 border-dashed md:max-w-md hover:bg-gray-100 hover:border-gray-300">
                                            <div className="flex flex-col items-center justify-center pt-7">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                    />
                                                </svg>
                                                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                    Attach file{' '}
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                className="px-4 pb-4"
                                                name="images"
                                                accept="image/*"
                                                defaultValue={images}
                                                multiple
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-center justify-center gap-4 my-4">
                                        {images && images?.map((uploadedImageUrl, index) => (
                                            <div key={index} className="relative flex flex-col overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md">
                                                <a
                                                    className="relative flex mx-3 mt-3 overflow-hidden h-60 rounded-xl"
                                                    href="#"
                                                >
                                                    <img
                                                        className=""
                                                        src={uploadedImageUrl}
                                                        alt="book image"
                                                    />
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    {/* show selected image  */}
                                    {
                                        imageFiles?.map((image, index) => (
                                            <div key={index} className="relative flex flex-col overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md">
                                                <a
                                                    className="relative flex mx-3 mt-3 overflow-hidden h-60 rounded-xl"
                                                    href="#"
                                                >
                                                    <img
                                                        className=""
                                                        src={URL.createObjectURL(image)}
                                                        alt="book image"
                                                    />
                                                </a>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <Button type="default"
                                onClick={handleSubmit(onSubmit)}
                                htmlType="submit" style={{
                                    marginTop: '20px',
                                }}>
                                {
                                    loading ? 'Loading...' : 'Update Porduct'
                                }
                            </Button>
                        </div>
                    </div>
                </section>
            </section>
        </DashboardLayout >
    );
};

export default UpdatePorductPage;