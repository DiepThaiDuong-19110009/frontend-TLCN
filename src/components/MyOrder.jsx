import { React, useEffect, useState } from 'react'
import { Button, ListGroup, Accordion, Row, Col, Container, Tabs, Tab } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder, updateOrder } from '../actions/orderActions'
import Table from 'react-bootstrap/Table';

const MyOrder = () => {
    const [key, setKey] = useState('ALL');
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const orderList = useSelector(state => state.orderList)
    const { orders } = orderList
    // console.log('==', orders);

    // array Processing
    let arrOrderAll = []
    const getOrderAll = () => {
        orders?.forEach(item => {
            if (item?.user?._id === userInfo?.user?._id) {
                arrOrderAll.push(item)
            }
        });
    }
    // array Processing
    let arrOrderProcessing = []
    const getOrderProcessing = () => {
        orders?.forEach(item => {
            if (item?.user?._id === userInfo?.user?._id && item?.status === 'PROCESSING') {
                arrOrderProcessing.push(item)
            }
        });
    }
    // array Confirmed
    let arrOrderConfirmed = []
    const getOrderConfirmed = () => {
        orders?.forEach(item => {
            if (item?.user?._id === userInfo?.user?._id && item?.status === 'CONFIRMED') {
                arrOrderConfirmed.push(item)
            }
        });
    }
    // array Delivering
    let arrOrderDelivering = []
    const getOrderDelivering = () => {
        orders?.forEach(item => {
            if (item?.user?._id === userInfo?.user?._id && item?.status === 'DELIVERING') {
                arrOrderDelivering.push(item)
            }
        });
    }
    // array Processing
    let arrOrderDone = []
    const getOrderDone = () => {
        orders?.forEach(item => {
            if (item?.user?._id === userInfo?.user?._id && item?.status === 'DONE') {
                arrOrderDone.push(item)
            }
        });
    }
    // array Processing
    let arrOrderCancel = []
    const getOrderCancel = () => {
        orders?.forEach(item => {
            if (item?.user?._id === userInfo?.user?._id && item?.status === 'CANCEL') {
                arrOrderCancel.push(item)
            }
        });
    }

    getOrderAll()
    getOrderProcessing()
    getOrderConfirmed()
    getOrderDelivering()
    getOrderDone()
    getOrderCancel()

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
        <Container style={{ background: 'white' }}>
            <Tabs
                style={{ color: 'black', background: 'white' }}
                id="controlled-tab-order"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="my-3 d-flex justify-content-between"
            >
                <Tab eventKey="ALL" title={`Tất cả`}>
                    <ListGroup>
                        {
                            (arrOrderAll.length > 0) ?
                                arrOrderAll.reverse().map(item => (
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
                                            <p>Trạng thái đơn hàng:
                                                {
                                                    item.status === "PROCESSING" ?
                                                    <strong style={{ color: '#00cc00' }}> Đang xác nhận</strong> :
                                                    item.status === "CONFIRMED" ?
                                                    <strong style={{ color: '#00cc00' }}> Đã xác nhận</strong> :
                                                    item.status === "DELIVERING" ?
                                                    <strong style={{ color: '#00cc00' }}> Đang giao hàng</strong> :
                                                    item.status === "DONE" ?
                                                    <strong style={{ color: '#00cc00' }}> Đã nhận</strong> :
                                                    // item.status === "CANCEL" ?
                                                    <strong style={{ color: 'red' }}> Đã hủy</strong> 
                                                }
                                                </p>
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
                </Tab>
                <Tab eventKey="PROCESSING" title={arrOrderProcessing.length > 0 ? `Đang xác nhận (${arrOrderProcessing.length})` : `Đang xác nhận`}>
                    <ListGroup>
                        {
                            (arrOrderProcessing.length > 0) ?
                                arrOrderProcessing.reverse().map(item => (
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
                                            <p>Trạng thái đơn hàng: <strong style={{ color: '#00cc00' }}>Đang xác nhận</strong></p>
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
                </Tab>
                <Tab eventKey="CONFIRMED" title={arrOrderConfirmed.length > 0 ? `Chờ lấy hàng (${arrOrderConfirmed.length})` : `Chờ lấy hàng`}>
                    <ListGroup>
                        {
                            (arrOrderConfirmed.length > 0) ?
                                arrOrderConfirmed.reverse().map(item => (
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
                                            <p>Trạng thái đơn hàng: <strong style={{ color: '#00cc00' }}>Đã xác nhận</strong></p>
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
                </Tab>
                <Tab eventKey="DELIVERING" title={arrOrderDelivering.length > 0 ? `Đang giao hàng (${arrOrderDelivering.length})` : `Đang giao hàng`}>
                    <ListGroup>
                        {
                            (arrOrderDelivering.length > 0) ?
                                arrOrderDelivering.reverse().map(item => (
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
                                            <p>Trạng thái đơn hàng: <strong style={{ color: '#00cc00' }}>Đang giao hàng</strong></p>
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
                </Tab>
                <Tab eventKey="DONE" title={`Đã nhận`}>
                    <ListGroup>
                        {
                            (arrOrderDone.length > 0) ?
                                arrOrderDone.reverse().map(item => (
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
                                            <p>Trạng thái đơn hàng: <strong style={{ color: '#00cc00' }}>Đã thanh toán</strong></p>
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
                </Tab>
                <Tab eventKey="CANCEL" title={`Đã hủy`}>
                    <ListGroup>
                        {
                            (arrOrderCancel.length > 0) ?
                                arrOrderCancel.reverse().map(item => (
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
                                            <p>Trạng thái đơn hàng: <strong style={{ color: 'red' }}>Đã hủy</strong></p>
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
                </Tab>
            </Tabs>
        </Container>
    )
}

export default MyOrder