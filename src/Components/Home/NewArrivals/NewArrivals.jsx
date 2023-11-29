import React, { useCallback, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { TbArrowBigLeft, TbArrowBigRight } from "react-icons/tb";
import Link from "next/link";
import useProducts from "@/src/Hooks/useProducts";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthContext } from "@/src/Context/UserContext";
import { useRouter } from "next/router";
import { addToCartUrl } from "@/src/Utils/Urls/ProductUrl";
import Swal from "sweetalert2";


const NewArrivals = () => {
  const { productData } = useProducts();

  const filterProductData = productData?.filter((data) => {
    return data?.status === "New Arrivals";
  });

  const { user } = useContext(AuthContext);
  const router = useRouter();

  const sliderRef = useRef(null);
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Only trigger the animation once
    });
  }, []);

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



  return (
    <section className=" container" >
      <div className='mt-[24px]'>
      <h3 className="font-light mb-6 text-3xl text-black">Latest <strong className='font-extrabold text-[#29679e]'>Products</strong></h3>

      <div>
        <Swiper
          ref={sliderRef}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            360: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            480: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          spaceBetween={20}
          slidesPerView={3}
          onSlideChange={() => { }}
          onSwiper={(swiper) => { }}
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
          className=""
        >
          <div className="grid grid-cols-1 justify-center items-center mx-auto md:grid-cols-2 lg:grid-cols-3 gap-4 pt-30">
            {filterProductData &&
              filterProductData.map((product) => {
                return (
                 
                   <SwiperSlide className="cursor-grab" key={product?._id}
                   >
                     <div className="group relative overflow-hidden min-w-screen-md  w-full">
                       <div className="relative border aspect-w-1 w-full overflow-hidden rounded-xl bg-transparent lg:aspect-none  h-80">
                           {/* <div className="bg-black text-white absolute top-2 left-2 px-4 py-1  rounded text-sm">20%  Discount</div> */}
                         {/* <img
                           src={product?.images[0]}
                           alt={product?.name}
                           className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                         /> */}
                       </div>
                       <div className=" aspect-h-1  border aspect-w-1 w-full overflow-hidden rounded-t-md  lg:aspect-none group-hover:opacity-90 h-80 absolute top-0 left-0  transition duration-300"
                       >
                       
                         <img
                           src={"https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Lunar_Peak.jpg?v=1698819324" || product?.images[0]}
                           alt={product?.name}
                           className="h-full w-full relative object-cover object-center lg:h-full lg:w-full"
                         />
                       </div>
                       <div className="bg-yellow-500 absolute py-1  left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-xl border-white text-white text-xs font-medium border px-4">Highest Discount</div>

                       <div className="absolute -right-16 bottom-20 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                         <button
                           onClick={() => addToCart(product._id, product?.price)}
                           className="flex h-10 w-10 items-center justify-center bg-[#fff]text-white transition hover:bg-gray-700">
                           <svg
                             xmlns="http://www.w3.org/2000/svg"
                             className="mr-2 h-5 w-5"
                             viewBox="0 0 20 20"
                             fill="currentColor"
                           >
                             <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                           </svg>
                         </button>
                       </div>
                       <div className='absolute left-[7%] top-[7%]'>
                        <p className='bg-[#c1970d] text-white px-4 rounded-md shadow'>
                          New 
                        </p>
                      </div>
                       <div className="flex p-2 flex-col border rounded-b-md">
                         <div>
                           <h3 className="text-[14px] mt-2 font-semibold text-gray-800 text-left">
                             <Link href={`/products/${product?._id}`}>
                               <span aria-hidden="true" className="absolute inset-0" />
                               {product?.name}
                             </Link>
                           </h3>
                         </div>
                         <div>
                           <p className="text-[16px] text-gray-900 mt-1 text-left">
                             <span className='font-semibold'>
                               {product?.discount
                                 ? `₹ ${Math.floor(product?.price - (product?.price * product?.discount) / 100)}`
                                 : `₹ ${Math.floor(product?.price)}`
                               }
                             </span>
                             <span className="text-sm text-gray-400 line-through mx-2">
                               ₹ {Math.floor(product?.price)}
                             </span>
                             <span className='text-[#2f9555] text-bold'>
                               {Math.floor(product?.discount)}% off
                             </span>
                           </p>
                         </div>
                       </div>
                     </div>
                   </SwiperSlide>
     
                );
              })}
          </div>
        </Swiper>
      </div>
      </div>
    </section>
  );
};

export default NewArrivals;
