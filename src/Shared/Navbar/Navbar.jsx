import { MainLogo } from '@/src/Assets';
import { AuthContext } from '@/src/Context/UserContext';
import useAdmin from '@/src/Hooks/useAdmin';
import useCommonApiData from '@/src/Hooks/useCommonApiData';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState, useEffect, } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS CSS
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { FaAlignLeft, FaArrowDown, FaChevronDown, FaChevronUp, FaMicrosoft, FaPowerOff, FaUserAlt, FaAngleDown } from 'react-icons/fa';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { CiUser } from 'react-icons/ci'
import { CgShoppingBag } from 'react-icons/cg'
import useProducts from '@/src/Hooks/useProducts';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext)
  const { handleLogout } = useCommonApiData()
  const userEmail = user?.email;
  const [isAdmin] = useAdmin();
  const { categoryData } = useProducts()
  const [profileToggle, setProfileToggle] = useState(false)

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

  // Function to toggle mega menu visibility
  const toggleMegaMenu = (menu) => {
    setMegaMenuVisible((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  const openProfile = () => {
    setProfileToggle(true);
  };


  const handelProfileToggle = () => {
    setProfileToggle(!profileToggle); // Toggle the profile state
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
                    onMouseLeave={() => handleMouseLeave('categorys')}
                    onMouseEnter={() => handleMouseEnter('categorys')}
                    className='cursor-pointer'
                  >
                    <span className="relative cursor-pointer flex gap-2 items-center">Categories <FaAngleDown /> </span>
                    {megaMenuVisible.categorys && (
                      <div
                        className={`mega-menu border bg-white z-50 absolute w-[80%] top-[80%] left-[10%] right-0  rounded p-4 transition-opacity opacity-100`}
                        data-aos="fade-up"
                      >
                        <ul>
                          {/* Menu items */}
                          <li>
                            <h1>
                              <span className="text font-bold cursor-pointer">Categories</span>
                            </h1>
                          </li>
                          <hr className="border border-gray-300 my-2" />
                          <div className='grid md:grid-cols-4 gap-4 p-4'>
                            {
                              categoryData && categoryData?.map((item, index) => {
                                return (
                                  <div
                                    key={index} >
                                    <Link href={`/category/${item?.name}`}
                                      className='flex items-center justify-center gap-2 cursor-pointer hover:scale-105 duration-300 transform'
                                    >
                                      <Image
                                        src={item?.icon}
                                        alt='category'
                                        width={50}
                                        height={50}
                                      />
                                      <h1 className="w-[70%] nav-category-title">
                                        {item?.name}
                                      </h1>
                                    </Link>
                                  </div>
                                )
                              })
                            }
                          </div>
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="common-hover">
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="common-hover">
                    Blogs
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
              <div className='cursor-pointer'
                onClick={() => handelProfileToggle()}

              >
                <CiUser className='text-2xl text-[#335187]' />
                <div>
                  {
                    profileToggle && (
                      <div
                        className="absolute right-0 w-60 px-5 py-3 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-5"
                      >
                        <ul className="space-y-3 dark:text-white">

                          {
                            !userEmail ? (
                              <>
                                <Link href="/auth/login" className="flex items-center  gap-2 border-common-btn common-hover">
                                  <FaUserAlt /> SignIn
                                </Link>
                              </>
                            ) : (
                              <div className="flex flex-col gap-2">
                                {
                                  isAdmin && <Link href="/dashboard" className="flex items-center  gap-2 border-common-btn common-hover">
                                    <FaMicrosoft /> Dashboard
                                  </Link>
                                }
                                {
                                  userEmail && !isAdmin && < Link href="/userdashboard" className="flex items-center  gap-2 border-common-btn common-hover">
                                    <FaUserAlt /> Profile
                                  </Link>
                                }
                                <button className="flex items-center gap-2 my-2 border-common-btn common-hover"
                                  onClick={() => handleLogout()}
                                >
                                  <FaPowerOff /> Logout
                                </button>
                              </div>
                            )
                          }
                        </ul>
                      </div>

                    )
                  }
                </div>
              </div>


              <Link href="/cart">
                <CgShoppingBag className='text-2xl text-[#335187]' />
              </Link>
              <div className="flex  gap-4 md:hidden">
                <button className='block md:hidden' onClick={() => setOpen(!open)}>
                  <AiOutlineMenu className='text-2xl text-[#335187]' />
                </button>
              </div>
            </ul>

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
                <li>
                  <div
                    onClick={() => toggleMegaMenu('categorys')}
                    className='cursor-pointer flex justify-between items-center gap-4'
                  >
                    <span className="text relative cursor-pointer">Categories</span>
                    {megaMenuVisible.categorys ? (
                      <FaChevronDown />
                    ) : (
                      <FaChevronUp />
                    )}
                  </div>
                  {megaMenuVisible.categorys && (
                    <div
                      // className={`mega-menu border bg-white z-50 absolute w-[100%]  left-0 right-0  rounded p-4 transition-opacity opacity-100`}
                      // data-aos="fade-up"
                      className={`mega-menu border bg-white z-50 absolute w-[100%] left-0 right-0 rounded p-4 transition-opacity opacity-100`}
                      data-aos="fade-up"
                      style={{
                        maxHeight: '80vh', // You can adjust the height as needed
                        overflowY: 'auto',
                      }}
                    >
                      <ul>
                        <div className='flex flex-col gap-4 p-4 overflow-auto'>
                          {
                            categoryData && categoryData?.map((item, index) => {
                              return (
                                <div
                                  key={index} >
                                  <Link href={`/category/${item?.name}`}
                                    className='flex items-center justify-center gap-2 cursor-pointer hover:scale-105 duration-300 transform'
                                  >
                                    <Image
                                      src={item?.icon}
                                      alt='category'
                                      width={80}
                                      height={80}
                                    />
                                    <h1 className="w-[70%] nav-category-title">
                                      {item?.name}
                                    </h1>
                                  </Link>
                                </div>
                              )
                            })
                          }
                        </div>
                      </ul>
                    </div>
                  )}
                </li>
                <li className="common-hover">
                  <Link href="/products" >Products</Link>
                </li>
                <li className="common-hover">
                  <Link href="/blogs" >Blogs</Link>
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
