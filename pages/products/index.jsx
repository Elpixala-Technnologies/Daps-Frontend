import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, ViewGridIcon } from '@heroicons/react/20/solid';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import useProducts from '@/src/Hooks/useProducts';
import ProductSlider from '@/src/Shared/Banner/ProductBanner/ProductBanner';
import RootLayout from '@/src/Layouts/RootLayout';
import ProductCard from '@/src/Shared/Card/ProductCard/ProductCard';

const ProductPage = () => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const { productData, categoryData } = useProducts();
    const itemsPerPage = 9; // Number of items per page
    const [page, setPage] = useState(1);
    const [currentPageData, setCurrentPageData] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(['All']);
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');

    const updateCurrentPageData = () => {
        const start = (page - 1) * itemsPerPage;
        const end = page * itemsPerPage;
        setCurrentPageData(filteredProducts.slice(start, end));
    };

    useEffect(() => {
        if (productData) {
            updateCurrentPageData();
        }
    }, [productData, page, selectedCategories, selectedBrand, selectedStatus]);

    const filteredProducts = productData?.filter((product) => {
        const categoryMatch = selectedCategories.includes('All') || selectedCategories.includes(product.categories);
        const brandMatch = selectedBrand === 'All' || product.brand === selectedBrand;
        const statusMatch = selectedStatus === 'All' || product.status === selectedStatus;

        return categoryMatch && brandMatch && statusMatch;
    });

    const totalPages = Math.ceil((filteredProducts?.length || 0) / itemsPerPage);

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const clearFilters = () => {
        setSelectedCategories(['All']);
        setSelectedBrand('All');
        setSelectedStatus('All');
    };


    return (
        <RootLayout className="bg-white mx-2 md:mx-0 md:container">
            <div className="product-banner">
                <ProductSlider />
            </div>
            <div>
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Mobile filter dialog */}
                    <section aria-labelledby="products-heading" className="my-4">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="lg:col-span-1">
                            <div className="md:hidden block">
                                <Disclosure as="div">
                                    <Disclosure.Button className="flex items-center justify-between py-3 text-sm font-medium text-gray-900">
                                        <span className='text-[1.5rem]'>Categories</span>
                                        <ChevronDownIcon
                                            className={`h-5 w-5 ${mobileFiltersOpen ? 'transform rotate-180' : ''}`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                        <li
                                            key="All"
                                            className={`cursor-pointer ${selectedCategories.includes('All') ? 'text-[#18568C]' : ''}`}
                                            onClick={() => toggleCategory('All')}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes('All')}
                                                readOnly
                                                className="mr-2"
                                            />
                                            All
                                        </li>
                                        {categoryData && categoryData.length > 0 ? (
                                            categoryData.map((category) => {
                                                return (
                                                    <li
                                                        key={category._id} // or key={category.slug} depending on your unique identifier
                                                        className={`cursor-pointer ${selectedCategories.includes(category.name) ? 'text-[#18568C]' : ''}`}
                                                        onClick={() => toggleCategory(category.name)}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedCategories.includes(category.name)}
                                                            readOnly
                                                            className="mr-2"
                                                        />
                                                        {category.name}
                                                    </li>
                                                )
                                            })
                                        ) : (
                                            <div>Loading categories...</div>
                                        )}
                                        <li className="cursor-pointer text-[#18568C]" onClick={clearFilters}>
                                            <button
                                                type="button"
                                                className="bg-[#18568C] text-white px-2 py-1 rounded-md"
                                            >
                                                Clear Filters
                                            </button>
                                        </li>
                                    </Disclosure.Panel>
                                </Disclosure>
                            </div>
                        </div>




                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            <div className="lg:col-span-1">
                                <div className="hidden lg:block">
                                    <Disclosure as="div">
                                        <Disclosure.Button className="flex items-center justify-between py-3 text-sm font-medium text-gray-900">
                                            <span className='text-[1.5rem]'>Categories</span>
                                            <ChevronDownIcon
                                                className={`h-5 w-5 ${mobileFiltersOpen ? 'transform rotate-180' : ''}`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                            <li
                                                key="All"
                                                className={`cursor-pointer ${selectedCategories.includes('All') ? 'text-[#18568C]' : ''}`}
                                                onClick={() => toggleCategory('All')}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategories.includes('All')}
                                                    readOnly
                                                    className="mr-2"
                                                />
                                                All
                                            </li>
                                            {categoryData && categoryData.length > 0 ? (
                                                categoryData.map((category) => {
                                                    return (
                                                        <li
                                                            key={category._id} // or key={category.slug} depending on your unique identifier
                                                            className={`cursor-pointer ${selectedCategories.includes(category.name) ? 'text-[#18568C]' : ''}`}
                                                            onClick={() => toggleCategory(category.name)}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedCategories.includes(category.name)}
                                                                readOnly
                                                                className="mr-2"
                                                            />
                                                            {category.name}
                                                        </li>
                                                    )
                                                })
                                            ) : (
                                                <div>Loading categories...</div>
                                            )}
                                            <li className="cursor-pointer text-[#18568C]" onClick={clearFilters}>
                                                <button
                                                    type="button"
                                                    className="bg-[#18568C] text-white px-2 py-1 rounded-md"
                                                >
                                                    Clear Filters
                                                </button>
                                            </li>
                                        </Disclosure.Panel>
                                    </Disclosure>
                                </div>
                            </div>

                            {/* Product grid with category filtering */}
                            <div className="lg:col-span-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 my-4">
                                    {currentPageData && currentPageData.map((productValueData) => {
                                        return (
                                            <ProductCard key={productValueData._id + "productvalue"} productValueData={productValueData} />
                                        )
                                    })}
                                </div>

                                {/* Pagination */}
                                <div className={`flex items-center justify-center gap-4 mt-11 mb-16`} data-aos="fade-up" data-aos-delay="200">
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
                                                } text-center hover:bg-red-10 text-white border`}
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
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </RootLayout>
    );
};

export default ProductPage;
