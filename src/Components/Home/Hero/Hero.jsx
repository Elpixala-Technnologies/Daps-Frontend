import { useState, useEffect } from 'react';
import Link from "next/link";

function CitiesSlider(props) {
  // const IMAGE_PARTS = 4;
  // const AUTOCHANGE_TIME = 4000;

  // const [activeSlide, setActiveSlide] = useState(-1);
  // const [prevSlide, setPrevSlide] = useState(-1);
  // const [sliderReady, setSliderReady] = useState(false);

  // let changeTO = null;

  // useEffect(() => {
  //   runAutochangeTO();
  //   setTimeout(() => {
  //     setActiveSlide(0);
  //     setSliderReady(true);
  //   }, 0);

  //   return () => {
  //     clearTimeout(changeTO);
  //   };
  // }, []);

  // function runAutochangeTO() {
  //   changeTO = setTimeout(() => {
  //     changeSlides(1);
  //     runAutochangeTO();
  //   }, AUTOCHANGE_TIME);
  // }

  // function changeSlides(change) {
  //   clearTimeout(changeTO);
  //   const { length } = props.slides;
  //   const prevSlideValue = activeSlide;
  //   let newActiveSlide = prevSlideValue + change;
  //   if (newActiveSlide < 0) newActiveSlide = length - 1;
  //   if (newActiveSlide >= length) newActiveSlide = 0;
  //   setActiveSlide(newActiveSlide);
  //   setPrevSlide(prevSlideValue);
  // }

  const IMAGE_PARTS = 4;
  const AUTOCHANGE_TIME = 4000;

  const [activeSlide, setActiveSlide] = useState(-1);
  const [prevSlide, setPrevSlide] = useState(-1);
  const [sliderReady, setSliderReady] = useState(false);
  const [manualChange, setManualChange] = useState(false); // Added manualChange state

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
      if (!manualChange) { // Only change slides automatically if there was no manual change
        changeSlides(1);
      }
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
    setManualChange(true); // Set manualChange to true when changing slides manually
  }


  return (
    <div className={`slider ${sliderReady ? 's--ready' : ''}`}>
      <div className="slider__slides">
        {props.slides.map((slide, index) => (
          <div
            className={`slider__slide ${activeSlide === index ? 's--active' : ''
              } ${prevSlide === index ? 's--prev' : ''}`}
            key={slide.id}
          >
            <div className="slider__slide-content">
              <div className="">
                <div className="text-[#fff] top-[30%] text-left absolute left-[16%]">
                  <div >
                    <h1 className="text-[2rem]  font-bold slider__slide-heading">
                      {slide.title.split('').map((l, i) => (
                        <span key={i}>{l}</span>
                      ))}
                    </h1>
                    <h4 className="text-[1.2rem] font-semibold mb-2 slider__slide-subheading">
                      High Performance <br /> Industrial Tools
                    </h4>
                    <h3 className="font-semibold text-[1.6rem] text-[#29679e] slider__slide-subheading">{slide?.price}</h3>
                  </div>

                  <div>
                    <div className='mt-[2rem] '>
                      <Link href="/product" className="common-btn text-left mt-[2rem] slider__slide-readmore">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
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

      <div className="slider__control" onClick={() => changeSlides(1)} />
      <div
        className="slider__control slider__control--right"
        onClick={() => changeSlides(-1)}
      />
    </div>
  );
}

const slides = [
  {
    id: 1,
    img: "https://res.cloudinary.com/elpixala/image/upload/v1697918085/Daps/Slider/nvusuruvdo6svn2ed0w3.png",
    title: "Special - Offer",
    description: "High Performance Industrial Tools",
    price: "Save Up To ₹ 469",

  },
  {
    id: 2,
    img: "https://res.cloudinary.com/elpixala/image/upload/v1697918083/Daps/Slider/onkcpicfnfoyu9cmippt.png",
    title: "Special - Offer",
    description: "High Performance Industrial Tools",
    price: "Save Up To ₹ 469",
  },
  {
    id: 3,
    img: "https://res.cloudinary.com/elpixala/image/upload/v1697918083/Daps/Slider/lccmwarvktjcdcmrepkc.png",
    title: "Special - Offer",
    description: "High Performance Industrial Tools",
    price: "Save Up To ₹ 469",
  },
]


export default function CitiesSliderContainer() {
  return <CitiesSlider slides={slides} />;
}
