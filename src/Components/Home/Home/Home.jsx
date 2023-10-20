import React from 'react';
import Hero from '../Hero/Hero';
import BestSealer from '../BestSealer/BestSealer';
import TodayOffers from '../TodayOffers/TodayOffers';
import ShopByCategories from '../ShopByCategories/ShopByCategories';
import NewArrivals from '../NewArrivals/NewArrivals';
import RecentBlogs from '../RecentBlogs/RecentBlogs';
import NewOfferBanner from '../NewOfferBanner/NewOfferBanner';
import AboutBanner from '../AboutBanner/AboutBanner'
import HomeOffers from '../HomeOffers/HomeOffers';
import OurProducts from "../OurProducts/OurProducts"

const Home = () => {
    return (
        <section >
            {/* ===== Hero =====  */}
            <Hero />
            {/* ====== Best Sealer */}
            <section>
                <div>
                    <HomeOffers/>
                    <BestSealer />
                    <OurProducts/>
                    {/* <TodayOffers /> */}
                    <NewOfferBanner />
                    <ShopByCategories />
                    <AboutBanner />
                    <NewArrivals />
                    <RecentBlogs />
                </div>

            </section>
        </section>
    );
};

export default Home;