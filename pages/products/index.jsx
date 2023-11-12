import React, { Fragment, useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon, Squares2X2Icon } from '@heroicons/react/20/solid';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import useProducts from '@/src/Hooks/useProducts';
import ProductSlider from '@/src/Shared/Banner/ProductBanner/ProductBanner';
import RootLayout from '@/src/Layouts/RootLayout';
import ProductCard from '@/src/Shared/Card/ProductCard/ProductCard';
import useCar from '@/src/Hooks/useCar';

const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const ProductPage = () => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const { productData, categoryData } = useProducts();
    const { CarData } = useCar()
    const itemsPerPage = 8; // Number of items per page
    const [page, setPage] = useState(1);
    const [currentPageData, setCurrentPageData] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(['All']);

    const updateCurrentPageData = () => {
        const start = (page - 1) * itemsPerPage;
        const end = page * itemsPerPage;
        setCurrentPageData(filteredProducts.slice(start, end));
    };

    useEffect(() => {
        if (productData) {
            updateCurrentPageData();
        }
    }, [productData, page, selectedCategories]);

    const filteredProducts = productData?.filter((product) => {
        const categoryMatch = selectedCategories.includes('All') || selectedCategories.includes(product.categories);
        return categoryMatch;
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
    };

    const filters = {
        category: false,
        size: false,
        color: false,
        price: false,
      };
    
    
      const [activeFilter, setActiveFilter] = useState(null);
    
      const handleToggleFilter = (filter) => {
        if (activeFilter === filter) {
          setActiveFilter(null); // Close the currently active filter
        } else {
          setActiveFilter(filter); // Open the selected filter and close any previously active filter
        }
      };
    


    return (
        <RootLayout>
            <div className="product-banner  ">
                <ProductSlider />
            </div>
            <div className="container">
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto pt-20 flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <div className="mt-4 border-t border-gray-200">
                                        <Disclosure as="div" className="border-b border-gray-200 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500 ml-10">
                                                            <span className="font-medium text-gray-900">Category</span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6 ml-10">
                                                        <div className="space-y-4">
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
                                                                    );
                                                                })
                                                            ) : (
                                                                <div>Loading categories...</div>
                                                            )}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>


                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="md:text-4xl font-bold tracking-tight text-gray-900">All Products</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <a
                                                            href={option.href}
                                                            className={classNames(
                                                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-10">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <div className="hidden lg:block">
                               
                <div className="border-b border-gray-200 py-6">
                  <button onClick={() => handleToggleFilter('category')} className=" font-semibold">Category</button>

                  {activeFilter === 'category' && <>
                    <div className="space-y-4">
                      {categoryData && categoryData.length > 0 ? (
                        categoryData.map((category) => {
                          return (
                            <li
                              key={category._id}
                              className={`cursor-pointer mt-2 ${selectedCategories.includes(category.name) ? 'text-[#18568C]' : ''}`}
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
                    </div>
                  </>}

                </div>

                            </div>


                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                    {/* Product grid with category filtering */}
                                    <div className="lg:col-span-4">
                                        {/* Product grid code */}
                                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                            {currentPageData.map((productValueData) => (
                                                <ProductCard key={productValueData._id + "productvalue"} productValueData={productValueData} />
                                            ))}
                                        </div>

                                        {/* Pagination */}
                                        <div className="flex items-center justify-center gap-4 mt-11 mb-16">
                                            <button
                                                title="Previous"
                                                className={`h-14 w-14 rounded-full text-center ${page === 1 ? "bg-gray-400 cursor-not-allowed" : "hover:bg-red-10"
                                                    } text-white bg-black   ${page === 1 ? "bg-gray-400" : "bg-[#18568C]"
                                                    } flex items-center justify-center`}
                                                onClick={handlePrevPage}
                                                disabled={page === 1}
                                            >
                                                <FaArrowLeft className="text-white" />
                                            </button>
                                            {Array.from({ length: totalPages }).map((_, index) => (
                                                <button
                                                    key={index}
                                                    className={`h-14 w-14 hover:text-white rounded-full bg-[#18568C] ${page === index + 1 ? "text-white bg-[#18568C]" : "bg-black-10"
                                                        } text-center hover:bg-red-10 text-white border`}
                                                    onClick={() => setPage(index + 1)}
                                                    disabled={page === index + 1}
                                                >
                                                    {index + 1}
                                                </button>
                                            ))}
                                            <button
                                                title="Next"
                                                className={`h-14 w-14 text-center rounded-full ${page === totalPages
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "hover-bg-red-10"
                                                    } text-white bg-black  border ${page === totalPages ? "bg-gray-400" : "bg-[#18568C]"
                                                    } flex items-center justify-center`}
                                                onClick={handleNextPage}
                                                disabled={page === totalPages}
                                            >
                                                <FaArrowRight className="text-white" />
                                            </button>
                                        </div>
                                    </div>
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
