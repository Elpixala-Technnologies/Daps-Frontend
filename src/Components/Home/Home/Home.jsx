import React from 'react';
import Hero from '../Hero/Hero';
import BestSealer from '../BestSealer/BestSealer';

const Home = () => {
    return (
        <section >
            {/* ===== Hero =====  */}
            <Hero />
            {/* ====== Best Sealer */}
            <section className='container'>
                <BestSealer />
            </section>
        </section>
    );
};

export default Home;