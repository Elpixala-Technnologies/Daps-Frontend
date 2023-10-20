import { PartsImage ,PersonImage} from '@/src/Assets';
import Image from 'next/image';
import React from 'react';

const AboutBanner = () => {
    return (
        <section className='my-6  bg-[#F6F6F6]'>
            <div className="hero container md:py-[8rem] py-[2rem]">
                <div className="hero-content flex gap-10 flex-col md:flex-row">
                    <div className="md:w-2/4 relative ">
                        <Image src={PersonImage} 
                        width={100}
                        height={100}
                        alt="Person" 
                        className="w-4/5 h-full  object-cover rounded" 
                        />
                        <Image
                            src={PartsImage}
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
                            There are many variations of passages of Lorem Ipsum available,
                            but the majority have suffered alteration in some form, by
                            injected humour, or randomised words which don't look even
                            slightly believable.
                        </p>
                        <p className="py-4">
                            the majority have suffered alteration in some form, by injected
                            humour, or randomised words which don't look even slightly
                            believable.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutBanner;