import Link from 'next/link';
import React, { useEffect } from 'react';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

const NewOfferBanner = () => {
    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true, // Only trigger the animation once
        });
    }, []);

    return (
        <>
        <section className="w-[100%] md:block hidden  bottom-banner-section mt-8" data-aos="fade-up"> {/* Add data-aos attribute */}
            <div className="container">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="flex text-left flex-row items-center  justify-around gap-4 offer-banner-content">
                        <h2 className='text-[#ffff] text-[1.5rem] mr-12'>Explore Our Offer</h2>
                        <p className='text-[#ffff] text-center mr-12 font-bold md:text-[3rem]'>Up to <span className='text-[#f0ab4bf2]'>30% Off </span></p>
                        <Link href="/products" className='common-btn '>Shop Now</Link>
                    </div>
                </div>
            </div>
        </section>
        <section className="w-[100%] block md:hidden mobile-bottom-banner-section mt-8" data-aos="fade-up"> {/* Add data-aos attribute */}
            <div className="container relative">
                {/* <div >
                    <div className="flex text-left flex-row items-center  gap-4 offer-banner-content">
                        <h2 className='text-[#ffff] text-[1rem]'>Explore Our Offer</h2>
                        <p className='text-[#ffff] text-center font-bold md:text-[2rem]'>Up to <span className='text-[#f0ab4bf2]'>30% Off </span></p>
                        <Link href="/products" className='common-btn '>Shop Now</Link>
                    </div>
                </div> */}
            </div>
        </section>
        </>
    );
};

export default NewOfferBanner;