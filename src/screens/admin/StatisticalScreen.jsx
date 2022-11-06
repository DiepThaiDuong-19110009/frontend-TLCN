import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { getIncome } from '../../actions/statisticalActions';
import { listCategory, listProducts } from '../../actions/productActions';
import { listUsers } from '../../actions/userActions'
import { listSupplier } from '../../actions/supplierActions';
import { getOrder } from '../../actions/orderActions'

const StatisticScreen = () => {
    const dispatch = useDispatch()

    const { income } = useSelector(state => state.incomeList)
    const { suppliers } = useSelector(state => state.supplierList)
    const { categories } = useSelector(state => state.categoryList)
    const { products } = useSelector(state => state.productList)
    const { users } = useSelector(state => state.userList)
    const { orders } = useSelector(state => state.orderList)

    useEffect(() => {
        dispatch(getIncome())
        dispatch(listSupplier())
        dispatch(listCategory())
        dispatch(listProducts())
        dispatch(listUsers())
        dispatch(getOrder())
        //eslint-disable-next-line 
    }, [dispatch, getIncome])

    return (
        <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px' }} className='py-5 px-5'>
            <div className="col-md-12">
                <h3 className='pb-3'>Thống kê</h3>
            </div>

            <div className='d-flex justify-content-between flex-wrap py-5' style={{ width: '100%' }}>
                <div style={{ padding: '10px', marginBottom: '20px', width: '23%', background: '#00c0ef', borderRadius: '10px' }} className='d-flex justify-content-between align-items-center'>
                    <div style={{ color: 'white', padding: '3%' }}>
                        <h1>{suppliers.length}</h1>
                        <h5>Nhà cung cấp</h5>
                    </div>
                    <i className="fas fa-boxes" style={{ fontSize: '60px', color: '#02a2c6', paddingRight: '15px' }}></i>
                </div>
                <div style={{ padding: '10px', marginBottom: '20px', width: '23%', background: '#dd4c37', borderRadius: '10px' }} className='d-flex justify-content-between align-items-center'>
                    <div style={{ color: 'white', padding: '3%' }}>
                        <h1>{categories.length}</h1>
                        <h5>Danh mục</h5>
                    </div>
                    <i className="fas fa-list-ul" style={{ fontSize: '60px', color: '#ba4031', paddingRight: '15px' }}></i>
                </div>
                <div style={{ padding: '10px', marginBottom: '20px', width: '23%', background: '#f39c11', borderRadius: '10px' }} className='d-flex justify-content-between align-items-center'>
                    <div style={{ color: 'white', padding: '3%' }}>
                        <h1>{products?.length}</h1>
                        <h5>Sản phẩm</h5>
                    </div>
                    <i className="fas fa-box-open" style={{ fontSize: '60px', color: '#cf870f', paddingRight: '15px' }}></i>
                </div>
                <div style={{ padding: '10px', marginBottom: '20px', width: '23%', background: '#3d9970', borderRadius: '10px' }} className='d-flex justify-content-between align-items-center'>
                    <div style={{ color: 'white', padding: '3%' }}>
                        <h1>{users?.length}</h1>
                        <h5>Người dùng</h5>
                    </div>
                    <i className="fas fa-users" style={{ fontSize: '60px', color: '#338260', paddingRight: '15px' }}></i>
                </div>
                <div style={{ padding: '10px', marginBottom: '20px', width: '23%', background: '#0073b6', borderRadius: '10px' }} className='d-flex justify-content-between align-items-center'>
                    <div style={{ color: 'white', padding: '3%' }}>
                        <h1>{orders.length}</h1>
                        <h5>Đơn hàng</h5>
                    </div>
                    <i className="fas fa-cart-arrow-down" style={{ fontSize: '60px', color: '#00629d', paddingRight: '15px' }}></i>
                </div>
            </div>

            <div className="section pt-5">
                <h5 className="section-title">Doanh thu bán hàng theo tháng</h5>
                <div className="section-content">
                    <ResponsiveContainer width="100%" height={500} p>
                        <LineChart data={income} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
                            <Tooltip />
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Legend />
                            <Line type="monotone" dataKey="totalAvenue" stroke="#009900" />
                            {/* <Line type="monotone" dataKey="total" stroke="#17A8F5" /> */}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="section">
                <h5 className="section-title">Sản phẩm bán ra</h5>
                <div className="section-content">
                    <ResponsiveContainer width="100%" height={500}>
                        <BarChart data={income} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Tooltip />
                            <Legend />
                            {/* <Bar dataKey="totalAvenue" fill="#FB8833" /> */}
                            <Bar dataKey="total" fill="#17A8F5" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
}

export default StatisticScreen



