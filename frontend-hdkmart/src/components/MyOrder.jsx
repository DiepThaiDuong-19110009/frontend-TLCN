import { React, useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder } from '../actions/orderActions'
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';

const MyOrder = () => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    let arrOrder = []
    const getOrderById = () => {
        orders.forEach(item => {
            if (item.user._id === userInfo.user._id) {
                arrOrder.push(item)
            }
        });
    }

    getOrderById()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrder())
    }, [dispatch])


    return (
        <div>
            <h1>Lịch sử đơn hàng</h1>
            <ListGroup>
                {arrOrder.reverse().map(item => (
                    <ListGroup.Item>
                        {`Ngày đặt hàng: ${item.createdAt}`}
                        <Dropdown className='my-3'>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Chi tiết đơn hàng
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>id</th>
                                                <th>Tên sản phẩm</th>
                                                <th>Số lượng</th>
                                                <th>Thành tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item.products.map(productItem => (
                                                <tr>
                                                    <td>{productItem._id}</td>
                                                    <td>{productItem.name}</td>
                                                    <td>{productItem.count}</td>
                                                    <td>{`${(productItem.count * productItem.price).toLocaleString('vi', {style : 'currency', currency : 'VND'})}`}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Dropdown.Item>
                                <Dropdown.Item style={{color: 'green'}}>Địa chỉ: {item.address}</Dropdown.Item>
                                <Dropdown.Item>Tên người nhận: {item.user.name}</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <p style={{color: 'red'}}>Trạng thái đơn hàng: {item.status}</p>
                        <h5>Tổng tiền thanh toán: {(item.total).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</h5>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default MyOrder