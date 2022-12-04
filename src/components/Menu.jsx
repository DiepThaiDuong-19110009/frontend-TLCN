import { React } from 'react'
import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Menu() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    return (
        <header >
            <Navbar className='py-2 shadow-sm bg-white' expand="lg">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <Nav.Link className='px-4' href="/">Trang chủ</Nav.Link>
                            <Nav.Link className='px-4' href="/product">Sản phẩm</Nav.Link>
                            {userInfo &&
                                <Nav.Link className='px-4' href="/myorder">Đơn hàng</Nav.Link>
                            }
                            <Nav.Link className='px-4' href="/blog">Bài viết</Nav.Link>
                            <Nav.Link className='px-4' href="/contact">Liên hệ</Nav.Link>
                        </Nav>
                        <Nav className='d-flex align-items-center justify-content-center'>
                            <i className='fas fa-phone text-success me-2'></i>
                            <strong className='text-success'>Hotline: 0939 816 390</strong>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Menu;
