 
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";
import useHomeSlider from "@/src/Hooks/useHomeSlider";
import Link from "next/link";
 

const HeroSlider = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { homeSliderData } = useHomeSlider();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Define your mobile breakpoint
    };

    handleResize(); // Check the initial screen width
    window.addEventListener("resize", handleResize); // Listen for window resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Remove the event listener when the component unmounts
    };
  }, []);

  return (
    <dic className="overflow-hidden">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        slidesPerView={1}
        pagination={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper heroSlider"
      >
        {homeSliderData &&
          homeSliderData?.map((slide) => {
            return (
              <SwiperSlide key={slide?.id}>
                <div className="slider-images">
                  <Link
                    href={`/products?categoryName=${encodeURIComponent(
                      slide?.category
                    )}`}
                  >
                    <Image
                      src={isMobile ? slide?.mobileImage : slide?.desktopImage}
                      alt="Banner Image"
                      className="w-full h-full block"
                      width={isMobile ? 768 : 1920}
                      height={isMobile ? 768 : 500}
                    />
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </dic>
  );
};

export default HeroSlider;
