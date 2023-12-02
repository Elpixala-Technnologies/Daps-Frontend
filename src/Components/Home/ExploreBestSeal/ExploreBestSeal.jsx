import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Link from "next/link";
import { Autoplay, Pagination,Navigation } from "swiper";

const ExploreBestSeal = () => {
    const [isMuted, setIsMuted] = useState(true);
    const handleHover = () => {
        setIsMuted(false);
      };
    
      const handleLeave = () => {
        setIsMuted(true);
      };
    const videoInfo = [
        {
            id: 0,
            name: '360 Cameras',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456',
            video: "https://res.cloudinary.com/elpixala/video/upload/v1699818085/Daps/Video/vuy4w20q6yzxwytwsain.mp4"
        },
        {
            id: 1,
            name: 'Damping Sheets',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Harrier/9368/1697532960290/front-left-side-47.jpg?tr=w-456',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818101/Daps/Video/udwdrakltqhai6zjil0b.mp4'
        },
        {
            id: 2,
            name: 'Styled Stereos',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Verna/9744/1694602806760/front-left-side-47.jpg?tr=w-456',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818110/Daps/Video/wbkf6svvxaskagjfmebg.mp4'
        },
        {
            id: 3,
            name: 'Universal LEDs',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818177/Daps/Video/ubo474a030zdreweg2no.mp4'
        },
        {
            id: 4,
            name: 'Styled Stereos',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Verna/9744/1694602806760/front-left-side-47.jpg?tr=w-456',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818110/Daps/Video/wbkf6svvxaskagjfmebg.mp4'
        },
        {
            id: 5,
            name: 'Universal LEDs',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818177/Daps/Video/ubo474a030zdreweg2no.mp4'
        },
        {
            id: 6,
            name: 'Styled Stereos',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Verna/9744/1694602806760/front-left-side-47.jpg?tr=w-456',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818110/Daps/Video/wbkf6svvxaskagjfmebg.mp4'
        },
        {
            id: 7,
            name: 'Universal LEDs',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818177/Daps/Video/ubo474a030zdreweg2no.mp4'
        }
    ];

    return (
        <div className="container ">
            <h3 className="font-light  text-3xl text-black">Trending <strong className='font-extrabold text-[#29679e]'>Products</strong></h3>
            {/* <Swiper
                slidesPerView={3}
                spaceBetween={30}
                modules={[]}
                className="mySwiper mt-8"
                
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 40
                    }
                }}>
                <div className='grid gap-10 grid-cols-1 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-12'>
                {
                    videoInfo?.map(itm => 
                        <Link href={`/category/${itm?.id}`}>
                            <div onMouseEnter={handleHover} onMouseLeave={handleLeave} className="rounded-xl relative overflow-hidden hover-box duration-200 w-full h-[33rem] ">
                                <img src={itm?.thum} className="w-full h-full " />
                                <video dblclick={e => e.preventDefault()} className="absolute  top-[0px]  left-0 bottom-0 right-0 duration-200 hover-img opacity-0 object-cover object-center sm:object-top md:object-top lg:object-top xl:object-top"  muted={isMuted}  loop autoPlay>
                                    <source src={itm?.video} type="video/mp4" />
                                </video>
                            </div>
                            <h3 className="text-[16px] text-center font-semibold text-slate-700 mt-1">{itm?.name}</h3>
                        </Link>
                 )
                }
                </div>

            </Swiper> */}
            <Swiper
              centeredSlides={true}
              slidesPerView={5}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper heroSlider"
            >
              { videoInfo.map((itm) => {
                return (
                  <SwiperSlide key={itm.id}>
                    <div
                      className="color-b bg-white p-2 md:p-3 text-center rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-[#18568C]" 
                      data-aos="fade-up" // Add AOS animation attribute
                      data-aos-duration="1000" // Set animation duration in milliseconds
                      key={itm.id}
                    >
                      <Link href={`/category/${itm?.id}`}>
                            <div onMouseEnter={handleHover} onMouseLeave={handleLeave} className="rounded-xl relative overflow-hidden hover-box duration-200 w-full h-[30rem] ">
                                <img src={itm?.thum} className="w-full h-full " />
                                <video dblclick={e => e.preventDefault()} className="absolute  top-[0px]  left-0 bottom-0 right-0 duration-200 hover-img opacity-0 object-fit object-center sm:object-top md:object-top lg:object-top xl:object-top"  muted  loop autoPlay>
                                    <source src={itm?.video} type="video/mp4" />
                                </video>
                            </div>
                            <h3 className="text-[16px] text-center font-semibold text-slate-700 mt-1">{itm?.name}</h3>
                        </Link>
                    </div>
                  </SwiperSlide>
                    )
                  })}
             </Swiper>
        </div>
    );
};

export default ExploreBestSeal;
