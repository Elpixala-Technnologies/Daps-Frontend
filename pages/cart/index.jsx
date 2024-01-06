import { AuthContext } from '@/src/Context/UserContext';
import RootLayout from '@/src/Layouts/RootLayout';
import {
  getCartUrl,
  removeFromCartUrl,
  updateCartUrl,
  addToCartUrl
} from '@/src/Utils/Urls/ProductUrl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const CartPage = () => {
  const router = useRouter()
  const { user } = useContext(AuthContext);
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (user) {
      const getCartData = async () => {
        const res = await fetch(getCartUrl(user?.email));
        const data = await res.json();
        setCartData(data?.data);
        // Calculate the initial total price
        const initialTotalPrice = data?.data.reduce((acc, curr) => {
          return acc + calculateItemPrice(
            curr?.basedPrice,
            curr?.quantity,
            curr?.discount
          );
        }, 0);
        setTotalPrice(initialTotalPrice);
      };
      getCartData();
    }
  }, [user]);

  const removeFromCart = async (id) => {
    const res = await fetch(removeFromCartUrl(id), {
      method: 'DELETE',
    });
    const data = await res.json();
    console.log(data);

    if (data?.success) {
      Swal.fire({
        icon: 'success',
        title: 'Your item has been removed',
        showConfirmButton: false,
        timer: 1500,
      });
      setCartData(cartData.filter((data) => data._id !== id));
      // Recalculate the total price after removing an item
      const newTotalPrice = cartData.reduce((acc, curr) => acc + curr.itemPrice, 0);
      setTotalPrice(newTotalPrice);
    }
  };

  const updateCartItemQuantity = async (id, newQuantity) => {
    const res = await fetch(updateCartUrl(id), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity: newQuantity,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data?.success) {
      // Calculate the updated item price
      const updatedCartData = cartData.map((item) => {
        if (item._id === id) {
          const updatedItem = {
            ...item,
            quantity: newQuantity,
          };
          updatedItem.itemPrice = calculateItemPrice(
            Math.round(parseInt(item?.basedPrice)),
            newQuantity,
            item?.discount
          );
          return updatedItem;
        }
        return item;
      });

      // Update the cartData and recalculate the total price
      setCartData(updatedCartData);

      // Recalculate the total price
      const newTotalPrice = updatedCartData.reduce((acc, curr) => acc + curr.itemPrice, 0);
      setTotalPrice(newTotalPrice);
    }
  };

  const calculateItemPrice = (price, itemQuantity, discount) => {
    const discountedPrice = price * (1 - discount / 100);
    return discountedPrice * itemQuantity;
  };

  const totalQuantity = cartData?.reduce((acc, curr) => {
    return acc + curr?.quantity;
  }, 0)

  const handelChckout = () => {
    router.push('/checkout')
  }

  return (
    <RootLayout>
      <section className=" ">
        <div className="container mx-auto mt-10">
          <div className="flex flex-col md:flex-row shadow-md my-10">
            <div className="w-full md:w-3/4 bg-white px-4 md:px-10 py-10">
              <div className="flex justify-between border-b pb-4">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                <h2 className="font-semibold text-2xl">{cartData?.length} Items</h2>
              </div>


              <div className="md:flex flex-col hidden md:flex-row md:mt-10 md:mb-5">
                <div className="font-semibold text-gray-600 text-xs uppercase w-full md:w-2/5 text-center md:text-left">Product Details</div>
                <div className="font-semibold text-gray-600 text-xs uppercase w-full md:w-1/5 text-center">Quantity</div>
                <div className="font-semibold text-gray-600 text-xs uppercase w-full md:w-1/5 text-center">Price</div>
                <div className="font-semibold text-gray-600 text-xs uppercase w-full md:w-1/5 text-center">Total</div>
              </div>

              <div className="flex flex-col gap-4">
                {cartData && cartData.map((cart) => {
                  const { product, _id, quantity, discount, basedPrice } = cart;

                  const itemPrice = calculateItemPrice(
                    Math.round(parseInt(basedPrice)),
                    quantity, discount
                  );

                  return (
                    <div className="flex flex-col md:flex-row items-center hover:bg-gray-100 -mx-2 md:-mx-4 px-4 md:px-6 py-4 md:py-5">
                      <div className="flex w-full md:w-2/5">
                        <div className="w-1/3 md:w-1/6">
                          <Link href={`/product/${product?._id}`} className="shrink-0">
                            <Image
                              width={100}
                              height={100}
                              className="w-16 md:w-24 max-w-full rounded-lg object-cover"
                              src={product?.images[0]}
                              alt={product?.name}
                            />
                          </Link>
                        </div>
                        <div className="flex flex-col justify-between ml-2 md:ml-4 flex-grow">
                          <span className="font-bold text-sm">{product?.productName}</span>
                          <span className="text-blue-500 text-xs my-2">
                            Regular Discount: {discount}%
                          </span>
                          <button
                            className="font-semibold text-[1.3rem] text-red-500 border px-2 py-1 rounded text-xs my-2"
                            onClick={() => removeFromCart(_id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-center w-full md:w-1/5">
                        <div className="sm:order-1">
                          <div className="mx-auto flex h-8 items-stretch text-gray-600">
                            <button
                              className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                              onClick={() => {
                                if (quantity > 1) {
                                  updateCartItemQuantity(_id, quantity - 1);
                                }
                              }}
                            >
                              -
                            </button>
                            <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                              {quantity}
                            </div>
                            <button
                              className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                              onClick={() => updateCartItemQuantity(_id, quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <span className="text-center w-full md:w-1/5 md:font-semibold text-sm hidden md:block">
                        ₹ {Math.round(basedPrice)}
                      </span>
                      <span className="text-center w-full md:w-1/5 md:font-semibold text-sm hidden md:block">
                        ₹ {Math.round(itemPrice)}
                      </span>

                      <div className='flex gap-4 mt-2 md:hidden'>
                        <span className=" w-full text-left md:font-semibold text-sm">
                          ₹ {Math.round(itemPrice)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-full md:w-1/4 px-4 md:px-8 py-10">
              <h1 className="font-semibold text-2xl border-b pb-4">Order Summary</h1>
              <div className="flex justify-between mt-6 md:mt-10 mb-4 md:mb-5">
                <span className="font-semibold text-sm uppercase">Total Items {cartData?.length}</span>
                <p className="font-semibold text-sm">
                  <span className="text-xs font-normal text-gray-400">₹</span>{" "}
                  {Math.round(totalPrice)}
                </p>
              </div>

              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span className="font-semibold">₹ {Math.round(totalPrice)}</span>
                  
                </div>
                <button
                  onClick={() => handelChckout()}
                  className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RootLayout>
  );
};

export default CartPage;
