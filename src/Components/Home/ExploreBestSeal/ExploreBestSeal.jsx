import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import Link from "next/link";
import useMediaHooks from "@/src/Hooks/useMediaHooks";

const ExploreBestSeal = () => {
  const { trendingProductData } = useMediaHooks();
  const [isMuted, setIsMuted] = useState(true);
  const handleHover = () => {
    setIsMuted(false);
  };

  const handleLeave = () => {
    setIsMuted(true);
  };

  return (
    <div className="container ">
      <h3 className="font-light mb-2 text-3xl text-black">
        Trending{" "}
        <strong className="font-extrabold text-[#29679e]">Products</strong>
      </h3>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          360: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          480: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 5.5,
          },
        }}
        spaceBetween={12}
        // slidesPerView={3}
        onSlideChange={() => { }}
        onSwiper={(swiper) => { }}
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        scrollbar={{ draggable: true, hide: true }}
      >
        {trendingProductData &&
          trendingProductData?.map((itm) => {
            const {product} = itm

            console.log(product, "prodct form best ct")

            return (
              <SwiperSlide key={itm._id}>
                <div
                  className="  bg-white p-2 md:p-3 text-center rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 cardOutline hover:bg-red-10 hover:text-[#18568C]"
                  data-aos="fade-up" // Add AOS animation attribute
                  data-aos-duration="1000" // Set animation duration in milliseconds
                  key={itm._id}
                >
                  <Link href={`/products/${product?._id}`}>
                    <div
                      onMouseEnter={handleHover}
                      onMouseLeave={handleLeave}
                      className="rounded-xl relative overflow-hidden hover-box duration-200 w-full h-[22rem] "
                    >
                      <img src={itm?.image} className="w-full h-full " />
                      <video
                        dblclick={(e) => e.preventDefault()}
                        className="absolute  top-[0px]  left-0 bottom-0 right-0 duration-200 hover-img opacity-0 object-fit object-center sm:object-top md:object-top lg:object-top xl:object-top"
                        muted
                        loop
                        autoPlay
                      >
                        <source src={itm?.vedio} type="video/mp4" />
                      </video>
                    </div>
                    <div className="bg-white z-[9999999999] absolute h-[3rem] w-[3rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-1">
                      <img src={itm?.product?.images[0]} className="w-full h-full " />
                    </div>

                    <div>
                      <h3 className="text-[13px] text-center font-semibold text-slate-700 mt-6">
                        {product?.productName}
                      </h3>
                    </div>
                    <div>
                      <div className="flex gap-2 relative">
                        <h1 className="font-bold text-slate-900">
                          {product?.discount
                            ? `₹ ${Math.floor(
                              product?.price -
                              (product?.price *
                                product?.discount) /
                              100
                            )}`
                            : `₹ ${Math.floor(product?.price)}`}
                        </h1>
                        <span className="text-sm font-semibold text-gray-400 line-through mt-1">
                          ₹ {Math.floor(product?.price)}
                        </span>
                        
                        <p className="text-green-500 font-bold text-[16px] mt-1 absolute right-0">
                          {Math.floor(product?.discount)} % off
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default ExploreBestSeal;
