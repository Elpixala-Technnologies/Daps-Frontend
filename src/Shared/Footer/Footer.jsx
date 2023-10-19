import { MainLogo } from '@/src/Assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="px-4 container  divide-y bg-[#EFF4F7] text-[#00000] ">
            <div className="flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
                <div className="lg:w-1/3 flex flex-col gap-4">
                    <Link rel="noopener noreferrer" href="/" className="flex justify-center md:justify-start">
                            <Image
                                src={MainLogo}
                                alt="Logo"
                                height={250}
                                width={250}
                            />
                            
                    </Link>
                    <div className="">
                        <p>
                            DAPS is a platform that allows you to create and manage your own personal portfolio.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
                    <div className="space-y-3">
                        <h3 className="tracki uppercase dark:text-gray-50">Product</h3>
                        <ul className="space-y-1">
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
                        <h3 className="tracki uppercase dark:text-gray-50">Company</h3>
                        <ul className="space-y-1">
                            <li>
                                <a rel="noopener noreferrer" href="#">Privacy</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Terms of Service</a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="uppercase dark:text-gray-50">Developers</h3>
                        <ul className="space-y-1">
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
                        <div className="uppercase dark:text-gray-50">Social media</div>
                        <div className="flex justify-start space-x-3">
                            <Link href="https://www.facebook.com/">
                                <FaFacebook className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-900 dark:hover:text-gray-50  transition duration-700 ease-in-out" />
                            </Link>
                            <Link href="https://www.instagram.com/">
                                <FaInstagram className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-900 dark:hover:text-gray-50  transition duration-700 ease-in-out" />
                            </Link>
                            <Link href="https://www.twitter.com/">
                                <FaTwitter className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-900 dark:hover:text-gray-50  transition duration-700 ease-in-out" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-6 text-sm text-center dark:text-gray-400">© {new Date().getFullYear()} DAPS. All rights reserved.</div>
        </footer>
    );
};

export default Footer;