import Image from 'next/image';
import React, { useContext } from "react";
import Link from 'next/link';
import { AuthContext } from "@/src/Context/UserContext";
import { useRouter } from "next/router";
import { addToCartUrl } from "@/src/Utils/Urls/ProductUrl";
import Swal from "sweetalert2";
import { FaCartPlus, FaStar } from 'react-icons/fa';

const ProductCard = ({ productValueData }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const product = productValueData;

  const addToCart = async (productId, price) => {
    const convertPrice = parseInt(price);

    // Check if the user is logged in
    if (!user) {
      // User is not logged in, show an alert
      Swal.fire({
        icon: 'error',
        title: 'Please log in to add the product to your cart',
        showConfirmButton: true,
      });
      return;
    }

    const res = await fetch(addToCartUrl(productId), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product: productId,
        quantity: 1,
        totalPrice: convertPrice,
        email: user.email,
        status: "unpaid",
      }),
    });

    const data = await res.json();

    if (data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Your product added to the cart',
        showConfirmButton: false,
        timer: 1500,
      });
      router.push('/cart');
    }
  };

  const { images, name, discount, price, _id } = productValueData

  return (
    <div className='border rounded-[0.6rem] relative'>
    <div>
      <Link href={`/product/${product?._id}`}>
        <div className="productImage">
          <div className="h-menu border rounded-t-[0.6rem] overflow-hidden relative">
            <img
              src={product?.images[0]}
              alt="First Image"
              className="h-full w-full object-cover duration-200"
            />
            <img
              src={product?.images[1]}
              alt="Second Image"
              className="hover-img absolute top-0 left-0 w-full h-full object-cover duration-300"
            />
          </div>
        </div>
      </Link>
    </div>
    <div className='px-4 py-1 bg-[#000] rounded-r absolute top-4 text-[#fff] text-[0.6rem] font-semibold'>
      🎉 New Launch
    </div>

    <div className='rounded-b-[0.6rem] bg-[#fafafa] p-4 relative'>
      {
        product?.brand !== "" && (
          <div className='px-6 py-1 bg-[#fcc50b] w-[70%] rounded-md  absolute top-[-1rem] text-center left-[14%] font-semibold text-white text-[14px]'>
            New Arrival
          </div>
        )
      }
      <div className='my-1 text-left '>
        <Link href={`/product/${product?._id}`} className='font-semibold text-[14px]'>{product?.productName}</Link>
        <div className="flex items-center justify-between ">
          <div className='flex gap-2'>
            {/* <h1 className="font-bold text-slate-900">
              {product?.discount
                ? `₹ ${Math.floor(product?.price - (product?.price * product?.discount) / 100)}`
                : `₹ ${Math.floor(product?.price)}`
              }
            </h1>
            <span className="text-sm font-semibold text-gray-400 line-through mt-1">
              ₹ {Math.floor(product?.price)}
            </span>
            <span className='text-green-500 font-bold text-[13px] mt-1'>
              {Math.floor(product?.discount)} % off
            </span> */}
            <h1 className="font-bold text-slate-900">
               ₹ {Math.floor(product?.chargers[0]?.basePrice)}
            </h1>
          </div>
          <div className='absolute right-2'>
            <div className='flex flex-col  gap-3 justify-end'>
              <Link href={`/product/${product?._id}`}
                className='border px-4 text-[12px] font-semibold rounded-lg py-2 bg-black text-white flex items-center gap-2'
              >
                Add To Cart
              </Link>
            </div>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <span className="flex items-center gap-2 text-[14px]">
            <FaStar className="text-orange-500" />
            Be first to review
          </span>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ProductCard;