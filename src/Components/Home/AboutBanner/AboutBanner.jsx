import { PartsImage, PersonImage } from '@/src/Assets';
import Image from 'next/image';
import Link from "next/link";
import React from 'react';

const AboutBanner = () => {
    return (
        <section className='my-6  bg-[#F6F6F6]'>
            <div className="hero container md:py-[8rem] py-[2rem]">
                <div className="hero-content flex gap-10 flex-col md:flex-row">
                    <div className="md:w-2/4 relative ">
                        <Image src={"https://res.cloudinary.com/dapscar/image/upload/v1703688780/About/suap65hkitwf4hbboazw.png"}
                            width={100}
                            height={100}
                            alt="Person"
                            className="w-4/5 h-full  object-cover rounded"
                        />
                        <Image
                            src={"https://res.cloudinary.com/dapscar/image/upload/v1703688780/About/suap65hkitwf4hbboazw.png"}
                            width={100}
                            height={100}
                            alt="Person"
                            className="rounded absolute w-3/5 right-5 top-2/4"
                        />
                    </div>
                    <div className="md:w-2/4 my-5">
                        <h1 className="text-3xl text-[#18568C] font-bold mb-4">About Us</h1>
                        <h1 className="text-3xl w-fit md:text-5xl font-bold">
                            We are qualified & of experience in this field
                        </h1>
                        <p className="py-4 w-full">
                            Daps Accessories brings expertise and deep experience in the car accessories field. Like the many versions of Lorem Ipsum, there are numerous car accessory options. Yet, many are altered with frivolous elements, lacking real substance.

                        </p>
                        <p className="py-4">
                            We differ at Daps Accessories. Our products are more than just believable; they're crafted with precision and care, ensuring quality and authenticity in every item. Choose Daps Accessories for genuine, reliable, and stylish enhancements to your vehicle, setting new standards in the automotive world.

                        </p>
                        <div className="mt-4">
                            <Link href={`/products`}>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                                    Shop Now
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutBanner;