import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { categoryData } from "@/src/Utils/MockData/Category";


const BestSealer = () => {
    const sliderRef = useRef(null);
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true, // Only trigger the animation once
        });
    }, []);

    const filterProductData = categoryData.filter((category) => category?.status === 'best sell');



    return (
        <section>
            <div className='title'>
                <h1>Explore Bestsellers</h1>
            </div>

            <div>
                <Swiper
                    ref={sliderRef}
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
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    }}
                    spaceBetween={20}
                    slidesPerView={3}
                    onSlideChange={() => { }}
                    onSwiper={(swiper) => { }}
                    data-aos="fade-up"
                    data-aos-anchor-placement="center-bottom"
                >
                    <div className="grid grid-cols-1 justify-center items-center mx-auto md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filterProductData &&
                            filterProductData.map((product) => {
                                return (
                                    <SwiperSlide className="cursor-grab" key={product?._id}
                                    >
                                        <div className="cardBody md:m-0  mx-auto  flex flex-col hover:border-[#18568C] p-2 md:p-3 rounded-md duration-300 transform  hover:-translate-y-1.5   hover:bg-red-10 ">
                                            <div className="productImage ">
                                                <Image
                                                    src={"/productimage"}
                                                    width={250}
                                                    height={250}
                                                    className="w-full h-full rounded-[1rem] border-slate-100  shadow-sm "
                                                />
                                            </div>
                                            <hr className="w-full bg-slate-400" />

                                            <div className="productInfo mt-2 p-2">
                                                <h2 className="productName font-bold text-left ">
                                                    {product?.name}
                                                </h2>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                    </div>
                </Swiper>
            </div>
        </section>
    );
};

export default BestSealer;