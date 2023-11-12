import React from 'react';
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
 

const Home = () => {
    return (
        <section >
            {/* ===== Hero =====  */}
            <Hero />
            {/* ====== Best Sealer */}
            <section>
                <div>
                      <InstraStoryEffect/> <br />
                      <ExploreBestSeal/>
                      <br/>
                <ShopByCategories />
                    <HomeOffers/>
                    <BestSealer />
                    <OurProducts/>
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