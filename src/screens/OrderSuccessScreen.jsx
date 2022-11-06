import React from 'react';
import { Link } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';

const OrderSuccessScreen = () => {

    return (
        <Container className='my-5'>
            <Alert variant="success">
                <Alert.Heading>Đặt hàng thành công</Alert.Heading>
                <p>
                    Cám ơn bạn đã tin dùng và mua sắm tại HDKMart, bạn vui lòng kiểm tra Email để
                    kiểm tra lại đơn hàng. HDKMart chúc bạn thật nhiều sức khỏe !!!
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Link style={{textDecoration: 'none', color: 'black'}} to='/'>
                        Quay lại trang chủ
                    </Link>
                </div>
            </Alert>
        </Container>
    );
}

export default OrderSuccessScreen