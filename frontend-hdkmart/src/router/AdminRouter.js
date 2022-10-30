import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Admin
import UserListScreen from '../screens/admin/UserListScreen';
import UserEditScreen from '../screens/admin/UserEditScreen';
import ProductListScreen from '../screens/admin/ProductListScreen';
import ProductEditScreen from '../screens/admin/ProductEditScreen';
import CategoryListScreen from '../screens/admin/CategoryListSceen';
import CategoryEditScreen from '../screens/admin/CategoryEditScreen';
import AdminScreen from '../screens/admin/AdminScreen';
import OrderListScreen from '../screens/admin/OrderListScreen';
import OrderEditScreen from '../screens/admin/OrderEditScreen';

const App = () => {
  return (
    <>
      <Routes>
        <main className='py-0'>
          <Routes>
            {/* Admin */}
            <Route path='/admin' element={<AdminScreen />} />
            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            <Route path='/admin/productlist' element={<ProductListScreen />} />
            <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
            <Route path='/admin/categorylist' element={<CategoryListScreen />} />
            <Route path='/admin/category/:id/edit' element={<CategoryEditScreen />} />
            <Route path='/admin/orderlist' element={<OrderListScreen />} />
            <Route path='/admin/order/:id/edit' element={<OrderEditScreen />} />
          </Routes>
        </main>
      </Routes>
    </>
  );
}

export default App;
