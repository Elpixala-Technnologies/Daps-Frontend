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
                        className="h-full w-full rounded object-cover transition duration-200 ease-out transform hover:scale-105"
                    />

                    <div className='absolute top-[30%] bottom-0 left-[15%] right-0'>
                        <div>
                            <p className='font-semibold'>TOOLS & ACCESSORIES</p>
                            <h1 className='font-bold text-[2rem]'>
                                SAVE TIME <br /> AND MONEY
                            </h1>
                            <h4 className='font-semibold text-[#009EE2] text-[1.2rem] mb-4'>
                                UP TO 20% OFF
                            </h4>

                            <Link href='/prodcts' className='common-btn-outline py-4 px-4 mt-6'>
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='banner-content  text-[#000] flex flex-col gap-4'>
                    <div className='banner-content relative'>
                        <Image
                            src={HomeOfferBannerTwo}
                            alt={"HomeOfferBannerOne"}
                            width={300}
                            height={300}
                            className="h-full w-full transition duration-200 ease-out transform hover:scale-105"
                        />

                        <div className='absolute top-[30%] bottom-0 left-[50%] right-0'>
                            <div>
                                <p className='font-semibold'>NEW ARRIVAL</p>
                                <h1 className='font-bold text-[1.5rem] mt-2'>
                                    POWER
                                    <br /> HAND TOOLS
                                </h1>
                                <h4 className='font-semibold text-[#009EE2] text-[1.2rem] mb-4'>
                                    ₹ 1562
                                </h4>
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

                        <div className='absolute top-[30%] bottom-0 left-[15%] right-0'>
                            <div>
                                <p className='font-semibold'>BEST PRICE</p>
                                <h1 className='font-bold text-[1.5rem] mt-2'>
                                    FLEX VOLT
                                    <br />60V BATTERY
                                </h1>
                                <h4 className='font-semibold text-[#009EE2] text-[1.2rem] mb-4'>
                                    ₹153
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className='banner-content relative'>
                        <Image
                            src={HomeOfferBannerTwo}
                            alt={"HomeOfferBannerOne"}
                            width={300}
                            height={300}
                            className="h-full w-full transition duration-200 ease-out transform hover:scale-105"
                        />

                        <div className='absolute top-[30%] bottom-0 left-[50%] right-0'>
                            <div>
                                <p className='font-semibold'>NEW ARRIVAL</p>
                                <h1 className='font-bold text-[1.5rem] mt-2'>
                                    POWER
                                    <br /> HAND TOOLS
                                </h1>
                                <h4 className='font-semibold text-[#009EE2] text-[1.2rem] mb-4'>
                                    ₹ 1562
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='banner-content  relative'>
                    <Image
                        src={HomeOfferBannerFour}
                        alt={"HomeOfferBannerOne"}
                        width={500}
                        height={530}
                        className="h-full rounded object-cover w-full transition duration-200 ease-out transform hover:scale-105"
                    />
                     <div className='absolute top-[15%]  bottom-0 left-[15%] right-0'>
                        <div className='text-[#000]'>
                            <p className='font-semibold'>ONLINE SHOP</p>
                            <h1 className='font-bold text-[2rem]'>
                                SAVE TIME <br /> AND MONEY
                            </h1>
                            <h4 className='font-semibold text-[#009EE2] text-[1.2rem] mb-4'>
                                UP TO 20% OFF
                            </h4>

                            <Link href='/prodcts' className='common-btn-outline py-4 px-4 mt-6'>
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* =====  */}
            
        </section>
    );
};

export default HomeOffers;