// import RootLayout from '@/src/Layouts/RootLayout';
// import Image from 'next/image';
// import { useRouter } from 'next/router';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import { useContext, useEffect, useState } from 'react';
// import { addToCartUrl } from '@/src/Utils/Urls/ProductUrl';
// import Swal from 'sweetalert2';
// import { AuthContext } from '@/src/Context/UserContext';
// import useProducts from '@/src/Hooks/useProducts';

// const ProductDetailsPage = () => {
//     const { productData } = useProducts();
//     const { user } = useContext(AuthContext);
//     const router = useRouter();
//     const { productId } = router.query;
//     let mainProductData;

//     const filterproductData = productData?.filter((data) => {
//         return data?._id === productId;
//     });

//     if (filterproductData && filterproductData.length > 0) {
//         mainProductData = filterproductData[0];
//     } else {
//         console.error(`No data found for ID: ${productId}`);
//     }

//     let product

//     if (filterproductData && filterproductData.length > 0) {
//         product = filterproductData[0];
//     } else {
//         console.error(`No data found for ID: ${productId}`);
//     }


//     const addToCart = async (id) => {
//         const convertPrice = parseInt(product?.price);
//         // Check if the user is logged in
//         if (!user) {
//             // User is not logged in, show an alert
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Please log in to add the product to your cart',
//                 showConfirmButton: true,
//             });
//             return;
//         }

//         const res = await fetch(addToCartUrl(id), {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 product: product?._id,
//                 quantity: 1,
//                 totalPrice: convertPrice,
//                 email: user?.email,
//                 status: "unpaid",
//             }),
//         });

//         const data = await res.json();
//         console.log(data);

//         if (data.success) {
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Your product added to cart',
//                 showConfirmButton: false,
//                 timer: 1500,
//             })
//             router.push('/cart');
//         }
//     }

//     const handelBuyNow = async (id) => {
//         const convertPrice = parseInt(product?.price);
//         // Check if the user is logged in
//         if (!user) {
//             // User is not logged in, show an alert
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Please log in to add the product to your cart',
//                 showConfirmButton: true,
//             });
//             return;
//         }

//         const res = await fetch(addToCartUrl(id), {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 product: product?._id,
//                 quantity: 1,
//                 totalPrice: convertPrice,
//                 email: user?.email,
//                 status: "unpaid",
//             }),
//         });

//         const data = await res.json();
//         console.log(data);

//         if (data.success) {
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Your product added to cart',
//                 showConfirmButton: false,
//                 timer: 1500,
//             })
//             router.push('/checkout');
//         }
//     }
//     const [copiedCoupon, setCopiedCoupon] = useState(null);

//     const handleCopyCoupon = (couponCode) => {
//         navigator.clipboard.writeText(couponCode)
//             .then(() => {
//                 setCopiedCoupon(couponCode);
//                 setTimeout(() => setCopiedCoupon(null), 2000);
//             })
//             .catch((err) => console.error('Failed to copy:', err));
//     };
    
//     const [selectedImage, setSelectedImage] = useState(product?.images[0] || '');

//     const handleImageClick = (image) => {
//         setSelectedImage(image);
//     };


//     return (
//         <RootLayout>
//             <section className='mx-2 md:mx-0 md:container'>
//                 <section className=" sm:py-16">
//                     <div className="container mx-auto px-4">
//                         <div className="lg:col-gap-12 xl:col-gap-16  grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
//                             <div className="lg:col-span-3 lg:row-end-1">
//                                 <div className="lg:flex lg:items-start">
//                                     <div className="lg:order-2 lg:ml-5">
//                                         <div className="max-w-xl overflow-hidden rounded-lg">
//                                             <img
//                                                 className="h-full w-full max-w-full object-cover"
//                                                 src={selectedImage}
//                                                 alt={product.name}
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
//                                         <div className="flex flex-row items-start lg:flex-col">
//                                             {product?.images?.map((image, index) => (
//                                                 <button
//                                                     key={index}
//                                                     type="button"
//                                                     className="flex-0 aspect-square mb-3 mx-2 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
//                                                     onClick={() => handleImageClick(image)}
//                                                 >
//                                                     <img
//                                                         className="h-full w-full object-cover"
//                                                         src={image}
//                                                         alt={product?.name}
//                                                     />
//                                                 </button>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
//                                 <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
//                                     {product?.name}
//                                 </h1>
//                                 <div className="flex items-end">
//                                     <div className='flex gap-4 my-2'>
//                                         <h1 className="font-bold text-[1.8rem] text-slate-900">
//                                             {product?.discount
//                                                 ? `₹ ${Math.floor(product?.price - (product?.price * product?.discount) / 100)}`
//                                                 : `₹ ${Math.floor(product?.price)}`
//                                             }
//                                         </h1>
//                                         <span className="text-sm text-slate-900 line-through mt-1">
//                                             ₹ {Math.floor(product?.price)}
//                                         </span>
//                                         <span className='text-[#18568C]'>
//                                             {Math.floor(product?.discount)} % off
//                                         </span>
//                                     </div>

//                                 </div>

//                                 <h2 className="mt-4 text-base text-gray-900">Brand</h2>
//                                 <div className="mt-3 flex select-none flex-wrap items-center gap-1">
//                                     <label className="">
//                                         <input
//                                             type="radio"
//                                             name="type"
//                                             defaultValue={product?.brand}
//                                             className="peer sr-only"
//                                             defaultChecked=""
//                                         />
//                                         <p className="peer-checked:bg-[#18568C] peer-checked:text-white rounded-lg border border-[#18568C] px-6 py-2 font-bold">
//                                             {product?.brand}
//                                         </p>
//                                     </label>

//                                 </div>
//                                 <h2 className="mt-8 text-base text-gray-900">Categories</h2>
//                                 <div className="mt-3 flex select-none flex-wrap items-center gap-1">
//                                     <label className="">
//                                         <input
//                                             type="radio"
//                                             name="subscription"
//                                             defaultValue={product?.categories}
//                                             className="peer sr-only"
//                                         />
//                                         <p className="peer-checked:bg-[#18568C] peer-checked:text-white rounded-lg border border-[#18568C] px-6 py-2 font-bold">
//                                             {product?.categories}
//                                         </p>
//                                     </label>

//                                 </div>

//                                 <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
//                                     <button
//                                         type="button"
//                                         className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-[#18568C] bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
//                                         onClick={() => addToCart(product?._id)}
//                                     >
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             className="shrink-0 mr-3 h-5 w-5"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                             strokeWidth={2}
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//                                             />
//                                         </svg>
//                                         Add to cart
//                                     </button>
//                                     <button
//                                         type="button"
//                                         className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-[#18568C] bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
//                                         onClick={() => handelBuyNow(product?._id)}
//                                     >
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             className="shrink-0 mr-3 h-5 w-5"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                             strokeWidth={2}
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//                                             />
//                                         </svg>
//                                         Buy Now
//                                     </button>
//                                 </div>
//                                 <ul className="mt-8 space-y-2">
//                                     <li className="flex items-center text-left text-sm font-medium text-gray-600">
//                                         <svg
//                                             className="mr-2 block h-5 w-5 align-middle text-gray-500"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth={2}
//                                                 d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                                                 className=""
//                                             />
//                                         </svg>
//                                         Free shipping worldwide
//                                     </li>
//                                     <li className="flex items-center text-left text-sm font-medium text-gray-600">
//                                         <svg
//                                             className="mr-2 block h-5 w-5 align-middle text-gray-500"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth={2}
//                                                 d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
//                                                 className=""
//                                             />
//                                         </svg>
//                                         Cancel Anytime
//                                     </li>
//                                 </ul>
//                                 <div className='my-4 '>
//                                     <Swiper
//                                         className="couponSwiper"
//                                         spaceBetween={30}
//                                         slidesPerView={1}
//                                         loop={true}
//                                     >
//                                         {product?.coupons && product?.coupons?.map((coupon, index) => (
//                                             <SwiperSlide key={index}

//                                             >
//                                                 <div className="bg-gradient-to-br w-full from-purple-600 to-indigo-600 text-white text-center py-6 px-6 rounded-lg shadow-md relative">
//                                                     <h3 className="text-2xl font-semibold mb-4">
//                                                         {coupon?.couponText}
//                                                     </h3>
//                                                     <div className="flex items-center justify-center md:flex-row gap-4 flex-col space-x-2 mb-6">
//                                                         <span
//                                                             id="cpnCode"
//                                                             className="border-dashed border text-white px-4 py-2 rounded-l"
//                                                         >
//                                                             {coupon?.coupon}
//                                                         </span>
//                                                         <span
//                                                             id="cpnBtn"
//                                                             className="border border-white bg-white text-purple-600 px-4 py-2 rounded-r cursor-pointer"
//                                                             onClick={() => handleCopyCoupon(coupon?.coupon)}
//                                                         >
//                                                             {copiedCoupon === coupon?.coupon ? 'Copied!' : 'Copy Code'}
//                                                         </span>
//                                                     </div>
//                                                     <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6" />
//                                                     <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6" />
//                                                 </div>
//                                             </SwiperSlide>
//                                         ))}
//                                     </Swiper>
//                                 </div>
//                             </div>
//                             <div className="lg:col-span-3">
//                                 <div className="border-b border-gray-300">
//                                     <nav className="flex gap-4">
//                                         <a
//                                             href="#"
//                                             title=""
//                                             className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
//                                         >
//                                             {" "}
//                                             Description{" "}
//                                         </a>

//                                     </nav>
//                                 </div>
//                                 <div className="mt-8 flow-root sm:mt-12">
//                                     <h1 className="text-3xl font-bold">Details</h1>
//                                     <p className="mt-4">
//                                         {product?.details}
//                                     </p>
//                                     <h1 className="mt-8 text-3xl font-bold">
//                                         Features
//                                     </h1>
//                                     <p className="mt-4">
//                                         {
//                                             product?.features && product?.features?.map((feature, index) => {
//                                                 return (
//                                                     <li key={index} className='relative after:w-[10px] mt-2 after:rounded-full after:top-0 after:bottom-0 after:my-auto after:h-[10px] after:bg-[#3d3c3c] after:absolute after:left-0 pl-4'>{feature}</li>
//                                                 )
//                                             })
//                                         }
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//             </section>
//         </RootLayout>
//     );
// };

// export default ProductDetailsPage;

import RootLayout from '@/src/Layouts/RootLayout';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useContext, useEffect, useState } from 'react';
import { addToCartUrl } from '@/src/Utils/Urls/ProductUrl';
import Swal from 'sweetalert2';
import { AuthContext } from '@/src/Context/UserContext';
import useProducts from '@/src/Hooks/useProducts';

const ProductDetailsPage = () => {
    const { productData } = useProducts();
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const { productId } = router.query;

    const filterProductData = productData?.filter((data) => {
        return data?._id === productId;
    });

    let product 

    if (filterProductData && filterProductData.length > 0) {
        product = filterProductData[0];

    } else{
        console.error(`No data found for ID: ${productId}`);
    }

    const addToCart = async (id) => {
        const convertPrice = parseInt(product?.price);
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

        const res = await fetch(addToCartUrl(id), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product: product?._id,
                quantity: 1,
                totalPrice: convertPrice,
                email: user?.email,
                status: "unpaid",
            }),
        });

        const data = await res.json();
        console.log(data);

        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Your product added to cart',
                showConfirmButton: false,
                timer: 1500,
            });
            router.push('/cart');
        }
    }

    const handleCopyCoupon = (couponCode) => {
        navigator.clipboard.writeText(couponCode)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Coupon code copied to clipboard',
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((err) => console.error('Failed to copy:', err));
    };

    const [selectedImage, setSelectedImage] = useState(product?.images[0]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <RootLayout>
            <section className='mx-2 md:mx-0 md:container'>
                <section className="sm:py-16">
                    <div className="container mx-auto px-4">
                        <div className="lg:col-gap-12 xl:col-gap-16 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
                            <div className="lg:col-span-3 lg:row-end-1">
                                <div className="lg:flex lg:items-start">
                                    <div className="lg:order-2 lg:ml-5">
                                        <div className="max-w-xl overflow-hidden rounded-lg">
                                            <img
                                                className="h-full w-full max-w-full object-cover"
                                                src={selectedImage}
                                                alt={product?.name}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                                        <div className="flex flex-row items-start lg:flex-col">
                                            {product?.images?.map((image, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    className="flex-0 aspect-square mb-3 mx-2 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                                                    onClick={() => handleImageClick(image)}
                                                >
                                                    <img
                                                        className="h-full w-full object-cover"
                                                        src={image}
                                                        alt={product?.name}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                                <h1 className=" font-bold text-gray-900 sm:text-3xl">
                                    {product?.name}
                                </h1>
                                <div className="flex items-end">
                                    <div className='flex gap-4 my-2'>
                                        <h1 className="font-bold text-[1.8rem] text-slate-900">
                                            {product?.discount
                                                ? `₹ ${Math.floor(product?.price - (product?.price * product?.discount) / 100)}`
                                                : `₹ ${Math.floor(product?.price)}`
                                            }
                                        </h1>
                                        <span className="text-sm text-slate-900 line-through mt-1">
                                            ₹ {Math.floor(product?.price)}
                                        </span>
                                        <span className='text-[#18568C]'>
                                            {Math.floor(product?.discount)} % off
                                        </span>
                                    </div>
                                </div>
                                <h2 className="mt-4 text-base text-gray-900">Brand</h2>
                                <div className="mt-3 flex select-none flex-wrap items-center gap-1">
                                    <label className="">
                                        <input
                                            type="radio"
                                            name="type"
                                            defaultValue={product?.brand}
                                            className="peer sr-only"
                                            defaultChecked=""
                                        />
                                        <p className="peer-checked:bg-[#18568C] peer-checked:text-white rounded-lg border border-[#18568C] px-6 py-2 font-bold">
                                            {product?.brand}
                                        </p>
                                    </label>
                                </div>
                                <h2 className="mt-8 text-base text-gray-900">Categories</h2>
                                <div className="mt-3 flex select-none flex-wrap items-center gap-1">
                                    <label className="">
                                        <input
                                            type="radio"
                                            name="subscription"
                                            defaultValue={product?.categories}
                                            className="peer sr-only"
                                        />
                                        <p className="peer-checked:bg-[#18568C] peer-checked:text-white rounded-lg border border-[#18568C] px-6 py-2 font-bold">
                                            {product?.categories}
                                        </p>
                                    </label>
                                </div>
                                <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-[#18568C] bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                                        onClick={() => addToCart(product?._id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="shrink-0 mr-3 h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                            />
                                        </svg>
                                        Add to cart
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-[#18568C] bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                                        onClick={() => handelBuyNow(product?._id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="shrink-0 mr-3 h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                            />
                                        </svg>
                                        Buy Now
                                    </button>
                                </div>
                                <ul className="mt-8 space-y-2">
                                    <li className="flex items-center text-left text-sm font-medium text-gray-600">
                                        <svg
                                            className="mr-2 block h-5 w-5 align-middle text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                className=""
                                            />
                                        </svg>
                                        Free shipping worldwide
                                    </li>
                                    <li className="flex items-center text-left text-sm font-medium text-gray-600">
                                        <svg
                                            className="mr-2 block h-5 w-5 align-middle text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                                className=""
                                            />
                                        </svg>
                                        Cancel Anytime
                                    </li>
                                </ul>
                            </div>
                            <div className="lg:col-span-3">
                                <div className="border-b border-gray-300">
                                    <nav className="flex gap-4">
                                        <a
                                            href="#"
                                            title=""
                                            className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                                        >
                                            {" "}
                                            Description{" "}
                                        </a>
                                    </nav>
                                </div>
                                <div className="mt-8 flow-root sm:mt-12">
                                    <h1 className="text-3xl font-bold">Details</h1>
                                    <p className="mt-4">
                                        {product?.details}
                                    </p>
                                    <h1 className="mt-8 text-3xl font-bold">
                                        Features
                                    </h1>
                                    <ul className="mt-4">
                                        {product?.features && product?.features?.map((feature, index) => (
                                            <li key={index} className="relative after:w-[10px] mt-2 after:rounded-full after:top-0 after:bottom-0 after:my-auto after:h-[10px] after:bg-[#3d3c3c] after:absolute after:left-0 pl-4">{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </RootLayout>
    );
};

export default ProductDetailsPage;
