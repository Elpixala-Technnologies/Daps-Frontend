// import { AuthContext } from '@/src/Context/UserContext';
// import RootLayout from '@/src/Layouts/RootLayout';
// import {
//     getCartUrl,
//     removeFromCartUrl,
//     updateCartUrl,
//     addToCartUrl
// } from '@/src/Utils/Urls/ProductUrl';
// import Image from 'next/image';
// import Link from 'next/link';
// import React, { useContext, useEffect, useState } from 'react';
// import Swal from 'sweetalert2';

// const CartPage = () => {


//     const { user } = useContext(AuthContext);
//     const [cartData, setCartData] = useState([]);
//     const [totalPrice, setTotalPrice] = useState(0);

//     useEffect(() => {
//         if (user) {
//             const getCartData = async () => {
//                 const res = await fetch(getCartUrl(user?.email));
//                 const data = await res.json();
//                 setCartData(data?.data);
//                 // Calculate the initial total price
//                 const initialTotalPrice = data?.data.reduce((acc, curr) => {
//                     return acc + calculateItemPrice(
//                         curr?.product?.price,
//                         curr?.quantity,
//                         curr?.product?.discount
//                     );
//                 }, 0);
//                 setTotalPrice(initialTotalPrice);
//             };
//             getCartData();
//         }
//     }, [user]);

//     const removeFromCart = async (id) => {
//         const res = await fetch(removeFromCartUrl(id), {
//             method: 'DELETE',
//         });
//         const data = await res.json();
//         console.log(data);

//         if (data?.success) {
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Your item has been removed',
//                 showConfirmButton: false,
//                 timer: 1500,
//             });
//             setCartData(cartData.filter((data) => data._id !== id));
//             // Recalculate the total price after removing an item
//             const newTotalPrice = cartData.reduce((acc, curr) => acc + curr.itemPrice, 0);
//             setTotalPrice(newTotalPrice);
//         }
//     };

//     const updateCartItemQuantity = async (id, newQuantity) => {
//         const res = await fetch(updateCartUrl(id), {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 quantity: newQuantity,
//             }),
//         });
//         const data = await res.json();
//         console.log(data);
//         if (data?.success) {
//             // Calculate the updated item price
//             const updatedCartData = cartData.map((item) => {
//                 if (item._id === id) {
//                     const updatedItem = {
//                         ...item,
//                         quantity: newQuantity,
//                     };
//                     updatedItem.itemPrice = calculateItemPrice(
//                         Math.round(parseInt(item.product?.price)),
//                         newQuantity,
//                         item.product?.discount
//                     );
//                     return updatedItem;
//                 }
//                 return item;
//             });

//             // Update the cartData and recalculate the total price
//             setCartData(updatedCartData);

//             // Recalculate the total price
//             const newTotalPrice = updatedCartData.reduce((acc, curr) => acc + curr.itemPrice, 0);
//             setTotalPrice(newTotalPrice);
//         }
//     };

//     const calculateItemPrice = (price, itemQuantity, discount) => {
//         const discountedPrice = price * (1 - discount / 100);
//         return discountedPrice * itemQuantity;
//     };

//     const totalQuantity = cartData.reduce((acc, curr) => {
//         return acc + curr.quantity;
//     }, 0)

//     return (
//         <RootLayout>
//             <section className=" ">
//                 <div className="mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="mx-auto mt-8 max-w-2xl md:mt-12">
//                         <div className="bg-white shadow">
//                             <div className="px-4 py-6 sm:px-8 sm:py-10">
//                                 <div className="flow-root">
//                                     <ul className="-my-8 flex flex-col gap-4">
//                                         {cartData &&
//                                             cartData?.map((data) => {
// const { product, _id, quantity } = data;

// const itemPrice = calculateItemPrice(
//     Math.round(parseInt(product?.price)),
//     quantity,
//     product?.discount
// )

//                                                 return (
//                                                     <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
// <Link
//     href={`/product/${product?._id}`}
//     className="shrink-0"
// >
//     <Image
//         width={100}
//         height={100}
//         className="h-24 w-24 max-w-full rounded-lg object-cover"
//         src={product?.images[0]}
//         alt={product?.name}
//     />
// </Link>
//                                                         <div className="relative flex flex-1 flex-col justify-between">
//                                                             <div className="sm:col-gap-5 sm:grid sm:grid-cols-2 flex flex-col">
//                                                                 <div className="pr-8 sm:pr-5">
//                                                                     <p className="text-base font-semibold text-gray-900">
//                                                                         {product?.name}
//                                                                     </p>
//                                                                     <p>
// Price : <span className="text-xs font-normal text-gray-400">₹</span>{" "}
// {Math.round(product?.price)}
//                                                                     </p>
//                                                                     <p>
//                                                                         Regular Discount : {product?.discount}%
//                                                                     </p>
//                                                                     <p>
//                                                                         Total Quantity : {totalQuantity}
//                                                                     </p>
//                                                                 </div>
//                                                                 <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start  sm:justify-end">
//                                                                     <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
//                                                                         <span className="text-xs font-normal text-gray-400">₹</span>{" "}
//                                                                         {Math.round(itemPrice)}
//                                                                     </p>
// <div className="sm:order-1">
//     <div className="mx-auto flex h-8 items-stretch text-gray-600">
//         <button
//             className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
//             onClick={() => {
//                 if (quantity > 1) {
//                     updateCartItemQuantity(_id, quantity - 1);
//                 }
//             }}
//         >
//             -
//         </button>
//         <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
//             {quantity}
//         </div>
//         <button
//             className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
//             onClick={() =>
//                 updateCartItemQuantity(_id, quantity + 1)
//             }
//         >
//             +
//         </button>
//     </div>
// </div>
//                                                                 </div>
//                                                             </div>
//                                                             <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
//                                                                 <button
//                                                                     type="button"
//                                                                     onClick={() => removeFromCart(_id)}
//                                                                     className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
//                                                                 >
//                                                                     <svg
//                                                                         className="h-5 w-5"
//                                                                         xmlns="http://www.w3.org/2000/svg"
//                                                                         fill="none"
//                                                                         viewBox="0 0 24 24"
//                                                                         stroke="currentColor"
//                                                                     >
//                                                                         <path
//                                                                             strokeLinecap="round"
//                                                                             strokeLinejoin="round"
//                                                                             strokeWidth={2}
//                                                                             d="M6 18L18 6M6 6l12 12"
//                                                                             className=""
//                                                                         />
//                                                                     </svg>
//                                                                 </button>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                 );
//                                             })}
//                                     </ul>
//                                 </div>
//                                 <div className="mt-6 flex items-center justify-between">
//                                     <p className="text-sm font-medium text-gray-900">Total</p>
//                                     <p className="text-2xl font-semibold text-gray-900">
// <span className="text-xs font-normal text-gray-400">₹</span>{" "}
// {Math.round(totalPrice)}
//                                     </p>
//                                 </div>
//                                 <div className="mt-6 text-center">
//                                     <Link
//                                         href="/checkout"
//                                         className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
//                                     >
//                                         Checkout
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                             strokeWidth={2}
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 d="M13 7l5 5m0 0l-5 5m5-5H6"
//                                             />
//                                         </svg>
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </RootLayout>
//     );
// };

// export default CartPage;


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
            curr?.product?.price,
            curr?.quantity,
            curr?.product?.discount
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
            Math.round(parseInt(item.product?.price)),
            newQuantity,
            item.product?.discount
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

  const totalQuantity = cartData.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0)

  const handelChckout = () =>{
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
                  const { product, _id, quantity } = cart;

                  const itemPrice = calculateItemPrice(
                    Math.round(parseInt(product?.price)),
                    quantity,
                    product?.discount
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
                          <span className="font-bold text-sm">{product?.name}</span>
                          <span className="text-blue-500 text-xs my-2">
                            Regular Discount: {product?.discount}%
                          </span>
                          <button
                            className="font-semibold hover:text-red-500 text-gray-500 text-xs my-2"
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
                        ₹ {Math.round(product?.price)}
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

              <div className="py-4 md:py-10">
                <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
                <div className="border">
                  <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full border" />
                </div>
              </div>
              <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span className="font-semibold">₹   {Math.round(totalPrice)}</span>
                </div>
                <button
                  onClick={()=>handelChckout()}
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
