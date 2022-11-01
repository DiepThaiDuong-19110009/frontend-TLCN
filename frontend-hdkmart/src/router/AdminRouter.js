import React from 'react'
import { Row } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';

// Admin
import UserListScreen from '../screens/admin/UserListScreen';
import UserEditScreen from '../screens/admin/UserEditScreen';
import ProductListScreen from '../screens/admin/ProductListScreen';
import ProductEditScreen from '../screens/admin/ProductEditScreen';
import CategoryListScreen from '../screens/admin/CategoryListSceen';
import CategoryEditScreen from '../screens/admin/CategoryEditScreen';
import OrderListScreen from '../screens/admin/OrderListScreen';
import OrderEditScreen from '../screens/admin/OrderEditScreen';
import Sidebar from '../components/Sidebar'
import StatisticScreen from '../screens/admin/StatisticalScreen';

const AdminRouter = () => {
  return (
    <Row className='d-flex flex-nowrap mx-0 py-0' style={{ height: '100vh', maxWidth: '100%' }}>
      <div style={{ maxWidth: '18%', background: 'green' }} className='px-0'>
        <Sidebar />
      </div>
      <div style={{ maxWidth: '82%' }} className='px-0'>
        <Routes>
          <Route path='/userlist' element={<UserListScreen />} />
          <Route path='/user/:id/edit' element={<UserEditScreen />} />
          <Route path='/productlist' element={<ProductListScreen />} />
          <Route path='/product/:id/edit' element={<ProductEditScreen />} />
          <Route path='/categorylist' element={<CategoryListScreen />} />
          <Route path='/category/:id/edit' element={<CategoryEditScreen />} />
          <Route path='/orderlist' element={<OrderListScreen />} />
          <Route path='/order/:id/edit' element={<OrderEditScreen />} />
          <Route path='/statistic' element={<StatisticScreen />} />
        </Routes>
      </div>
    </Row>
  );
}

export default AdminRouter;
