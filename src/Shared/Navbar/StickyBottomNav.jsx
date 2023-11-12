import React from 'react';
import { GoHome } from "react-icons/go";
import { BiUser } from "react-icons/bi";
import { BsCart2 } from "react-icons/bs";
import { TbCategory } from "react-icons/tb";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";

const StickyBottomNav = () => {
    
  const [isSticky, setSticky] = useState(false);

  // scroll
    useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) { // Adjust the offset value according to when you want the navbar to become sticky
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


    return (
        <div className={`${isSticky ? ' sticky-bar' : ''} bg-[white] fixed md:d-[none]  flex justify-between items-center md:p-0 p-4 bottom-0 w-full md:h-[0px] h-[79px] overflow-hidden z-[200]`}>
           <Link href="">
            <div className="flex items-center gap-1  flex-col justify-center ">
                <GoHome className="text-3xl" />
                <h3>Home</h3>
             </div>
           </Link>
           
            {/* <div className="flex items-center gap-1 bg-white w-[80px] mt-[-40px] rounded-full h-[80px] flex-col justify-center ">
                <GoHome className="text-4xl" />
                <h3>Home</h3>
            </div> */}
           <Link href="">
            <div className="flex items-center gap-1  flex-col justify-center">
                <TbCategory className="text-3xl" />
                <h3>Category</h3>
            </div>
               </Link>
            <Link href="">
            <div className="flex items-center gap-1  flex-col justify-center">
                <BiUser className="text-3xl" />
                <h3>Login</h3>
            </div>
            </Link>
            <Link href="">
            <div className="flex items-center gap-1  flex-col justify-center">
                <BsCart2 className="text-3xl" />
                <h3>Cart</h3>
            </div>
            </Link>
        </div>
    );
};

export default StickyBottomNav;