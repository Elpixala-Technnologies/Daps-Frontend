import { MainLogo } from "@/src/Assets";
import { AuthContext } from "@/src/Context/UserContext";
import useAdmin from "@/src/Hooks/useAdmin";
import useCommonApiData from "@/src/Hooks/useCommonApiData";
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
  FaFontAwesome,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiUser } from "react-icons/ci";
import { BsCartPlus } from "react-icons/bs";
import useProducts from "@/src/Hooks/useProducts";
import Autocomplete from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";

const MainNav = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { handleLogout } = useCommonApiData();
  const userEmail = user?.email;
  const [isAdmin] = useAdmin();
  const { categoryMainData } = useProducts();
  const [profileToggle, setProfileToggle] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const { productData } = useProducts();
  const [searchPlaceholderText, setSearchPlaceholderText] = useState("Search");
  const [placeholderText, setPlaceholderText] = useState(""); // Initialize empty placeholder text

  const [searchBarToggle, setSearchBarToggle] = useState(false);

  const product = productData?.map((item) => ({
    label: item?.productName,
    id: item?._id,
    image: item?.images[0],
  }));

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
    // Function to generate random placeholder text
    const generatePlaceholder = () => {
      const texts = [
        "Search Maruti Accessories",
        "Search Hyundai Accessories",
        "Search Tata Accessories",
        "Search Kia Accessories",
        "Search Mahindra Accessories",
      ];
      const randomIndex = Math.floor(Math.random() * texts.length);
      return texts[randomIndex];
    };

    // Update placeholder text periodically
    const interval = setInterval(() => {
      const newText = generatePlaceholder();
      setSearchPlaceholderText(newText);
    }, 5000); // Change the interval duration as needed

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in milliseconds)
      once: true, // Whether animation should only happen once
    });
  }, []);

  const [megaMenuVisible, setMegaMenuVisible] = useState({
    categorys: false,
    carsmanu: false,
  });

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
      name: "Suzuki",
      image: "https://res.cloudinary.com/dapscar/image/upload/v1703685297/Shop%20By%20Cars%20%28%20ICONS%20%29/Suzuki_mouki1.png",
    },
    {
      id: 2,
      name: "Honda",
      image: "https://res.cloudinary.com/dapscar/image/upload/v1703685297/Shop%20By%20Cars%20%28%20ICONS%20%29/Honda_eca6hg.png",
    },
    {
      id: 3,
      name: "Hyundai",
      image: "https://res.cloudinary.com/dapscar/image/upload/v1703685296/Shop%20By%20Cars%20%28%20ICONS%20%29/Hundai_w30egv.png",
    },
    {
      id: 4,
      name: "Tata",
      image: "https://res.cloudinary.com/dapscar/image/upload/v1703685297/Shop%20By%20Cars%20%28%20ICONS%20%29/Tata_wfntvi.png",
    },
    {
      id: 5,
      name: "Kia",
      image: "https://res.cloudinary.com/dapscar/image/upload/v1703685299/Shop%20By%20Cars%20%28%20ICONS%20%29/Kia_fki2ce.png",
    },
    {
      id: 6,
      name: "Volkswagen",
      image: "https://res.cloudinary.com/dapscar/image/upload/v1703685305/Shop%20By%20Cars%20%28%20ICONS%20%29/Volkswagen_rbs6li.png",
    },
    {
      id: 7,
      name: "Mahindra",
      image: "https://res.cloudinary.com/dapscar/image/upload/v1703685300/Shop%20By%20Cars%20%28%20ICONS%20%29/Mahindra_dcy4mn.png",
    },
    {
      id: 8,
      name: "Toyota",
      image: "https://res.cloudinary.com/dapscar/image/upload/v1703685302/Shop%20By%20Cars%20%28%20ICONS%20%29/Toyota_bmqqzb.png",
    },
    {
      id: 9,
      name: "Jeep",
      image: "https://res.cloudinary.com/dapscar/image/upload/v1703685303/Shop%20By%20Cars%20%28%20ICONS%20%29/Jeep_ef1vyn.png",
    },
    {
      id: 10,
      name: "Renault",
      image: "https://res.cloudinary.com/dapscar/image/upload/v1703685303/Shop%20By%20Cars%20%28%20ICONS%20%29/Renault_v5lf5q.png",
    },
    {
      id: 11,
      name: "Ford",
      image: "https://res.cloudinary.com/dapscar/image/upload/v1703685304/Shop%20By%20Cars%20%28%20ICONS%20%29/Ford_ytgyef.png",
    },
    {
      id: 12,
      name: "Chevrolet",
      image: "https://res.cloudinary.com/dapscar/image/upload/v1703685305/Shop%20By%20Cars%20%28%20ICONS%20%29/Chevrolet_x9shso.png",
    },
  ];
 

  const [isSticky, setSticky] = useState(false);

  // scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        // Adjust the offset value according to when you want the navbar to become sticky
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // acordion
  const [aOn, setAON] = useState(false);
  const [aOn2, setAON2] = useState(true);

  return (
    <div>
      <header
        className={`${isMobile
          ? "bg-[white] duration-200"
          : isSticky
            ? "md:bg-[white] bg-[white] duration-200 fixed top-0 shadow z-50 mx-auto"
            : "md:bg-[white] bg-[transparent] duration-200 relative"
          } w-full`}
        style={{
          zIndex: "999999",
        }}
      >
        <nav className="py-4 flex items-center text-black container relative  md:px-4 px-2">
          <div className="flex items-center mx-2 justify-between w-full md:mx-auto h-10">
            <div className="flex items-center gap-2">
              <div className="flex gap-2 mobile-menu">
                {/* <button
                  // className={`${
                  //   isSticky ? "text-black" : "text-black"
                  // } p-2 `}
                  onClick={() => setOpen(!open)}
                >
                  <AiOutlineMenu className="text-[1.5rem] " />
                </button> */}
                {isMobile ? (
                  <button onClick={() => setOpen(!open)}>
                    {open ? (
                      <AiOutlineClose className="text-[1.5rem]  " />
                    ) : (
                      <AiOutlineMenu className="text-[1.5rem]"/>
                    )}
                  </button>
                ) : (
                  <button>
                    <AiOutlineMenu className="text-[1.5rem]" />
                  </button>
                )}
              </div>
              <div>
                <Link className="text-xl font-bold text-black" href="/">
                  <Image
                    src={MainLogo}
                    alt="logo"
                    width={130}
                    height={80}
                    className="cursor-pointer md:w-[115px] w-[110px] d-none hover:scale-105 duration-300 transform"
                  />
                </Link>
              </div>
            </div>
            <div className="manu-items lg:flex md:py-10 gap-4 justify-center items-center hidden ">
              <ul
                className={`${isSticky ? "bg-white text-black" : "bg-transparent text-black"
                  } flex gap-8 justify-center items-center border px-8 py-2 rounded-full`}
              >
                <li>
                  <div onMouseEnter={() => toggleMegaMenu("carsmanu")}>
                    <div className="group/edit relative hover:overflow-visible  group-hover/item:visible">
                      <button className="relative  cursor-pointer flex gap-2 text-[1.1rem] items-center  upercase   hover:font-semibold  transition duration-300 ease-in-out">
                        Shop By Cars{" "}
                        <FaAngleDown className="text-[1.2rem] text-[#18568C] " />
                      </button>
                      <span class="group-hover/edit:border-red-500 h-0 absolute text-0 group-hover/edit:translate-x-1 pr-10 border-t-[2px] border-solid border-white transition-all duration-500 transform translate-x-full"></span>
                    </div>
                    {megaMenuVisible?.carsmanu && (
                      <div
                        className={`${isSticky
                          ? "text-black bg-[white]"
                          : "text-black bg-[white]"
                          } container mx-auto mega-menu border z-50 absolute top-[100%]  left-[0%] rounded py-2 px-2  opacity-100`}
                        onMouseLeave={() => toggleMegaMenu("carsmanu")}
                        onMouseEnter={() => toggleMegaMenu("carsmanu")}
                      >
                        <ul>
                          <div className="grid grid-cols-6 text-left mx-20  py-4 px-4 justify-center items-center gap-7">
                            {carsInfo?.map((itm) => (
                              <Link href={`/products`}>
                                {" "}
                                <div className="flex hover:opacity-[.67] relative items-center justify-center gap-2 flex-row">
                                  <Image
                                    src={itm?.image}
                                    alt="logo"
                                    width={50}
                                    height={40}
                                    className="cursor-pointer relative z-[1] hover:drop-shadow-2xl text-gray-800"
                                  />
                                  <h1>{itm?.name}</h1>
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
                  <div
                    onMouseEnter={() => toggleMegaMenu("categorys")}
                    className=""
                  >
                    <div className="group/edit relative hover:overflow-visible  group-hover/item:visible">
                      <button className="relative  cursor-pointer flex gap-2 text-[1.1rem] items-center  upercase   hover:font-semibold  transition duration-300 ease-in-out">
                        Shop By Category{" "}
                        <FaAngleDown className="text-[1.2rem] text-[#18568C] " />
                      </button>
                      <span class="group-hover/edit:border-red-500 h-0 absolute text-0 group-hover/edit:translate-x-0.5 pr-10 border-t-[2px] border-solid border-white transition-all duration-500 transform translate-x-full"></span>
                    </div>
                    {megaMenuVisible?.categorys && (
                      <div
                        className={`${isSticky
                          ? "text-black bg-[white]"
                          : "text-black bg-[white]"
                          } container mx-auto mega-menu border z-50 absolute top-[100%]  left-[0%] rounded py-2 px-2 transition-opacity opacity-100`}
                        onMouseLeave={() => toggleMegaMenu("categorys")}
                        onMouseEnter={() => toggleMegaMenu("categorys")}
                      >
                        <ul>
                          <div className="grid grid-cols-5 text-left mx-20  py-4 px-4 justify-items-start items-center gap-5">
                            {categoryMainData?.map((itm) => (
                              <Link
                                href={`/products?categoryName=${encodeURIComponent(
                                  itm?.name
                                )}`}
                              >
                                {" "}
                                <div className="flex  hover:opacity-[.67] relative items-center justify-center gap-2 flex-row">
                                  <Image
                                    src={itm?.icons}
                                    alt="logo"
                                    width={50}
                                    height={40}
                                    className="cursor-pointer relative  z-[1]"
                                  />
                                  {/* <div className="bg-gray-200  w-[40px] h-[40px] rounded rotate-[60deg] absolute top-[-40px] left-0 right-0 bottom-0 m-auto">.</div> */}
                                  <h1 className="text-slate-950 hover:text-slate-600">
                                    {itm?.name}
                                  </h1>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </ul>
                      </div>
                    )}
                  </div>
                </li>

                <li className="hover:font-semibold hover:underline">
                  <Link
                    href="/products"
                    className={`common-hover ${selectedMenu === "Products" ? "selected-manu" : ""
                      }`}
                    onClick={() => setSelectedMenu("Products")}
                  >
                    Products
                  </Link>
                </li>

                <li className="hover:font-semibold hover:underline">
                  <Link
                    href="/products"
                    className={`common-hover ${selectedMenu === "Hot Deals" ? "selected-manu" : ""
                      }`}
                    onClick={() => setSelectedMenu("Hot Deals")}
                  >
                    Hot Deals
                  </Link>
                </li>
                <li className="hover:font-semibold hover:underline">
                  <Link
                    href="/blogs"
                    className={`common-hover ${selectedMenu === "Blogs" ? "selected-manu" : ""
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
                className="cursor-pointer hidden lg:block "
              // onClick={() => handelSearchBarToggle()}
              >
                <div>
                  <div className="relative">
                    <Autocomplete
                      placeholder={searchPlaceholderText}
                      options={product || []}
                      id="searchBar"
                      style={{
                        width: "340px"
                      }}
                      getOptionLabel={(option) => option?.label}
                      renderOption={(props, option) => {
                        return (
                          <Link href={`/products/${option?.id}`}>
                            <AutocompleteOption>
                              <ListItemContent>
                                <div className="flex gap-2 mt-3 items-center">
                                  <img
                                    src={option?.image}
                                    alt={option?.label}
                                    className="w-[2rem] h-[2rem]"
                                  />
                                  <h1 className="text-[12px]">
                                    {option?.label}
                                  </h1>
                                </div>
                              </ListItemContent>
                            </AutocompleteOption>
                          </Link>
                        );
                      }}
                    />
                  </div>
                </div>
              </div>

              <div
                className="cursor-pointer"
                onClick={() => handelProfileToggle()}
              >
                <h1 className="p-2 rounded-full ">
                  <CiUser className="text-[1.5rem] text-[#332828] " />
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
              <Link href="/cart" className="relative  p-2 rounded-full">
                <BsCartPlus className="text-[1.5rem] text-[#484343]" />
              </Link>
            </div>
            {/* side bar for small device */}
            <div
              className={`${open ? "left-0 " : "left-[-250%]"
                } duration-300 w-full overflow-hidden fixed bg-[#172733] h-screen top-0 p-4 text-white mobile-menu`}
              style={{ zIndex: 1000 }}
            >
              <div className="flex justify-end">
                <button onClick={() => setOpen(false)}>
                  <AiOutlineClose className="text-[1.5rem]" />
                </button>
              </div>
              <ul className="flex flex-col gap-6 mt-10">
                <li
                  onClick={() => {
                    setAON(!aOn);
                    setAON2(false);
                  }}
                  className="common-hover"
                >
                  <div className="w-full flex  justify-between items-center">
                    <Link href="/">Category</Link>{" "}
                    <span className="text-xl mr-4">
                      {aOn ? <>-</> : <>+</>}
                    </span>{" "}
                  </div>
                  <div
                    className={`${aOn ? "h-[300px] p-4 overflow-y-scroll mt-3" : "h-[0px] "
                      } rounded-lg bg-[#243c72]  duration-300 overflow-hidden`}
                  >
                    {categoryMainData &&
                      categoryMainData?.map((item, index) => {
                        return (
                          <div onClick={() => setOpen(!open)} key={index}>
                            <Link
                              href={`/products?categoryName=${encodeURIComponent(
                                item?.name
                              )}`}
                              className="cursor-pointer hover:scale-105  duration-300 transform"
                            >
                              <h1 className="font-normal pb-4 text-white">
                                {item?.name}
                              </h1>
                            </Link>
                          </div>
                        );
                      })}
                  </div>
                </li>

                <li
                  onClick={() => {
                    setAON(false);
                    setAON2(!aOn2);
                  }}
                  className="common-hover"
                >
                  <div className="w-full flex justify-between items-center">
                    <Link href="/">Shop By Car</Link>{" "}
                    <span className="text-xl mr-4">
                      {aOn ? <>-</> : <>+</>}
                    </span>{" "}
                  </div>
                  <div
                    className={`${aOn2 ? "h-[400px] p-4 overflow-y-scroll mt-3" : "h-[0px] "
                      } rounded-lg bg-[#243c72]   duration-300 overflow-hidden`}
                  >
                    <div className="grid grid-cols-3 gap-3">
                      {carsInfo?.map((item, index) => {
                        return (
                          <div key={index}>
                            <Link
                              href={`/products`}
                              className="cursor-pointer  hover:scale-105 flex justify-center flex-col gap-2 duration-300 transform"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <Image
                                className="w-[70px] h-[70px] m-auto"
                                src={item?.image}
                                width={90}
                                height={90}
                                alt=""
                              />
                              <h1 className="font-normal text-center pb-4 text-white">
                                {item?.name}
                              </h1>
                            </Link>
                          </div>
                        );
                      })}
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
