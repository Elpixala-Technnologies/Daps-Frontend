import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "swiper/css/scrollbar";

import img12 from "@/src/Assets/brands/sdownload.jpeg";
import useMediaHooks from "@/src/Hooks/useMediaHooks";

const InstraStoryEffect = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // To track the current slide index

  const {storyData} = useMediaHooks();

  const openFullscreenVideo = (videoSrc, index) => {
    setSelectedVideo(videoSrc);
    setCurrentIndex(index);
  };

  const closeFullscreenVideo = () => {
    setSelectedVideo(null);
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

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 13,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 13,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4,
    },
  };

  const carsInfo = [
    {
      id: 1,
      name: "Camera",
      image: "https://i.ibb.co/d7dmHT1/2874749.webp",
      thum: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456",
      video:
        "https://res.cloudinary.com/elpixala/video/upload/v1699818085/Daps/Video/vuy4w20q6yzxwytwsain.mp4",
    },
    {
      id: 2,
      name: "HID",
      image: "https://i.ibb.co/QYpypT6/pngimg-com-car-logo-PNG1643-1.png",
      thum: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456",
      video:
        "https://res.cloudinary.com/elpixala/video/upload/v1699818101/Daps/Video/udwdrakltqhai6zjil0b.mp4",
    },
    {
      id: 3,
      name: "LED",
      image: "https://i.ibb.co/GHVSqTP/free-hyundai-3215422-2673840.webp",
      thum: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456",
      video:
        "https://res.cloudinary.com/elpixala/video/upload/v1699818110/Daps/Video/wbkf6svvxaskagjfmebg.mp4",
    },
    {
      id: 4,
      name: "Speakers",
      image: "https://i.ibb.co/RbrZRb4/download.png",
      thum: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456",
      video:
        "https://res.cloudinary.com/elpixala/video/upload/v1699818177/Daps/Video/ubo474a030zdreweg2no.mp4",
    },
    {
      id: 5,
      name: "Charger",
      image: "https://i.ibb.co/syNSYJW/Kia-logo.png",
      thum: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456",
      video:
        "https://res.cloudinary.com/elpixala/video/upload/v1699818085/Daps/Video/vuy4w20q6yzxwytwsain.mp4",
    },

    {
      id: 7,
      name: "Damping Sheets",
      image: "https://i.ibb.co/4f6Lm43/free-mahindra-3441189-2874294.webp",
      thum: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456",
      video:
        "https://res.cloudinary.com/elpixala/video/upload/v1699818177/Daps/Video/ubo474a030zdreweg2no.mp4",
    },
    {
      id: 8,
      name: "Basstube",
      image: "https://i.ibb.co/RbrZRb4/download.png",
      thum: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456",
      video:
        "https://res.cloudinary.com/elpixala/video/upload/v1699818085/Daps/Video/vuy4w20q6yzxwytwsain.mp4",
    },
    {
      id: 9,
      name: "Android Stereos",
      image: "https://i.ibb.co/4PHxxGX/pngimg-com-jeep-PNG95.png",
      thum: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456",
      video:
        "https://res.cloudinary.com/elpixala/video/upload/v1699818085/Daps/Video/vuy4w20q6yzxwytwsain.mp4",
    },
    {
      id: 10,
      name: "Android Stereos",
      image: "https://i.ibb.co/4PHxxGX/pngimg-com-jeep-PNG95.png",
      thum: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456",
      video:
        "https://res.cloudinary.com/elpixala/video/upload/v1699818085/Daps/Video/vuy4w20q6yzxwytwsain.mp4",
    },
    {
      id: 11,
      name: "Android Stereos",
      image: "https://i.ibb.co/4PHxxGX/pngimg-com-jeep-PNG95.png",
      thum: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456",
      video:
        "https://res.cloudinary.com/elpixala/video/upload/v1699818085/Daps/Video/vuy4w20q6yzxwytwsain.mp4",
    },
    {
      id: 12,
      name: "Android Stereos",
      image: "https://i.ibb.co/4PHxxGX/pngimg-com-jeep-PNG95.png",
      thum: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456",
      video:
        "https://res.cloudinary.com/elpixala/video/upload/v1699818085/Daps/Video/vuy4w20q6yzxwytwsain.mp4",
    },
    {
      id: 13,
      name: "Android Stereos",
      image: "https://i.ibb.co/4PHxxGX/pngimg-com-jeep-PNG95.png",
      thum: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456",
      video:
        "https://res.cloudinary.com/elpixala/video/upload/v1699818085/Daps/Video/vuy4w20q6yzxwytwsain.mp4",
    },
    {
      id: 14,
      name: "Android Stereos",
      image: "https://i.ibb.co/4PHxxGX/pngimg-com-jeep-PNG95.png",
      thum: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456",
      video:
        "https://res.cloudinary.com/elpixala/video/upload/v1699818085/Daps/Video/vuy4w20q6yzxwytwsain.mp4",
    },
    {
      id: 15,
      name: "Android Stereos",
      image: "https://i.ibb.co/4PHxxGX/pngimg-com-jeep-PNG95.png",
      thum: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456",
      video:
        "https://res.cloudinary.com/elpixala/video/upload/v1699818085/Daps/Video/vuy4w20q6yzxwytwsain.mp4",
    },
    {
      id: 16,
      name: "Android Stereos",
      image: "https://i.ibb.co/4PHxxGX/pngimg-com-jeep-PNG95.png",
      thum: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456",
      video:
        "https://res.cloudinary.com/elpixala/video/upload/v1699818085/Daps/Video/vuy4w20q6yzxwytwsain.mp4",
    },
    {
      id: 17,
      name: "Android Stereos",
      image: "https://i.ibb.co/4PHxxGX/pngimg-com-jeep-PNG95.png",
      thum: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456",
      video:
        "https://res.cloudinary.com/elpixala/video/upload/v1699818085/Daps/Video/vuy4w20q6yzxwytwsain.mp4",
    },
    {
      id: 18,
      name: "Android Stereos",
      image: "https://i.ibb.co/4PHxxGX/pngimg-com-jeep-PNG95.png",
      thum: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456",
      video:
        "https://res.cloudinary.com/elpixala/video/upload/v1699818085/Daps/Video/vuy4w20q6yzxwytwsain.mp4",
    },
    {
      id: 19,
      name: "Android Stereos",
      image: "https://i.ibb.co/4PHxxGX/pngimg-com-jeep-PNG95.png",
      thum: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456",
      video:
        "https://res.cloudinary.com/elpixala/video/upload/v1699818085/Daps/Video/vuy4w20q6yzxwytwsain.mp4",
    },
  ];

  // Inside your component
  const handleCarouselChange = (index) => {
    const visibleItems =
      responsive.find((item) => item.breakpoint === currentBreakpoint)?.items ||
      1;
    const totalItems = carsInfo?.length || 1;
    const scrollableWidth = totalItems - visibleItems;
    const scrollPercentage = (index / scrollableWidth) * 100;

    // Adjust the thumb position based on scroll percentage
    const thumb = document.querySelector(".carousel-scrollbar-thumb");
    thumb.style.transform = `translateY(${scrollPercentage}%)`;
  };

  return (
    <div className="container pt-8">
      <h3 className="font-light mb-3 text-3xl text-black">
        Latest{" "}
        <strong className="font-extrabold text-[#29679e] ">Stories</strong>
      </h3>
      <Carousel
        className="p-4"
        responsive={responsive}
        showDots={false}
        arrows={false}
        selectedItem={currentIndex}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        customButtonGroup={<div />}
        onChange={(index) => handleCarouselChange(index)}
      >
        {storyData && storyData?.map((itm, index) => (
          <div
            className="flex relative flex-col cursor-pointer items-center align-middle text-center justify-center"
            key={itm?._id}
          >
            <div
              className="relative storyOutline  hover-box  md:w-[80px] w-[80px] md:h-[80px] overflow-hidden h-[80px] border-4 rounded-full flex items-center justify-center border-transparent"
              onClick={() => openFullscreenVideo(itm?.vedio, index)}
            >
              <img src={itm?.image} className="w-full h-full" />
            </div>
            <h4 className="font-semibold pr-3 text-[16px] mt-1 text-center text-slate-600">
              {itm?.name}
            </h4>
          </div>
        ))}
      </Carousel>
      <div className="carousel-scrollbar">
        <div className="carousel-scrollbar-thumb"></div>
      </div>
      {/* Fullscreen video display */}
      {selectedVideo && (
        <div className="fullscreen-video bg-white fixed top-0 left-0 w-full h-full z-50">
          <button
            className="close-btn mb-2 bg-gray-800 text-white px-3 py-1 rounded-md shadow-md hover:bg-gray-700 focus:outline-none"
            onClick={closeFullscreenVideo}
          >
            Close
          </button>
          {/* Your video player */}
          <video
            src={selectedVideo}
            className="top-0 left-0 bottom-0 right-0 w-full h-full"
            autoPlay
            loop
            onClick={closeFullscreenVideo}
          >
            <source src={selectedVideo} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
};

export default InstraStoryEffect;
