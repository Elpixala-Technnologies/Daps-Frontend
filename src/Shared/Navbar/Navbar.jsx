import { MainLogo } from '@/src/Assets';
import { AuthContext } from '@/src/Context/UserContext';
import useAdmin from '@/src/Hooks/useAdmin';
import useCommonApiData from '@/src/Hooks/useCommonApiData';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState,useEffect,  } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS CSS
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { FaAlignLeft, FaArrowDown, FaChevronDown, FaChevronUp,FaMicrosoft, FaPowerOff, FaUserAlt ,FaAngleDown} from 'react-icons/fa';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { CiUser } from 'react-icons/ci'
import { CgShoppingBag } from 'react-icons/cg'

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext)
  const { handleLogout } = useCommonApiData()
  const userEmail = user?.email;
  const [isAdmin] = useAdmin();

  useEffect(() => {
    AOS.init({
        duration: 1000, // Animation duration (in milliseconds)
        once: true, // Whether animation should only happen once
    });
}, []);



  const [megaMenuVisible, setMegaMenuVisible] = useState({
    categorys: false,
  });

  const handleMouseEnter = (menu) => {
    setMegaMenuVisible((prevState) => ({
      ...prevState,
      [menu]: true,
    }));
  };

  const handleMouseLeave = (menu) => {
    setMegaMenuVisible((prevState) => ({
      ...prevState,
      [menu]: false,
    }));
  };


  return (
    <header className="sticky top-0 z-50 mx-auto" >
    <nav className="bg-[#FAFAFA]  border-b py-2 flex items-center text-black md:container relative  md:px-4 px-2">
      <div className="md:container  flex items-center mx-2 justify-between w-full md:mx-auto">
        <div>
          <Link className='text-2xl font-bold text-black' href="/">
            <Image src={MainLogo} alt="logo" width={130} height={80}
              className='cursor-pointer hover:scale-105 duration-300 transform'
            />
          </Link>
        </div>

        <div className='manu-items md:flex gap-4 justify-center items-center hidden '>
          <ul className='flex gap-4 justify-center items-center '>
            <li>
              <Link
                href="/"
                className="common-hover">
                Home
              </Link>
            </li>
       
              <li>
                <div
                  onMouseEnter={() => handleMouseEnter('categorys')}
                  onMouseLeave={() => handleMouseLeave('categorys')}
                  className='cursor-pointer'
                >
                  <span className="relative cursor-pointer flex gap-2 items-center">Categories <FaAngleDown/> </span>
                  {megaMenuVisible.categorys && (
                    <div
                      className={`mega-menu border bg-white z-50 absolute w-[80%] top-[90%] left-[10%] right-0  rounded p-4 transition-opacity opacity-100`}
                      data-aos="fade-up"
                    >
                      <ul>
                        {/* Menu items */}
                        <li>
                          <Link href={`/category-product/Bags`}>
                            <span className="text font-bold cursor-pointer">Categories</span>
                          </Link>
                        </li>
                        <hr className="border border-gray-300 my-2" />
                        <div className='flex gap-6 md:flex-row flex-col'>
                        
                   
                        </div>
                      </ul>
                    </div>
                  )}
                </div>
              </li>
              <li>
                <Link
                  href="/"
                  className="common-hover">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="common-hover">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="common-hover">
                  Home
                </Link>
              </li>
          </ul>
        </div>

        <ul style={{ display: "flex", gap: '0.8rem' }}
          className='flex gap-4 justify-center items-center'>
          <div
            className='search-bar hidden md:block '
          >
            <li className="flex items-center  bg-[white] p-2 rounded-full gap-2">
              <input type="text" className='w-full pl-2 text-black' placeholder='Search' />
              <AiOutlineSearch className='text-black text-[1.5rem]' />
            </li>
          </div>
          <div className='cursor-pointer'>
            <CiUser className='text-2xl text-[#335187]' />
          </div>
          <Link href="/">
            <CgShoppingBag className='text-2xl text-[#335187]' />
          </Link>
        </ul>


        {/* shop and menu button group for small device */}
        {/* <div className="flex  gap-4 md:hidden">
          <Link href="/cart">
            <div className='bg-[#9cb3dd43] w-[40px] rounded-full flex items-center justify-center h-[40px]'>
              <MdOutlineShoppingBag className='text-2xl text-[#335187]' />
            </div>
          </Link>
          <button className='block md:hidden' onClick={() => setOpen(!open)}>
            <AiOutlineMenu className='text-3xl' />
          </button>
        </div> */}

        {/* side bar for small device */}
        <div className={`${open ? 'left-0 ' : 'left-[-250%]'} duration-300 w-full overflow-hidden fixed bg-[#172733] h-screen top-0 p-4 text-white `}
          style={{ zIndex: 1000 }}
        >
          <button className='float-right' onClick={() => setOpen(!open)}>
            <AiOutlineClose className='text-5xl' />
          </button><br />
          <ul className="flex flex-col gap-6">
            <li className="common-hover">
              <Link href="/">Home</Link>
            </li>
            <li className="common-hover">
              <Link href="/product" >Shop</Link>
            </li>
            <li>
              {
                !userEmail ? (
                  <>
                    <Link href="/auth/login" className="flex items-center justify-center gap-2 border-common-btn ">
                      <FaUserAlt /> SignIn
                    </Link>
                  </>
                ) : (
                  <>
                    {
                      isAdmin && <Link href="/dashboard" className="flex items-center justify-center gap-2 border-common-btn ">
                        <FaMicrosoft /> Dashboard
                      </Link>
                    }

                    {
                      userEmail && !isAdmin && < Link href="/userdashboard" className="flex items-center justify-center gap-2 border-common-btn common-hover">
                        <FaUserAlt /> Profile
                      </Link>
                    }
                    <button className="flex items-center justify-center w-full gap-2 my-2 border-common-btn"
                      onClick={() => handleLogout()}
                    >
                      <FaPowerOff /> Logout
                    </button>
                  </>
                )
              }
            </li>
            <li className="flex items-center jsutif bg-[white] p-1 rounded-md gap-2">
              <input type="text" className='w-full pl-2 text-black' placeholder='Search' />
              <AiOutlineSearch className='text-black' />
            </li>

          </ul>
        </div>
      </div>
    </nav >
    </header>
  );
};

export default Navbar;
