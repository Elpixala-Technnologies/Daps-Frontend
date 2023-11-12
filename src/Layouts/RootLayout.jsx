import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import TopNavbar from '../Shared/Navbar/TopNavbar';
import MainNav from '../Shared/Navbar/MainNav';
import StickyBottomNav from '../Shared/Navbar/StickyBottomNav';
  
const RootLayout = ({ children }) => {
    return (
        <main className='w-full '>
            {/* <TopNavbar/>
            <Navbar />
             */}
             <MainNav/>
            <section className='pb-4'>
                {children}
                <div className="md:d-none block">
                   <StickyBottomNav/>
                </div>
             </section>
            <Footer />
        </main>
    );
};

export default RootLayout;