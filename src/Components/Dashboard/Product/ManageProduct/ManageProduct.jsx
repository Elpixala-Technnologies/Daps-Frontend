import useProducts from "@/src/Hooks/useProducts";
import Link from "next/link";
import React, { useState } from 'react';
import { FaRegEdit, FaRegTrashAlt,FaArrowLeft, FaArrowRight } from 'react-icons/fa';


const ManageProduct = () => {
    const { handelProductDelete, productData } = useProducts();
    const itemsPerPage = 9; // Number of items per page
    const [page, setPage] = useState(1);

    // Calculate the starting and ending indexes for the current page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Filter products to display only the ones for the current page
    const productsToDisplay = productData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(productData.length / itemsPerPage);

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <section>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                {productsToDisplay &&
                    productsToDisplay?.length &&
                    productsToDisplay?.map((porductData) => {
                        const { _id, name, price,  discount ,images} = porductData;
                        return (
                            <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
                                key={_id}
                            >
                                <a
                                    className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                                    href="#"
                                >

                                    <img
                                        width={300}
                                        height={300}
                                        src={images[0]}
                                        className="w-full h-full object-cover object-center"
                                        alt="product image"
                                    />

                                    <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                                        {discount}%
                                    </span>
                                </a>
                                <div className="mt-4 px-5 pb-5">
                                    <a href="#">
                                        <h5 className="text-xl tracking-tight text-slate-900">
                                            {name}
                                        </h5>
                                    </a>
                                    <div className="mt-2 mb-5 flex items-center justify-between">
                                        <p>
                                            <span className="text-3xl font-bold text-slate-900">{price}</span>
                                            <span className="text-sm text-slate-900 line-through">
                                                {Math.round(price + (price * discount) / 100)}
                                            </span>
                                        </p>
                                    </div>

                                    <div className='flex gap-4  items-center'>
                                        <button className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                            onClick={() => handelProductDelete(_id)}
                                        >
                                            <FaRegTrashAlt />
                                        </button>
                                        <Link className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                            href={`/dashboard/update-product/${_id}`}
                                        >
                                            <FaRegEdit /> Update
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>

            <div className="flex items-center justify-center gap-4 mt-11 mb-16" data-aos="fade-up" data-aos-delay="200">
                <button
                    title="Previous"
                    className={`h-14 w-14 text-center ${page === 1 ? "bg-gray-400 cursor-not-allowed" : "hover:bg-red-10"
                        } text-white bg-black rounded-l-md border ${page === 1 ? "bg-gray-400" : "bg-[#18568C]"
                        } flex items-center justify-center`}
                    onClick={handlePrevPage}
                    disabled={page === 1}
                >
                    <FaArrowLeft className="text-white" />
                </button>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        className={`h-14 w-14 hover:text-white bg-[#18568C] ${page === index + 1 ? "text-white bg-[#18568C]" : "bg-black-10"
                            } text-center hover-bg-red-10 text-white border`}
                        onClick={() => setPage(index + 1)}
                        disabled={page === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    title="Next"
                    className={`h-14 w-14 text-center ${page === totalPages
                        ? "bg-gray-400 cursor-not-allowed"
                        : "hover:bg-red-10"
                        } text-white bg-black rounded-r-md border ${page === totalPages ? "bg-gray-400" : "bg-[#18568C]"
                        } flex items-center justify-center`}
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                >
                    <FaArrowRight className="text-white" />
                </button>
            </div>
        </section>
    );
};

export default ManageProduct;