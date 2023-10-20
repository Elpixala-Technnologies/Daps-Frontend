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
import { FaChevronDown, FaChevronUp, FaMicrosoft, FaPowerOff, FaUserAlt, FaAngleDown } from 'react-icons/fa';
import { CiUser } from 'react-icons/ci'
import {GiHamburgerMenu} from 'react-icons/gi'
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
  const [selectedMenu, setSelectedMenu] = useState("");

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
      <header className='shadow bg-[#fff]'>
        <nav className="  border-b py-4 flex items-center text-black container relative  md:px-4 px-2">
          <div className="  flex items-center mx-2 justify-between w-full md:mx-auto">
            <div className='manu-items md:flex gap-4 justify-center items-center hidden '>
              <ul className='flex gap-4 justify-center items-center '>
                <li>
                  <div
                    onMouseLeave={() => handleMouseLeave('categorys')}
                    onMouseEnter={() => handleMouseEnter('categorys')}
                    className='cursor-pointer'
                  >
                    <span className="relative cursor-pointer flex gap-3 text-[1.1rem] font-semibold items-center"><GiHamburgerMenu className='text-[1.5rem] text-[#18568C]'/>Shop By Categories <FaAngleDown className='text-[1.5rem] text-[#18568C] border-r-2'/> </span>
                    {megaMenuVisible.categorys && (
                      <div
                        className={`mega-menu border bg-white z-50 absolute w-[80%]  top-[90%]  left-0   rounded p-4 transition-opacity opacity-100`}
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
                          <div className='grid grid-cols-3 gap-4 p-4'>
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
                                      <h1 className="w-[75%] nav-category-title">
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
                    href="/"
                    className={`common-hover text-[#29679e]:hover font-semibold ${
                      selectedMenu === "Home" ? "selected-manu" : ""
                    }`}
                    onClick={() => setSelectedMenu("Home")}
                    >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className={`common-hover font-semibold ${
                      selectedMenu === "Products" ? "selected-manu" : ""
                    }`}
                    onClick={() => setSelectedMenu("Products")}
                    >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className={`common-hover font-semibold ${
                      selectedMenu === "Blogs" ? "selected-manu" : ""
                    }`}
                    onClick={() => setSelectedMenu("Blogs")}
                    >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className={`common-hover font-semibold ${
                      selectedMenu === "Blogs" ? "selected-manu" : ""
                    }`}
                    onClick={() => setSelectedMenu("Blogs")}
                    >
                   Hot Deals
                  </Link>
                </li>

              </ul>
            </div>
            <ul style={{ display: "flex", gap: '0.8rem' }}
              className='flex gap-4 justify-center items-center'>
              <div className="flex  gap-4 md:hidden">
                <button className='block md:hidden' onClick={() => setOpen(!open)}>
                  <AiOutlineMenu className='text-[1.8rem] text-[#335187]' />
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
