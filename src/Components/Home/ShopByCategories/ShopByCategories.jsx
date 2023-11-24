import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import useProducts from "@/src/Hooks/useProducts";
 
const ShopByCategories = () => {
  const { categoryMainData } = useProducts();
  const [updateData, setUpdateData] = React.useState(8);

  const showCard = () => {
    if (updateData === 8) {
      setUpdateData(categoryMainData.length);
    } else {
      setUpdateData(8);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Easing for the animation
      once: true, // Only animate elements once
    });
  }, []);



  return (
    <section className='container'>
      <div className="">
        <div className="md:w-[100%] mx-auto mt-7 md:block ">
          <div className='title text-center pt-30'>
            <h1>Shop by <span>Categories</span></h1>
          </div>
          <div className="rounded-lg pb-[1px]">
            {/* <div className="grid grid-cols-1 gap-1 w-max-content overflow-hidden xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 md:pt-5"> */}
            <div className="flex w-max-content overflow-hidden justify-around">
           
              {categoryMainData &&
                categoryMainData.slice(0, updateData).map((child) => {
                  const { _id, name, icons } = child;
                  return (
                    <div
                      className="color-b bg-white p-2 md:p-3 text-center rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-[#18568C] hover:bg-gradient-to-r from-cyan-500 to-blue-500"
                      data-aos="fade-up" // Add AOS animation attribute
                      data-aos-duration="1000" // Set animation duration in milliseconds
                      key={_id}
                    >
                      <Link href={`/category/${name}`}>
                        <Image
                          alt="image"
                          src={icons}
                          className="inline-flex items-center justify-center chele"
                          width={65}
                          height={65}
                        />

                        <div className="text-sm font-semibold tracking-wide cursor-pointer dark:text-black ">
                          {name}
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>
            {/* <p
              className="flex justify-end items-center text-black hover:[#29679e] text-[14px] my-4 px-2 pr-4 tracking-wide  hover:text-red-10 cursor-pointer"
              onClick={() => showCard()}
            >
              {`Show ${updateData === 8 ? "More" : "Less"}`}{" "}
              {updateData === 8 ? (
                <AiFillCaretDown className="mt-1 text-[15px]" />
                ) : (
                <AiFillCaretUp className="mt-1 text-[15px]" />
              )}
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopByCategories;