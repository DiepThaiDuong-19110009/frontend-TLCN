import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import ReactTooltip from 'react-tooltip'
import { Container, Navbar, Nav, NavDropdown, Row, Modal, Button } from 'react-bootstrap'
import { getOrder, updateOrder } from '../actions/orderActions'
import { logout } from '../actions/userActions'

const HeaderAdmin = () => {
    const [lgShow, setLgShow] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { loading, error, orders } = useSelector(state => state.orderList)
    // console.log('==', orders)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    // console.log('==', userInfo)

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/')
        window.location.reload()
    }

    // load page
    const loadpage = () => {
        window.location.reload(false)
    }

    // Get new notification
    const arrNotification = []
    const getNotification = () => {
        orders.forEach(order => {
            if (order.status === 'PROCESSING') {
                arrNotification.push(order._id)
            }
        })
    }
    getNotification()

    useEffect(() => {
        dispatch(getOrder())
        //eslint-disable-next-line 
    }, [dispatch])

    // Confirm Order
    const status = 'CONFIRMED'
    const confirmOrder = (idOrder) => {
        dispatch(updateOrder(idOrder, status))
        window.location.reload()
    }

    return (
        <Navbar style={{ height: '100%' }} variant='dark' expand="lg" collapseOnSelect>
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
                            size="lg"
                            show={lgShow}
                            onHide={() => setLgShow(false)}
                            aria-labelledby="example-modal-sizes-title-lg"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-lg">
                                    <h6>Thông báo</h6>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {
                                    arrNotification.length !== 0 ?
                                        arrNotification.map(order => (
                                            <Row className='d-flex justify-content-between align-items-center px-2 mb-3'>
                                                <h6 className='mx-0' style={{ width: 'auto' }}>Đơn hàng: ID {order} yêu cầu xác nhận</h6>
                                                <Button onClick={() => confirmOrder(order)} style={{ width: 'auto' }}>Xác nhận</Button>
                                            </Row>
                                        )) :
                                        <p style={{textAlign: 'center'}}>Không có thông báo</p>
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