import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useProducts from "@/src/Hooks/useProducts";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "@/src/Context/UserContext";
import { useRouter } from "next/router";
import { addToCartUrl } from "@/src/Utils/Urls/ProductUrl";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";

const OurProducts = () => {
  const { productData } = useProducts();
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const sliderRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState("FEATURED");

  // Filter products based on the active category
  const filteredProducts = productData?.filter((product) => {
    if (activeCategory === "FEATURED") {
      return product.status === "Tranding";
    } else if (activeCategory === "LATEST") {
      // You can define your own logic here based on the 'productData' structure
      return product.status === "New Arrivals"; // Modify this as needed
    } else if (activeCategory === "BESTSELLER") {
      // You can define your own logic here based on the 'productData' structure
      return product.status === "Bestseller"; // Modify this as needed
    }
    return true; // Default to showing all products
  });

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Only trigger the animation once
    });
  }, []);

  const addToCart = async (productId, price) => {
    const convertPrice = parseInt(price);

    // Check if the user is logged in
    if (!user) {
      // User is not logged in, show an alert
      Swal.fire({
        icon: "error",
        title: "Please log in to add the product to your cart",
        showConfirmButton: true,
      });
      return;
    }

    const res = await fetch(addToCartUrl(productId), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: productId,
        quantity: 1,
        totalPrice: convertPrice,
        email: user.email,
        status: "unpaid",
      }),
    });

    const data = await res.json();

    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Your product added to the cart",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/cart");
    }
  };

  return (
    <section className="bg-[#F6F6F6] py-10 mt-[20px]">
      <div className="container">
        <h3 className="font-light mb-4 text-3xl text-black">
          Popular{" "}
          <strong className="font-extrabold text-[#29679e]">From Daps</strong>
        </h3>

        <div className="gelaryComponent">
          <div className="">
            <div className="flex justify-center border-gray-400 whitespace-nowrap ">
              <button
                onClick={() => setActiveCategory("FEATURED")}
                className={`inline-flex font-extrabold items-center h-10 px-4 -mb-px text-sm text-center ${
                  activeCategory === "FEATURED"
                    ? "text-blue-600 border-b-2 border-blue-500"
                    : " border-transparent"
                } sm:text-base dark:border-blue-400 dark:text-gradient-to-r from-cyan-500 to-blue-500 whitespace-nowrap focus:outline-none`}
              >
                FEATURED
              </button>

              <button
                onClick={() => setActiveCategory("LATEST")}
                className={`inline-flex font-extrabold items-center h-10 px-4 -mb-px text-sm text-center ${
                  activeCategory === "LATEST"
                    ? "text-blue-600 border-b-2 border-blue-500"
                    : " border-transparent"
                } sm:text-base dark:border-blue-400 dark:text-gradient-to-r from-cyan-500 to-blue-500 whitespace-nowrap focus:outline-none hover:border-gray-400`}
              >
                TRENDING
              </button>

              <button
                onClick={() => setActiveCategory("BESTSELLER")}
                className={`inline-flex font-bold items-center h-10 px-4 -mb-px text-sm text-center ${
                  activeCategory === "BESTSELLER"
                    ? "text-blue-600 border-b-2 border-blue-500"
                    : " border-transparent"
                } sm:text-base dark:border-blue-400 dark:text-gradient-to-r from-cyan-500 to-blue-500 whitespace-nowrap focus:outline-none hover:border-gray-400`}
              >
                BESTSELLER
              </button>
            </div>
          </div>

          {/* ======= Gallery Data ====== */}
          <div className="photogalleryComponent py-4">
            <Swiper
              ref={sliderRef}
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                360: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                480: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
              spaceBetween={20}
              slidesPerView={3}
              onSlideChange={() => {}}
              onSwiper={(swiper) => {}}
              data-aos="fade-up"
              data-aos-anchor-placement="center-bottom"
            >
              <div className="grid grid-cols-1 justify-center items-center  md:grid-cols-2  gap-4">
                {filteredProducts &&
                  filteredProducts?.map((product) => {
                    return (
                      <SwiperSlide className="cursor-grab" key={product?._id}>
                        <div className="border rounded-[0.6rem] relative">
                          <div>
                            <Link href={`/products/${product?._id}`}>
                              <div className="productImage">
                                <div className="h-menu border rounded-t-[0.6rem] overflow-hidden relative">
                                  <img
                                    src={product?.images[0]}
                                    alt="First Image"
                                    className="h-full w-full object-cover duration-200"
                                  />
                                  <img
                                    src={product?.images[1]}
                                    alt="Second Image"
                                    className="hover-img absolute top-0 left-0 w-full h-full object-cover duration-300"
                                  />
                                </div>
                              </div>
                            </Link>
                          </div>
                          <div className="px-4 py-1 bg-[#000] rounded-r absolute top-4 text-[#fff] text-[0.6rem] font-semibold">
                            🎉 New Launch
                          </div>

                          <div className="rounded-b-[0.6rem] bg-[#fafafa] p-4 relative">
                          <div className="px-6 py-1 bg-[#fcc50b] w-[70%] rounded-md  absolute top-[-1rem] text-center left-[14%] font-semibold text-white text-[14px]">
                                DAPS
                              </div>
                            <div className="my-1 text-left ">
                              <Link
                                href={`/products/${product?._id}`}
                                className="font-semibold text-[14px]"
                              >
                                {product?.productName.slice(0, 30)}
                              </Link>
                              <div className="flex items-center justify-between ">
                                <div className="flex gap-2">
                                  <h1 className="font-bold text-slate-900">
                                    {product?.discount
                                      ? `₹ ${Math.floor(
                                          product?.price -
                                            (product?.price *
                                              product?.discount) /
                                              100
                                        )}`
                                      : `₹ ${Math.floor(product?.price)}`}
                                  </h1>
                                  <span className="text-sm font-semibold text-gray-400 line-through mt-1">
                                    ₹ {Math.floor(product?.price)}
                                  </span>
                                  <span className="text-green-500 font-bold text-[13px] mt-1">
                                    {Math.floor(product?.discount)} % off
                                  </span>
                                </div>
                                <div className="absolute right-2">
                                  <div className="flex flex-col  gap-3 justify-end">
                                    <Link
                                      href={`/products/${product?._id}`}
                                      className="border px-4 text-[12px] font-semibold rounded-lg py-2 bg-black text-white flex items-center gap-2"
                                    >
                                      Add To Cart
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2 text-[14px]">
                                  <FaStar className="text-orange-500" />
                                  Be first to review
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProducts;