import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import c1 from '@/../../src/Assets/car/1.png'
import c2 from '@/../../src/Assets/car/c2.png'
import c3 from '@/../../src/Assets/car/c3.png'
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

    return (
        <div className="container ">
            <Carousel className="p-4" responsive={responsive} showDots={false} arrows={false}>
                {
                    carCdata?.map(itm => <div className="flex relative flex-col cursor-pointer gap-2 items-center justify-center">
                        <div className="relative md:w-[150px] w-[80px] md:h-[150px] h-[80px] border-red-500 border-2 rounded-full flex items-center justify-center">
                            <img src={itm?.img} className="md:w-[130px] w-[60px]" />
                        </div>
                        <h4 className="md:font-semibold md:text-lg text-sm mt-2">{itm?.name}</h4>
                    </div>)
                }
            </Carousel>
        </div>
    );
};

export default InstraStoryEffect;
