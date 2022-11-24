import { React, useEffect, useState } from 'react'
import { Button, ListGroup, Row, Col, Container, Tabs, Tab, Image, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder, updateOrder } from '../actions/orderActions'
import { listProducts } from '../actions/productActions';

const MyOrder = () => {
    const [key, setKey] = useState('ALL');
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const orderList = useSelector(state => state.orderList)
    const { orders } = orderList
    const productList = useSelector(state => state.productList)
    const { products } = productList
    const orderUpdate = useSelector(state => state.orderUpdate)
    const { success: updateSuccess } = orderUpdate

    let arrOrderAll = []
    const getOrderAll = () => {
        orders?.forEach(item => {
            if (item?.user?._id === userInfo?.user?._id) {
                arrOrderAll.push(item)
            }
        });
    }

    let arrOrderProcessing = []
    const getOrderProcessing = () => {
        orders?.forEach(item => {
            if (item?.user?._id === userInfo?.user?._id && item?.status === 'PROCESSING') {
                arrOrderProcessing.push(item)
            }
        });
    }
  
  let arrOrderConfirmed = []
    const getOrderConfirmed = () => {
        orders?.forEach(item => {
            if (item?.user?._id === userInfo?.user?._id && item?.status === 'CONFIRMED') {
                arrOrderConfirmed.push(item)
            }
        });
    }
  
  let arrOrderDelivering = []
    const getOrderDelivering = () => {
        orders?.forEach(item => {
            if (item?.user?._id === userInfo?.user?._id && item?.status === 'DELIVERING') {
                arrOrderDelivering.push(item)
            }
        });
    }
  
  let arrOrderDone = []
    const getOrderDone = () => {
        orders?.forEach(item => {
            if (item?.user?._id === userInfo?.user?._id && item?.status === 'DONE') {
                arrOrderDone.push(item)
            }
        });
    }
  
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
        dispatch(listProducts())
    }, [dispatch, updateSuccess])

    const getImage = (id) => {
        var src = ''
        products.forEach(product => {
            if (id === product._id) {
                src = product.photo
            }
        })
        return src
    }

    const removeOrderHandler = (id) => {
        const status = 'CANCEL'
        dispatch(updateOrder(id, status))
        setShowAlert(false)
    }
    const [idOrder, setIdOrder] = useState('')
    const [showAlert, setShowAlert] = useState(false);
    const handleCloseAlert = () => setShowAlert(false);
    const handleDeleteOrder = (id) => {
        setShowAlert(true);
        setIdOrder(id)
    }

    return (
        <Container>
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
                                    <Row className='pt-4 mb-3 mx-0' style={{ background: 'white' }}>
                                        <Row>
                                            <Col>
                                                <p>Ngày đặt hàng: {item.createdAt.slice(0, 10)}</p>
                                            </Col>
                                            <Col className='d-flex justify-content-end'>
                                                {
                                                    item.status === "PROCESSING" && <Button onClick={() => handleDeleteOrder(item._id)} variant="danger">Hủy đơn hàng</Button>
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
                                        {item?.products?.map(productItem => (
                                            <Row className='d-flex justify-content-start align-items-center flex-wrap'>
                                                <Col xl={3} className='d-flex justify-content-center align-items-center'>
                                                    <Image style={{ width: '100px' }} src={getImage(productItem.product)} alt={productItem.name}></Image>
                                                </Col>
                                                <Col className='d-flex justify-content-start align-items-center'>{productItem.name}</Col>
                                                <Col className='text-center d-flex justify-content-start align-items-center'>{productItem.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })} x {productItem.count}</Col>
                                                <Col className='d-flex justify-content-end align-items-center' style={{ color: 'green' }}>{`${(productItem.count * productItem.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}`}</Col>
                                            </Row>
                                        ))}
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
                                    <Row className='pt-4 mb-3 mx-0' style={{ background: 'white' }}>
                                        <Row>
                                            <Col>
                                                <p>Ngày đặt hàng: {item.createdAt.slice(0, 10)}</p>
                                            </Col>
                                            <Col className='d-flex justify-content-end'>
                                                {
                                                    item.status === "PROCESSING" && <Button onClick={() => handleDeleteOrder(item._id)} variant="danger">Hủy đơn hàng</Button>
                                                }
                                            </Col>
                                        </Row>
                                        <Row className='pb-3'>
                                            <p>Địa chỉ giao hàng: <span style={{ color: 'red' }}>{item.address}</span></p>
                                            <p>Trạng thái đơn hàng: <strong style={{ color: '#00cc00' }}> Chờ xác nhận</strong></p>
                                            <h5>Tổng tiền thanh toán: {(item.total).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</h5>
                                        </Row>
                                        {item?.products?.map(productItem => (
                                            <Row className='d-flex justify-content-start align-items-center flex-wrap'>
                                                <Col xl={3} className='d-flex justify-content-center align-items-center'>
                                                    <Image style={{ width: '100px' }} src={getImage(productItem.product)} alt={productItem.name}></Image>
                                                </Col>
                                                <Col className='d-flex justify-content-start align-items-center'>{productItem.name}</Col>
                                                <Col className='text-center d-flex justify-content-start align-items-center'>{productItem.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })} x {productItem.count}</Col>
                                                <Col className='d-flex justify-content-end align-items-center' style={{ color: 'green' }}>{`${(productItem.count * productItem.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}`}</Col>
                                            </Row>
                                        ))}
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
                                    <Row className='pt-4 mb-3 mx-0' style={{ background: 'white' }}>
                                        <Row>
                                            <Col>
                                                <p>Ngày đặt hàng: {item.createdAt.slice(0, 10)}</p>
                                            </Col>
                                        </Row>
                                        <Row className='pb-3'>
                                            <p>Địa chỉ giao hàng: <span style={{ color: 'red' }}>{item.address}</span></p>
                                            <p>Trạng thái đơn hàng: <strong style={{ color: '#00cc00' }}> Đã xác nhận</strong></p>
                                            <h5>Tổng tiền thanh toán: {(item.total).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</h5>
                                        </Row>
                                        {item?.products?.map(productItem => (
                                            <Row className='d-flex justify-content-start align-items-center flex-wrap'>
                                                <Col xl={3} className='d-flex justify-content-center align-items-center'>
                                                    <Image style={{ width: '100px' }} src={getImage(productItem.product)} alt={productItem.name}></Image>
                                                </Col>
                                                <Col className='d-flex justify-content-start align-items-center'>{productItem.name}</Col>
                                                <Col className='text-center d-flex justify-content-start align-items-center'>{productItem.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })} x {productItem.count}</Col>
                                                <Col className='d-flex justify-content-end align-items-center' style={{ color: 'green' }}>{`${(productItem.count * productItem.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}`}</Col>
                                            </Row>
                                        ))}
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
                                    <Row className='pt-4 mb-3 mx-0' style={{ background: 'white' }}>
                                        <Row>
                                            <Col>
                                                <p>Ngày đặt hàng: {item.createdAt.slice(0, 10)}</p>
                                            </Col>
                                        </Row>
                                        <Row className='pb-3'>
                                            <p>Địa chỉ giao hàng: <span style={{ color: 'red' }}>{item.address}</span></p>
                                            <p>Trạng thái đơn hàng: <strong style={{ color: '#00cc00' }}> Đang giao hàng</strong></p>
                                            <h5>Tổng tiền thanh toán: {(item.total).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</h5>
                                        </Row>
                                        {item?.products?.map(productItem => (
                                            <Row className='d-flex justify-content-start align-items-center flex-wrap'>
                                                <Col xl={3} className='d-flex justify-content-center align-items-center'>
                                                    <Image style={{ width: '100px' }} src={getImage(productItem.product)} alt={productItem.name}></Image>
                                                </Col>
                                                <Col className='d-flex justify-content-start align-items-center'>{productItem.name}</Col>
                                                <Col className='text-center d-flex justify-content-start align-items-center'>{productItem.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })} x {productItem.count}</Col>
                                                <Col className='d-flex justify-content-end align-items-center' style={{ color: 'green' }}>{`${(productItem.count * productItem.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}`}</Col>
                                            </Row>
                                        ))}
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
                                    <Row className='pt-4 mb-3 mx-0' style={{ background: 'white' }}>
                                        <Row>
                                            <Col>
                                                <p>Ngày đặt hàng: {item.createdAt.slice(0, 10)}</p>
                                            </Col>
                                        </Row>
                                        <Row className='pb-3'>
                                            <p>Địa chỉ giao hàng: <span style={{ color: 'red' }}>{item.address}</span></p>
                                            <p>Trạng thái đơn hàng: <strong style={{ color: '#00cc00' }}> Đã nhận</strong></p>
                                            <h5>Tổng tiền thanh toán: {(item.total).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</h5>
                                        </Row>
                                        {item?.products?.map(productItem => (
                                            <Row className='d-flex justify-content-start align-items-center flex-wrap'>
                                                <Col xl={3} className='d-flex justify-content-center align-items-center'>
                                                    <Image style={{ width: '100px' }} src={getImage(productItem.product)} alt={productItem.name}></Image>
                                                </Col>
                                                <Col className='d-flex justify-content-start align-items-center'>{productItem.name}</Col>
                                                <Col className='text-center d-flex justify-content-start align-items-center'>{productItem.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })} x {productItem.count}</Col>
                                                <Col className='d-flex justify-content-end align-items-center' style={{ color: 'green' }}>{`${(productItem.count * productItem.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}`}</Col>
                                            </Row>
                                        ))}
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
                                    <Row className='pt-4 mb-3 mx-0' style={{ background: 'white' }}>
                                        <Row>
                                            <Col>
                                                <p>Ngày đặt hàng: {item.createdAt.slice(0, 10)}</p>
                                            </Col>
                                        </Row>
                                        <Row className='pb-3'>
                                            <p>Địa chỉ giao hàng: <span style={{ color: 'red' }}>{item.address}</span></p>
                                            <p>Trạng thái đơn hàng: <strong style={{ color: '#00cc00' }}> Đã hủy</strong></p>
                                            <h5>Tổng tiền thanh toán: {(item.total).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</h5>
                                        </Row>
                                        {item?.products?.map(productItem => (
                                            <Row className='d-flex justify-content-start align-items-center flex-wrap'>
                                                <Col xl={3} className='d-flex justify-content-center align-items-center'>
                                                    <Image style={{ width: '100px' }} src={getImage(productItem.product)} alt={productItem.name}></Image>
                                                </Col>
                                                <Col className='d-flex justify-content-start align-items-center'>{productItem.name}</Col>
                                                <Col className='text-center d-flex justify-content-start align-items-center'>{productItem.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })} x {productItem.count}</Col>
                                                <Col className='d-flex justify-content-end align-items-center' style={{ color: 'green' }}>{`${(productItem.count * productItem.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}`}</Col>
                                            </Row>
                                        ))}
                                    </Row>
                                ))
                                :
                                <p className='text-center py-5'>Chưa có đơn hàng nào</p>}
                    </ListGroup>
                </Tab>
            </Tabs>
            {/* Delete Order */}
            <Modal
                show={showAlert}
                onHide={handleCloseAlert}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Hủy đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn hủy đơn hàng này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAlert}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={() => removeOrderHandler(idOrder)}>Đồng ý</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default MyOrder
