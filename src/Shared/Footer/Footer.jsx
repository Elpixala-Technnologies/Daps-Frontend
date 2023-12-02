import { MainLogo, PaymentIcons } from '@/src/Assets';
import useProducts from '@/src/Hooks/useProducts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';


const Footer = () => {
    const {categoryData,productData} = useProducts()
    const [data, setData] = React.useState({
        email: '',
        status: 'initial',
      });
    const handleSubmit = (event) => {
    event.preventDefault();
    setData((current) => ({ ...current, status: 'loading' }));
    try {
        // Replace timeout with real backend operation
        setTimeout(() => {
        setData({ email: '', status: 'sent' });
        }, 1500);
    } catch (error) {
        setData((current) => ({ ...current, status: 'failure' }));
    }
    };

    return (
        <section className=' bg-[#000000]'>
            <footer className="md:px-8 px-4 container  py-10 divide-y text-[#6f6e6efa] ">
      
            <div className="grid  text-sm gap-x-14 gap-y-8 sm:grid-cols-5 p-6">
                        <div className="flex flex-col gap-4 ">
                            <Link rel="noopener noreferrer" href="/" className="flex justify-center md:justify-start">
                               <div className='my-[-4rem] '>
                               <Image
                                    src={MainLogo}
                                    alt="Logo"
                                    height={80}
                                    width={180}
                                />
                               </div>
                            </Link>
                            <div className='w-full py-4 align-center'>
                <form onSubmit={handleSubmit} id="demo">
                    <FormControl>
                        <FormLabel
                        sx={{  color: '#CBC6C6',paddingBottom:".2rem", fontSize:"1rem" }}
                        >
                        Subscribe to our email alerts!
                        </FormLabel>
                        <Input
                        sx={{ '--Input-decoratorChildHeight': '45px' }}
                        placeholder="Enter your email address"
                        type="email"
                        required
                        value={data.email}
                        onChange={(event) =>
                            setData({ email: event.target.value, status: 'initial' })
                        }
                        error={data.status === 'failure'}
                        endDecorator={
                            <Button
                            variant="solid"
                            color="primary"
                            loading={data.status === 'loading'}
                            type="submit"
                            sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                            >
                            Subscribe
                            </Button>
                        }
                        />
                        {data.status === 'failure' && (
                        <FormHelperText
                            sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
                        >
                            Oops! something went wrong, please try again later.
                        </FormHelperText>
                        )}

                        {data.status === 'sent' && (
                        <FormHelperText
                            sx={(theme) => ({ color: theme.vars.palette.primary[400] })}
                        >
                            You are all set!
                        </FormHelperText>
                        )}
                    </FormControl>
                    </form>
                </div>
                            <div>
                                <p>
                                Welcome to DAPS, your ultimate online destination for the finest car accessories that elevate your driving experience to a whole new level. 
                                </p>
                            </div>
                            <div>
                                <div className="flex  flex-col  gap-4 mt-4">
                                    <div className='flex gap-2 items-center  transition duration-200 ease-out transform hover:scale-105'>
                                        <FaMapMarkerAlt className="w-6 h-6 text-gray-500 cursor-pointer hover:text-[#fff] dark:hover:text-gray-50" /> Shop No. 10, 16/5, Abdul Road, Karol Bagh, New Delhi-110005
                                    </div>
                                    <div className='transition duration-200 ease-out transform hover:scale-105 flex gap-2 items-center '>
                                        <FaPhoneAlt className="w-6 h-6 text-gray-500 cursor-pointer hover:text-[#fff] dark:hover:text-gray-50" /> 9729725060
                                    </div>
                                    <div className='transition duration-200 ease-out transform hover:scale-105 flex gap-2 items-center '>
                                        <FaPhoneAlt className="w-6 h-6 text-gray-500 cursor-pointer hover:text-[#fff] dark:hover:text-gray-50" /> 8950322454
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="tracki uppercase text-[#fff] font-semibold">Company</h3>
                            <ul className="space-y-2 ">
                                <li>
                                    <a rel="noopener noreferrer" href="#">Privacy</a>
                                </li>
                                <li>
                                    <a rel="noopener noreferrer" href="#">Terms of Service</a>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="tracki uppercase text-[#cbc6c6] font-semibold">Categories</h3>
                            <ul className="space-y-2">
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
                            <h3 className="uppercase text-[#cbc6c6] font-semibold">Our Products</h3>
                            <ul className="space-y-2 ">
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
                            <div className="uppercase text-[#cbc6c6] font-semibold">Social media</div>

                            <div className="flex  flex-col  gap-4 mt-3">
                                <Link href="https://instagram.com/dapsindia?igshid=Z28yemtlcHFhMTRt" className='flex gap-2 items-center text-[1.1rem] transition duration-200 ease-out transform hover:scale-105'>
                                    <FaFacebook className="w-8 h-8 text-gray-500 cursor-pointer hover:text-[#fff] dark:hover:text-gray-50 text-[1.5rem]" /> Facebook
                                </Link>
                                <Link href="https://instagram.com/dapsindia?igshid=Z28yemtlcHFhMTRt" className='transition duration-200 ease-out transform hover:scale-105 flex gap-2 items-center text-[1.1rem]'>
                                    <FaInstagram className="w-8 h-8 text-gray-500 cursor-pointer hover:text-[#fff] dark:hover:text-gray-50  text-[1.5rem]" /> Instagram
                                </Link>
                                <Link href="https://www.twitter.com/" className='flex gap-2 items-center text-[1.1rem] transition duration-200 ease-out transform hover:scale-105'>
                                    <FaTwitter className="w-8 h-8 text-gray-500 cursor-pointer hover:text-[#fff] dark:hover:text-gray-50 text-[1.5rem]" /> Twitter
                                </Link>
                            </div>
                        </div>
                </div>
               
                <div className="py-6 footer-border text-sm text-center dark:text-gray-500 mt-4 flex justify-between items-center flex-col md:flex-row gap-4">
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