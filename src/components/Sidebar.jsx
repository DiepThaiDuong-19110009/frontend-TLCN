import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', fontSize: '14px' }} className='px-0'>
      <CDBSidebar textColor="#f5f5f5" backgroundColor="#000011" style={{ width: '100%' }}>
        <CDBSidebarHeader>
          <p style={{fontSize: '20px' }}>HDKMart Admin</p>
          <p style={{fontSize: '13px', color: '#cccccc' }}>Xin chào, {userInfo.user.name}</p>
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <NavLink exact to="/admin/categorylist" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="list">Danh sách danh mục</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/productlist" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="boxes">Danh sách sản phẩm</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/userlist" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Danh sách người dùng</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/orderlist" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="cart-plus">Danh sách đơn hàng</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/statistic" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Thống kê</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="arrow-left">Thoát</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div style={{ padding: '20px 5px' }}>HDKMART</div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;