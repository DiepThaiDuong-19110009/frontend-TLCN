import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie } from 'recharts';
import { getIncome } from '../../actions/statisticalActions';
import { featureProduct, listCategory, listProducts, unsoldProduct } from '../../actions/productActions';
import { listUsers } from '../../actions/userActions'
import { listSupplier } from '../../actions/supplierActions';
import { getOrder } from '../../actions/orderActions'
import { Table } from 'react-bootstrap';

const StatisticScreen = () => {
    const dispatch = useDispatch()

    const { income } = useSelector(state => state.incomeList)
    const { suppliers } = useSelector(state => state.supplierList)
    const { categories } = useSelector(state => state.categoryList)
    const { products } = useSelector(state => state.productList)
    const { unsold } = useSelector(state => state.productUnsold)
    const { feature } = useSelector(state => state.productFeature)

    const { users } = useSelector(state => state.userList)
    const { orders } = useSelector(state => state.orderList)

    useEffect(() => {
        dispatch(getIncome())
        dispatch(listSupplier())
        dispatch(listCategory())
        dispatch(listProducts())
        dispatch(listUsers())
        dispatch(unsoldProduct())
        dispatch(featureProduct())
        dispatch(getOrder())
        //eslint-disable-next-line 
    }, [dispatch, getIncome])

    return (
        <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px' }} className='py-4 px-5'>
            <div className="col-md-12">
                <h5>Thống kê</h5>
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
                        <LineChart data={income} margin={{ top: 15, right: 0, bottom: 15, left: 10 }}>
                            <Tooltip />
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Legend />
                            <Line type="monotone" dataKey="totalAvenue" name='Tổng doanh thu' stroke="#009900" />
                            {/* <Line type="monotone" dataKey="total" stroke="#17A8F5" /> */}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="section">
                <h5 className="section-title">Sản phẩm bán ra theo tháng</h5>
                <div className="section-content">
                    <ResponsiveContainer width="100%" height={500}>
                        <BarChart data={income} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Tooltip />
                            <Legend />
                            {/* <Bar dataKey="totalAvenue" fill="#FB8833" /> */}
                            <Bar dataKey="total" fill="#17A8F5" name='Số lượng đã bán' />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="section">
                <h5 className="section-title mb-4">Sản phẩm tồn kho</h5>
                <p style={{fontSize: '18px'}}>Tổng loại sản phẩm tồn kho là <strong>{unsold?.count}</strong> trên tổng <strong>{unsold?.total}</strong> loại sản phẩm</p>
                <p style={{fontSize: '18px'}}>Tỉ lệ: <span style={{color: 'red'}}>{unsold?.rate} %</span></p>
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th className='text-center'>#</th>
                            <th className='text-center'>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {unsold?.product?.map((product, index) => (
                            <tr key={product._id}>
                                <td className='text-center'>
                                    <strong>{index + 1}</strong>
                                </td>
                                <td className='text-center'><img style={{ width: '50px' }} src={product.photo} alt={product.name} /></td>
                                <td>{product.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <div className="section">
                <h5 className="section-title mb-3">Sản phẩm bán chạy</h5>
                <p style={{fontSize: '18px'}}>Tổng loại sản phẩm bán chạy là <strong>{feature?.count}</strong> trên tổng <strong>{unsold?.total}</strong> loại sản phẩm</p>
                <p style={{fontSize: '18px'}}>Tỉ lệ: <span style={{color: 'green'}}>{feature?.rate} %</span></p>
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th className='text-center'>#</th>
                            <th className='text-center'>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th className='text-end'>Đã bán</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feature?.product?.map((product, index) => (
                            <tr key={product._id}>
                                <td className='text-center'>
                                    <strong>{index + 1}</strong>
                                </td>
                                <td className='text-center'><img style={{ width: '50px' }} src={product.photo} alt={product.name} /></td>
                                <td>{product.name}</td><td className='text-end'>{product.sold}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default StatisticScreen



