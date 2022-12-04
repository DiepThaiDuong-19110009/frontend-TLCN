import React from 'react'
import { Col } from 'react-bootstrap'

const Introduce = () => {
    return (
        <>
            <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: 'solid 2px #dddddd' }}>
                <i style={{ fontSize: '30px' }} class="fas fa-shipping-fast"></i>
                <p className='my-0 mx-3'>Nhanh chóng</p>
            </Col>
            <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: 'solid 2px #dddddd' }}>
                <i style={{ fontSize: '30px' }} class="fas fa-money-bill-wave"></i>
                <p className='my-0 mx-3'>Tiết kiệm</p>
            </Col>
            <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: 'solid 2px #dddddd' }}>
                <i style={{ fontSize: '30px' }} class="fas fa-money-check-alt"></i>
                <p className='my-0 mx-3'>An toàn</p>
            </Col>
            <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <i style={{ fontSize: '30px' }} class="fas fa-headset"></i>
                <p className='my-0 mx-3'>Hỗ trợ 24/7</p>
            </Col>
        </>
    )
}

export default Introduce