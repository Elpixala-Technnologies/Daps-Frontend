import useOrder from '@/src/Hooks/useOrder';
import DashboardLayout from '@/src/Layouts/DashboardLayout';

const OrderPage = () => {
    const { OrderData,handelOrderDelete } = useOrder()

    
    return (
        <DashboardLayout>
            <section>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th
                                scope="col"
                                className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                                S No.
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                                Payment Id
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                                Customer Name
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                                Ordered Product
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {OrderData &&
                            OrderData?.map((order, Index) => {
                                let paymentDetails;
                                if (typeof order?.paymentDetails === 'string') {
                                    paymentDetails = JSON.parse(order.paymentDetails);
                                } else {
                                    paymentDetails = order?.paymentDetails;
                                }


                                return (
                                    <tr key={Index}>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-x-3">
                                                <span>{Index + 1}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                            {paymentDetails.razorpayPaymentId}
                                        </td>

                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                            {order.clientName}
                                        </td>

                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                            {order.product.productName.slice(0,40)}
                                        </td>

                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                            <div className="flex items-center gap-x-6">
                                                <button
                                                    className="text-red-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                                                onClick={() =>
                                                    handelOrderDelete(category?._id)
                                                }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </section>
        </DashboardLayout>
    );
};

export default OrderPage;