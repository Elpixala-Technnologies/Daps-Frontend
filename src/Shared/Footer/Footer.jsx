import { BlackLogo, PaymentIcons } from '@/src/Assets';
import useProducts from '@/src/Hooks/useProducts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    const {categoryData,productData} = useProducts()

    return (
        <section className=' bg-[#000000]'>
            <footer className="md:px-8 px-4 container  py-10 divide-y text-[#fff] ">
      
            <div className="grid  text-sm gap-x-4 gap-y-8 sm:grid-cols-5 p-6">
                        <div className="flex flex-col gap-4 ">
                            <Link rel="noopener noreferrer" href="/" className="flex justify-center md:justify-start">
                                <Image
                                    src={BlackLogo}
                                    alt="Logo"
                                    height={180}
                                    width={180}
                                />
                            </Link>
                            <div>
                                <p>
                                Welcome to DAPS, your ultimate online destination for the finest car accessories that elevate your driving experience to a whole new level. 
                                </p>
                            </div>
                            <div>
                                <div className="flex  flex-col  gap-4 mt-4">
                                    <div className='flex gap-2 items-center  transition duration-200 ease-out transform hover:scale-105'>
                                        <FaMapMarkerAlt className="w-6 h-6 text-gray-500 cursor-pointer hover:text-[#fff] dark:hover:text-gray-50" /> Xyz India
                                    </div>
                                    <div className='transition duration-200 ease-out transform hover:scale-105 flex gap-2 items-center '>
                                        <FaPhoneAlt className="w-6 h-6 text-gray-500 cursor-pointer hover:text-[#fff] dark:hover:text-gray-50" /> +91 0000-0000
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="tracki uppercase font-semibold">Company</h3>
                            <ul className="space-y-4 ">
                                <li>
                                    <a rel="noopener noreferrer" href="#">Privacy</a>
                                </li>
                                <li>
                                    <a rel="noopener noreferrer" href="#">Terms of Service</a>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="tracki uppercase font-semibold">Categories</h3>
                            <ul className="space-y-4">
                                {
                                    categoryData && categoryData.slice(0,5).map((cate)=>{
                                        return(
                                        <li key={cate?._id}>
                                            <Link rel="noopener noreferrer" href={`/category/${cate?.name}`}>{cate?.name}</Link>
                                        </li>
                                        )
                                    })
                                    }
                            </ul>
                        </div>
                       
                        <div className="space-y-3">
                            <h3 className="uppercase font-semibold">Recent Products</h3>
                            <ul className="space-y-4 ">
                            {
                                    productData && productData?.slice(0,5)?.map((product)=>{
                                        return(
                                        <li key={product?._id}>
                                            <Link rel="noopener noreferrer" href={`/products/${product?._id}`}>{product?.name}</Link>
                                        </li>
                                        )
                                    })
                                    }
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <div className="uppercase font-semibold">Social media</div>

                            <div className="flex  flex-col  gap-4 mt-4">
                                <Link href="https://www.facebook.com/" className='flex gap-2 items-center text-[1.1rem] transition duration-200 ease-out transform hover:scale-105'>
                                    <FaFacebook className="w-8 h-8 text-gray-500 cursor-pointer hover:text-[#fff] dark:hover:text-gray-50 text-[1.5rem]" /> Facebook
                                </Link>
                                <Link href="https://www.instagram.com/" className='transition duration-200 ease-out transform hover:scale-105 flex gap-2 items-center text-[1.1rem]'>
                                    <FaInstagram className="w-8 h-8 text-gray-500 cursor-pointer hover:text-[#fff] dark:hover:text-gray-50  text-[1.5rem]" /> Instagram
                                </Link>
                                <Link href="https://www.twitter.com/" className='flex gap-2 items-center text-[1.1rem] transition duration-200 ease-out transform hover:scale-105'>
                                    <FaTwitter className="w-8 h-8 text-gray-500 cursor-pointer hover:text-[#fff] dark:hover:text-gray-50 text-[1.5rem]" /> Twitter
                                </Link>
                            </div>
                        </div>
                    </div>
                <div className="py-6 text-sm text-center dark:text-gray-400 mt-4 flex justify-between items-center flex-col md:flex-row gap-4">
                    <p>© {new Date().getFullYear()} DAPS. All rights reserved.</p>

                    {/* <div>
                        <Image
                            src={PaymentIcons}
                            alt={"payment"}
                            width={100}
                            height={100}
                            className='w-full h-full'
                        />
                    </div> */}
                </div>
            </footer>
        </section>
    );
};

export default Footer;