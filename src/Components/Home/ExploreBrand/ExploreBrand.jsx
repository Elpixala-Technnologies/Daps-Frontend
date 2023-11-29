import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Link from "next/link";
import { useRef } from 'react';

const ExploreBrand = () => {
    const videoInfo = [
        {
            id: 0,
            name: 'Maruti',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456',
            video: "https://res.cloudinary.com/elpixala/video/upload/v1699818085/Daps/Video/vuy4w20q6yzxwytwsain.mp4"
        },
        {
            id: 1,
            name: 'Honda',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Harrier/9368/1697532960290/front-left-side-47.jpg?tr=w-456',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818101/Daps/Video/udwdrakltqhai6zjil0b.mp4'
        },
        {
            id: 2,
            name: 'Hyundai',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Verna/9744/1694602806760/front-left-side-47.jpg?tr=w-456',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818110/Daps/Video/wbkf6svvxaskagjfmebg.mp4'
        },
        {
            id: 3,
            name: 'Tata',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818177/Daps/Video/ubo474a030zdreweg2no.mp4'
        }
    ];

      const videoRefs = videoInfo;

    const playVideo = (videoRef) => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      };
    
      const pauseVideo = (videoRef) => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      };

    return (
        <div className="container mt-10">
            <h3 className="font-light text-3xl text-black">Explore <strong className='font-extrabold text-[#29679e] '>Our Brands</strong></h3>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                modules={[]}
                className="mySwiper mt-6"
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
                      <div key={itm?.id} className="relative  overflow-hidden  w-full rounded-xl  h-[18rem] adjustVideo  ">
                        <video className="absolute w-full h-full object-cover border-r duration-200" autoPlay  muted loop>
                          <source src={itm?.video} type="video/mp4" />
                        </video>
                      </div>
                     <h3 className="text-[16px] pt-1 font-semibold text-center text-slate-700 ">{itm?.name}</h3>
                 </Link>
                 )
                }
                </div>
            </Swiper>
        </div>
    );
};

export default ExploreBrand;
