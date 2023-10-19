import React from 'react';
import Hero from '../Hero/Hero';
import BestSealer from '../BestSealer/BestSealer';
import TodayOffers from '../TodayOffers/TodayOffers';
import ShopByCategories from '../ShopByCategories/ShopByCategories';
import NewArrivals from '../NewArrivals/NewArrivals';
import RecentBlogs from '../RecentBlogs/RecentBlogs';
import NewOfferBanner from '../NewOfferBanner/NewOfferBanner';
import AboutBanner from '../AboutBanner/AboutBanner'

const Home = () => {
    return (
        <section >
            {/* ===== Hero =====  */}
            {/* ====== Best Sealer */}
            <section className='container'>
                <Hero />
                <div className='px-4'>
                    <BestSealer />
                    <TodayOffers />
                    <NewOfferBanner />
                    <ShopByCategories />
                    <AboutBanner/>
                    <NewArrivals />
                    <RecentBlogs />
                </div>

            </section>
        </section>
    );
};

export default Home;