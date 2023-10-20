import { BlackLogo,PaymentIcons,OfferBannerTwo } from '@/src/Assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <section className=' bg-[#333333]'>
        <div className='mt-4'>
        <div className='banner-content  w-full relative'>
                    <Image
                        src={OfferBannerTwo}
                        alt={"HomeOfferBannerOne"}
                        width={500}
                        height={530}
                        className="h-full w-full rounded object-cover "
                    />

                    <div className='absolute top-[45%] bottom-0 left-[60%] right-0'>
                        <div>
                        <h1 class="max-w-lg text-xl font-semibold tracking-tight text-[#fff] xl:text-2xl ">Subscribe our newsletter to get update.</h1>

<div class="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
    <input id="email" type="text" class="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Email Address"/>

    <button class="w-full common-btn px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
        Subscribe
    </button>
</div>
                        </div>
                    </div>
                </div>
        </div>    
        <footer className="px-4 container  divide-y text-[#fff] ">
            <div className="flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
                <div className="lg:w-1/3 flex flex-col gap-4">
                    <Link rel="noopener noreferrer" href="/" className="flex justify-center md:justify-start">
                            <Image
                                src={BlackLogo}
                                alt="Logo"
                                height={250}
                                width={250}
                            /> 
                    </Link>
                    <div className="text-[1rem] w-[80%]">
                        <p>
                            DAPS is a platform that allows you to create and manage your own personal portfolio.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
                    <div className="space-y-3">
                        <h3 className="tracki uppercase dark:text-gray-50 text-[1.4rem]">Product</h3>
                        <hr/>
                        <ul className="space-y-4 text-[1.2rem]">
                            <li>
                                <a rel="noopener noreferrer" href="#">Features</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Integrations</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Pricing</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">FAQ</a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="tracki uppercase dark:text-gray-50 text-[1.4rem]">Company</h3>
                        <hr/>
                        <ul className="space-y-4 text-[1.2rem]">
                            <li>
                                <a rel="noopener noreferrer" href="#">Privacy</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Terms of Service</a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="uppercase dark:text-gray-50 text-[1.4rem]">Developers</h3>
                        <hr/>
                        <ul className="space-y-4 text-[1.2rem]">
                            <li>
                                <a rel="noopener noreferrer" href="#">Public API</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Documentation</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Guides</a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <div className="uppercase dark:text-gray-50 text-[1.4rem]">Social media</div>
                        <hr/>
                        <div className="flex justify-start space-x-3 mt-4">
                            <Link href="https://www.facebook.com/">
                                <FaFacebook className="w-10 h-10 text-gray-500 cursor-pointer hover:text-[#fff] dark:hover:text-gray-50  transition duration-700 ease-in-out text-[1.5rem]" />
                            </Link>
                            <Link href="https://www.instagram.com/">
                                <FaInstagram className="w-10 h-10 text-gray-500 cursor-pointer hover:text-[#fff] dark:hover:text-gray-50  transition duration-700 ease-in-out text-[1.5rem]" />
                            </Link>
                            <Link href="https://www.twitter.com/">
                                <FaTwitter className="w-10 h-10 text-gray-500 cursor-pointer hover:text-[#fff] dark:hover:text-gray-50  transition duration-700 ease-in-out text-[1.5rem]" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-6 text-sm text-center dark:text-gray-400 flex justify-between items-center flex-col md:flex-row gap-4">
                <p>© {new Date().getFullYear()} DAPS. All rights reserved.</p>

                <div>
                    <Image 
                        src={PaymentIcons}
                        alt={"payment"}
                        width={100}
                        height={100}
                        className='w-full h-full' 
                    />
                </div>
            </div>
        </footer>
        </section>
    );
};

export default Footer;