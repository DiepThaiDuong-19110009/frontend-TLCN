import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Container } from 'react-bootstrap';

const OrderSuccessScreen = () => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    return (
        <Container className='my-5'>
            <Card style={{ width: '100%' }}>
                <Card.Body>
                    <Card.Title style={{color: 'green', fontSize: '27px'}} className='d-flex justify-content-center align-items-center mb-4'>
                        <i className="fa fa-check-circle me-3"></i>
                        <strong>Đặt hàng thành công</strong>
                    </Card.Title>
                    <Card.Text style={{color: 'green', fontSize: '20px'}} className='d-flex justify-content-center align-items-center'>
                        HDKMart chân thành cám ơn quý khách đã tin tưởng và mua hàng của cửa hàng chúng tôi. Chúc quý khách thật nhiều sức khỏe !!!
                    </Card.Text>
                    <div className="d-flex justify-content-end">
                        <Link style={{ textDecoration: 'none', color: 'black' }} to='/'>
                            Quay lại trang chủ
                        </Link>
                        {userInfo &&
                                <Link style={{ textDecoration: 'none', color: 'green' }} className='px-4' to="/myorder">Đơn hàng của tôi</Link>
                            }
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default OrderSuccessScreen