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
                <Tab eventKey="ALL" title={`T???t c???`}>
                    <ListGroup>
                        {
                            (arrOrderAll.length > 0) ?
                                arrOrderAll.reverse().map(item => (
                                    <Row className='pt-4 mb-3 mx-0' style={{ background: 'white' }}>
                                        <Row>
                                            <Col>
                                                <p>Ng??y ?????t h??ng: {item.createdAt.slice(0, 10)}</p>
                                            </Col>
                                            <Col className='d-flex justify-content-end'>
                                                {
                                                    item.status === "PROCESSING" && <Button onClick={() => handleDeleteOrder(item._id)} variant="danger">H???y ????n h??ng</Button>
                                                }
                                            </Col>
                                        </Row>
                                        <Row className='pb-3'>
                                            <p>?????a ch??? giao h??ng: <span style={{ color: 'red' }}>{item.address}</span></p>
                                            <p>Tr???ng th??i ????n h??ng:
                                                {
                                                    item.status === "PROCESSING" ?
                                                        <strong style={{ color: '#00cc00' }}> ??ang x??c nh???n</strong> :
                                                        item.status === "CONFIRMED" ?
                                                            <strong style={{ color: '#00cc00' }}> ???? x??c nh???n</strong> :
                                                            item.status === "DELIVERING" ?
                                                                <strong style={{ color: '#00cc00' }}> ??ang giao h??ng</strong> :
                                                                item.status === "DONE" ?
                                                                    <strong style={{ color: '#00cc00' }}> ???? nh???n</strong> :
                                                                    // item.status === "CANCEL" ?
                                                                    <strong style={{ color: 'red' }}> ???? h???y</strong>
                                                }
                                            </p>
                                            <h5>T???ng ti???n thanh to??n: {(item.total).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</h5>
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
                                <p className='text-center py-5'>Ch??a c?? ????n h??ng n??o</p>}
                    </ListGroup>
                </Tab>
                <Tab eventKey="PROCESSING" title={arrOrderProcessing.length > 0 ? `??ang x??c nh???n (${arrOrderProcessing.length})` : `??ang x??c nh???n`}>
                    <ListGroup>
                        {
                            (arrOrderProcessing.length > 0) ?
                                arrOrderProcessing.reverse().map(item => (
                                    <Row className='pt-4 mb-3 mx-0' style={{ background: 'white' }}>
                                        <Row>
                                            <Col>
                                                <p>Ng??y ?????t h??ng: {item.createdAt.slice(0, 10)}</p>
                                            </Col>
                                            <Col className='d-flex justify-content-end'>
                                                {
                                                    item.status === "PROCESSING" && <Button onClick={() => handleDeleteOrder(item._id)} variant="danger">H???y ????n h??ng</Button>
                                                }
                                            </Col>
                                        </Row>
                                        <Row className='pb-3'>
                                            <p>?????a ch??? giao h??ng: <span style={{ color: 'red' }}>{item.address}</span></p>
                                            <p>Tr???ng th??i ????n h??ng: <strong style={{ color: '#00cc00' }}> Ch??? x??c nh???n</strong></p>
                                            <h5>T???ng ti???n thanh to??n: {(item.total).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</h5>
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
                                <p className='text-center py-5'>Ch??a c?? ????n h??ng n??o</p>}
                    </ListGroup>
                </Tab>
                <Tab eventKey="CONFIRMED" title={arrOrderConfirmed.length > 0 ? `Ch??? l???y h??ng (${arrOrderConfirmed.length})` : `Ch??? l???y h??ng`}>
                    <ListGroup>
                        {
                            (arrOrderConfirmed.length > 0) ?
                                arrOrderConfirmed.reverse().map(item => (
                                    <Row className='pt-4 mb-3 mx-0' style={{ background: 'white' }}>
                                        <Row>
                                            <Col>
                                                <p>Ng??y ?????t h??ng: {item.createdAt.slice(0, 10)}</p>
                                            </Col>
                                        </Row>
                                        <Row className='pb-3'>
                                            <p>?????a ch??? giao h??ng: <span style={{ color: 'red' }}>{item.address}</span></p>
                                            <p>Tr???ng th??i ????n h??ng: <strong style={{ color: '#00cc00' }}> ???? x??c nh???n</strong></p>
                                            <h5>T???ng ti???n thanh to??n: {(item.total).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</h5>
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
                                <p className='text-center py-5'>Ch??a c?? ????n h??ng n??o</p>}
                    </ListGroup>
                </Tab>
                <Tab eventKey="DELIVERING" title={arrOrderDelivering.length > 0 ? `??ang giao h??ng (${arrOrderDelivering.length})` : `??ang giao h??ng`}>
                    <ListGroup>
                        {
                            (arrOrderDelivering.length > 0) ?
                                arrOrderDelivering.reverse().map(item => (
                                    <Row className='pt-4 mb-3 mx-0' style={{ background: 'white' }}>
                                        <Row>
                                            <Col>
                                                <p>Ng??y ?????t h??ng: {item.createdAt.slice(0, 10)}</p>
                                            </Col>
                                        </Row>
                                        <Row className='pb-3'>
                                            <p>?????a ch??? giao h??ng: <span style={{ color: 'red' }}>{item.address}</span></p>
                                            <p>Tr???ng th??i ????n h??ng: <strong style={{ color: '#00cc00' }}> ??ang giao h??ng</strong></p>
                                            <h5>T???ng ti???n thanh to??n: {(item.total).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</h5>
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
                                <p className='text-center py-5'>Ch??a c?? ????n h??ng n??o</p>}
                    </ListGroup>
                </Tab>
                <Tab eventKey="DONE" title={`???? nh???n`}>
                    <ListGroup>
                        {
                            (arrOrderDone.length > 0) ?
                                arrOrderDone.reverse().map(item => (
                                    <Row className='pt-4 mb-3 mx-0' style={{ background: 'white' }}>
                                        <Row>
                                            <Col>
                                                <p>Ng??y ?????t h??ng: {item.createdAt.slice(0, 10)}</p>
                                            </Col>
                                        </Row>
                                        <Row className='pb-3'>
                                            <p>?????a ch??? giao h??ng: <span style={{ color: 'red' }}>{item.address}</span></p>
                                            <p>Tr???ng th??i ????n h??ng: <strong style={{ color: '#00cc00' }}> ???? nh???n</strong></p>
                                            <h5>T???ng ti???n thanh to??n: {(item.total).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</h5>
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
                                <p className='text-center py-5'>Ch??a c?? ????n h??ng n??o</p>}
                    </ListGroup>
                </Tab>
                <Tab eventKey="CANCEL" title={`???? h???y`}>
                    <ListGroup>
                        {
                            (arrOrderCancel.length > 0) ?
                                arrOrderCancel.reverse().map(item => (
                                    <Row className='pt-4 mb-3 mx-0' style={{ background: 'white' }}>
                                        <Row>
                                            <Col>
                                                <p>Ng??y ?????t h??ng: {item.createdAt.slice(0, 10)}</p>
                                            </Col>
                                        </Row>
                                        <Row className='pb-3'>
                                            <p>?????a ch??? giao h??ng: <span style={{ color: 'red' }}>{item.address}</span></p>
                                            <p>Tr???ng th??i ????n h??ng: <strong style={{ color: '#00cc00' }}> ???? h???y</strong></p>
                                            <h5>T???ng ti???n thanh to??n: {(item.total).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</h5>
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
                                <p className='text-center py-5'>Ch??a c?? ????n h??ng n??o</p>}
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
                    <Modal.Title>H???y ????n h??ng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    B???n c?? ch???c ch???n mu???n h???y ????n h??ng n??y kh??ng?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAlert}>
                        H???y
                    </Button>
                    <Button variant="danger" onClick={() => removeOrderHandler(idOrder)}>?????ng ??</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default MyOrder
