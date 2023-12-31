import Link from 'next/link';
import React, { useEffect,useState } from 'react';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

const NewOfferBanner = () => {
    const [hours, setHours] = useState(3);
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(10);
    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true, // Only trigger the animation once
        });
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
          if (seconds > 0 || minutes > 0 || hours > 0) {
            if (seconds === 0) {
              if (minutes > 0) {
                setSeconds(59);
                setMinutes(prevMinutes => prevMinutes - 1);
              } else if (hours > 0) {
                setSeconds(59);
                setMinutes(59);
                setHours(prevHours => prevHours - 1);
              }
            } else {
              setSeconds(prevSeconds => prevSeconds - 1);
            }
          } else {
            clearInterval(timer);
            // You can perform any action when the timer reaches 00:00:00 here
          }
        }, 1000);
    
        // Clean up the interval on unmount or when the timer ends
        return () => clearInterval(timer);
      }, [seconds, minutes, hours]);
    

    return (
        <>
        <section className="w-[100%] md:block hidden  bottom-banner-section mt-4" data-aos="fade-up"> {/* Add data-aos attribute */}
            <div className="container">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="flex text-left flex-row items-center  justify-around  offer-banner-content">
                        <div className="text-2xl flex items-center justify-around p-1 text-white rounded-md shadow-lg">
                         Ending in<strong className='text-5xl px-2'><span className='px-4 '></span>{hours.toString().padStart(2, '0')}</strong> Hours <strong className='text-5xl px-2 text-center'><span className='px-4'>:</span>{minutes.toString().padStart(2, '0')}</strong> Mins <strong className='text-5xl px-4'><span className='px-4'>:</span>{seconds.toString().padStart(2, '0')}</strong> Sec
                        </div>                      
                        <div className='text-center'>
                        <p className='text-[#ffff] flex-1 text-center mr-12 font-bold md:text-[3rem]'>Up to <span className='text-[#f0ab4bf2]'>30% Off </span></p>
                        <Link href="/products" className='common-btn '>Shop Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="w-[100%] block md:hidden mobile-bottom-banner-section mt-8" data-aos="fade-up"> {/* Add data-aos attribute */}
            <div className="container relative">
                <div >
                    <div className="flex flex-wrap text-left flex-row items-center  gap-4 offer-banner-content">
                        <div className="text-xl  sm:text-sm md:text-xl flex-wrap flex items-center justify-around p-2  text-white rounded-md shadow-lg">
                         <span>Ending in</span>  <strong className='text-5xl small-screen-font px-1'>{hours.toString().padStart(2, '0')}</strong> Hrs: <strong className='text-5xl small-screen-font px-1'>{minutes.toString().padStart(2, '0')}</strong> Mins: <strong className='text-5xl small-screen-font px-1'>{seconds.toString().padStart(2, '0')}</strong> Sec
                        </div>                      
                        <p className='text-[#ffff] text-center ml-8 font-bold md:text-[3rem]'>Up to <span className='text-[#f0ab4bf2]'>30% Off </span></p>
                        <Link href="/products" className='common-btn '>Shop Now</Link>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};

export default NewOfferBanner;