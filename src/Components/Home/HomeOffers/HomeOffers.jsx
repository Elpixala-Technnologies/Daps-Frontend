import Image from 'next/image';
import React from 'react';
import Link from "next/link";
import {
    HomeOfferBannerOne,
    HomeOfferBannerTwo,
    HomeOfferBannerThree,
    HomeOfferBannerFour
} from "@/src/Assets"

const HomeOffers = () => {
    return (
        <section className='container'>
            
            <div className='mt-[62px] grid text-white grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 gap-4'>
                <div className='banner-content  w-full relative'>
                    <Image
                        src={HomeOfferBannerOne}
                        alt={"HomeOfferBannerOne"}
                        width={500}
                        height={530}
                        className="rounded  w-full h-full object-cover transition duration-200 ease-out transform hover:scale-105"
                    />

                    <div className='absolute top-[5%] md:top-[5%] bottom-0 left-[8%] right-0'>
                        <div>
                            <p className='font-semibold text-black'>TOOLS & ACCESSORIES</p>
                            <h1 className='font-bold leading-7 py-2 text-[1.3rem] md:text-[1.5rem] text-black'>
                                SAVE TIME <br /> AND MONEY
                            </h1>
                            <h4 className='font-semibold pb-2 text-[#009EE2] text-[1.2rem] mb-4'>
                                UP TO 20% OFF
                            </h4>

                            <Link href='/products' className='common-btn-outline py-2 px-4 mt-6'>
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='banner-content  text-[#000] flex flex-col gap-[2rem]'>
                    <div className='banner-content relative'>
                        <Image
                            src={HomeOfferBannerTwo}
                            alt={"HomeOfferBannerOne"}
                            width={300}
                            height={300}
                            className="h-full w-full transition duration-200 ease-out transform hover:scale-105"
                        />

                        <div className='absolute top-[11%] bottom-0 left-[8%] right-0'>
                            <div>
                                <p className='font-semibold'>NEW ARRIVAL</p>
                                <h1 className='font-bold leading-7 text-[1.5rem] my-2'>
                                    POWER
                                    <br /> HAND TOOLS
                                </h1>
                                <h4 className='font-semibold text-[#009EE2] text-[1.2rem] mb-4'>
                                    ₹ 1562
                                </h4>
                                <Link href='products' className='common-btn-outline py-4 px-4 mt-6'>
                                Shop Now
                            </Link>
                            </div>
                        </div>
                    </div>
                    <div className='banner-content text-[#fff] relative'>
                        <Image
                            src={HomeOfferBannerThree}
                            alt={"HomeOfferBannerOne"}
                            width={300}
                            height={300}
                            className="h-full w-full transition duration-200 ease-out transform hover:scale-105"
                        />

                        <div className='absolute top-[8%] bottom-0 left-[53%] right-0'>
                            <div>
                                <p className='font-semibold text-black'>BEST PRICE</p>
                                <h1 className='font-bold leading-7 text-[1.5rem] text-black my-2'>
                                    FLEX VOLT
                                    <br />60V BATTERY
                                </h1>
                                <h4 className='font-semibold text-[#009EE2] text-[1.2rem] mb-4'>
                                    ₹153
                                </h4>
                                <Link href='products' className='common-btn-outline py-4 px-4 mt-6'>
                                Shop Now
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='banner-content  relative'>
                    <Image
                        src={HomeOfferBannerFour}
                        alt={"HomeOfferBannerOne"}
                        width={530}
                        height={510}
                        className="w-full h-full  rounded object-cover transition duration-200 ease-out transform hover:scale-105"
                    />
                    <div className='absolute top-[8%] md:top-[6%]  bottom-0 left-[8%] right-0'>
                        <div className='text-[#000]'>
                            <p className='font-semibold mb-2'>ONLINE SHOP</p>
                            <h1 className='font-bold pb-2 leading-8 text-[1.5rem] md:text-[2rem]'>
                                SAVE TIME <br /> AND MONEY
                            </h1>
                            <h4 className='font-semibold text-[#009EE2] text-[1.2rem] mb-4'>
                                UP TO 20% OFF
                            </h4>

                            <Link href='products' className='common-btn-outline py-4 px-4 mt-6'>
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeOffers;