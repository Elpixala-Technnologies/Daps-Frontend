import { TodayOffersBannerOne } from '@/src/Assets';
import { AuthContext } from '@/src/Context/UserContext';
import useProducts from '@/src/Hooks/useProducts';
import { addToCartUrl } from '@/src/Utils/Urls/ProductUrl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Swal from 'sweetalert2';

const TodayOffers = () => {
  const { productData } = useProducts()
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const filterdPrductData = productData && productData?.filter((product) => product.status === 'Best Offers')

  const addToCart = async (productId, price) => {
    const convertPrice = parseInt(price);

    // Check if the user is logged in
    if (!user) {
      // User is not logged in, show an alert
      Swal.fire({
        icon: 'error',
        title: 'Please log in to add the product to your cart',
        showConfirmButton: true,
      });
      return;
    }

    const res = await fetch(addToCartUrl(productId), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
        icon: 'success',
        title: 'Your product added to the cart',
        showConfirmButton: false,
        timer: 1500,
      });
      // router.push('/cart');
    }
  };


  return (
    <section className='mt-8'>
      <div className='title'>
        <h1>Today’s <span>Offers</span></h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-4">
        {filterdPrductData &&
          filterdPrductData.slice(0, 8).map((product) => {
            return (
             
              <div className="group relative overflow-hidden">
                <div className="aspect-h-1 border aspect-w-1 w-full overflow-hidden rounded-t-md bg-transparent lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product?.images[0]}
                    alt={product?.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="aspect-h-1 border aspect-w-1 w-full overflow-hidden rounded-t-md bg-transparent lg:aspect-none group-hover:opacity-75 lg:h-80 absolute top-0 left-0 opacity-0 transition duration-300"
                >
                  <img
                    src={product?.images[1] || product?.images[0]}
                    alt={product?.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>

                <div className="absolute -right-16 bottom-20 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                  <button
                    onClick={() => addToCart(product._id, product?.price)}
                    className="flex h-10 w-10 items-center justify-center bg-[#fff]text-white transition hover:bg-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                  </button>
                </div>
                <div className='absolute left-[5%] top-[5%]'>
                  <p className='bg-[#FCC50B] px-4 rounded-md shadow'>
                    Best Offer
                  </p>
                </div>
                <div className="flex p-2 flex-col border rounded-b-md">
                  <div>
                    <h3 className="text-[16px] mt-2 font-semibold text-gray-700">
                      <Link href={`/products/${product?._id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product?.name}
                      </Link>
                    </h3>
                  </div>
                  <div >
                    <p className="text-[16px] text-gray-900 mt-1">
                      <span className='font-semibold'>
                        {product?.discount
                          ? `₹ ${Math.floor(product?.price - (product?.price * product?.discount) / 100)}`
                          : `₹ ${Math.floor(product?.price)}`
                        }
                      </span>
                      <span className="text-sm text-gray-300 line-through mx-2">
                        ₹ {Math.floor(product?.price)}
                      </span>
                      <span className='text-[#18568C] text-sm'>
                        {Math.floor(product?.discount)} % off
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex justify-end items-end">
        <Link className="text-[#18568C]  text-center flex items-center gap-2"
          href="/products"
        >
          View All Products <FaArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default TodayOffers;