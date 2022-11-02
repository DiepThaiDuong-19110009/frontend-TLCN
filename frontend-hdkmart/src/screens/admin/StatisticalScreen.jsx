import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { getIncome } from '../../actions/statisticalActions';
import { listCategory, listProducts } from '../../actions/productActions';
import { listUsers } from '../../actions/userActions'
import { getOrder } from '../../actions/orderActions'

const StatisticScreen = () => {
    const dispatch = useDispatch()

    const { income } = useSelector(state => state.incomeList)
    // console.log('==', income)

    const { categories } = useSelector(state => state.categoryList)
    // console.log('==', categories)

    const { products } = useSelector(state => state.productList)
    // console.log('==', categories)

    const { users } = useSelector(state => state.userList)
    // console.log('==', categories)

    const { orders } = useSelector(state => state.orderList)
    // console.log('==', categories)

    useEffect(() => {
        dispatch(getIncome())
        dispatch(listCategory())
        dispatch(listProducts())
        dispatch(listUsers())
        dispatch(getOrder())
        //eslint-disable-next-line 
    }, [dispatch, getIncome])

    // const data = [
    //     { label: 'January', sales: 21, leads: 41 },
    //     { label: 'February', sales: 35, leads: 79 },
    //     { label: 'March', sales: 75, leads: 57 },
    //     { label: 'April', sales: 51, leads: 47 },
    //     { label: 'May', sales: 41, leads: 63 },
    //     { label: 'June', sales: 47, leads: 71 }
    // ];

    return (
        <div style={{ overflowY: 'scroll', height: '100vh', width: '100%', fontSize: '14px' }} className='py-5 px-5'>
            <div className="col-md-12">
                <h3 className='pb-3'>Thống kê</h3>
            </div>

            <div className='d-flex justify-content-between flex-wrap'>
                <h4>Tổng danh mục: {categories.length}</h4>
                <h4>Tổng sản phẩm: {products.length}</h4>
                <h4>Tổng người dùng: {users?.length}</h4>
                <h4>Tổng đơn hàng: {orders.length}</h4>
            </div>

            <div className="section">
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



