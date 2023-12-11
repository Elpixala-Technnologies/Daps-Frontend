import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import Link from "next/link";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";


const ExploreBrand = () => {
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
            name: 'Audi',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Verna/9744/1694602806760/front-left-side-47.jpg?tr=w-456',
            video: "https://res.cloudinary.com/elpixala/video/upload/v1699818085/Daps/Video/vuy4w20q6yzxwytwsain.mp4"
        },
        {
            id: 1,
            name: 'Octa',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Verna/9744/1694602806760/front-left-side-47.jpg?tr=w-456',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818101/Daps/Video/udwdrakltqhai6zjil0b.mp4'
        },
        {
            id: 2,
            name: 'Mercedes',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Harrier/9368/1697532960290/front-left-side-47.jpg?tr=w-456',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818110/Daps/Video/wbkf6svvxaskagjfmebg.mp4'
        },
        {
            id: 3,
            name: 'Mighty',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Harrier/9368/1697532960290/front-left-side-47.jpg?tr=w-456',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818177/Daps/Video/ubo474a030zdreweg2no.mp4'
        },
        {
            id: 4,
            name: 'Supreme',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Harrier/9368/1697532960290/front-left-side-47.jpg?tr=w-456',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818101/Daps/Video/udwdrakltqhai6zjil0b.mp4'
        },
        {
            id: 5,
            name: 'Tesla',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Harrier/9368/1697532960290/front-left-side-47.jpg?tr=w-456',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818110/Daps/Video/wbkf6svvxaskagjfmebg.mp4'
        },
        {
            id: 6,
            name: 'Tata',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Verna/9744/1694602806760/front-left-side-47.jpg?tr=w-456',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818177/Daps/Video/ubo474a030zdreweg2no.mp4'
        },
        {
            id: 7,
            name: 'Honda',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Harrier/9368/1697532960290/front-left-side-47.jpg?tr=w-456',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818101/Daps/Video/udwdrakltqhai6zjil0b.mp4'
        },
        {
            id: 8,
            name: 'Hyundai',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Verna/9744/1694602806760/front-left-side-47.jpg?tr=w-456',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818110/Daps/Video/wbkf6svvxaskagjfmebg.mp4'
        },
        {
            id: 9,
            name: 'Tata',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Verna/9744/1694602806760/front-left-side-47.jpg?tr=w-456',
            video: 'https://res.cloudinary.com/elpixala/video/upload/v1699818177/Daps/Video/ubo474a030zdreweg2no.mp4'
        }

    ];


    return (
        <div className="container pt-8">
             <h3 className="font-light text-3xl text-black">Explore <strong className='font-extrabold text-[#29679e] '>Our Brands</strong></h3>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              breakpoints={{
                320: {
                  slidesPerView: 1.5,
                  
                },
                360: {
                  slidesPerView: 1.5,
                  
                },
                480: {
                  slidesPerView: 1.5,
                  
                },
                640: {
                  slidesPerView: 1.5,
                 
                },
                768: {
                  slidesPerView: 2.5,
                 
                },
                1024: {
                  slidesPerView: 4.5,
                  
                },
              }}
              onSlideChange={() => { }}
              onSwiper={(swiper) => { }}
              scrollbar={{ draggable: true, hide: true }}
              data-aos="fade-up"
              data-aos-anchor-placement="center-bottom"
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
                            <div onMouseEnter={handleHover} onMouseLeave={handleLeave} className="rounded-xl relative overflow-hidden hover-box duration-200 w-full h-[20rem] ">
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

export default ExploreBrand;
