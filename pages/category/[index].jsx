import { OfferBannerFour } from '@/src/Assets';
import useProducts from '@/src/Hooks/useProducts';
import RootLayout from '@/src/Layouts/RootLayout';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaCartPlus } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const category_product = () => {
    const { productData } = useProducts()
    const router = useRouter();
    const categoryName = router?.query?.index;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryName]);

    // const filterProductData = productData?.filter((data) => {
    //     return data?.categories === categoryName || data?.mainCategories === categoryName;
    // });

    const filterProductData = productData?.filter((data) => {
        // Check if either 'mainCategories' or 'categories' includes the 'categoryName'
        return (
            data.mainCategories === categoryName ||
            (data.categories && data.categories.includes(categoryName))
        );
    })

    const filterTrandingProductData = productData?.filter((data) => {
        return data?.status === "Tranding";
    });


    const [page, setPage] = useState(1);
    const productsPerPage = 6; // Number of products per page

    // Calculate total pages
    const totalPages = Math.ceil(filterTrandingProductData?.length / productsPerPage);

    // Calculate the index range for the current page
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    // Filter products for the current page
    const productsToDisplay = filterTrandingProductData?.slice(startIndex, endIndex);

    // Function to handle previous page
    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    // Function to handle next page
    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    // ========= pagination for category product =========

    const [categoriesPage, setCategoriesPage] = useState(1);
    const categoriesProductsPerPage = 6; // Number of products per page

    // Calculate total pages
    const categoriesTotalPages = Math.ceil(filterProductData?.length / categoriesProductsPerPage);

    // Calculate the index range for the current page
    const categoriesStartIndex = (categoriesPage - 1) * categoriesProductsPerPage;

    const categoriesEndIndex = categoriesStartIndex + categoriesProductsPerPage;

    // Filter products for the current page
    const categoriesProductsToDisplay = filterProductData?.slice(categoriesStartIndex, categoriesEndIndex);

    // Function to handle previous page

    const handlePrevCategoriesPage = () => {
        if (categoriesPage > 1) {
            setCategoriesPage(categoriesPage - 1);
        }
    }

    // Function to handle next page

    const handleNextCategoriesPage = () => {
        if (categoriesPage < categoriesTotalPages) {
            setCategoriesPage(categoriesPage + 1);
        }
    }

    // ========
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Define your mobile breakpoint
        };

        handleResize(); // Check the initial screen width
        window.addEventListener("resize", handleResize); // Listen for window resize events

        return () => {
            window.removeEventListener("resize", handleResize); // Remove the event listener when the component unmounts
        };
    }, []);

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            easing: "ease-in-out", // Easing for the animation
            once: true, // Only trigger the animation once
        });
    }, []);




    return (
        <RootLayout>
            <div className="container">
            
                <Image
                    src={isMobile ? OfferBannerFour : OfferBannerFour}
                    alt="Banner Image"
                    className="w-full h-full"
                    width={isMobile ? 768 : 1920}
                    height={isMobile ? 768 : 500}
                />
            </div>
            <section className="container px-4" >
                <h3 className='font-semibold md:text-3xl text-lg'>Category {categoryName}</h3>
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {
                        categoriesProductsToDisplay && categoriesProductsToDisplay?.map(product => (
                            <Link href={`/products/${product?._id}`}>
                                 <div className="group relative overflow-hidden">
                                    <div className="aspect-h-1 border aspect-w-1 w-full overflow-hidden rounded-t-md bg-transparent lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <img
                                            src={product?.images[0]}
                                            alt={product?.name}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </div>
                                    <div className="aspect-h-1 border aspect-w-1 w-full overflow-hidden rounded-t-md bg-transparent lg:aspect-none group-hover:opacity-75 lg:h-80 absolute top-0 left-0 opacity-0 transition duration-300"
                                    >
                                        <img
                                            src={product?.images[1] || product?.images[0]}
                                            alt={product?.name}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </div>

                                    <div className="absolute -right-16 bottom-20 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                                        <button
                                            onClick={() => addToCart(product._id, product?.price)}
                                            className="flex h-10 w-10 items-center justify-center bg-[#fff]text-white transition hover:bg-gray-700">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="mr-2 h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className='absolute left-[5%] top-[5%]'>
                                        <p className='bg-[#FCC50B] px-4 rounded-md shadow'>
                                            Best Offer
                                        </p>
                                    </div>
                                    <div className="flex p-2 flex-col border rounded-b-md">
                                        <div>
                                            <h3 className="text-[16px] mt-2 font-semibold text-gray-700">
                                                <Link href={`/products/${product?._id}`}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {product?.name}
                                                </Link>
                                            </h3>
                                        </div>
                                        <div >
                                            <p className="text-[16px] text-gray-900 mt-1">
                                                <span className='font-semibold'>
                                                    {product?.discount
                                                        ? `₹ ${Math.floor(product?.price - (product?.price * product?.discount) / 100)}`
                                                        : `₹ ${Math.floor(product?.price)}`
                                                    }
                                                </span>
                                                <span className="text-sm text-gray-300 line-through mx-2">
                                                    ₹ {Math.floor(product?.price)}
                                                </span>
                                                <span className='text-[#18568C] text-sm'>
                                                    {Math.floor(product?.discount)} % off
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                {/* ====== pagination categories */}
                <div className={`items-center justify-center gap-4 mt-11 mb-16`} data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center justify-center text-gray-400 ">
                        <button
                            title="Previous"
                            className={`h-14 w-14 rounded-full text-center ${categoriesPage === 1 ? "bg-gray-400 cursor-not-allowed" : "hover:bg-red-10"
                                } text-white bg-black-10 border ${categoriesPage === 1 ? "bg-gray-400" : "bg-[#18568C]"
                                } flex items-center justify-center`}
                            onClick={handlePrevCategoriesPage}
                            disabled={categoriesPage === 1}
                        >
                            <FaArrowLeft className="text-white" />
                        </button>
                        {Array.from({ length: categoriesTotalPages }).map((_, index) => (
                            <button
                                key={index}
                                className={`h-14 w-14 hover:text-white rounded-full bg-[#18568C] ${categoriesPage === index + 1 ? "text-white bg-[#18568C]" : "bg-black-10"
                                    } text-center hover:bg-red-10 text-white border`}
                                onClick={() => setPage(index + 1)}
                                disabled={categoriesPage === index + 1}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            title="Next"
                            className={`h-14 w-14 rounded-full text-center ${categoriesPage === categoriesTotalPages
                                ? "bg-gray-400 cursor-not-allowed"
                                : "hover:bg-red-10"
                                } text-white bg-black-10  border ${categoriesPage === categoriesTotalPages ? "bg-gray-400" : "bg-[#18568C]"
                                } flex items-center justify-center`}
                            onClick={handleNextCategoriesPage}
                            disabled={categoriesPage === categoriesTotalPages}
                        >
                            <FaArrowRight className="text-white" />
                        </button>
                    </div>
                </div>

                <h3 className='font-semibold md:text-3xl text-lg my-8'>Tranding Products</h3>
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {
                        productsToDisplay && productsToDisplay?.map(product => (
                            <Link href={`/products/${product?._id}`}
                                key={product?._id}
                               
                            >
                                <div className="group relative overflow-hidden">
                                    <div className="aspect-h-1 border aspect-w-1 w-full overflow-hidden rounded-t-md bg-transparent lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <img
                                            src={product?.images[0]}
                                            alt={product?.name}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </div>
                                    <div className="aspect-h-1 border aspect-w-1 w-full overflow-hidden rounded-t-md bg-transparent lg:aspect-none group-hover:opacity-75 lg:h-80 absolute top-0 left-0 opacity-0 transition duration-300"
                                    >
                                        <img
                                            src={product?.images[1] || product?.images[0]}
                                            alt={product?.name}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </div>

                                    <div className="absolute -right-16 bottom-20 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                                        <button
                                            onClick={() => addToCart(product._id, product?.price)}
                                            className="flex h-10 w-10 items-center justify-center bg-[#fff]text-white transition hover:bg-gray-700">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="mr-2 h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className='absolute left-[5%] top-[5%]'>
                                        <p className='bg-[#FCC50B] px-4 rounded-md shadow'>
                                           Tranding 
                                        </p>
                                    </div>
                                    <div className="flex p-2 flex-col border rounded-b-md">
                                        <div>
                                            <h3 className="text-[16px] mt-2 font-semibold text-gray-700">
                                                <Link href={`/products/${product?._id}`}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {product?.name}
                                                </Link>
                                            </h3>
                                        </div>
                                        <div >
                                            <p className="text-[16px] text-gray-900 mt-1">
                                                <span className='font-semibold'>
                                                    {product?.discount
                                                        ? `₹ ${Math.floor(product?.price - (product?.price * product?.discount) / 100)}`
                                                        : `₹ ${Math.floor(product?.price)}`
                                                    }
                                                </span>
                                                <span className="text-sm text-gray-300 line-through mx-2">
                                                    ₹ {Math.floor(product?.price)}
                                                </span>
                                                <span className='text-[#18568C] text-sm'>
                                                    {Math.floor(product?.discount)} % off
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>


                {/* Pagination */}
                <div className={`items-center justify-center gap-4 mt-11 mb-16`}
                 
                >
                    <div className="flex items-center justify-center text-gray-400 ">
                        <button
                            title="Previous"
                            className={`h-14 w-14 rounded-full text-center ${page === 1 ? "bg-gray-400 cursor-not-allowed" : "hover:bg-red-10"
                                } text-white bg-black-10  border ${page === 1 ? "bg-gray-400" : "bg-[#18568C]"
                                } flex items-center justify-center`}
                            onClick={handlePrevPage}
                            disabled={page === 1}
                        >
                            <FaArrowLeft className="text-white" />
                        </button>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                className={`h-14 w-14 hover:text-white rounded-full bg-[#18568C] ${page === index + 1 ? "text-white bg-[#18568C]" : "bg-black-10"
                                    } text-center hover:bg-red-10 text-white border`}
                                onClick={() => setPage(index + 1)}
                                disabled={page === index + 1}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            title="Next"
                            className={`h-14 w-14 rounded-full text-center ${page === totalPages
                                ? "bg-gray-400 cursor-not-allowed"
                                : "hover:bg-red-10"
                                } text-white bg-black-10  border ${page === totalPages ? "bg-gray-400" : "bg-[#18568C]"
                                } flex items-center justify-center`}
                            onClick={handleNextPage}
                            disabled={page === totalPages}
                        >
                            <FaArrowRight className="text-white" />
                        </button>
                    </div>
                </div>
            </section>
        </RootLayout>
    );
};

export default category_product;