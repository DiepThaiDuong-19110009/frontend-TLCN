import { React, createRef } from 'react'
import { Image, Row } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import { useScreenshot, createFileName } from "use-react-screenshot";
import ReactTooltip from 'react-tooltip'

// Admin
import UserListScreen from '../screens/admin/UserListScreen';
import UserEditScreen from '../screens/admin/UserEditScreen';
import ProductListScreen from '../screens/admin/ProductListScreen';
import ProductEditScreen from '../screens/admin/ProductEditScreen';
import CategoryListScreen from '../screens/admin/CategoryListSceen';
import CategoryEditScreen from '../screens/admin/CategoryEditScreen';
import CategoryDetailAdminScreen from '../screens/admin/CategoryDetailScreen';
import OrderListScreen from '../screens/admin/OrderListScreen';
import OrderEditScreen from '../screens/admin/OrderEditScreen';
import Sidebar from '../components/Sidebar'
import StatisticScreen from '../screens/admin/StatisticalScreen';
import SupplierListScreen from '../screens/admin/SupplierListScreen';
import SupplierEditScreen from '../screens/admin/SupplierEditScreen';
import SupplierDetailAdminScreen from '../screens/admin/SupplierDetailScreen';
import HeaderAdmin from '../components/HeaderAdmin';
import ProductDetailAdminScreen from '../screens/admin/ProductAdminDetailScreen';
import UserDetailScreen from '../screens/admin/UserDetailScreen';
import OrderDetailScreen from '../screens/admin/OrderDetailScreen';

const AdminRouter = () => {
  // Take Screenshots
  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });

  const download = (image, { name = "ScreenShot-admin", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };
  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  return (
    <Row className='d-flex flex-nowrap mx-0 py-0' style={{ height: '100vh', maxWidth: '100%' }}>
      <div style={{ maxWidth: '18%', background: 'green' }} className='px-0'>
        <Sidebar />
      </div>
      <div style={{ maxWidth: '82%' }} className='px-0'>
        <div style={{ height: '10vh' }} className='d-flex justify-content-end align-items-center shadow-sm px-4'>
          
          <HeaderAdmin />
        </div>
        <div ref={ref} style={{ height: '90vh' }}>
          <Routes>
            <Route path='/userlist' element={<UserListScreen />} />
            <Route path='/user/:id/edit' element={<UserEditScreen />} />
            <Route path='/user/:id/detail' element={<UserDetailScreen />} />
            <Route path='/supplierlist' element={<SupplierListScreen />} />
            <Route path='/supplier/:id/edit' element={<SupplierEditScreen />} />
            <Route path='/supplier/:id/detail' element={<SupplierDetailAdminScreen />} />
            <Route path='/productlist' element={<ProductListScreen />} />
            <Route path='/product/:id/edit' element={<ProductEditScreen />} />
            <Route path='/product/:id/detail' element={<ProductDetailAdminScreen />} />
            <Route path='/categorylist' element={<CategoryListScreen />} />
            <Route path='/category/:id/edit' element={<CategoryEditScreen />} />
            <Route path='/category/:id/detail' element={<CategoryDetailAdminScreen />} />
            <Route path='/orderlist' element={<OrderListScreen />} />
            <Route path='/order/:id/edit' element={<OrderEditScreen />} />
            <Route path='/order/:id/detail' element={<OrderDetailScreen />} />
            <Route path='/statistic' element={<StatisticScreen />} />
          </Routes>
        </div>
      </div>
    </Row>
  );
}

export default AdminRouter;
