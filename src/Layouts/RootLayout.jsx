import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import TopNavbar from '../Shared/Navbar/TopNavbar';

const RootLayout = ({ children }) => {
    return (
        <main className='w-full '>
            <TopNavbar/>
            <Navbar />
            <section className='pb-4'>
                {children}
            </section>
            <Footer />
        </main>
    );
};

export default RootLayout;