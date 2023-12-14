import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from 'antd';
const { TextArea } = Input;
import { Button } from 'antd';
import { Select } from 'antd';
import Swal from "sweetalert2";
import useProducts from '@/src/Hooks/useProducts';
import { createProductUrl } from '@/src/Utils/Urls/ProductUrl';
import { FaTrashAlt } from "react-icons/fa";

const AddProduct = () => {
  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const { categoryData, couponData } = useProducts();
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [status, setStatus] = useState("")
  const [isAndroid, setIsAndroid] = useState(false)
  const [showAndroidDetails, setShowAndroidDetails] = useState(false);
  const [processor, setProcessor] = useState("");
  const [ram, setRam] = useState("");
  const [rom, setRom] = useState("");
  const [displaySize, setDisplaySize] = useState("")
  const [wlcpaa, setWlcpaa] = useState("")
  const [dvr, setDvr] = useState("")
  const [sim, setSim] = useState("")
  const [camera360, setCamera360] = useState("")
  const [opticalInput, setOpticalInput] = useState("")
  const [warranty, setWarranty] = useState("")
  const [qled, setQled] = useState("")

  // ===
  const productDetailTamplate = {
    heading: "",
    description: ""
  }
  const [description, setDescription] = useState([productDetailTamplate]);

  const addDetails = () => {
    setDescription([...description, productDetailTamplate])
  }

  const removeDetails = (index) => {
    const newDetails = description.filter((description, i) => i !== index);
    setDescription(newDetails)
  }

  const onChangeDetail = (event, index) => {
    const updatedDetal = lend.map((lend, i) =>
      index === i
        ? Object.assign(lend, { [event.target.name]: event.target.value })
        : lend
    );
    setDescription(updatedDetal);
  };


  const featuresTamplate = {
    heading: "",
    description: ""
  }

  const [features, setFeatures] = useState([featuresTamplate]);

  const addFeatures = () => {
    setFeatures([...features, featuresTamplate])
  }

  const removeFeatures = (index) => {
    const newFeatures = features.filter((features, i) => i !== index);
    setFeatures(newFeatures)
  }

  const onChangeFeatures = (event, index) => {
    const updatedFeatures = lend.map((lend, i) =>
      index === i
        ? Object.assign(lend, { [event.target.name]: event.target.value })
        : lend
    );
    setFeatures(updatedFeatures);
  };

  // ==============

  const handleAndroidCheckboxChange = (e) => {
    setIsAndroid(e.target.checked);
    setShowAndroidDetails(e.target.checked);
  };



  // ==== Cloudinary ==== 
  const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const cloud_api = process.env.NEXT_PUBLIC_CLOUDINARY_API;
  const cloud_folder = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER;

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

  const onSubmit = async () => {
    try {
      setLoading(true);
      const uploadedUrls = [];
      for (const imageFile of imageFiles) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset',
          `${cloud_folder}/Products/${imageFile?.name}`);
        formData.append('upload_preset', upload_preset);
        formData.append('cloud_name', cloud_name);

        const imgRes = await fetch(cloud_api, {
          method: 'POST',
          body: formData,
        });

        if (!imgRes.ok) {
          const errorResponse = await imgRes.text();
          throw new Error(`Error uploading image: ${imgRes.status} - ${imgRes.statusText}\n${errorResponse}`);
        }

        const imgdata = await imgRes.json();
        const imgurl = imgdata?.secure_url;
        if (imgurl) {
          uploadedUrls.push(imgurl);
        } else {
          throw new Error('Failed to retrieve the image URL from Cloudinary response.');
        }
      }

      const android = [{
        isAndroid: isAndroid,
        screenSize: screenSize,
        processor: processor,
        ram: ram,
        rom: rom,
        displaySize: displaySize,
        wlcpaa: wlcpaa,
        dvr: dvr,
        camera360: camera360,
        sim: sim,
        opticalInput: opticalInput,
        qled: qled,
        warranty: warranty
      }]

      const productData = {
        productName: name,
        productCategory: category,
        images: uploadedUrls,
        discount: discountPercentage,
        status: status,
        productDetails: description,
        productFeatures: features,
        android: android,
        fMBT: fMBT,
        bassTube: bassTube,
        led: led,
        speakers: speakers,
        chargers: chargers,
        amplifiers: amplifiers,
        dampingSheets: dampingSheets,
        HID: HID,
        camera: camera,

      }

      const res = await fetch(createProductUrl, {
        method: "POST",
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
    <section className="my-4">
      <div className="flex flex-col w-full gap-4 mx-auto add-book-form">
        <div
          className="add-book-form w-full md:w-[60%] mx-auto flex flex-col gap-4 "
        >
          <Input
            placeholder="Product Name"
            name="productName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            name="productCategory"
            id="productCategory"
            className="border-2 border-gray-300 rounded-md p-2"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option className='my-2'>Category</option>
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

          <Input
            placeholder="Discount Percentage"
            name="discount"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
          />

          <Input
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <div className='flex flex-col gap-4'>
            <h1 className='my-2'>Description</h1>
            {
              description.map((description, index) => {
                return (
                  <section
                    key={index}
                    className=""
                  >
                    <div className="form-control w-full">
                      <div className='border p-2'>
                        <input
                          type="text"
                          name="Heading"
                          onChange={(event) => onChangeDetail(event, index)}
                          value={description.heading}
                          placeholder="Heading"
                          className="input input-bordered w-full"
                        />
                      </div>
                    </div>

                    <div className="form-control w-full my-2">
                      <div className='border p-2'>
                        <input
                          type="text"
                          name="description"
                          onChange={(event) => onChangeDetail(event, index)}
                          value={description.description}
                          placeholder="Description"
                          className="input input-bordered w-full border"
                        />
                      </div>
                    </div>


                    <div>
                      <button
                        className="common-btn flex items-center gap-2"
                        onClick={() => removeDetails(index)}
                      >
                        <FaTrashAlt className="text-2xl mr-2"></FaTrashAlt>
                        Delete
                      </button>
                    </div>
                  </section>
                )
              })
            }
            <button className="common-btn" onClick={() => addDetails()}>
              Add More Details
            </button>
          </div>

          <div className='flex flex-col gap-4'>
            <h1 className='my-2'>Features</h1>
            {
              features.map((features, index) => {
                return (
                  <section
                    key={index}
                    className=""
                  >
                    <div className="form-control w-full">
                      <div className='border p-2'>
                        <input
                          type="text"
                          name="Heading"
                          onChange={(event) => onChangeFeatures(event, index)}
                          value={features.heading}
                          placeholder="Heading"
                          className="input input-bordered w-full"
                        />
                      </div>
                    </div>

                    <div className="form-control w-full my-2">
                      <div className='border p-2'>
                        <input
                          type="text"
                          name="description"
                          onChange={(event) => onChangeFeatures(event, index)}
                          value={features.description}
                          placeholder="Description"
                          className="input input-bordered w-full border"
                        />
                      </div>
                    </div>


                    <div>
                      <button
                        className="common-btn flex items-center gap-2"
                        onClick={() => removeFeatures(index)}
                      >
                        <FaTrashAlt className="text-2xl mr-2"></FaTrashAlt>
                        Delete
                      </button>
                    </div>
                  </section>
                )
              })
            }
            <button className="common-btn" onClick={() => addFeatures()}>
              Add More Features
            </button>
          </div>

          <div>
            <label className='flex items-center'>
              Is Android
              <input
                type="checkbox"
                checked={isAndroid}
                onChange={handleAndroidCheckboxChange}
                className="border mx-2 my-4"
              />
            </label>

            {showAndroidDetails && (
              <div className='flex flex-col gap-4'>
                <Input
                  placeholder="Processor"
                  value={processor}
                  onChange={(e) => setProcessor(e.target.value)}
                />
                <Input
                  placeholder="RAM"
                  value={ram}
                  onChange={(e) => setRam(e.target.value)}
                />
                <Input
                  placeholder="ROM"
                  value={rom}
                  onChange={(e) => setRom(e.target.value)}
                />
                <Input
                  placeholder="Display Size"
                  value={displaySize}
                  onChange={(e) => setDisplaySize(e.target.value)}
                />
                <Input
                  placeholder="WlcPaa"
                  value={wlcpaa}
                  onChange={(e) => setWlcpaa(e.target.value)}
                />
                <Input
                  placeholder="Camera360"
                  value={camera360}
                  onChange={(e) => setCamera360(e.target.value)}
                />
                <Input
                  placeholder="Dvr"
                  value={dvr}
                  onChange={(e) => setDvr(e.target.value)}
                />
                <Input
                  placeholder="Sim"
                  value={sim}
                  onChange={(e) => setSim(e.target.value)}
                />
                <Input
                  placeholder="Optical Input"
                  value={opticalInput}
                  onChange={(e) => setOpticalInput(e.target.value)}
                />
                <Input
                  placeholder="Qled"
                  value={qled}
                  onChange={(e) => setQled(e.target.value)}
                />
                <Input
                  placeholder="Warranty"
                  value={warranty}
                  onChange={(e) => setWarranty(e.target.value)}
                />
              </div>
            )}



          </div>

          <div className="w-full h-full">
            <div className="rounded-lg shadow-xl bg-gray-50 p-4">
              <label className="inline-block mb-2 text-gray-500">Upload Product Image</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full max-w-xs md:max-w-md h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
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
                    multiple
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            {/* preview the selected images here  */}

            <div className="flex flex-wrap gap-4 mt-4">
              {imageFiles.map((file) => (
                <div
                  key={file.name}
                  className="relative w-32 h-32 overflow-hidden rounded-md"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSubmit(onSubmit)}
            type="default" htmlType="submit" style={{
              marginTop: '20px',
            }}>
            {
              loading ? 'Loading...' : 'Add Product'
            }
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
