import { React } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav, NavDropdown, Row, Col } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import Search from './Search'

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    // console.log('==', userInfo)

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/')
        window.location.reload()
    }

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    return (
        <div>
            <Row className='d-flex justify-content-between align-items-center flex-wrap mx-0'>
                <Col xl={3} className='d-flex justify-content-center align-items-center'>
                    <LinkContainer to='/'>
                        <Navbar.Brand className='text-success'>
                            <strong style={{ fontSize: '25px' }}>HDKMart</strong><br />
                            <span style={{ fontSize: '15px', fontStyle: 'italic' }}>Vì một sức khỏe cộng đồng</span>
                        </Navbar.Brand>
                    </LinkContainer>
                </Col>
                <Col xl={6} style={{margin: '0 auto', padding: 'auto', height: 'auto'}} className='px-4'>
                    <Search />
                </Col>
                <Col xl={3} className='d-flex justify-content-center align-items-center'>
                    <LinkContainer style={{ color: 'white' }} to='/cart'>
                        <Nav.Link className='text-success'>
                            <i style={{ fontSize: '30px' }} className='fas fa-shopping-cart'></i> <strong style={{ fontSize: '20px' }}>({cartItems.length})</strong>
                        </Nav.Link>
                    </LinkContainer>
                    {userInfo ? (
                        <NavDropdown title={`${userInfo.user.name}`} id='nav-dropdown' >
                            {userInfo && userInfo.user.isAdmin && (
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Quản lý hệ thống</NavDropdown.Item>
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
                </Col>
            </Row>
        </div>
    )
}

export default Header