import { MainLogo ,BlackLogo} from '@/src/Assets';
import { AuthContext } from '@/src/Context/UserContext';
import useAdmin from '@/src/Hooks/useAdmin';
import useCommonApiData from '@/src/Hooks/useCommonApiData';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { CgShoppingBag } from 'react-icons/cg';
import { CiUser } from 'react-icons/ci';
import { FaMicrosoft, FaUserAlt, FaPowerOff } from 'react-icons/fa';

const TopNavbar = () => {
    const [profileToggle, setProfileToggle] = useState(false)
    const { user } = useContext(AuthContext)
    const { handleLogout } = useCommonApiData()
    const userEmail = user?.email;
    const [isAdmin] = useAdmin();

    const handelProfileToggle = () => {
        setProfileToggle(!profileToggle); // Toggle the profile state
    };

    return (
        <nav className='bg-[#333333]  sticky top-0 z-50 mx-auto'>
            <div className='container'>
                <div className="flex  items-center py-2 justify-between">
                    <div>
                        <Link className='text-2xl font-bold text-black' href="/">
                            <Image src={BlackLogo} alt="logo" width={130} height={80}
                                className='cursor-pointer hover:scale-105 duration-300 transform'
                            />
                        </Link>
                    </div>
                        <div className='hidden md:flex w-[50%]'>
                            <li className="flex items-center relative bg-[fafafa] rounded-md w-full">
                                <input type="text" className='pl-2 w-full text-black py-2 px-8  rounded-md' placeholder='Search ..' />
                                <div className="absolute right-0">
                                    <AiOutlineSearch className='text-black text-[2rem]' />
                                </div>
                            </li>
                        </div>
                  
                    <div style={{ display: "flex", gap: '0.8rem' }}
                        className='flex gap-4 justify-center items-center'>
                        <div className='cursor-pointer'
                            onClick={() => handelProfileToggle()}
                        >
                            <CiUser className='text-[1.8rem] text-[#fff]' />
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
                        <Link href="/cart" className="relative">
                            <CgShoppingBag className='text-[1.8rem] text-[#fff]' />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TopNavbar;