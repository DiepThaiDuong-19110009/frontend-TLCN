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

const Sidebar = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', fontSize: '14px' }} className='px-0'>
      <CDBSidebar textColor="#f5f5f5" backgroundColor="#000011" style={{ width: '100%' }}>
        <CDBSidebarHeader>
          <p style={{ fontSize: '20px', margin: '0px', textAlign: 'center' }}>HDKMart Admin</p>
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <NavLink exact to="/admin/supplierlist" activeClassName="activeClicked">
              <CDBSidebarMenuItem className='mx-0 px-3' id='sidebaritem' icon="boxes">Danh sách nhà cung cấp</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/categorylist" activeClassName="activeClicked">
              <CDBSidebarMenuItem className='mx-0 px-3' id='sidebaritem' icon="list">Danh sách danh mục</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/productlist" activeClassName="activeClicked">
              <CDBSidebarMenuItem className='mx-0 px-3' id='sidebaritem' icon="box-open">Danh sách sản phẩm</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/userlist" activeClassName="activeClicked">
              <CDBSidebarMenuItem className='mx-0 px-3' id='sidebaritem' icon="user">Danh sách người dùng</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/orderlist" activeClassName="activeClicked">
              <CDBSidebarMenuItem className='mx-0 px-3' id='sidebaritem' icon="cart-plus">Danh sách đơn hàng</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/statistic" activeClassName="activeClicked">
              <CDBSidebarMenuItem className='mx-0 px-3' id='sidebaritem' icon="chart-line">Thống kê</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem className='mx-0 px-3' id='sidebaritem' icon="arrow-left">Thoát</CDBSidebarMenuItem>
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