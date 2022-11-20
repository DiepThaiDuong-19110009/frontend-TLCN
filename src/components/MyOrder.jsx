import { React, useEffect, useState } from 'react'
import { Button, ListGroup, Accordion, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder, updateOrder } from '../actions/orderActions'
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';

const MyOrder = () => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const orderList = useSelector(state => state.orderList)
    const { orders } = orderList
    console.log('==', orders);

    let arrOrder = []
    const getOrderById = () => {
        orders?.forEach(item => {
            if (item?.user?._id === userInfo?.user?._id) {
                arrOrder.push(item)
            }
        });
    }

    getOrderById()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrder())
    }, [dispatch])

    // cancle Order
    const status = 'CANCEL'
    const cancleOrder = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) {
            dispatch(updateOrder(id, status))
            window.location.reload()
        }
    }


    return (
        <Container>
            <Row className='pt-5 d-flex justify-content-center'>
                <h3 className='d-flex justify-content-center'>Lịch sử đơn hàng</h3>
            </Row>
            <ListGroup>
                {
                    (arrOrder.length > 0) ?
                        arrOrder.reverse().map(item => (
                            <Row className='pt-4'>
                                <Row>
                                    <Col>
                                        <p>Ngày đặt hàng: {item.createdAt.slice(0, 10)}</p>
                                    </Col>
                                    <Col className='d-flex justify-content-end'>
                                        {
                                            item.status === "PROCESSING" && <Button onClick={() => cancleOrder(item._id)} variant="danger">Hủy đơn hàng</Button>
                                        }
                                    </Col>
                                </Row>
                                <Row className='pb-3'>
                                    <p>Địa chỉ giao hàng: <span style={{ color: 'red' }}>{item.address}</span></p>
                                    <p>Trạng thái đơn hàng: <strong style={{ color: '#00cc00' }}>{item.status}</strong></p>
                                    <h5>Tổng tiền thanh toán: {(item.total).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</h5>
                                </Row>
                                <Accordion className='pb-5' defaultActiveKey="0">
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Chi tiết đơn hàng</Accordion.Header>
                                        <Accordion.Body>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th>Tên sản phẩm</th>
                                                        <th>Số lượng</th>
                                                        <th>Thành tiền</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {item.products.map(productItem => (
                                                        <tr>
                                                            <td>{productItem.name}</td>
                                                            <td>{productItem.count}</td>
                                                            <td>{`${(productItem.count * productItem.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}`}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Row>
                        ))
                        :
                        <p className='text-center py-5'>Chưa có đơn hàng nào</p>}
            </ListGroup>
        </Container>
    )
}

export default MyOrder