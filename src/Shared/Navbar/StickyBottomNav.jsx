import React from 'react';
import { useRouter } from 'next/router';
import { GoHome } from 'react-icons/go';
import { BiUser } from 'react-icons/bi';
import { BsCart2 } from 'react-icons/bs';
import { TbCategory } from 'react-icons/tb';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const StickyBottomNav = () => {
  const router = useRouter();
  const [isSticky, setSticky] = useState(false);

  // Check if the current route matches a specific path
  const currentPath = router.pathname;
  const isHome = currentPath === '/';
  const isCategory = currentPath === '/products';
  const isLogin = currentPath === '/auth/login';
  const isCart = currentPath === '/cart';

  // scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`sticky-bar ${isSticky ? 'sticky-bar' : ''} bg-[white] fixed md:d-[none]  flex justify-between items-center md:p-0 p-4 bottom-0 w-full md:h-[0px] h-[79px] overflow-hidden z-[200]`}>
      <Link href="/">
        <div className={`flex items-center gap-1 flex-col justify-center ${isHome ? 'text-red-500' : ''}`}>
          <GoHome className="text-3xl" />
          <h3>Home</h3>
        </div>
      </Link>

      <Link href="/products">
        <div className={`flex items-center gap-1 flex-col justify-center ${isCategory ? 'text-red-500' : ''}`}>
          <TbCategory className="text-3xl" />
          <h3>Category</h3>
        </div>
      </Link>

      <Link href="/auth/login">
        <div className={`flex items-center gap-1 flex-col justify-center ${isLogin ? 'text-red-500' : ''}`}>
          <BiUser className="text-3xl" />
          <h3>Login</h3>
        </div>
      </Link>

      <Link href="/cart">
        <div className={`flex items-center gap-1 flex-col justify-center ${isCart ? 'text-red-500' : ''}`}>
          <BsCart2 className="text-3xl" />
          <h3>Cart</h3>
        </div>
      </Link>
    </div>
  );
};

export default StickyBottomNav;
