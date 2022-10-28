import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Menu() {
    const [sticky, setSticky] = useState("");

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // on render, set listener
    useEffect(() => {
        window.addEventListener("scroll", isSticky);
        return () => {
            window.removeEventListener("scroll", isSticky);
        };
    }, []);

    const isSticky = () => {
        /* Method that will fix header after a specific scrollable */
        const scrollTop = window.scrollY;
        const stickyClass = scrollTop >= 50 ? "is-sticky" : "";
        setSticky(stickyClass);
    };

    const classes = `header-section ${sticky}`;
    return (
        <header className={classes}>
            <Navbar className='py-0 shadow-sm bg-white' expand="lg">
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
                            <Nav.Link className='px-4' href="/support">Hỗ trợ khách hàng</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Menu;