import React from 'react';
import Hero from '../Hero/Hero';
import BestSealer from '../BestSealer/BestSealer';
import TodayOffers from '../TodayOffers/TodayOffers';
import ShopByCategories from '../ShopByCategories/ShopByCategories';
import NewArrivals from '../NewArrivals/NewArrivals';
import RecentBlogs from '../RecentBlogs/RecentBlogs';
import NewOfferBanner from '../NewOfferBanner/NewOfferBanner';

const Home = () => {
    return (
        <section >
            {/* ===== Hero =====  */}
            <Hero />
            {/* ====== Best Sealer */}
            <section className='container'>
                <BestSealer />
                <TodayOffers />
                <ShopByCategories />
                <NewOfferBanner />
                <NewArrivals />
                <RecentBlogs />

            </section>
        </section>
    );
};

export default Home;