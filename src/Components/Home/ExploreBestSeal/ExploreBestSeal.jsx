import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import Link from "next/link";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

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
            thum: 'https://res.cloudinary.com/dlicwfgtq/image/upload/v1701522820/Daps/jurrirx4qagnwo0nv1ay.png',
            video: "https://res.cloudinary.com/elpixala/video/upload/v1699818085/Daps/Video/vuy4w20q6yzxwytwsain.mp4"
        },
        {
            id: 1,
            name: 'Damping Sheets',
            thum: 'https://res.cloudinary.com/dlicwfgtq/image/upload/v1701522842/Daps/kpzpj9qmme0gokzxsgmi.png',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818101/Daps/Video/udwdrakltqhai6zjil0b.mp4'
        },
        {
            id: 2,
            name: 'Styled Stereos',
            thum: 'https://res.cloudinary.com/dlicwfgtq/image/upload/v1701522835/Daps/k9jwqbmtcoc4tt0nnn2d.png',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818110/Daps/Video/wbkf6svvxaskagjfmebg.mp4'
        },
        {
            id: 3,
            name: 'Universal LEDs',
            thum: 'https://res.cloudinary.com/dlicwfgtq/image/upload/v1701522802/Daps/tuxzbdyvvfku6zyqks6c.png',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818177/Daps/Video/ubo474a030zdreweg2no.mp4'
        },
        {
            id: 4,
            name: 'Styled Stereos',
            thum: 'https://res.cloudinary.com/dlicwfgtq/image/upload/v1701522757/Daps/u41o60rtharcmnrzecvc.png',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818110/Daps/Video/wbkf6svvxaskagjfmebg.mp4'
        },
        {
            id: 5,
            name: 'Universal LEDs',
            thum: 'https://res.cloudinary.com/dlicwfgtq/image/upload/v1701522754/Daps/ftwnscfaljvfr5567za6.png',
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
            <h3 className="font-light mb-2 text-3xl text-black">Trending <strong className='font-extrabold text-[#29679e]'>Products</strong></h3>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  360: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  480: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 5,
                  },
                }}
                spaceBetween={12}
                // slidesPerView={3}
                onSlideChange={() => { }}
                onSwiper={(swiper) => { }}
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
                scrollbar={{ draggable: true, hide: true }}
            >
              { videoInfo.map((itm) => {
                return (
                  <SwiperSlide key={itm.id}>
                    <div
                      className="  bg-white p-2 md:p-3 text-center rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 cardOutline hover:bg-red-10 hover:text-[#18568C]" 
                      data-aos="fade-up" // Add AOS animation attribute
                      data-aos-duration="1000" // Set animation duration in milliseconds
                      key={itm.id}
                    >
                      <Link href={`/category/${itm?.id}`}>
                            <div onMouseEnter={handleHover} onMouseLeave={handleLeave} className="rounded-xl relative overflow-hidden hover-box duration-200 w-full h-[22rem] ">
                                <img src={itm?.thum} className="w-full h-full " />
                                <video dblclick={e => e.preventDefault()} className="absolute  top-[0px]  left-0 bottom-0 right-0 duration-200 hover-img opacity-0 object-fit object-center sm:object-top md:object-top lg:object-top xl:object-top"  muted  loop autoPlay>
                                    <source src={itm?.video} type="video/mp4" />
                                </video>
                             
                            </div>
                            <div className="bg-white z-[9999999999] absolute h-[3rem] w-[3rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-1">                               
                             <img src={itm?.thum} className="w-full h-full " />
                            </div>

                              <div>
                              <h3 className="text-[16px]  text-center font-semibold text-slate-700 mt-6">{itm?.name}</h3>
                              </div>
                          <div>
                           <div className="text-[16px] text-gray-900 mt-1 flex justify-between align-middle text-left">
                             <div className='font-semibold'>
                               {/* {itm?.discount
                                 ? `₹ ${Math.floor(itm?.price - (itm?.price * itm?.discount) / 100)}`
                                 : `₹ ${Math.floor(itm?.price)}`
                               } */}
                               $ 9,9999
                               <span className="text-sm text-gray-400 line-through mx-2">
                               {/* ₹ {Math.floor(itm?.price)} */}
                               $21,900
                              </span>
                             </div>
                             
                             <span className='text-[#2f9555] text-bold'>
                               {/* {Math.floor(itm?.discount)}% off */}
                               55% off
                             </span>
                           </div>
                         </div>
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
