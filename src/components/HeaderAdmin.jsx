import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import ReactTooltip from 'react-tooltip'
import { Container, Navbar, Nav, NavDropdown, Row, Modal, Button, Col, Accordion } from 'react-bootstrap'
import { getOrder, updateOrder } from '../actions/orderActions'
import { logout } from '../actions/userActions'

const HeaderAdmin = () => {
    const [lgShow, setLgShow] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { orders } = useSelector(state => state.orderList)

    const { userInfo } = useSelector(state => state.userLogin)

    const { success } = useSelector(state => state.orderUpdate)

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/')
        window.location.reload()
    }

    const loadpage = () => {
        window.location.reload(false)
    }

    // Get new notification
    const arrNotification = []
    const getNotification = () => {
        orders.forEach(order => {
            if (order.status === 'PROCESSING') {
                arrNotification.push(order)
            }
        })
    }
    getNotification()

    useEffect(() => {
        dispatch(getOrder())
    }, [dispatch, success])

    // confirm All Order
    const statusAll = 'CONFIRMED'
    const confirmAllOrder = () => {
        orders.forEach(order => {
            if (order.status === 'PROCESSING') {
                dispatch(updateOrder(order._id, statusAll))
            }
        })
    }

    const status = 'CONFIRMED'
    const confirmOrder = (idOrder) => {
        dispatch(updateOrder(idOrder, status))
    }

    return (
        <Navbar style={{ height: '100%', background: '#ffffff' }} variant='dark' expand="lg" collapseOnSelect>
            <Row className='py-0 px-4 d-flex' style={{ width: 'auto' }}>
                <i data-tip data-for="tip5" onClick={loadpage} style={{ cursor: 'pointer', fontSize: '18px' }} className="fas fa-redo-alt"></i>
            </Row>
            <ReactTooltip id="tip5" place="top" effect="solid">
                Tải lại trang
            </ReactTooltip>
            <ReactTooltip id="tip6" place="top" effect="solid">
                Thông báo
            </ReactTooltip>
            <Container className="justify-content-end">
                <Row className='d-flex justify-content-center align-items-center'>
                    <Navbar.Collapse>
                        <Row onClick={() => setLgShow(true)} className='py-0 d-flex justify-content-center align-items-center' style={{ width: 'auto', paddingRight: '30px', position: 'relative' }}>
                            <i data-tip data-for="tip6" style={{ cursor: 'pointer', fontSize: '20px' }} className="far fa-bell"></i>
                            {
                                arrNotification.length !== 0 ?
                                    <i style={{ position: 'absolute', top: '-5px', right: '-15px', color: 'red', fontSize: '8px' }} className="fas fa-circle"></i> :
                                    <i style={{ position: 'absolute', top: '-5px', right: '-15px', color: 'white', fontSize: '8px' }} className="fas fa-circle"></i>
                            }
                        </Row>
                        <Modal
                            size="xl"
                            show={lgShow}
                            onHide={() => setLgShow(false)}
                            aria-labelledby="example-modal-sizes-title-lg"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-lg">
                                    <h5>Thông báo</h5>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Row className='d-flex justify-content-end align-items-center px-2 mb-3'>
                                    {
                                        arrNotification.length !== 0 ?
                                            <Button variant="outline-primary" onClick={() => confirmAllOrder()} style={{ width: 'auto' }}>Xác nhận tất cả</Button> :
                                            <p></p>
                                    }
                                </Row>
                                {
                                    arrNotification.length !== 0 ?
                                        arrNotification.reverse().map((order, index) => (
                                            <Row className='d-flex justify-content-between align-items-center px-2 mb-3'>
                                                <Col xl={3}>
                                                    {index + 1}. Đơn hàng của {order?.user?.name}
                                                </Col>
                                                <Col xl={7}>
                                                    <Accordion>
                                                        <Accordion.Item eventKey="0">
                                                            <Accordion.Header style={{ fontSize: '13px' }}>ID: {order._id}</Accordion.Header>
                                                            <Accordion.Body>
                                                                <strong>Thông tin đơn hàng</strong>
                                                                <p className='mt-3'>- Ngày đặt hàng: {order.createdAt}</p>
                                                                <p>- Số lượng sản phẩm: {order.amount}</p>
                                                                <p>- Phương thức thanh toán: {order.method}</p>
                                                                <p>- Tổng thanh toán: <span style={{ fontWeight: 'bold', color: 'red' }}>{order.total?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span></p>
                                                                <strong>Thông tin người nhận</strong>
                                                                <p className='mt-3'>- Tên người nhận: {order?.user?.name}</p>
                                                                <p className='mt-3'>- Email: {order?.user?.email}</p>
                                                                <strong>Chi tiết đơn hàng</strong>
                                                                {
                                                                    order?.products?.map(item => (
                                                                        <Row>
                                                                            <Col className='mt-3'>{item.name}</Col>
                                                                            <Col className='mt-3'>{(item.price / item.count)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })} x {item.count}</Col>
                                                                        </Row>
                                                                    ))
                                                                }
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </Col>
                                                <Col xl={2} className='d-flex justify-content-end'>
                                                    <Button variant="outline-primary" onClick={() => confirmOrder(order?._id)} style={{ width: 'auto' }}>Xác nhận</Button>
                                                </Col>
                                            </Row>
                                        )) :
                                        <p style={{ textAlign: 'center' }}>Không có thông báo</p>
                                }
                            </Modal.Body>
                        </Modal>
                        <Nav className='ml-auto'>
                            {userInfo ? (
                                <NavDropdown title={`${userInfo.user.name}`} id='nav-dropdown'>
                                    {userInfo && userInfo.user.isAdmin && (
                                        <LinkContainer to='/'>
                                            <NavDropdown.Item>Về trang chủ</NavDropdown.Item>
                                        </LinkContainer>
                                    )}
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Thông tin</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/changepassword'>
                                        <NavDropdown.Item>Đổi mật khẩu</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Đăng xuất</NavDropdown.Item>
                                </NavDropdown>
                            ) : <LinkContainer to='/login'>
                                <Nav.Link className='text-success'>
                                    <i className='fas fa-user'></i> Đăng nhập
                                </Nav.Link>
                            </LinkContainer>}
                        </Nav>
                    </Navbar.Collapse>
                </Row>
            </Container>
        </Navbar>
    )
}

export default HeaderAdmin
