import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import Link from "next/link";
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'swiper/css/scrollbar';
import useBestsellers from "@/src/Hooks/useBestsellers";

const BestSealer = () => {
    const { BestsellersData } = useBestsellers();
    const sliderRef = useRef(null);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

 
    return (
        <section className="mt-6 container">
            <h3 className="font-light mb-4 text-3xl text-black">Explore <strong className='font-extrabold text-[#29679e]'>Bestsellers</strong></h3>
            <div>
                <Swiper
                    ref={sliderRef}
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={3}
                    onSlideChange={() => { }}
                    onSwiper={(swiper) => { }}
                    data-aos="fade-up"
                    data-aos-anchor-placement="center-bottom"
                    breakpoints={{
                        320: {
                            slidesPerView: 1.5,
                            spaceBetween: 20,
                        },
                        360: {
                            slidesPerView: 1.5,
                            spaceBetween: 20,
                        },
                        480: {
                            slidesPerView: 1.5,
                            spaceBetween: 20,
                        },
                        640: {
                            slidesPerView: 1.5,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2.5,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 4.5,
                            spaceBetween: 20,
                        },
                    }}
                    scrollbar={{ draggable: true, hide: true }}
                >
                    <div className="grid grid-cols-2 md:grid-row-2 lg:grid-cols-3 gap-4 pt-20">
                        {BestsellersData &&
                            BestsellersData.map((product) => {
                                return (
                                    <SwiperSlide key={product?._id}>
                                        <Link
                                            href={`/products?categoryName=${encodeURIComponent(
                                                product?.category                                            )}`}
                                            className="cardBody md:m-0 mx-auto flex flex-col p-2 md:p-3 rounded-md duration-300 transform hover:-translate-y-1.5">
                                            <div className="productImage">
                                                <Image
                                                    src={product?.image}
                                                    width={322}
                                                    height={320}
                                                    className="w-[320px] h-[320px] rounded-[1rem] object-cover shadow-sm"
                                                />
                                            </div>

                                            <div className="productInfo p-2">
                                                <h2 className="productName font-bold text-[16px] text-slate-700">
                                                    {product?.category}
                                                </h2>
                                            </div>
                                        </Link>
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
