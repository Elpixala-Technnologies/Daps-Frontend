import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'; 
import 'swiper/css/navigation'; // If using navigation

const ExploreBestSeal = () => {
    const videoInfo = [
        {
            id: 0,
            name: 'BMW',
            thum: 'https://www.drivespark.com/images/2022-06/2022-bmw-x1-8.jpg',
            video: 'https://www.example.com/your-video-url.mp4' 
        },
        {
            id: 1,
            name: 'BMW',
            thum: 'https://www.drivespark.com/images/2022-06/2022-bmw-x1-8.jpg',
            video: 'https://www.example.com/your-video-url.mp4' 
        },
        {
            id: 2,
            name: 'BMW',
            thum: 'https://www.drivespark.com/images/2022-06/2022-bmw-x1-8.jpg',
            video: 'https://www.example.com/your-video-url.mp4' 
        },
        {
            id: 3,
            name: 'BMW',
            thum: 'https://www.drivespark.com/images/2022-06/2022-bmw-x1-8.jpg',
            video: 'https://www.example.com/your-video-url.mp4' 
        },
        {
            id: 3,
            name: 'BMW',
            thum: 'https://www.drivespark.com/images/2022-06/2022-bmw-x1-8.jpg',
            video: 'https://www.example.com/your-video-url.mp4' 
        },
        {
            id: 3,
            name: 'BMW',
            thum: 'https://www.drivespark.com/images/2022-06/2022-bmw-x1-8.jpg',
            video: 'https://www.example.com/your-video-url.mp4' 
        },
    ];

    return (
        <div className="container mt-12">
            <h3 className="font-semibold text-3xl text-black">Explore Bestsellers</h3>

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
                             <div className="rounded-3xl h-[260px] relative overflow-hidden hover-box duration-200">
                        <img src={itm?.thum} className="w-full h-full "/>
                             <video className="absolute top-0 w-full h-full left-0 bottom-0 right-0 duration-200 hover-img opacity-0" width="640" height="360" muted controls autoPlay>
                                <source src="https://www.w3schools.com/html/movie.mp4" type="video/mp4" />
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
