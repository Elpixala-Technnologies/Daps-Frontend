import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'; 
import 'swiper/css/navigation';
 const ExploreBestSeal = () => {
    const videoInfo = [
        {
            id: 0,
            name: 'Maruti FRONX',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456',
            video: "https://www.w3schools.com/html/mov_bbb.mp4" 
        },
        {
            id: 1,
            name: 'TATA',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Harrier/9368/1697532960290/front-left-side-47.jpg?tr=w-456',
            video: 'https://www.w3schools.com/html/mov_bbb.mp4' 
        },
        {
            id: 2,
            name: 'Hyundai Verna',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Verna/9744/1694602806760/front-left-side-47.jpg?tr=w-456',
            video: 'https://www.w3schools.com/html/mov_bbb.mp4' 
        } ,
        {
            id: 0,
            name: 'Maruti FRONX',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/FRONX/9243/1697697928533/front-left-side-47.jpg?tr=w-456',
            video: 'https://www.w3schools.com/html/mov_bbb.mp4' 
        },
        {
            id: 1,
            name: 'TATA',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Harrier/9368/1697532960290/front-left-side-47.jpg?tr=w-456',
            video: 'https://www.w3schools.com/html/mov_bbb.mp4' 
        },
        {
            id: 2,
            name: 'Hyundai Verna',
            thum: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Verna/9744/1694602806760/front-left-side-47.jpg?tr=w-456',
            video: 'https://www.w3schools.com/html/mov_bbb.mp4' 
        } 
    ];

    return (
        <div className="container mt-14">
            <h3 className="font-semibold text-3xl text-black">Shop By Cars</h3>

            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                modules={[]}
                className="mySwiper mt-12"
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
                    {
                        videoInfo?.map(itm =>   <SwiperSlide>
                         <div>
                        <div className="rounded-3xl h-[380px] relative overflow-hidden hover-box duration-200">
                        <img src={itm?.thum} className="w-full h-full "/>
                             <video className="absolute top-[100px]  left-0 bottom-0 right-0 duration-200 hover-img opacity-0" width="940" height="880" muted controls autoPlay>
                                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                             </video>
                         </div>
                          <h3 className ="text-2xl text-black mt-4">{itm?.name}</h3> 
                         </div>
                 </SwiperSlide>)
                    }
              
            </Swiper>
        </div>
    );
};

export default ExploreBestSeal;
