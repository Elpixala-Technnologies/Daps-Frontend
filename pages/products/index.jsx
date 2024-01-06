import React, { Fragment, useState, useEffect, useMemo } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { AiOutlineSearch } from "react-icons/ai";
import useProducts from "@/src/Hooks/useProducts";
import Link from "next/link";
import RootLayout from "@/src/Layouts/RootLayout";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { BsCartCheck } from "react-icons/bs";
import Image from "next/image";
import { HomeSliderTwo } from "@/src/Assets";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { FaCartPlus, FaStar } from "react-icons/fa";
import { useRouter } from "next/router";

const sortOptions = [
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const getPaddingStyle = (level) => {
  return { paddingLeft: `${level * 20}px` };
};

const ProductPage = () => {
  const { productData, productLoaded, categoryData } = useProducts();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState(new Set());
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 10000]);
  const [selectedSortOption, setSelectedSortOption] =
    useState("Price: Low to High");
  const [searchInput, setSearchInput] = useState("");

  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [itemCount, setItemCount] = useState(12); // Initial number of items to display

  const loadMoreItems = () => {
    setItemCount(prevItemCount => prevItemCount + 12); // Load 12 more items on each request
  };
  // const [page, setPage] = useState(1);
  // const itemsPerPage = 12;

  const router = useRouter();

  function valuetext(value) {
    return `${value} Rs.`;
  }
  // Logic to prepare nested category options
  const prepareCategoryOptions = (categories, parentName = null, level = 0) => {
    return categories
      .filter((category) => category.parent === parentName)
      .flatMap((category) => [
        { value: category.name, label: category.name, level },
        ...prepareCategoryOptions(categories, category.name, level + 1),
      ]);
  };

  const categoryOptions = categoryData
    ? prepareCategoryOptions(categoryData)
    : [];

  const handleToggleFilter = (filter) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }

  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prevSelected => {
      if (prevSelected.includes(category)) {
        // If already selected, remove it
        return prevSelected.filter(c => c !== category);
      } else {
        // If not selected, add it
        return [...prevSelected, category];
      }
    });
  };


  useEffect(() => {
    const categoryName = router.query.categoryName;
    if (categoryName) {
      const selectedCat = Array.isArray(categoryName) ? categoryName : [categoryName];
      setSelectedCategories(selectedCat);
    }
  }, [router.query.categoryName]);

  const handlePriceChange = (event, newValue) => {
    setSelectedPriceRange(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes(new Set());
    setSelectedPriceRange([0, 10000]);
    setSearchInput("");
    setActiveFilter(null);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = productData || [];

    console.log('Initial product count:', result.length);

    // Apply search filter
    if (searchInput) {
      result = result.filter(product =>
        product?.productName?.toLowerCase().includes(searchInput.toLowerCase())
      );
      console.log('After search filter:', result.length);
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(product =>
        product?.productCategory?.some(category => selectedCategories.includes(category))
      );
      console.log('After category filter:', result.length);
    }



    // Apply price range filter
    const calculateDiscountPrice = product => {
      return product.price - (product.price * product.discount) / 100;
    };

    if (selectedPriceRange[0] > 0 || selectedPriceRange[1] < 10000) { // Assuming 10000 is your max price
      const calculateDiscountPrice = product => {
        return product.price - (product.price * product.discount) / 100;
      };
  
      result = result.filter(product => {
        const discountPrice = calculateDiscountPrice(product);
        return discountPrice >= selectedPriceRange[0] && discountPrice <= selectedPriceRange[1];
      });
    }

    // Apply sorting
    if (selectedSortOption === "Price: Low to High") {
      result.sort((a, b) => calculateDiscountPrice(a) - calculateDiscountPrice(b));
    } else if (selectedSortOption === "Price: High to Low") {
      result.sort((a, b) => calculateDiscountPrice(b) - calculateDiscountPrice(a));
    }

    console.log('Final product count:', result.length);

    return result;
  }, [
    productData, searchInput, selectedCategories, selectedSizes, selectedPriceRange, selectedSortOption
  ]);


  useEffect(() => {
    // Adjust this logic according to how you fetch your products
    const newProducts = filteredAndSortedProducts?.slice(0, itemCount);
    setDisplayedProducts(newProducts);
  }, [itemCount, filteredAndSortedProducts]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      loadMoreItems(); // Load more items when scrolled to bottom
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    return () => {
      // Clean up the event listener
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  console.log(displayedProducts, "displayedProducts0000000")

  console.log(filteredAndSortedProducts, productData, "productData]]]]")

  return (
    <RootLayout>
      <div className="mt-[3.6rem] md:mt-[4.5rem]">
        <Image
          src={
            "https://res.cloudinary.com/dapscar/image/upload/q_auto:low,w_1000/v1703235519/Daps/Slider/qhy8khvkjdivp6o0ozpo.png.png"
          }
          alt="Product"
          width={250}
          height={200}
          className="w-full h-full object-container  "
        />
      </div>
      <div className="md:container bg-[#fff]">
        {/* Mobile filter dialog */}
        <Transition.Root
          show={mobileFiltersOpen}
          as={Fragment}
          style={{ zIndex: 999999 }}
        >
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div
              className="fixed inset-0 z-80  flex"
              style={{ zIndex: 999999 }}
            >
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <div className="mt-4 border-t border-gray-200">
                    <Disclosure
                      as="div"
                      className="border-b border-gray-200 py-2 px-4"
                    >
                      {({ open }) => (
                        <>
                          <div className="border-b border-gray-200 py-6">
                            <button
                              onClick={() => handleToggleFilter("category")}
                              className="font-semibold w-full flex gap-4 justify-between items-center"
                            >
                              Category
                              {activeFilter === "category" ? (
                                <MdExpandLess className="text-2xl" />
                              ) : (
                                <MdExpandMore className="text-2xl" />
                              )}
                            </button>

                            {activeFilter === "category" && (
                              <div className="space-y-4">
                                {categoryData && categoryData.length > 0 ? (
                                  categoryData.map((category) => (
                                    <li
                                      key={category._id}
                                      className={`cursor-pointer mt-2`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(
                                          category?.name
                                        )}
                                        onChange={() =>
                                          handleCategoryChange(category.name)
                                        }
                                        className="mr-2"
                                      />
                                      {category.name}
                                    </li>
                                  ))
                                ) : (
                                  <div>Loading categories...</div>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="border-b border-gray-200 py-6">
                            <button
                              onClick={() => handleToggleFilter("price")}
                              className=" font-semibold w-full flex gap-4 justify-between items-center"
                            >
                              Price
                              {activeFilter === "price" ? (
                                <MdExpandLess className="text-2xl" />
                              ) : (
                                <MdExpandMore className="text-2xl" />
                              )}
                            </button>
                            {activeFilter === "price" && (
                              <div className="space-y-4">
                                <Box sx={{ width: 250 }}>
                                  <Slider
                                    getAriaLabel={() => "Price"}
                                    value={selectedPriceRange}
                                    onChange={handlePriceChange}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={valuetext}
                                    min={0}
                                    max={3000}
                                  />
                                </Box>
                                <div className="flex justify-between items-center gap-2">
                                  <div className="border p-2">{`Rs. ${selectedPriceRange[0]}`}</div>
                                  <div className="border p-2">{`Rs. ${selectedPriceRange[1]}`}</div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className=" border-gray-200 py-6">
                            <button
                              className=" font-semibold w-full flex gap-4 border p-2 rounded justify-between items-center"
                              onClick={() => resetFilters()}
                            >
                              Reset Filters
                            </button>
                          </div>
                        </>
                      )}
                    </Disclosure>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto  px-4  lg:px-8">
          <div className="flex items-baseline justify-between  border-gray-200 pb-6 pt-10">
            <h1 className="md:text-4xl font-bold tracking-tight text-gray-900">
              All Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative  text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort{" "}
                    {selectedSortOption === "Price: Low to High"
                      ? "Low to High"
                      : "High to Low"}
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 ">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <div
                              // href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                              onClick={() => setSelectedSortOption(option.name)}
                            >
                              {option.name}
                            </div>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-10">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="flex gap-10  justify-center md:flex-row flex-col">
              <div className="hidden lg:block w-[14rem]">
                <div className="border-b border-gray-200 py-6">
                  <button
                    onClick={() => handleToggleFilter("category")}
                    className=" font-semibold w-full flex gap-4 justify-between items-center"
                  >
                    Category
                    {activeFilter === "category" ? (
                      <MdExpandLess className="text-2xl" />
                    ) : (
                      <MdExpandMore className="text-2xl" />
                    )}
                  </button>

                  {activeFilter === "category" && (
                    <div className="space-y-4">
                      {categoryOptions?.map((option) => (
                        <li
                          key={option.value}
                          className={`cursor-pointer mt-2 ${selectedCategories.includes(option.value) ? "text-[#18568C]" : ""}`}
                          style={{ paddingLeft: `${option.level * 20}px` }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(option.value)}
                            onChange={() => handleCategoryChange(option.value)}
                            className="mr-2"
                          />
                          {option.label}
                        </li>
                      ))}
                    </div>
                  )}

                </div>

                <div className="border-b border-gray-200 py-6">
                  <button
                    onClick={() => handleToggleFilter("price")}
                    className=" font-semibold w-full flex gap-4 justify-between items-center"
                  >
                    Price
                    {activeFilter === "price" ? (
                      <MdExpandLess className="text-2xl" />
                    ) : (
                      <MdExpandMore className="text-2xl" />
                    )}
                  </button>

                  {activeFilter === "price" && (
                    <>
                      <div className="space-y-4">
                        <Box sx={{ width: 200 }}>
                          <Slider
                            getAriaLabel={() => "Price"}
                            value={selectedPriceRange}
                            onChange={handlePriceChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            min={0}
                            max={10000}
                          />
                        </Box>
                        <div className="flex justify-between items-center gap-2">
                          <div className="border p-2">{`Rs. ${selectedPriceRange[0]}`}</div>
                          <div className="border p-2">{`Rs. ${selectedPriceRange[1]}`}</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="border-b border-gray-200 py-6">
                  <button
                    className=" font-semibold w-full flex gap-4 border p-2 rounded justify-between items-center bg-black text-white text-center"
                    onClick={() => resetFilters()}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>

              {/* Product grid */}
              <div className="lg:col-span-3 w-full">
                <li className="flex items-center my-4 rounded-xl border border-[#999] relative  gap-2 w-full">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={handleSearchChange}
                    className="w-full px-6 p-2 no-outline focus:outline-none rounded-xl text-black border border-[#999]"
                    placeholder="Search ..."
                  />
                  <AiOutlineSearch className="text-black text-[1.5rem] mx-6" />
                </li>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  <div className="lg:col-span-4">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                      {displayedProducts &&
                        displayedProducts?.map((product) => {
                          return (
                            <div className="border rounded-[0.6rem] relative">
                              <div>
                                <Link href={`/products/${product?._id}`}>
                                  <div className="productImage">
                                    <div className="h-menu border rounded-t-[0.6rem] overflow-hidden relative">
                                      <img
                                        src={product?.images[0]}
                                        alt="First Image"
                                        className="h-full w-full object-cover duration-200"
                                      />
                                      <img
                                        src={product?.images[1]}
                                        alt="Second Image"
                                        className="hover-img absolute top-0 left-0 w-full h-full object-cover duration-300"
                                      />
                                    </div>
                                  </div>
                                </Link>
                              </div>
                              <div className="px-4 py-1 bg-[#000] rounded-r absolute top-4 text-[#fff] text-[0.6rem] font-semibold">
                                🎉 New Launch
                              </div>

                              <div className="rounded-b-[0.6rem] bg-[#fafafa] p-4 relative">
                                <div className="px-6 py-1 bg-[#fcc50b] w-[70%] rounded-md  absolute top-[-1rem] text-center left-[14%] font-semibold text-white text-[14px]">
                                  DAPS
                                </div>
                                <div className="my-1 text-left ">
                                  <Link
                                    href={`/products/${product?._id}`}
                                    className="font-semibold text-[14px]"
                                  >
                                    {product?.productName.slice(0, 30)}
                                  </Link>
                                  <div className="flex items-center justify-between ">
                                    <div className="flex gap-2">
                                      <h1 className="font-bold text-slate-900">
                                        {product?.discount
                                          ? `₹ ${Math.floor(
                                            product?.price -
                                            (product?.price *
                                              product?.discount) /
                                            100
                                          )}`
                                          : `₹ ${Math.floor(product?.price)}`}
                                      </h1>
                                      <span className="text-sm font-semibold text-gray-400 line-through mt-1">
                                        ₹ {Math.floor(product?.price)}
                                      </span>
                                      <span className="text-green-500 font-bold text-[13px] mt-1">
                                        {Math.floor(product?.discount)} % off
                                      </span>
                                    </div>
                                    <div className="absolute right-2">
                                      <div className="flex flex-col  gap-3 justify-end">
                                        <Link
                                          href={`/products/${product?._id}`}
                                          className="border px-4 text-[12px] font-semibold rounded-lg py-2 bg-black text-white flex items-center gap-2"
                                        >
                                          Add To Cart
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-2 text-[14px]">
                                      <FaStar className="text-orange-500" />
                                      Be first to review
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </section>
        </main>
      </div>
    </RootLayout>
  );
};

export default ProductPage;
