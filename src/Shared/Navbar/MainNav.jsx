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
import { GiHamburgerMenu } from 'react-icons/gi'
import { CiUser } from 'react-icons/ci';
import { BsCartPlus } from 'react-icons/bs';
import useProducts from '@/src/Hooks/useProducts';


const MainNav = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext)
  const { handleLogout } = useCommonApiData()
  const userEmail = user?.email;
  const [isAdmin] = useAdmin();
  const { categoryData } = useProducts()
  const [profileToggle, setProfileToggle] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState("");

  const [placeholderText, setPlaceholderText] = useState(''); // Initialize empty placeholder text

  const [searchBarToggle, setSearchBarToggle] = useState(false); // Initialize the search bar state to false

  // Text to display in the placeholder
  const searchText = 'Search for products, shops...';

  // Animation speed (adjust as needed)
  const animationSpeed = 300; // in milliseconds

  useEffect(() => {
      let currentIndex = 0;
      let intervalId;

      // Function to update the placeholder text with typing animation
      function updatePlaceholder() {
          setPlaceholderText(searchText.slice(0, currentIndex));
          currentIndex++;
          if (currentIndex > searchText.length) {
              currentIndex = 0;
          }
      }

      // Start the animation
      intervalId = setInterval(updatePlaceholder, animationSpeed);

      // Clean up the interval when the component unmounts
      return () => {
          clearInterval(intervalId);
      };
  }, []);

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

  const handelSearchBarToggle = () => {
    setSearchBarToggle(!searchBarToggle); // Toggle the search bar state
}


  return (
    <header className='shadow bg-[#fff]  sticky top-0 z-50 mx-auto'
      style={{
        zIndex: '9999'
      }}
    >
      <nav className="border-b py-4 flex items-center text-black container relative  md:px-4 px-2">
        <div className="flex items-center mx-2 justify-between w-full md:mx-auto">
        <div>
            <Link className='text-2xl font-bold text-black' href="/">
                <Image src={MainLogo} alt="logo" width={130} height={80}
                  className='cursor-pointer hover:scale-105 duration-300 transform'
                  />
            </Link>
            </div>
          <div className='manu-items md:flex gap-4 justify-center items-center hidden '>
            <ul className='flex gap-8 justify-center items-center border px-8 py-2 bg-[#F6F6F6] rounded-full'>
              <li>
                <div
                  onMouseLeave={() => handleMouseLeave('categorys')}
                  onMouseEnter={() => handleMouseEnter('categorys')}
                >
                  <h1 className="relative cursor-pointer flex gap-2 text-[1.1rem] items-center  upercase">Shop By Categories <FaAngleDown className='text-[1.2rem] text-[#18568C]' /> </h1>
                  {megaMenuVisible.categorys && (
                    <div
                      className={`mega-menu border bg-white z-50 absolute  top-[85%]  left-[26%] rounded py-2 px-2 transition-opacity opacity-100`}
                      data-aos="fade-up"
                    >
                      <ul>
                        <div className='flex flex-col px-4 gap-4'>
                          {
                            categoryData && categoryData?.slice(0, 8).map((item, index) => {
                              return (
                                <div key={index} >
                                  <Link href={`/category/${item?.name}`}
                                    className='cursor-pointer hover:scale-105 duration-300 transform'
                                  >
                                    <h1 className="font-normal text-black">
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
                  className={`common-hover text-[#29679e]:hover ${selectedMenu === "Home" ? "selected-manu" : ""
                    }`}
                  onClick={() => setSelectedMenu("Home")}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className={`common-hover ${selectedMenu === "Products" ? "selected-manu" : ""
                    }`}
                  onClick={() => setSelectedMenu("Products")}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className={`common-hover ${selectedMenu === "Blogs" ? "selected-manu" : ""
                    }`}
                  onClick={() => setSelectedMenu("Blogs")}
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className={`common-hover ${selectedMenu === "Hot Deals" ? "selected-manu" : ""
                    }`}
                  onClick={() => setSelectedMenu("Hot Deals")}
                >
                  Hot Deals
                </Link>
              </li>
            </ul>
          </div>

          <div style={{ display: "flex", gap: '0.8rem' }} className='flex gap-4 justify-center items-center'>
            <div className='cursor-pointer hidden md:block '
              onClick={() => handelSearchBarToggle()}
            >
              <h1 className='border p-2 rounded-full bg-[#000]'>
              <AiOutlineSearch className='text-[#fff] text-[1.5rem]'/>
              </h1>
              <div>
                    {
                      searchBarToggle && (
                        <div  className="absolute right-0 w-full h-[4rem] bg-white px-5 py-3  rounded-lg shadow border mt-5">
                           <li className="flex items-center relative rounded-md w-full border-2 border-[#29679e]">
                                    <input type="text"
                                        placeholder={placeholderText}
                                        className='pl-2 w-full border-2 border-[#29679e] text-black py-2 px-8  rounded-md' />
                                    <div className="absolute right-0">
                                        <AiOutlineSearch className='text-black text-[1.6rem] mx-2' />
                                    </div>
                                </li>
                        </div>
                      )
                    }
              </div>      
            </div>

            <div className='cursor-pointer'
              onClick={() => handelProfileToggle()}

            >
              <h1 className='border p-2 rounded-full bg-[#000]'>
              <CiUser className='text-[1.5rem] text-[#fff] ' />
              </h1>
              <div>
                {
                  profileToggle && (
                    <div
                      className="absolute right-0 w-60 px-5 py-3 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-5"
                    >
                      <ul className="space-y-3 dark:text-white"
                        style={{ zIndex: 9000 }}
                      >
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
            <Link href="/cart" className="relative border p-2 rounded-full bg-[#000]">
              <BsCartPlus className='text-[1.5rem] text-[#fff]' />
            </Link>
            <div className="flex  gap-4 md:hidden">
              <button className='block md:hidden border p-2 rounded-full bg-[#000]' onClick={() => setOpen(!open)}>
                <AiOutlineMenu className='text-[1.5rem] text-[#fff]' />
              </button>
            </div>
          </div>

          {/* side bar for small device */}
          <div className={`${open ? 'left-0 ' : 'left-[-250%]'} duration-300 w-full overflow-hidden fixed bg-[#172733] h-screen top-0 p-4 text-white `}
            style={{ zIndex: 1000 }}
          >
            <button className='float-right' onClick={() => setOpen(!open)}>
              <AiOutlineClose className='text-5xl' />
            </button><br />
            <ul className="flex flex-col gap-6">
            <li className="flex items-center  bg-[white] p-1 rounded-md gap-2">
                <input type="text" className='w-full pl-2 text-black' placeholder='Search' />
                <AiOutlineSearch className='text-black' />
              </li>
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
                    className={`mega-menu border bg-white z-50 absolute w-[100%] left-0 right-0 top-[19%] rounded  transition-opacity opacity-100`}
                    data-aos="fade-up"
                    style={{
                      maxHeight: '80vh',
                      overflowY: 'auto',
                    }}
                  >
                    <ul>
                      <div className='flex flex-col px-4 gap-2 my-4 overflow-auto'>
                        {
                          categoryData && categoryData?.map((item, index) => {
                            return (
                              <div key={index} >
                                  <Link href={`/category/${item?.name}`}
                                    className='cursor-pointer hover:scale-105 duration-300 transform'
                                  >
                                    <h1 className="font-normal text-black">
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

            

            </ul>
          </div>
        </div>
      </nav >
    </header>
  );
};

export default MainNav;
