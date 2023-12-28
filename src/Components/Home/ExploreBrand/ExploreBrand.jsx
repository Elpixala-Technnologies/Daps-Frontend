import React, { useState } from "react";
import  useMediaHooks  from '@/src/Hooks/useMediaHooks';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import Link from "next/link";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

const ExploreBrand = () => {
  const { exploreBrandData } = useMediaHooks();
  const [isMuted, setIsMuted] = useState(true);
  const handleHover = () => {
    setIsMuted(false);
  };
  
 
  const handleLeave = () => {
    setIsMuted(true);
  };
 

  return (
    <div className="container pt-8">
      <h3 className="font-light text-3xl text-black">
        Explore{" "}
        <strong className="font-extrabold text-[#29679e] ">Our Brands</strong>
      </h3>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
          },
          360: {
            slidesPerView: 1.5,
          },
          480: {
            slidesPerView: 1.5,
          },
          640: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 2.5,
          },
          1024: {
            slidesPerView: 4.5,
          },
        }}
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
        scrollbar={{ draggable: true, hide: true }}
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
      >
        {exploreBrandData &&
          exploreBrandData?.map((itm) => {
            return (
              <SwiperSlide key={itm._id}>
                <div
                  className="color-b bg-white p-2 md:p-3 text-center rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-[#18568C]"
                  data-aos="fade-up" // Add AOS animation attribute
                  data-aos-duration="1000" // Set animation duration in milliseconds
                  key={itm._id}
                >
                  <Link
                    href={`/products?categoryName=${encodeURIComponent(
                      itm?.name
                    )}`}
                  >
                    <div
                      onMouseEnter={handleHover}
                      onMouseLeave={handleLeave}
                      className="rounded-xl relative overflow-hidden hover-box duration-200 w-full h-[20rem] "
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
                    <h3 className="text-[16px] text-center font-semibold text-slate-700 mt-1">
                      {itm?.name}
                    </h3>
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default ExploreBrand;
