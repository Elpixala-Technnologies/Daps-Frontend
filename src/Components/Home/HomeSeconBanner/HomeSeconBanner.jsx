import {
  HomeSeconBannerImage
} from "@/src/Assets";
import { AuthContext } from '@/src/Context/UserContext';
import useProducts from '@/src/Hooks/useProducts';
import { addToCartUrl } from '@/src/Utils/Urls/ProductUrl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowRight } from 'react-icons/fa';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomeSeconBanner = () => {
  const { productData } = useProducts()
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const filteredProducts = productData && productData?.filter((product) => product.status === 'Best Offers')

  const sliderRef = useRef(null);

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
      // router.push('/cart');
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Only trigger the animation once
    });
  }, []);

  return (
    <section className='flex w-full gap-8 justify-center items-center flex-col md:flex-row'>
      

      <div className='banner-content w-full  relative'>
        <Image
          src={HomeSeconBannerImage}
          alt={"HomeOfferBannerOne"}
          width={650}
          height={400}
          className="w-full lg:h-[400px] rounded object-cover transition duration-200 ease-out transform hover:scale-105"
        />
        <div className='absolute md:top-[15%] top-[6%] left-[5%] bottom-0 md:left-[15%] right-0'>
          <div className='text-[#000]'>
            <p className='font-semibold'>ONLINE SHOP</p>
            <h1 className='font-bold text-[1.4rem] md:text-[2rem]'>
              SAVE TIME <br /> AND MONEY
            </h1>
            <h4 className='font-semibold text-[#009EE2] text-[1.2rem] mb-4'>
              UP TO 20% OFF
            </h4>

            <Link href='/prodcts' className='common-btn-outline py-4 px-4 mt-6'>
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSeconBanner;