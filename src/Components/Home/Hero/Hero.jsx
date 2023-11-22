// import { useState, useEffect } from 'react';
// import Link from "next/link";

// function CitiesSlider(props) {
//   const IMAGE_PARTS = 4;
//   const AUTOCHANGE_TIME = 4000;

//   const [activeSlide, setActiveSlide] = useState(-1);
//   const [prevSlide, setPrevSlide] = useState(-1);
//   const [sliderReady, setSliderReady] = useState(false);
//   const [manualChange, setManualChange] = useState(false);

//   let changeTO = null;

//   useEffect(() => {
//     runAutochangeTO();
//     setTimeout(() => {
//       setActiveSlide(0);
//       setSliderReady(true);
//     }, 0);

//     return () => {
//       clearTimeout(changeTO);
//     };
//   }, []);

//   function runAutochangeTO() {
//     changeTO = setTimeout(() => {
//       if (!manualChange) {
//         changeSlides(1);
//       }
//       runAutochangeTO();
//     }, AUTOCHANGE_TIME);
//   }

//   function changeSlides(change) {
//     clearTimeout(changeTO);
//     const { length } = props.slides;
//     const prevSlideValue = activeSlide;
//     let newActiveSlide = prevSlideValue + change;
//     if (newActiveSlide < 0) newActiveSlide = length - 1;
//     if (newActiveSlide >= length) newActiveSlide = 0;
//     setActiveSlide(newActiveSlide);
//     setPrevSlide(prevSlideValue);
//     setManualChange(true);
//   }

//   return (
//     <div className={`slider ${sliderReady ? 's--ready' : ''}`}>
//       <div className="slider__slides">
//         {props.slides.map((slide, index) => (
//           <div
//             className={`slider__slide ${activeSlide === index ? 's--active' : ''} ${prevSlide === index ? 's--prev' : ''}`}
//             key={slide.id}
//           >
//             <div className="slider__slide-content">
//               <div className="text-[#fff] top-[30%] text-left absolute left-[16%]">
//                 <div>
//                   <h1 className="text-[2rem] font-bold slider__slide-heading">
//                     {slide.title.split('').map((l, i) => (
//                       <span key={i}>{l}</span>
//                     ))}
//                   </h1>
//                   <h4 className="text-[1.2rem] font-semibold mb-2 slider__slide-subheading">
//                     High Performance Industrial Tools
//                   </h4>
//                   <h3 className="font-semibold text-[1.4rem] text-[#29679e] slider__slide-subheading">{slide?.price}</h3>
//                 </div>
//                 <div>
//                   <div className="mt-[2rem]">
//                     <Link href="/products" className="common-btn uppercase text-left mt-[1.2rem] slider__slide-readmore">
//                       Shop Now
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="slider__slide-parts">
//               {[...Array(IMAGE_PARTS)]?.map((x, i) => (
//                 <div className="slider__slide-part" key={i}>
//                   <div
//                     className="slider__slide-part-inner"
//                     style={{ backgroundImage: `url(${slide.img})` }}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="slider__control" onClick={() => changeSlides(1)} />
//       <div className="slider__control slider__control--right" onClick={() => changeSlides(-1)} />
//     </div>
//   );
// }

// function MobileBanners(props) {
//   const IMAGE_PARTS = 4;
//   const AUTOCHANGE_TIME = 4000;

//   const [activeSlide, setActiveSlide] = useState(-1);
//   const [prevSlide, setPrevSlide] = useState(-1);
//   const [sliderReady, setSliderReady] = useState(false);
//   const [manualChange, setManualChange] = useState(false);

//   let changeTO = null;

//   useEffect(() => {
//     runAutochangeTO();
//     setTimeout(() => {
//       setActiveSlide(0);
//       setSliderReady(true);
//     }, 0);

//     return () => {
//       clearTimeout(changeTO);
//     };
//   }, []);

//   function runAutochangeTO() {
//     changeTO = setTimeout(() => {
//       if (!manualChange) {
//         changeSlides(1);
//       }
//       runAutochangeTO();
//     }, AUTOCHANGE_TIME);
//   }

//   function changeSlides(change) {
//     clearTimeout(changeTO);
//     const { length } = props.slides;
//     const prevSlideValue = activeSlide;
//     let newActiveSlide = prevSlideValue + change;
//     if (newActiveSlide < 0) newActiveSlide = length - 1;
//     if (newActiveSlide >= length) newActiveSlide = 0;
//     setActiveSlide(newActiveSlide);
//     setPrevSlide(prevSlideValue);
//     setManualChange(true);
//   }

//   return (
//     <div 
//       style={{
//         height:"70vh"
//       }}
//     className={`slider ${sliderReady ? 's--ready' : ''}`}>
//     <div className="slider__slides">
//       {props.slides.map((slide, index) => (
//         <div
//           className={`slider__slide ${activeSlide === index ? 's--active' : ''} ${prevSlide === index ? 's--prev' : ''}`}
//           key={slide.id}
//         >
//           <div className="slider__slide-content">
//             <div className="text-[#fff] top-[30%] text-left absolute left-[16%]">
//               <div className=''>
//                 <h1 className="text-[1.5rem] font-bold slider__slide-heading">
//                   {slide.title.split('').map((l, i) => (
//                     <span key={i}>{l}</span>
//                   ))}
//                 </h1>
//                 <h4 className="text-[1.2rem] font-semibold mb-2 slider__slide-subheading"
//                   style={{
//                     fontSize:"1.2rem"
//                   }}
//                 >
//                   High Performance Industrial Tools
//                 </h4>
//                 {/* <h3 className="font-semibold text-[1.4rem] text-[#29679e] slider__slide-subheading">{slide?.price}</h3> */}
//                 <h3 className="font-semibold text-[1.2rem] text-[#29679e] slider__slide-subheading">SAVE UP TO <span className='text-[#fff]'>₹ 469</span></h3>
//               </div>
//               <div>
//                 <div className="mt-[2rem]">
//                   <Link href="/products" className="common-btn uppercase text-left mt-[1.2rem] slider__slide-readmore">
//                     Shop Now
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="slider__slide-parts">
//             {[...Array(IMAGE_PARTS)].map((x, i) => (
//               <div className="slider__slide-part" key={i}>
//                 <div
//                   className="slider__slide-part-inner"
//                   style={{ backgroundImage: `url(${slide?.mobileImg})` }}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//     <div className="slider__control" onClick={() => changeSlides(1)}
//       style={{
//         left: "2%",
//       }}
//     />
//     <div 
//      style={{
//       right: "2%",
//     }}
//     className="slider__control slider__control--right" onClick={() => changeSlides(-1)} />
//   </div>
//   );
// }

// const slides = [
//   {
//     id: 1,
//     img: "https://res.cloudinary.com/elpixala/image/upload/v1699784132/Daps/Slider/kqirwpqmxb54hvyozrpx.png",
//     mobileImg: "https://res.cloudinary.com/elpixala/image/upload/v1699784436/Daps/Slider/r23rhw1szrbattjlfat7.png",
//     title: "Special - Offer",
//     description: "High Performance Industrial Tools",
//     price: "Save Up To ₹ 469",
//   },
//   {
//     id: 2,
//     img: "https://res.cloudinary.com/elpixala/image/upload/v1699784132/Daps/Slider/p0rhcuwtgi8vaa5g2i7n.png",
//     mobileImg:"https://res.cloudinary.com/elpixala/image/upload/v1699784436/Daps/Slider/zrfj8vkuilyphputfdgn.png",
//     title: "Special - Offer",
//     description: "High Performance Industrial Tools",
//     price: "Save Up To ₹ 469",
//   },
//   {
//     id: 3,
//     img: "https://res.cloudinary.com/elpixala/image/upload/v1699784131/Daps/Slider/edf01ej5rfawxvm7y0ok.png",
//     mobileImg: "https://res.cloudinary.com/elpixala/image/upload/v1699784435/Daps/Slider/ickmzwmvaz3g2q45hmdo.png",
//     title: "Special - Offer",
//     description: "High Performance Industrial Tools",
//     price: "Save Up To ₹ 469",
//   },
// ];

// export default function CitiesSliderContainer() {
//   const isMobile = useWindowWidth() < 768; // Adjust the breakpoint as needed

//   return (
//     <div>
//       {isMobile ? <MobileBanners slides={slides} /> : <CitiesSlider slides={slides} />}
//     </div>
//   );
// }

// // Custom hook to get the window width
// function useWindowWidth() {
//   const [windowWidth, setWindowWidth] = useState(0);

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     handleResize(); // Initialize the width
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return windowWidth;
// }



import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";

const HomeSliderData = [
  {
    id: 1,
    desktopImage: "https://res.cloudinary.com/elpixala/image/upload/v1699858749/Daps/Slider/DAPS%20Banner/DAPS%20Banner%20PC/ubdrk3vfkbsxwtyxnaox.png",
    mobileImage: "https://res.cloudinary.com/elpixala/image/upload/v1699858745/Daps/Slider/DAPS%20Banner/Mobile/tpvoo9d8vsi9qiafpo9u.png", // Add mobile image for slide 1
  },
  {
    id: 2,
    desktopImage: "https://res.cloudinary.com/elpixala/image/upload/v1699858749/Daps/Slider/DAPS%20Banner/DAPS%20Banner%20PC/ztevzp1jh4tfcmc4fqoc.png",
    mobileImage: "https://res.cloudinary.com/elpixala/image/upload/v1699858745/Daps/Slider/DAPS%20Banner/Mobile/nr6s9szlrwgynmyporwb.png", // Add mobile image for slide 2
  },
  {
    id: 3,
    desktopImage: "https://res.cloudinary.com/elpixala/image/upload/v1699858748/Daps/Slider/DAPS%20Banner/DAPS%20Banner%20PC/nwwrm7drid3yaarzzfkp.png",
    mobileImage: "https://res.cloudinary.com/elpixala/image/upload/v1699858744/Daps/Slider/DAPS%20Banner/Mobile/vwi0vtegwzwrmjju2myz.png", // Add mobile image for slide 3
  },
 
];

const HeroSlider = () => {
  const [isMobile, setIsMobile] = useState(false);

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
        pagination={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        // navigation={true}
        className="mySwiper heroSlider"
      >
        {HomeSliderData &&
          HomeSliderData?.map((slide) => {
            return (
              <SwiperSlide key={slide?.id}>
                <div className="slider-images">
                  <Image
                    src={isMobile ? slide?.mobileImage : slide?.desktopImage}
                    alt="Banner Image"
                    className="w-full h-full"
                    width={isMobile ? 768 : 1920}
                    height={isMobile ? 768 : 500}
                  />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </dic>
  );
};

export default HeroSlider;
