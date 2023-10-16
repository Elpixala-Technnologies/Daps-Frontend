import React, { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { FaCartPlus, FaEye, FaPhabricator } from "react-icons/fa";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { TbArrowBigLeft, TbArrowBigRight } from "react-icons/tb";
import Link from "next/link";
import useProducts from "@/src/Hooks/useProducts";
import AOS from 'aos';
import 'aos/dist/aos.css';


const NewArrivals = () => {
    const { productData } = useProducts();

    const filterProductData = productData?.filter((data) => {
        return data?.status === "New Arrival";
    });

    const sliderRef = useRef(null);
    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true, // Only trigger the animation once
        });
    }, []);


    return (
        <section className="my-4 mx-2" >
            <div className="title my-6 flex justify-between items-center">

                <div className='title'>
                    <h1>New <span>Arrivals</span></h1>
                </div>

                <div className="flex  items-center gap-10 top-0">
                    <button
                        className="prev-arrow cursor-pointer bg-[#18568C] p-3 rounded-full"
                        onClick={handlePrev}
                    >
                        <TbArrowBigLeft className="h-6 w-6 text-white" />
                    </button>
                    <button
                        className="next-arrow cursor-pointer bg-[#18568C] p-3 rounded-full"
                        onClick={handleNext}
                    >
                        <TbArrowBigRight className="h-6 w-6 text-white" />
                    </button>
                </div>
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
                            slidesPerView: 2,
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
                                        <div className="cardBody md:m-0  mx-auto  flex flex-col hover:border-[#18568C]  color-b bg-[#EFF4F7] p-2 md:p-3 rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 ">
                                            <div className="productImage ">
                                                <Image
                                                    src={product?.images[0]}
                                                    width={300}
                                                    height={300}
                                                    className="w-full h-full"
                                                />
                                            </div>
                                            <hr className="w-full bg-slate-400" />

                                            <div className="productInfo mt-2 p-2">
                                                <Link className="productName font-bold text-left"
                                                href={`/product/${product?._id}`}
                                                >
                                                    {product?.name.slice(0, 26) + ".."}
                                                </Link>
                                                <div className='flex gap-4'>
                                                    <h1 className="font-bold text-slate-900">
                                                        {product?.discount
                                                            ? `₹ ${Math.floor(product?.price - (product?.price * product?.discount) / 100)}`
                                                            : `₹ ${Math.floor(product?.price)}`
                                                        }
                                                    </h1>
                                                    <span className="text-sm text-slate-900 line-through mt-1">
                                                        ₹ {Math.floor(product?.price)}
                                                    </span>
                                                    <span className='text-[#18568C]'>
                                                        {Math.floor(product?.discount)} % off
                                                    </span>
                                                </div>
                                                <p className="productDescription py-3 text-left">
                                                    {product?.details?.slice(0, 46) + "..."}
                                                </p>
                                                <div className="productAddToCart flex gap-5 items-center">
                                                    <div>
                                                        <button className="border  px-4 py-4 flex justify-center items-center gap-4 hover:border-[#18568C] common-btn p-2 md:p-3 text-center rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-red-500" >
                                                            <FaCartPlus />
                                                            Add To Cart
                                                        </button>
                                                    </div>
                                                </div>
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

export default NewArrivals;
