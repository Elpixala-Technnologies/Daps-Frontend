import ManageProduct from '@/src/Components/Dashboard/Product/ManageProduct/ManageProduct';
import DashboardLayout from '@/src/Layouts/DashboardLayout';

const ManageProductPage = () => {
  return (
    <DashboardLayout>
      <div className='manage-product-section container'>
        <div className='manage-product-title my-2'>
          <h2 className='font-bold text-2xl'>Update Products</h2>
        </div>
        <div>
          <ManageProduct />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageProductPage;
