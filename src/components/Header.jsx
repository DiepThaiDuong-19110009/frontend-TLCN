import { React } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'

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
        <header>
            <Navbar className='py-2 shadow-sm bg-white rounded' bg="light" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand className='text-success'>
                            <strong style={{ fontSize: '25px' }}>HDKMart</strong><br />
                            <span style={{ fontSize: '15px', fontStyle: 'italic' }}>Vì một sức khỏe cộng đồng</span>
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav className='ml-auto'>
                            <LinkContainer style={{ color: 'white' }} to='/cart'>
                                <Nav.Link className='text-success'>
                                    <i className='fas fa-shopping-cart'></i> Giỏ hàng (<strong>{cartItems.length}</strong>)
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={`Xin chào, ${userInfo.user.name}`} id='nav-dropdown'>
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
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header