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
      <h1 className='font-thin text-sm top-0 bg-[#EFF4F7] text-center py-2 '>Go extra on celebrations & saving with <strong className='font-bold'>Bond with Dav</strong>Bag <strong className='font-bold'>offers</strong> & personalized gifts.</h1>
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