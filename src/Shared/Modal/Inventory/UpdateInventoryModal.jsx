import useProducts from '@/src/Hooks/useProducts';
import { updateProductsUrl } from '@/src/Utils/Urls/ProductUrl';
import { Modal } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const UpdateInventoryModal = ({
    isUpdateInventoryModalOpen,
    setIsUpdateInventoryModalOpen,
    selectedProduct
}) => {
    const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const cloud_api = process.env.NEXT_PUBLIC_CLOUDINARY_API;
    const cloud_folder = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
    } = useForm();
    const { refetchProducts } = useProducts()

    const {
        _id,
        discount,
        price,
        quantity
    } = selectedProduct;

    useEffect(() => {
        setValue('price', price);
        setValue('discount', discount);
        setValue('quantity', quantity);
    }, [selectedProduct]);

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (inputValue) => {
        const { discount, price ,quantity} = inputValue;
        console.log(inputValue);

        try {
            setIsLoading(true);
            const res = await fetch(updateProductsUrl(_id), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    discount: discount,
                    price: price,
                    quantity: quantity
                })
            });

            const result = await res.json();

            if (!result) {
                Swal.fire({
                    position: "center",
                    timerProgressBar: true,
                    title: "Something went wrong!",
                    iconColor: "#ED1C24",
                    toast: true,
                    icon: "error",
                    showClass: {
                        popup: "animate__animated animate__fadeInRight",
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutRight",
                    },
                    showConfirmButton: false,
                    timer: 3500,
                });
            } else {
                Swal.fire({
                    position: "center",
                    timerProgressBar: true,
                    title: "Inventory Product Added Successfully!",
                    iconColor: "#ED1C24",
                    toast: true,
                    icon: "success",
                    showClass: {
                        popup: "animate__animated animate__fadeInRight",
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutRight",
                    },
                    showConfirmButton: false,
                    timer: 3500,
                });
                setIsLoading(false);
                setIsUpdateInventoryModalOpen(false);
                refetchProducts()
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title="Update Inventory"
            visible={isUpdateInventoryModalOpen}
            okButtonProps={{ style: { display: 'none' } }}
            onCancel={() => setIsUpdateInventoryModalOpen(false)}
            width={800}
        >
            <div className='flex justify-center items-center flex-col gap-4 mb-4'>
                <h1 className="text-3xl font-semibold text-center">Update Inventory</h1>
                <p>
                    Update Inventory of <span className="font-semibold">{selectedProduct?.name}</span>
                </p>
            </div>
            <div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 mx-auto my-4 "
                >
                    <div className='border-2 rounded px-2'>
                        <label htmlFor="price">Price :</label>
                        <input
                            type="number"
                            placeholder="Price"
                            id='price'
                            defaultValue={price}
                            className='border-2 border-black rounded-md p-2'
                            {...register("price")}
                        />
                    </div>

                    <div className='border-2 rounded px-2'>
                        <label htmlFor="discount">Discount :</label>
                        <input
                            type="number"
                            placeholder="Discount"
                            id='discount'
                            defaultValue={discount}
                            className='border-2 border-black rounded-md p-2'
                            {...register("discount")}
                        />
                    </div>

                    <div className='border-2 rounded px-2'>
                        <label htmlFor="quantity">Quantity :</label>
                        <input
                            type="number"
                            placeholder="Quantity"
                            id='quantity'
                            defaultValue={quantity}
                            className='border-2 border-black rounded-md p-2'
                            {...register("quantity")}
                        />
                    </div>

             
                    <button type="submit" className="common-btn">
                        {isLoading ? (
                            <div className="flex justify-center items-center gap-2">
                                <div className="lds-dual-ring"></div>
                                <span>Updating...</span>
                            </div>
                        ) : (
                            <span>Update</span>
                        )}
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default UpdateInventoryModal;
