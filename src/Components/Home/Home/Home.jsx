import React, { useEffect, useState } from 'react';
import Hero from '../Hero/Hero';
import BestSealer from '../BestSealer/BestSealer';

import ShopByCategories from '../ShopByCategories/ShopByCategories';
import NewArrivals from '../NewArrivals/NewArrivals';
import RecentBlogs from '../RecentBlogs/RecentBlogs';
import NewOfferBanner from '../NewOfferBanner/NewOfferBanner';
import AboutBanner from '../AboutBanner/AboutBanner'
import HomeOffers from '../HomeOffers/HomeOffers';
import OurProducts from "../OurProducts/OurProducts";
import InstraStoryEffect from '../../InstraStoryEffect/InstraStoryEffect';
import ExploreBestSeal from '../ExploreBestSeal/ExploreBestSeal';
import Image from 'next/image';
import ExploreBrand from '../ExploreBrand/ExploreBrand';


const Home = () => {
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        setShowModal(false);
        const timeout = setTimeout(() => {
            setShowModal(true);
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);
    return (
        <section >
            <div className={`${showModal ? 'd-none' : 'bg-[#0000005e] md:relative fixed md:d-none d-block top-0 left-0 right-0 bottom-0 w-full md:p-0 p-2 z-[200]'} `}>
                <div className={`${showModal ? 'h-[0px]' : 'h-[66vh] pb-12 md:h-[0px] md:p-0 p-4'} overflow-hidden duration-300 modal md:d-none block  bottom-0 left-0 w-full rounded-t-3xl  fixed z-[1000] bg-white   text-black`}>
                    <button onClick={() => setShowModal(!showModal)} className="bg-gray-200 w-[30px] h-[30px] rounded-full   text-black flex items-center float-right justify-center">x</button>
                    <div className="modal-content justify-center flex flex-col align-center text-black pt-6 text-center">
                        <p className="text-xl font-[300] text-center">Welcome to</p>
                        <h2 className="text-3xl font-bold text-center">DAPS</h2>
                        <Image width={270} height={270} alt='img'
                            src="https://i.ibb.co/WpNM1tM/prd.png"
                            className='mt-5' />
                        <button className="common-btn w-full py-2 rounded-lg mt-3 mx-auto">Explore now</button>
                    </div>
                </div>
            </div>
            {/* ===== Hero =====  */}
            <Hero />
            {/* ====== Best Sealer */}
            <section>

                <div>
                   <ExploreBrand/>
                    <InstraStoryEffect /> <br />
                    <ExploreBestSeal />
                    <br />
                    <ShopByCategories />
                    <HomeOffers />
                    <BestSealer />
                    <OurProducts />
                    {/* <TodayOffers /> */}
                    <NewOfferBanner />


                    <NewArrivals />
                    <AboutBanner />

                    <RecentBlogs />
                </div>

            </section>
        </section>
    );
};

export default Home;