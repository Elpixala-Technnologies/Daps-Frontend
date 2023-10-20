// import React, { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { gsap } from "gsap";
// import { motion } from "framer-motion";
// import {
//   HomeSliderOne,
//   HomeSliderTow,
//   HomeSliderThree,
//   HomeSliderFour
// } from "@/src/Assets";
// import Link from "next/link";
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';



// const Hero = () => {
//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       easing: "ease-in-out",
//       once: true, // Change to false to repeat animations
//     });

//     // GSAP animation for the text
//     gsap.fromTo(
//       ".hero-text",
//       { opacity: 0, y: 20 },
//       { opacity: 1, y: 0, duration: 1 }
//     );
//   }, []);

//   const settings = {
//     showThumbs: false,
//     animation: "slide", // You can change the animation type to something like "slide" or "zoom"
//     showStatus: false,
//     showIndicators: true,
//     showArrows: false,
//     stopOnHover: true,
//     interval: 3000,
//     transitionTime: 2000,
//     emulateTouch: true,
//     swipeable: true,
//     swipeScrollTolerance: 100,
//     animationIn: "zoomIn", // Specify the animation for slide in
//     animationOut: "zoomOut", // Specify the animation for slide out
//   }

  // const bannerData = [
    // {
    //   id: 1,
    //   image: "https://cdn.shopify.com/s/files/1/0489/1171/2423/files/leo-shopioauto-home1-slide1.jpg?v=1645153936",
    //   title: "Special Offer",
    //   description: "High Performance Industrial Tools",
    //   price: "Save Up To 469",
    //   animationClass: "slide-animation-1",
    // },
    // {
    //   id: 2,
    //   image: "https://cdn.shopify.com/s/files/1/0489/1171/2423/files/leo-shopioauto-home1-slide2.jpg?v=1645779737",
    //   title: "Special Offer",
    //   description: "High Performance Industrial Tools",
    //   price: "Save Up To 469",
    //   animationClass: "slide-animation-1",
    // },
  // ]

//   return (
//     <div className="hero-slider-container">
//       <Carousel
//         {...settings}
//         className="hero-slider"
//         data-aos="fade-up"
//         data-aos-duration="1000"
//       >
        // {bannerData.map((item) => (
          // <div key={item.id} className={`hero-slide-home w-screen p-[120px]  ${item.animationClass}`} style={{ background: `url(${item.image}) no-repeat center center fixed`, backgroundSize: 'cover' }}>
          //   <div className="h-full flex items-center flex-col p-[100px] justify-center relative">
          //     <div className="text-[#fff] text-left absolute left-0">
                
          //       <div data-aos="fade-up" data-aos-delay="0">
          //         <h4 className="text-[1.2rem] font-semibold mb-2">{item?.title}</h4>
          //       </div>
          //       <div data-aos="fade-up" data-aos-delay="100">
          //         <h1 className="text-[2.5rem] md:text-[3rem] uppercase font-bold mb-2">High Performance <br/>  Industrial Tools</h1>
          //       </div>
          //       <div data-aos="fade-up" data-aos-delay="200">
          //         <h3 className="font-semibold text-[1.6rem] text-[#29679e]">{item?.price}</h3>
          //       </div>

          //       <div data-aos="fade-up" data-aos-delay="300">
          //         <div className='mt-[2rem]'>
          //           <Link href="/product" className="common-btn text-left mt-[2rem]">
          //             Shop Now
          //           </Link>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // </div>
        // ))}
//       </Carousel>
//     </div>
//   );
// };

// export default Hero;

import { useState, useEffect } from 'react';

function CitiesSlider(props) {
  const IMAGE_PARTS = 4;
  const AUTOCHANGE_TIME = 4000;

  const [activeSlide, setActiveSlide] = useState(-1);
  const [prevSlide, setPrevSlide] = useState(-1);
  const [sliderReady, setSliderReady] = useState(false);

  let changeTO = null;

  useEffect(() => {
    runAutochangeTO();
    setTimeout(() => {
      setActiveSlide(0);
      setSliderReady(true);
    }, 0);

    return () => {
      clearTimeout(changeTO);
    };
  }, []);

  function runAutochangeTO() {
    changeTO = setTimeout(() => {
      changeSlides(1);
      runAutochangeTO();
    }, AUTOCHANGE_TIME);
  }

  function changeSlides(change) {
    clearTimeout(changeTO);
    const { length } = props.slides;
    const prevSlideValue = activeSlide;
    let newActiveSlide = prevSlideValue + change;
    if (newActiveSlide < 0) newActiveSlide = length - 1;
    if (newActiveSlide >= length) newActiveSlide = 0;
    setActiveSlide(newActiveSlide);
    setPrevSlide(prevSlideValue);
  }

  return (
    <div className={`slider ${sliderReady ? 's--ready' : ''}`}>
      <div className="slider__slides">
        {props.slides.map((slide, index) => (
          <div
            className={`slider__slide ${
              activeSlide === index ? 's--active' : ''
            } ${prevSlide === index ? 's--prev' : ''}`}
            key={slide.id}
          >
            <div className="slider__slide-content">
              

              <h3 className="slider__slide-subheading">
                <span>{slide.title || slide.city}</span>
              </h3>
              <h2 className="slider__slide-heading">
                {slide.city.split('').map((l, i) => (
                  <span key={i}>{l}</span>
                ))}
              </h2>
              <p className="slider__slide-readmore common-btn">
                <Link> Shop Now </Link>
              </p>
            </div>
            <div className="slider__slide-parts">
              {[...Array(IMAGE_PARTS)].map((x, i) => (
                <div className="slider__slide-part" key={i}>
                  <div
                    className="slider__slide-part-inner"
                    style={{ backgroundImage: `url(${slide.img})` }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="slider__control" onClick={() => changeSlides(-1)} />
      <div
        className="slider__control slider__control--right"
        onClick={() => changeSlides(1)}
      />
    </div>
  );
}

const slidess=[
  {
    id: 1,
    image: "https://cdn.shopify.com/s/files/1/0489/1171/2423/files/leo-shopioauto-home1-slide1.jpg?v=1645153936",
    title: "Special Offer",
    description: "High Performance Industrial Tools",
    price: "Save Up To 469",
    
  },
  {
    id: 2,
    image: "https://cdn.shopify.com/s/files/1/0489/1171/2423/files/leo-shopioauto-home1-slide2.jpg?v=1645779737",
    title: "Special Offer",
    description: "High Performance Industrial Tools",
    price: "Save Up To 469",
  },
]

const slides = [
  {
    city: 'Paris',
    country: 'France',
    img: 'https://cdn.shopify.com/s/files/1/0489/1171/2423/files/leo-shopioauto-home1-slide1.jpg?v=1645153936',
  },
  {
    city: 'Singapore',
    img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg',
  },
  {
    city: 'Prague',
    country: 'Czech Republic',
    img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg',
  },
  {
    city: 'Amsterdam',
    country: 'Netherlands',
    img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/amsterdam.jpg',
  },
  {
    city: 'Moscow',
    country: 'Russia',
    img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg',
  },
];

export default function CitiesSliderContainer() {
  return <CitiesSlider slides={slides} />;
}
