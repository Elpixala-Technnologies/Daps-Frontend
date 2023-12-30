import Image from "next/image";
import React from "react";
import Link from "next/link";
import useMediaHooks from "@/src/Hooks/useMediaHooks";

const HomeOffers = () => {
  const { bannersData } = useMediaHooks();

  return (
    <section className="container">
      <div className="mt-[62px] grid text-white grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 gap-4">
        <div className="banner-content  w-full relative">
          {bannersData && bannersData[0] && (
            <Image
              src={bannersData[0]?.bannerOne}
              alt={"HomeOfferBannerOne"}
              width={500}
              height={530}
              className="rounded  w-full h-full object-cover transition duration-200 ease-out transform hover:scale-105"
            />
          )}

          <div className="absolute top-[40%] md:top-[40%] left-[40%]">
            <div>
              <Link
                href={`/products?categoryName=${encodeURIComponent('Amplifiers')}`}
                className="common-btn-outline py-2 px-4 mt-6"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        <div className="banner-content  text-[#000] flex flex-col gap-[2rem]">
          <div className="banner-content relative">
            {bannersData && bannersData[0] && (
              <Image
                src={bannersData[0]?.bannerTow}
                alt={"HomeOfferBannerOne"}
                width={300}
                height={300}
                className="h-full w-full transition duration-200 ease-out transform hover:scale-105"
              />
            )}

            <div className="absolute top-[30%] bottom-0 left-[10%] right-0">
              <div>
                <Link
                  href={`/products?categoryName=${encodeURIComponent('HIDs')}`}
                  className="common-btn-outline py-4 px-4 mt-6"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>


          <div className="banner-content text-[#fff] relative">
            {bannersData && bannersData[0] && (
              <Image
                src={bannersData[0]?.bannerThree}
                alt={"HomeOfferBannerOne"}
                width={300}
                height={300}
                className="h-full w-full transition duration-200 ease-out transform hover:scale-105"
              />
            )}

            <div className="absolute top-[30%] bottom-0 left-[53%] right-0">
              <div>
                <Link
                  href={`/products?categoryName=${encodeURIComponent('Android Stereos')}`}
                  className="common-btn-outline py-4 px-4 mt-6"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="banner-content  relative">
          {bannersData && bannersData[0] && (
            <Image
              src={bannersData[0]?.bannerFour}
              alt={"HomeOfferBannerOne"}
              width={530}
              height={510}
              className="w-full h-full  rounded object-cover transition duration-200 ease-out transform hover:scale-105"
            />
          )}

          <div className="absolute top-[40%] md:top-[40%] left-[40%]">
            <div className="text-[#000]">
              <Link
                href={`/products?categoryName=${encodeURIComponent('Amplifiers')}`}
                className="common-btn-outline py-4 px-4 mt-6"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeOffers;
