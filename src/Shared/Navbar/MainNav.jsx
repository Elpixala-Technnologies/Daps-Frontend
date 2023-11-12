import { MainLogo } from "@/src/Assets";
import { AuthContext } from "@/src/Context/UserContext";
import useAdmin from "@/src/Hooks/useAdmin";
import useCommonApiData from "@/src/Hooks/useCommonApiData";
import { AiTwotoneFire } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import img1 from "@/src/Assets/brands/2874749.webp";
import img2 from "@/src/Assets/brands/download.jpg";
import img3 from "@/src/Assets/brands/download.jpg";
import img4 from "@/src/Assets/brands/free-hyundai-3215422-2673840.webp";
import img5 from "@/src/Assets/brands/free-mahindra-3441189-2874294.webp";
import img6 from "@/src/Assets/brands/j.jpeg";
import img7 from "@/src/Assets/brands/Kia-logo.png";
import img8 from "@/src/Assets/brands/Nissan_logo.png";
import img9 from "@/src/Assets/brands/png-transparent-logo-ford-logo-car-car-standard-pattern-flag-cars.png";
import img10 from "@/src/Assets/brands/pngimg.com - car_logo_PNG1643 (1).png";
import img11 from "@/src/Assets/brands/pngimg.com - jeep_PNG95.png";
import img12 from "@/src/Assets/brands/sdownload.jpeg";
import { useContext, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS CSS
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import {
  FaChevronDown,
  FaChevronUp,
  FaMicrosoft,
  FaPowerOff,
  FaUserAlt,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiUser } from "react-icons/ci";
import { BsCartPlus } from "react-icons/bs";
import useProducts from "@/src/Hooks/useProducts";

const MainNav = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { handleLogout } = useCommonApiData();
  const userEmail = user?.email;
  const [isAdmin] = useAdmin();
  const { categoryMainData} = useProducts();
  const [profileToggle, setProfileToggle] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");

  const [placeholderText, setPlaceholderText] = useState(""); // Initialize empty placeholder text

  const [searchBarToggle, setSearchBarToggle] = useState(false); // Initialize the search bar state to false

  // Text to display in the placeholder
  const searchText = "Search for products, shops...";

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
    carsmanu: false
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
  };

  const carsInfo = [
    {
      id: 1,
      name: "Maruti",
      image: img1,
    },
    {
      id: 2,
      name: "Honda",
      image: img2,
    },
    {
      id: 3,
      name: "Hyundai",
      image: img3,
    },
    {
      id: 4,
      name: "Tata",
      image: img4,
    },
    {
      id: 5,
      name: "Kia",
      image: img5,
    },
    {
      id: 6,
      name: "Volkswagen",
      image: img6,
    },
    {
      id: 7,
      name: "Mahindra",
      image: img7,
    },
    {
      id: 8,
      name: "Toyota",
      image: img8,
    },
    {
      id: 9,
      name: "Jeep",
      image: img9,
    },
    {
      id: 10,
      name: "Renault",
      image: img10,
    },
    {
      id: 11,
      name: "Ford",
      image: img11,
    },
    {
      id: 12,
      name: "Chevrolet",
      image: img12,
    },
  ];

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


  // acordion
    const [aOn, setAON] = useState(false);
    const [aOn2, setAON2] = useState(false);

  return (
    <div>
   {/* <div className="bg-[blue-100] text-black h-[50px] text-center flex items-center">
      <span className="flex  md:w-[550px]  m-auto text-center w-[300px] md:text-[16px] text-[10px]"> <AiTwotoneFire/> Catch the killer deals on best daps shop and earn 5% daps rewards.</span>
    </div>     */}
      <header
      className={`${isSticky ? ' bg-[white] fixed top-0' : 'md:bg-[white] bg-[transparent]'} fixed w-full shadow z-50 mx-auto`}
      style={{
        zIndex: "9999",
      }}
    >
      <nav className="py-4 flex items-center text-black container relative  md:px-4 px-2">
        <div className="flex items-center mx-2 justify-between w-full md:mx-auto h-10">
         <div className="flex  md:gap-4 gap-2 md:hidden">
              <button
                className={`${isSticky ? 'text-black' : 'text-white'} block md:hidden p-2 `}
                onClick={() => setOpen(!open)}
              >
                <AiOutlineMenu className="text-[1.5rem] " />
              </button>
            </div>
          <div>
            <Link className="text-xl font-bold text-black" href="/">
              <Image   
                src={MainLogo}
                alt="logo"
                width={130}
                height={80}
                className="cursor-pointer hover:scale-105 duration-300 transform"
              />
            </Link>
          </div>
          <div className="manu-items md:flex md:py-10 gap-4 justify-center items-center hidden ">
            <ul className={`${isSticky ? 'bg-white text-black' : 'bg-transparent text-black'} flex gap-8 justify-center items-center border px-8 py-2 rounded-full`}>
              <li>
                <div onClick={() => toggleMegaMenu("carsmanu")} className="">
                  <button className="relative cursor-pointer flex gap-2 text-[1.1rem] items-center  upercase">
                    Shop By Cars{" "}
                    <FaAngleDown className="text-[1.2rem] text-[#18568C] " />
                  </button>
                  {megaMenuVisible?.carsmanu && (
                    <div
                      className={`${isSticky ? 'text-black bg-[white]' : 'text-black bg-[lightgray]'} container mx-auto mega-menu border z-50 absolute top-[100%]  left-[0%] rounded py-2 px-2 transition-opacity opacity-100`}
                       data-aos="fade-up"
                    >
                      <ul>
                        <div className="grid grid-cols-6 text-left mx-20  py-4 px-4  gap-5">
                          {carsInfo?.map((itm) => (
                            <Link href={`/category/3`}>
                              {" "}
                              <div className="flex relative items-center justify-center gap-2 flex-col">
                                <Image
                                  src={itm?.image}
                                  alt="logo"
                                  width={50}
                                  height={40}
                                  className="cursor-pointer relative z-[1] hover:scale-105 duration-300 transform"
                                />
                                <div className="bg-gray-200  w-[40px] h-[40px] rounded rotate-[60deg] absolute top-[-40px] left-0 right-0 bottom-0 m-auto">.</div>
                                <h1 className="">{itm?.name}</h1>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </ul>
                    </div>
                  )}
                </div>
              </li>
              <li>
                <div onClick={() => toggleMegaMenu("categorys")} className="">
                  <button className="relative cursor-pointer flex gap-2 text-[1.1rem] items-center  upercase">
                    Shop By Category{" "}
                    <FaAngleDown className="text-[1.2rem] text-[#18568C] " />
                  </button>
                  {megaMenuVisible?.categorys && (
                    <div
                      className={`${isSticky ? 'text-black bg-[white]' : 'text-black bg-[lightgray]'} container mx-auto mega-menu border z-50 absolute top-[100%]  left-[0%] rounded py-2 px-2 transition-opacity opacity-100`}
                       data-aos="fade-up"
                    >
                      <ul>
                        <div className="grid grid-cols-6 text-left mx-20  py-4 px-4  gap-5">
                          {categoryMainData?.map((itm) => (
                            <Link href={`/category/3`}>
                              {" "}
                              <div className="flex relative items-center justify-center gap-2 flex-col">
                                <Image
                                  src={itm?.icons}
                                  alt="logo"
                                  width={50}
                                  height={40}
                                  className="cursor-pointer relative z-[1] hover:scale-105 duration-300 transform"
                                />
                                <div className="bg-gray-200  w-[40px] h-[40px] rounded rotate-[60deg] absolute top-[-40px] left-0 right-0 bottom-0 m-auto">.</div>
                                <h1 className="">{itm?.name}</h1>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </ul>
                    </div>
                  )}
                </div>
              </li>

              <li>
                <Link
                  href="/products"
                  className={`common-hover ${
                    selectedMenu === "Products" ? "selected-manu" : ""
                  }`}
                  onClick={() => setSelectedMenu("Products")}
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  className={`common-hover ${
                    selectedMenu === "Hot Deals" ? "selected-manu" : ""
                  }`}
                  onClick={() => setSelectedMenu("Hot Deals")}
                >
                  Hot Deals
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className={`common-hover ${
                    selectedMenu === "Blogs" ? "selected-manu" : ""
                  }`}
                  onClick={() => setSelectedMenu("Blogs")}
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          <div
            style={{ display: "flex", gap: "0.8rem" }}
            className="flex gap-4 justify-center items-center"
          >
            <div
              className="cursor-pointer hidden md:block "
              onClick={() => handelSearchBarToggle()}
            >
              <h1 className="border p-2 rounded-full bg-[#000]">
                <AiOutlineSearch className="text-[#fff] text-[1.5rem]" />
              </h1>
              <div>
                {searchBarToggle && (
                  <div className="absolute right-0 w-full h-[4rem] bg-white px-5 py-3  rounded-lg shadow border mt-5">
                    <li className="flex items-center relative rounded-md w-full border-2 border-[#29679e]">
                      <input
                        type="text"
                        placeholder={placeholderText}
                        className="pl-2 w-full border-2 border-[#29679e] text-black py-2 px-8  rounded-md"
                      />
                      <div className="absolute right-0">
                        <AiOutlineSearch className="text-black text-[1.6rem] mx-2" />
                      </div>
                    </li>
                  </div>
                )}
              </div>
            </div>

            <div
              className="cursor-pointer"
              onClick={() => handelProfileToggle()}
            >
              <h1 className="border p-2 rounded-full bg-[#000]">
                <CiUser className="text-[1.5rem] text-[#fff] " />
              </h1>
              <div>
                {profileToggle && (
                  <div className="absolute right-0 w-60 px-5 py-3 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-5">
                    <ul
                      className="space-y-3 dark:text-white"
                      style={{ zIndex: 9000 }}
                    >
                      {!userEmail ? (
                        <>
                          <Link
                            href="/auth/login"
                            className="flex items-center  gap-2 border-common-btn common-hover"
                          >
                            <FaUserAlt /> SignIn
                          </Link>
                        </>
                      ) : (
                        <div className="flex flex-col gap-2">
                          {isAdmin && (
                            <Link
                              href="/dashboard"
                              className="flex items-center  gap-2 border-common-btn common-hover"
                            >
                              <FaMicrosoft /> Dashboard
                            </Link>
                          )}
                          {userEmail && !isAdmin && (
                            <Link
                              href="/userdashboard"
                              className="flex items-center  gap-2 border-common-btn common-hover"
                            >
                              <FaUserAlt /> Profile
                            </Link>
                          )}
                          <button
                            className="flex items-center gap-2 my-2 border-common-btn common-hover"
                            onClick={() => handleLogout()}
                          >
                            <FaPowerOff /> Logout
                          </button>
                        </div>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <Link
              href="/cart"
              className="relative border p-2 rounded-full bg-[#000]"
            >
              <BsCartPlus className="text-[1.5rem] text-[#fff]" />
            </Link>
            
          </div>

          {/* side bar for small device */}
          <div
            className={`${
              open ? "left-0 " : "left-[-250%]"
            } duration-300 w-full overflow-hidden fixed bg-[#172733] h-screen top-0 p-4 text-white `}
            style={{ zIndex: 1000 }}
          >
            <button className="float-right" onClick={() => setOpen(!open)}>
              <AiOutlineClose className="text-4xl px-2" />
            </button>
            
              <div className="flex items-center  bg-[white] p-1 rounded-md gap-2">
                <input
                  type="text"
                  className="w-full pl-2 text-black"
                  placeholder="Search"
                />
                <AiOutlineSearch className="text-black" />
              </div>
            <ul className="flex flex-col gap-6 mt-6">
               <li onClick={()=> {
              setAON(!aOn)
              setAON2(false)

            }} className="common-hover">
                <div className="w-full flex justify-between items-center"><Link href="/">Categorys</Link> <span className="text-xl">{aOn ? <>-</> : <>+</>}</span> </div>
                <div className={`${aOn ? 'h-[300px] p-4 overflow-y-scroll mt-3' : 'h-[0px] '} rounded-lg bg-[#243c72]  duration-300 overflow-hidden`}>
                     {
                          categoryMainData && categoryMainData?.map((item, index) => {
                            return (
                              <div onClick={() => setOpen(!open)} key={index} >
                                <Link href={`/category/${item?.name}`}
                                  className='cursor-pointer hover:scale-105  duration-300 transform'
                                >
                                  <h1 className="font-normal pb-4 text-white">
                                    {item?.name}
                                  </h1>
                                </Link>
                              </div>
                            )
                          })
                        }
                </div>
              </li>
           
            <li onClick={()=> {
              setAON(false)
              setAON2(!aOn2)
            }} className="common-hover">
                <div className="w-full flex justify-between items-center"><Link href="/">Shop By Car</Link> <span className="text-xl">{aOn ? <>-</> : <>+</>}</span> </div>
                <div className={`${aOn2 ? 'h-[400px] p-4 overflow-y-scroll mt-3' : 'h-[0px] '} rounded-lg bg-[#243c72]   duration-300 overflow-hidden`}>
                    <div className="grid grid-cols-3 gap-3">
                       {
                          carsInfo?.map((item, index) => {
                            return (
                              <div key={index} >
                                <Link href={`/category/${item?.name}`}
                                  className='cursor-pointer hover:scale-105 flex justify-center flex-col gap-2 duration-300 transform'
                                >
                                  <Image src={item?.image} width={90} height={90} alt="" />
                                  <h1 className="font-normal text-center pb-4 text-white">
                                    {item?.name}
                                  </h1>
                                </Link>
                              </div>
                            )
                          })
                        }
                    </div>
                </div>
              </li>
                   
               <li onClick={() => setOpen(!open)} className="common-hover">
                <Link href="/">Home</Link>
              </li>
              <li onClick={() => setOpen(!open)} className="common-hover">
                <Link href="/products">Products</Link>
              </li>
              <li onClick={() => setOpen(!open)} className="common-hover">
                <Link href="/blogs">Blogs</Link>
              </li>
             
             
            </ul>
          </div>
        </div>
      </nav>
    </header>
    </div>
  );
};

export default MainNav;
