import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import useProducts from "@/src/Hooks/useProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Autoplay, Pagination, Navigation, Scrollbar } from "swiper";

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
    <section className="container">
      <div className="">
        <div className="md:w-[100%] mx-auto mt-2 md:block ">
          <h3 className="font-light mb-3 text-3xl text-black">
            Shop By{" "}
            <strong className="font-extrabold text-[#29679e]">
              Categories
            </strong>
          </h3>
          <div className="rounded-lg pb-[1px]">
            {/* <div className="grid grid-cols-1 gap-1 w-max-content overflow-hidden xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 md:pt-5"> */}
            <div className="flex h-[15rem] w-max-content overflow-hidden justify-around">
              <Swiper
                // centeredSlides={true}
                slidesPerView={8}
                scrollbar={{ draggable: true, hide: true }}
                loop={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper heroSlider"
                breakpoints={{
                  320: {
                    slidesPerView: 2.5,
                  },
                  360: {
                    slidesPerView: 2.5,
                  },
                  480: {
                    slidesPerView: 2.5,
                  },
                  640: {
                    slidesPerView: 3.5,
                  },
                  768: {
                    slidesPerView: 3.5,
                  },
                  1024: {
                    slidesPerView: 8.5,
                  },
                }}
              >
                {categoryMainData &&
                  categoryMainData.slice(0, updateData).map((child) => {
                    const { _id, name, icons } = child;
                    return (
                      <SwiperSlide key={_id}>
                        <div
                          className=" color-b bg-white p-2 md:p-3 text-center rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-[#18568C]"
                          data-aos="fade-up" // Add AOS animation attribute
                          data-aos-duration="1000" // Set animation duration in milliseconds
                          key={_id}
                        >
                          <Link
                            href={`/products?categoryName=${encodeURIComponent(
                              name
                            )}`}
                          >
                            <Image
                              alt="image"
                              src={icons}
                              className="inline-flex w-full h-full chele items-center justify-center "
                              width={90}
                              height={90}
                            />

                            <div className="text-[12px] font-semibold tracking-wide cursor-pointer dark:text-black ">
                              {name}
                            </div>
                          </Link>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopByCategories;
