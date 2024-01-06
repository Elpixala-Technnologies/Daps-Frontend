import { AuthContext } from '@/src/Context/UserContext';
import usePayment from '@/src/Hooks/usePayment';
import RootLayout from '@/src/Layouts/RootLayout';
import AddressModal from '@/src/Shared/Modal/AddressModal/AddressModal';
import { getAddressByEmailUrl } from '@/src/Utils/Urls/AddressUrl';
import { getCartUrl, removeFromCartUrl, updateCartUrl } from '@/src/Utils/Urls/ProductUrl';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { checkoutOrderUrl, paymentverificationUrl } from '../../src/Utils/Urls/PaymentUrl';
import Swal from 'sweetalert2';
import { addOrderUrl } from '@/src/Utils/Urls/OrderUrl';
import { useRouter } from 'next/router';

const CheckoutPage = () => {
    const [isAddressModalOpen,
        setIsAddressModalOpen,] = useState(false);
    const [cartData, setCartData] = useState([]);
    const { user } = useContext(AuthContext);
    const [currentStep, setCurrentStep] = useState(0);
    const { register, handleSubmit } = useForm();
    const { getRezarPayKey } = usePayment()
    const [totalPrice, setTotalPrice] = useState()
    const router = useRouter();


    useEffect(() => {
        if (user) {
            const getCartData = async () => {
                const res = await fetch(getCartUrl(user?.email));
                const data = await res.json();
                setCartData(data?.data);
            };
            getCartData();
        }
    }, [user]);

    const handleAddressModal = () => {
        setIsAddressModalOpen(true);
    }
    const {
        data: AddressData,
        isLoading: Adddressoaded,
        refetch: refetchAdddress,
    } = useQuery({
        queryKey: ["AdddressData"],
        queryFn: async () => {
            try {
                const res = await fetch(getAddressByEmailUrl(user?.email));
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await res.json();
                return data.data;
            } catch (error) {
                // Handle the error, you can log it or return a default value
                console.error("Error fetching data:", error);
                throw error; // Rethrow the error so it's propagated to the caller
            }
        },
    });

    // show the total price form the cartData with calcultaed price with discout
    const calculateTotalPrice = (cartItems) => {
        return cartItems.reduce((total, item) => {
            // Calculate the price for each item considering the discount
            const priceAfterDiscount = item?.basedPrice - (item?.basedPrice * item?.discount / 100);
            // Total price for the item is price after discount multiplied by quantity
            const totalPriceForItem = priceAfterDiscount * item?.quantity;
            // Accumulate the total price
            return total + totalPriceForItem;
        }, 0);
    };

    const calculateItemPrice = (price, itemQuantity, discount) => {
        const discountedPrice = price * (1 - discount / 100);
        return discountedPrice * itemQuantity;
    };


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
            const newTotalPrice = updatedCartData?.reduce((acc, curr) => acc + curr.itemPrice, 0);
            setTotalPrice(newTotalPrice);
        }
    };


    useEffect(() => {
        const mainPrice = calculateTotalPrice(cartData);
        setTotalPrice(mainPrice);
    }, [cartData]);


    // const checkoutHandler = async (amount) => {
    //     const { data: { order } } = await axios.post(checkoutOrderUrl, {
    //         amount
    //     })

    //     const options = {
    // key: process.env.RAZORPAY_API_KEY,
    // amount: order.amount,
    // currency: "INR",
    // name: user?.displayName,
    // description: "DAPS",
    // image: cartData[0]?.product?.images[0],
    // order_id: order?.id,
    // callback_url: paymentverificationUrl,
    // prefill: {
    //     name: user?.displayName,
    //     email: user?.email,
    //     contact: user?.email
    // },
    // notes: {
    //     "address": AddressData[0]
    // },
    // theme: {
    //     "color": "#121212"
    // }
    //     };
    //     const razor = new window.Razorpay(options);
    //     razor.open();
    // }


    const checkoutHandler = async (amount) => {
        const { data: { order } } = await axios.post(checkoutOrderUrl, {
            amount
        });

        const handlePaymentSuccess = async (response) => {
            // Construct the order object
            const orderData = {
                shippingAddress: AddressData[0],
                clientName: user?.displayName,
                clientPhone: user?.phone,
                paymentDetails:  JSON.stringify({
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                }),
                productDetails: cartData.map(item => ({
                    productDetails: item?.productDetails,
                    productId: item?.product._id,
                    quantity: item?.quantity,
                    price: item?.basedPrice,
                    discount: item?.discount,
                })),
                carInfo: cartData.map(item => ({
                    carBrand: item?.carInfo?.carBrand,
                    carName: item?.carInfo?.carName,
                    carGeneration: item?.carInfo?.carGeneration,
                    carModel: item?.carInfo?.carModel,
                    carModelData: item?.carInfo?.carModelData
                })),
                product: cartData[0]?.product?._id,
                totalPrice: totalPrice,
                email: user?.email,
                quantity: cartData?.length,
                status: 'pending',
            };

            // Call your order API
            try {
                const orderResponse = await axios.post(addOrderUrl, orderData);
                console.log('Order created:', orderResponse.data);
                router.push(`/paymentsuccess`);
            } catch (error) {
                console.error('Error creating order:', error); 
            }
        };

        // Razorpay options
        const options = {
            key: process.env.RAZORPAY_API_KEY,
            amount: order.amount,
            currency: "INR",
            name: user?.displayName,
            description: "DAPS",
            image: cartData[0]?.product?.images[0],
            order_id: order?.id,
            callback_url: paymentverificationUrl,
            prefill: {
                name: user?.displayName,
                email: user?.email,
                contact: user?.email
            },
            notes: {
                "address": AddressData[0]
            },
            theme: {
                "color": "#121212"
            },
            handler: handlePaymentSuccess,
        };

        // Initialize and open Razorpay payment gateway
        const razor = new window.Razorpay(options);
        razor.open();
    };



    const steps = [
        { label: 'Order Summary', icon: 'shopping-cart' },
        { label: 'Shipping Address', icon: 'location-marker' },
        { label: 'Payment', icon: 'credit-card' },
    ];

    return (
        <RootLayout>
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                    <a href="#" className="text-2xl font-bold text-gray-800">
                        DAPS
                    </a>
                    <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                        <div className="relative">
                            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                                {steps.map((step, index) => (
                                    <li
                                        key={step.label}
                                        className={`flex items-center space-x-3 text-left sm:space-x-4 ${index === currentStep ? 'text-gray-900' : 'text-gray-500'
                                            }`}
                                    >
                                        <a
                                            className={`flex h-6 w-6 items-center justify-center rounded-full ${index === currentStep ? 'bg-emerald-200 text-emerald-700' : 'bg-gray-400 text-white'
                                                } text-xs font-semibold`}
                                            href="#"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d={index < currentStep ? 'M5 13l4 4L19 7' : 'M5 13l4 4M19 7l-4 4'} />
                                            </svg>
                                        </a>
                                        <span className={`font-semibold ${index === currentStep ? 'text-gray-900' : 'text-gray-500'}`}>{step.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='md:w-[80%] mx-auto'>
                    {
                        currentStep === 0 && (
                            <>
                                <div className="px-4 pt-8">
                                    <p className="text-xl font-medium">Order Summary</p>
                                    <p className="text-gray-400">
                                        Check your items. And select a suitable shipping method.
                                    </p>

                                    <p className="text-gray-400">
                                        Total Product : {cartData?.length}
                                    </p>

                                    <p className="text-gray-400">
                                        Total Cost :  <span className="text-xs font-normal text-gray-400">₹</span>{" "} {Math.round(totalPrice)}
                                    </p>

                                    <div className="mt-8 space-y-3 rounded-lg  bg-white px-2 py-4 sm:px-6 flex flex-col gap-4">
                                        {
                                            cartData && cartData?.map((cartValueData) => {
                                                const { product, _id, quantity, basedPrice, discount } = cartValueData;
                                                const itemPrice = basedPrice * quantity;

                                                // Calculate the discount amount
                                                const discountAmount = itemPrice * (discount / 100);

                                                // Calculate the final price after applying discount
                                                const finalPrice = itemPrice - discountAmount;
                                                return (
                                                    <div className="flex flex-col rounded-lg bg-white sm:flex-row border">
                                                        <img
                                                            className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                                                            src={product?.images[0]}
                                                            alt={product?.name}
                                                        />
                                                        <div className="flex w-full flex-col px-4 py-4">
                                                            <span className="font-semibold">
                                                                {product?.name}
                                                            </span>
                                                            <span className="float-right text-gray-400">
                                                                Total Quantity: {quantity}
                                                            </span>
                                                            <p className="text-lg font-bold">
                                                                Price : <span className="text-xs font-normal text-gray-400">₹</span>{" "} {Math.round(finalPrice)}
                                                            </p>

                                                            <div className='flex gap-3 items-center flex-col md:flex-row'>
                                                                <button
                                                                    className="font-semibold text-[1.3rem] text-red-500 border px-2 py-1 rounded text-xs my-2"
                                                                    onClick={() => removeFromCart(_id)}
                                                                >
                                                                    Remove
                                                                </button>
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
                                                            </div>
                                                        </div>



                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                                {/* add previuse and next  */}

                                <div>
                                    <button
                                        className="mt-4 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                                        onClick={() => setCurrentStep(currentStep + 1)}
                                    >
                                        Next
                                    </button>
                                </div>

                            </>
                        )
                    }

                    {
                        currentStep === 1 && (
                            <>
                                <div className='px-4 pt-8 w-full'>
                                    <p className="text-xl font-medium">Shipping Address</p>
                                    <div>
                                        <button
                                            className="mt-4 mb-2 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                                            onClick={handleAddressModal}
                                        >
                                            Add New Address
                                        </button>
                                    </div>

                                    <div className='flex flex-col gap-4 border p-2 rounded'>
                                        {
                                            AddressData && AddressData?.slice(0, 1)?.map((addressValueData) => {
                                                return (
                                                    <div className='flex gap-4 flex-col my-4'>
                                                        <div
                                                            className='border-2 border-gray-300 rounded-md p-2 flex gap-2 items-center'
                                                        >
                                                            <input
                                                                type="text"
                                                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                                                defaultValue={addressValueData.name}
                                                                {...register("name")}
                                                            />
                                                        </div>
                                                        <div
                                                            className='border-2 border-gray-300 rounded-md p-2 flex gap-2 items-center'
                                                        >
                                                            <input type="text"
                                                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                                                defaultValue={addressValueData.level}
                                                                {...register("level")}
                                                            />
                                                        </div>
                                                        <div
                                                            className='border-2 border-gray-300 rounded-md p-2 flex gap-2 items-center'
                                                        >
                                                            <input type="text"
                                                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                                                defaultValue={addressValueData.address}
                                                                {...register("address")}
                                                            />
                                                        </div>

                                                        <div
                                                            className='border-2 border-gray-300 rounded-md p-2 flex gap-2 items-center'
                                                        >
                                                            <input type="text"
                                                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                                                defaultValue={addressValueData.city}
                                                                {...register("city")}
                                                            />
                                                        </div>

                                                        <div
                                                            className='border-2 border-gray-300 rounded-md p-2 flex gap-2 items-center'
                                                        >
                                                            <input type="text"
                                                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                                                defaultValue={addressValueData.state}
                                                                {...register("state")}
                                                            />
                                                        </div>

                                                        <div
                                                            className='border-2 border-gray-300 rounded-md p-2 flex gap-2 items-center'
                                                        >
                                                            <input type="text"
                                                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                                                defaultValue={addressValueData.zip}
                                                                {...register("zip")}
                                                            />
                                                        </div>

                                                        <div
                                                            className='border-2 border-gray-300 rounded-md p-2 flex gap-2 items-center'
                                                        >
                                                            <input type="text"
                                                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                                                defaultValue={addressValueData.country}
                                                                {...register("country")}
                                                            />
                                                        </div>

                                                        <div
                                                            className='border-2 border-gray-300 rounded-md p-2 flex gap-2 items-center'
                                                        >
                                                            <input type="text"
                                                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                                                defaultValue={addressValueData.phone}
                                                                {...register("phone")}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                <div className='flex gap-2 justify-center my-4'>
                                    {/* === add previuse and next = */}
                                    <button
                                        className="mt-4 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                                        onClick={() => setCurrentStep(currentStep - 1)}
                                    >
                                        Previous
                                    </button>

                                    <button
                                        className='mt-4 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white'
                                        onClick={() => setCurrentStep(currentStep + 1)}
                                    >
                                        <a className="mt-4 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
                                            Next
                                        </a>
                                    </button>
                                </div>

                            </>
                        )
                    }

                    {
                        currentStep === 2 && (
                            <>
                                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                                    <p className="text-xl font-medium">Payment Details</p>
                                    <p className="text-gray-400">
                                        Complete your order by providing your payment details.
                                    </p>

                                    <button className="mt-4 mb-8 border mx-auto w-full text-[1.4rem] rounded-md px-6 py-3 font-medium"
                                        onClick={
                                            () => checkoutHandler(totalPrice)
                                        }
                                    >
                                        <div className='flex justify-center items-center gap-2'>
                                            <h1>
                                                Pay Now
                                            </h1>
                                            <img
                                                src="https://res.cloudinary.com/dapscar/image/upload/v1704476384/Daps/nza7l8dgrlfyn7cjsger.svg"
                                                alt="DAPS"
                                                className='w-[15%] h-auto'
                                            />
                                        </div>
                                    </button>
                                </div>

                                <div className='flex gap-2 justify-center my-4'>
                                    {/* === add previuse and next = */}
                                    <button
                                        className="mt-4 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                                        onClick={() => setCurrentStep(currentStep - 1)}
                                    >
                                        Previous
                                    </button>
                                </div>
                            </>
                        )
                    }
                </div>

            </div>

            <AddressModal
                isAddressModalOpen={isAddressModalOpen}
                setIsAddressModalOpen={setIsAddressModalOpen}
                refetchUserAdddress={refetchAdddress}
            />
        </RootLayout>
    );
};

export default CheckoutPage;