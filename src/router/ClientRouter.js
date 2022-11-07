import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Menu from '../components/Menu';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ShippingScreen from '../screens/ShippingScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PlaceOrderScreen from '../screens/PlaceOrderScreen';
import OrderSuccessScreen from '../screens/OrderSuccessScreen';
import ChangePassword from '../screens/ChangePassword';
import ForgotPassword from '../screens/ForgotPassword';
import MyOrderScreen from '../screens/MyOrderScreen';
import EventScreen from '../screens/EventScreen';
import ScrollTop from '../components/ScrollTop';
import BlogScreen from '../screens/BlogScreen';
import ContactScreen from '../screens/ContactScreen';

const ClientRouter = () => {
  return (
    <>
      <Header />
      <Menu />
      <main className='py-0'>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/product' element={<ProductScreen />} />
          <Route path='/product/:id' element={<ProductDetailScreen />} />
          <Route path='/cart/:id' element={<CartScreen />} />
          <Route path='/cart/' element={<CartScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/changepassword' element={<ChangePassword />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/shipping' element={<ShippingScreen />} />
          <Route path='/payment' element={<PaymentScreen />} />
          <Route path='/placeorder' element={<PlaceOrderScreen />} />
          <Route path='/ordersuccess' element={<OrderSuccessScreen />} />
          <Route path='/myorder' element={<MyOrderScreen />} />
          <Route path='/event' element={<EventScreen />} />
          <Route path='/blog' element={<BlogScreen />} />
          <Route path='/contact' element={<ContactScreen />} />
        </Routes>
      </main>
      <ScrollTop />
      <Footer />
    </>
  );
}

export default ClientRouter;
