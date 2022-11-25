import { React, useState } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const [message, setMessage] = useState('')

    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [country, setCountry] = useState(shippingAddress.country)
    const [phone, setPhone] = useState(shippingAddress.phone)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, country, phone }))
        if (address.trim().length === 0 || city.trim().length === 0 || country.trim().length === 0 || phone.trim().length === 0) {
            setMessage('Cung cấp đầy đủ thông tin')
        } else {
            navigate('/payment')
        }
    }

    return (
        <Container>
            <CheckoutSteps step1 step2 />
            <Row className='pt-3'>
                <h3 className='pb-4 d-flex justify-content-center'>Điền thông tin giao hàng</h3>
            </Row>
            <Row>
                <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col xl={5}>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Địa chỉ nhận hàng</Form.Label>
                            <Form.Control type='text' placeholder='Nhập địa chỉ' value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Quận/Huyện/Thành phố</Form.Label>
                            <Form.Control type='text' placeholder='Nhập tên quận/huyện/thành phố' value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Tỉnh/Thành phố</Form.Label>
                            <Form.Control type='text' placeholder='Nhập tên tỉnh/thành phố' value={country} onChange={(e) => setCountry(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Số điện thoại người nhận</Form.Label>
                            <Form.Control type='text' placeholder='Nhập số điện thoại' value={phone} onChange={(e) => setPhone(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Row className='py-3 d-flex justify-content-center align-items-center'>
                            <Button style={{ width: '200px' }} type='submit' variant='success'>Tiếp tục</Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default ShippingScreen
