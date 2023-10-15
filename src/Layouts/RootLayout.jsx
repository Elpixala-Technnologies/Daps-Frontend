import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';

const RootLayout = ({ children }) => {
    return (
        <main className='w-full '>
            <Navbar />
            <section className='py-4 h-screen'>
                {children}
            </section>
            <Footer />
        </main>
    );
};

export default RootLayout;