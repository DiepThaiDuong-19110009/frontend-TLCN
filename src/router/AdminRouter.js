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
import CategoryEditAdminScreen from '../screens/admin/CategoryDetailScreen';
import OrderListScreen from '../screens/admin/OrderListScreen';
import OrderEditScreen from '../screens/admin/OrderEditScreen';
import Sidebar from '../components/Sidebar'
import StatisticScreen from '../screens/admin/StatisticalScreen';
import SupplierListScreen from '../screens/admin/SupplierListScreen';
import SupplierEditScreen from '../screens/admin/SupplierEditScreen';
import HeaderAdmin from '../components/HeaderAdmin';

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
        <div style={{ height: '10vh' }} className='d-flex justify-content-between align-items-center shadow-sm px-4'>
          <Image data-tip data-for="tip4" onClick={downloadScreenshot} style={{ width: '30px', cursor: 'pointer' }} src='https://static.thenounproject.com/png/3244586-200.png' alt='ScreenShot'></Image>
          <ReactTooltip id="tip4" place="right" effect="solid">
            Chụp màn hình
          </ReactTooltip>
          <HeaderAdmin />
        </div>
        <div ref={ref} style={{ height: '90vh' }}>
          <Routes>
            <Route path='/userlist' element={<UserListScreen />} />
            <Route path='/user/:id/edit' element={<UserEditScreen />} />
            <Route path='/supplierlist' element={<SupplierListScreen />} />
            <Route path='/supplier/:id/edit' element={<SupplierEditScreen />} />
            <Route path='/productlist' element={<ProductListScreen />} />
            <Route path='/product/:id/edit' element={<ProductEditScreen />} />
            <Route path='/categorylist' element={<CategoryListScreen />} />
            <Route path='/category/:id/edit' element={<CategoryEditScreen />} />
            <Route path='/category/:id/detail' element={<CategoryEditAdminScreen />} />
            <Route path='/orderlist' element={<OrderListScreen />} />
            <Route path='/order/:id/edit' element={<OrderEditScreen />} />
            <Route path='/statistic' element={<StatisticScreen />} />
          </Routes>
        </div>
      </div>
    </Row>
  );
}

export default AdminRouter;
