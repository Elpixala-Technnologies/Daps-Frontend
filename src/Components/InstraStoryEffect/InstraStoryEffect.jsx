import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import c1 from '@/../../src/Assets/car/1.png'
import c2 from '@/../../src/Assets/car/c2.png'
import c3 from '@/../../src/Assets/car/c3.png'

import img1 from "@/src/Assets/brands/2874749.webp";
import img2 from "@/src/Assets/brands/download.jpg";
import img3 from "@/src/Assets/brands/download.jpg";
import img4 from "@/src/Assets/brands/free-hyundai-3215422-2673840.webp";
import img5 from "@/src/Assets/brands/free-mahindra-3441189-2874294.webp";
import img6 from "@/src/Assets/brands/j.jpeg";
import img7 from "@/src/Assets/brands/Kia-logo.png";
import img8 from "@/src/Assets/brands/Nissan_logo.png";
import img9 from "@/src/Assets/brands/png-transparent-logo-ford-logo-car-car-standard-pattern-flag-cars.png";
import img10 from "@/src/Assets/brands/pngimg.com - car_logo_PNG1643 (1).png";
import img11 from "@/src/Assets/brands/pngimg.com - jeep_PNG95.png";
import img12 from "@/src/Assets/brands/sdownload.jpeg";

const InstraStoryEffect = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 4
        }
    };

    const carCdata = [
        {
            id: 0,
            img : "https://i.ibb.co/5Ty9kgC/1.png",
            name : "BMW"
        },
        {
            id: 1,
            img : "https://i.ibb.co/gRTqvzB/c2.png",
            name : "HOND"
        },
        {
            id: 2,
            img : "https://i.ibb.co/cNcM9Cm/c3.png",
            name : "TOYOTA"
        },
        {
            id: 0,
            img : "https://i.ibb.co/5Ty9kgC/1.png",
            name : "BMW"
        },
        {
            id: 1,
            img : "https://i.ibb.co/gRTqvzB/c2.png",
            name : "HOND"
        },
        {
            id: 2,
            img : "https://i.ibb.co/cNcM9Cm/c3.png",
            name : "TOYOTA"
        },
        {
            id: 0,
            img : "https://i.ibb.co/5Ty9kgC/1.png",
            name : "BMW"
        },
        {
            id: 1,
            img : "https://i.ibb.co/gRTqvzB/c2.png",
            name : "HOND"
        },
        {
            id: 2,
            img : "https://i.ibb.co/cNcM9Cm/c3.png",
            name : "TOYOTA"
        },
        {
            id: 0,
            img : "https://i.ibb.co/5Ty9kgC/1.png",
            name : "BMW"
        },
        {
            id: 1,
            img : "https://i.ibb.co/gRTqvzB/c2.png",
            name : "HOND"
        },
        {
            id: 2,
            img : "https://i.ibb.co/cNcM9Cm/c3.png",
            name : "TOYOTA"
        },
        {
            id: 0,
            img : "https://i.ibb.co/5Ty9kgC/1.png",
            name : "BMW"
        },
        {
            id: 1,
            img : "https://i.ibb.co/gRTqvzB/c2.png",
            name : "HOND"
        },
        {
            id: 2,
            img : "https://i.ibb.co/cNcM9Cm/c3.png",
            name : "TOYOTA"
        },
    ]


      const carsInfo = [
    {
      id: 1,
      name: "Maruti",
      image: "https://i.ibb.co/d7dmHT1/2874749.webp",
    },
    {
      id: 2,
      name: "Honda",
      image: "https://i.ibb.co/QYpypT6/pngimg-com-car-logo-PNG1643-1.png",
    },
    {
      id: 3,
      name: "Hyundai",
      image: "https://i.ibb.co/GHVSqTP/free-hyundai-3215422-2673840.webp",
    },
    {
      id: 4,
      name: "Tata",
      image: "https://i.ibb.co/RbrZRb4/download.png",
    },
    {
      id: 5,
      name: "Kia",
      image: "https://i.ibb.co/syNSYJW/Kia-logo.png",
    },
  
    {
      id: 7,
      name: "Mahindra",
      image: "https://i.ibb.co/4f6Lm43/free-mahindra-3441189-2874294.webp",
    },
    {
      id: 8,
      name: "Toyota",
      image: "https://i.ibb.co/RbrZRb4/download.png",
    },
    {
      id: 9,
      name: "Jeep",
      image: "https://i.ibb.co/4PHxxGX/pngimg-com-jeep-PNG95.png",
    },
    {
      id: 10,
      name: "Renault",
      image: "https://i.ibb.co/9NbcGH3/download.jpg",
    },
    {
      id: 11,
      name: "Ford",
      image: "https://i.ibb.co/vLMpYRL/sdownload.jpg",
    } 
  ];

    return (
        <div className="container pt-16">
            <Carousel className="p-4" responsive={responsive} showDots={false} arrows={false}>
                {
                    carsInfo?.map(itm => <div className="flex relative flex-col cursor-pointer gap-2 items-center justify-center">
                        <div className="relative md:w-[150px] w-[80px] md:h-[150px] overflow-hidden h-[80px] border-red-500 border-2 rounded-full flex items-center justify-center">
                            <img src={itm?.image} className="md:w-[130px] rounded-full w-[60px]" />
                        </div>
                        <h4 className="md:font-semibold md:text-lg text-sm mt-2">{itm?.name}</h4>
                    </div>)
                }
            </Carousel>
        </div>
    );
};

export default InstraStoryEffect;
