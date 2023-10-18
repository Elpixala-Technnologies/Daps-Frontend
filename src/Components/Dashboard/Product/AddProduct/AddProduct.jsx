import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from 'antd';
const { TextArea } = Input;
import { Button } from 'antd';
import { Select } from 'antd';
import Swal from "sweetalert2";
import useProducts from '@/src/Hooks/useProducts';
import { createProductUrl } from '@/src/Utils/Urls/ProductUrl';


const AddProduct = () => {
  const { handleSubmit } = useForm();
  const { categoryData, couponData } = useProducts();
  const [category, setCategory] = useState("");
  const [coupon, setCoupon] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("")
  const [status, setStatus] = useState("")

  const [loading, setLoading] = useState(false);

  // === coupon ===
  const couponOptions = couponData?.map((coupon) => ({
    value: coupon._id,
    label: coupon.coupon,
  }));
  const handleCouponChange = (value) => {
    setCoupon(value);
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
      const productData = {
        name: name,
        categories: category,
        images: uploadedUrls,
        brand: brand,
        price: price,
        discount: discountPercentage,
        type: type,
        status: status,
        details: description,
        features: features,
        coupon: coupon,
        quantity: quantity,
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="add-book-form w-full md:w-[60%] mx-auto flex flex-col gap-4 "
        >
          <Input
            placeholder="Product Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            name="category"
            id="category"
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
            placeholder="Price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <Input
            placeholder="Discount Percentage"
            name="discountPercentage"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
          />

          <Select
            mode="tags"
            style={{
              width: '100%',
            }}
            placeholder="Coupon"
            onChange={handleCouponChange}
            options={couponOptions}
          />

          <Input
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <Input
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />

          <Input
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <Input
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          <TextArea
            rows={4}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextArea
            rows={4}
            placeholder="Features"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          />

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

          <Button type="default" htmlType="submit" style={{
            marginTop: '20px',
          }}>
            {
              loading ? 'Loading...' : 'Add Product'
            }
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
