import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import {
  HomeSliderOne,
  HomeSliderTow,
  HomeSliderThree,
  HomeSliderFour
} from "@/src/Assets";
import Link from "next/link";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true, // Change to false to repeat animations
    });

    // GSAP animation for the text
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  const settings = {
    showThumbs: false,
    animation: "zoom", // You can change the animation type to something like "slide" or "zoom"
    showStatus: false,
    showIndicators: true,
    showArrows: false,
    stopOnHover: true,
    interval: 3000,
    transitionTime: 2000,
    emulateTouch: true,
    swipeable: true,
    swipeScrollTolerance: 100,
    animationIn: "zoomIn", // Specify the animation for slide in
    animationOut: "zoomOut", // Specify the animation for slide out
  }

  const bannerData = [
    {
      id: 1,
      image: "https://res.cloudinary.com/elpixala/image/upload/v1697813574/Daps/Slider/tnzzt63phizxdgtjjxof.png",
      title: "Banner Title 01",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      animationClass: "slide-animation-1",
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/elpixala/image/upload/v1697813574/Daps/Slider/udkf1peo0xvttgk5tixs.png",
      title: "Banner Title 02",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      animationClass: "slide-animation-2",
    },
  ]

  return (
    <div className="hero-slider-container">
      <Carousel
        {...settings}
        className="hero-slider"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        {bannerData.map((item) => (
          <div key={item.id} className={`hero-slide-home w-screen h-screen ${item.animationClass}`} style={{ background: `url(${item.image}) no-repeat center center fixed`, backgroundSize: 'cover' }}>
            <div className="h-full flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="hero-text text-[#fff] text-left"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-[3rem] font-bold"
                >
                    {item.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-sm text-[#fff] text-left first-letter:animate-pulse"
                >
                    {item.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <div className='mt-[2rem]'>
                    <Link href="/product" className="common-btn text-left mt-[2rem]">
                      Shop Now
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
