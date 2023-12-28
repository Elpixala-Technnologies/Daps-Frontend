import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import useMediaHooks from "@/src/Hooks/useMediaHooks";
import { Modal } from "antd";
import Stories from "stories-react";
import "stories-react/dist/index.css";
import FullscreenStory from "../Home/FullscreenStory/FullscreenStory";
import Link from "next/link";

const InstraStoryEffect = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // To track the current slide index
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { storyData } = useMediaHooks();

  const openFullscreenVideo = (videoSrc, index) => {
    setSelectedVideo(videoSrc);
    setCurrentIndex(index);
    setIsModalOpen(true); // Open the modal when a story is clicked
  };

  const closeFullscreenVideo = () => {
    setSelectedVideo(null);
    setIsModalOpen(false); // Close the modal
  };
  // const handleCarouselChange = (index) => {
  //   // Pause the video when changing slides
  //   if (selectedVideo) {
  //     setSelectedVideo(null);
  //   }
  //   setCurrentIndex(index);
  // };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setSelectedVideo(null);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  // Inside your component
  const handleCarouselChange = (index) => {
    const visibleItems =
      responsive.find((item) => item.breakpoint === currentBreakpoint)?.items ||
      1;
    const totalItems = storyData?.length || 1;
    const scrollableWidth = totalItems - visibleItems;
    const scrollPercentage = (index / scrollableWidth) * 100;

    // Adjust the thumb position based on scroll percentage
    const thumb = document.querySelector(".carousel-scrollbar-thumb");
    thumb.style.transform = `translateY(${scrollPercentage}%)`;
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container pt-8 ">
      <h3 className="font-light mb-3 text-3xl text-black">
        Latest{" "}
        <strong className="font-extrabold text-[#29679e] ">Stories</strong>
      </h3>
      <div className="h-[15rem] py-4">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          breakpoints={{
            320: {
              slidesPerView: 3.5,
            },
            360: {
              slidesPerView: 3.5,
            },
            480: {
              slidesPerView: 3.5,
            },
            640: {
              slidesPerView: 3.5,
            },
            768: {
              slidesPerView: 4.5,
            },
            1024: {
              slidesPerView: 10.5,
            },
          }}
          spaceBetween={12}
          onSlideChange={() => {}}
          onSwiper={(swiper) => {}}
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
          scrollbar={{ draggable: true, hide: true }}
          className="h-full"
        >
          {storyData &&
            storyData.length > 0 &&
            storyData?.map((itm, index) => (
              <SwiperSlide key={itm._id}>

                <div
                  className="flex relative flex-col cursor-pointer items-center align-middle text-center justify-center"
                  key={itm?._id}
                >
                  <Link
                    href={`/fullscreen-story/${index}`}
                  >
                  <div
                    className="relative storyOutline  hover-box  md:w-[80px] w-[80px] md:h-[80px] overflow-hidden h-[80px] border-4 rounded-full flex items-center justify-center border-transparent"
                    // onClick={showModal}
                  >
                    <img src={itm?.image} className="w-full h-full" />
                  </div>
                  <h4 className="font-semibold text-[13px] mt-1 text-center text-slate-600">
                    {itm?.name}
                  </h4>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
     
    </div>
  );
};

export default InstraStoryEffect;
