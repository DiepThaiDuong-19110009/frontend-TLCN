import { React } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import ReactTooltip from 'react-tooltip'
import { Container, Navbar, Nav, NavDropdown, Row } from 'react-bootstrap'
import { logout } from '../actions/userActions'

const HeaderAdmin = () => {
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

    // load page
    const loadpage = () => {
        window.location.reload(false)
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
                        <Row className='py-0 d-flex justify-content-center align-items-center' style={{ width: 'auto', paddingRight: '30px', position: 'relative'  }}>
                            <i data-tip data-for="tip6" style={{ cursor: 'pointer', fontSize: '20px'}} className="far fa-bell"></i>
                            <i style={{ position: 'absolute', top: '-5px', right: '-15px', color: 'red', fontSize: '8px'}} className="fas fa-circle"></i>
                        </Row>
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