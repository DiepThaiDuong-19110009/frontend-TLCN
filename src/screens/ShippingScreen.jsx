import { React, useState } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import Input from 'react-phone-number-input/input'

const ShippingScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const [message, setMessage] = useState('')

    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city ? shippingAddress.city : 'Quận 1')
    const [country, setCountry] = useState(shippingAddress.country ? shippingAddress.country : 'Thành phố Hồ Chí Minh')
    const [phone, setPhone] = useState(shippingAddress.phone)


    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('===', address, city, country, phone)
        if (address.trim().length === 0 || city.trim().length === 0 || country.trim().length === 0 || phone.trim().length === 0) {
            setMessage('Cung cấp đầy đủ thông tin')
        } else {
            dispatch(saveShippingAddress({ address, city, country, phone }))
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
                            <Form.Label>Địa chỉ nhận hàng (Số nhà và tên đường)</Form.Label>
                            <Form.Control type='text' placeholder='Nhập địa chỉ' value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Quận/Huyện</Form.Label>
                            <Form.Select value={city} onChange={(e) => setCity(e.target.value)}>
                                <option value='Quận 1'>Quận 1</option>
                                <option value='Quận 2'>Quận 2</option>
                                <option value='Quận 3'>Quận 3</option>
                                <option value='Quận 4'>Quận 4</option>
                                <option value='Quận 5'>Quận 5</option>
                                <option value='Quận 6'>Quận 6</option>
                                <option value='Quận 7'>Quận 7</option>
                                <option value='Quận 8'>Quận 8</option>
                                <option value='Quận 9'>Quận 9</option>
                                <option value='Quận 10'>Quận 10</option>
                                <option value='Quận 11'>Quận 11</option>
                                <option value='Quận 12'>Quận 12</option>
                                <option value='Quận Bình Tân'>Quận Bình Tân</option>
                                <option value='Quận Bình Thạnh'>Quận Bình Thạnh</option>
                                <option value='Quận Gò Vấp'>Quận Gò Vấp</option>
                                <option value='Quận Phú Nhuận'>Quận Phú Nhuận</option>
                                <option value='Quận Tân Bình'>Quận Tân Bình</option>
                                <option value='Quận Tân Phú'>Quận Tân Phú</option>
                                <option value='Quận Thủ Đức'>Quận Thủ Đức</option>
                                <option value='Huyện Bình Chánh'>Huyện Bình Chánh</option>
                                <option value='Huyện Cần Giờ'>Huyện Cần Giờ</option>
                                <option value='Huyện Củ chi'>Huyện Củ chi</option>
                                <option value='Huyện Hóc Môn'>Huyện Hóc Môn</option>
                                <option value='Huyện Nhà Bè'>Huyện Nhà Bè</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Thành phố</Form.Label>
                            <Form.Select value={country} onChange={(e) => setCountry(e.target.value)}>
                                <option value='Thành phố Hồ Chí Minh'>Thành phố Hồ Chí Minh</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Số điện thoại người nhận</Form.Label><br/>
                            {/* <Form.Control type='text' placeholder='Nhập số điện thoại' value={phone} onChange={(e) => setPhone(e.target.value)}></Form.Control> */}
                            <Input style={{width: '100%', border: '1px solid #dcdcdc'}} className='rounded p-2'
                            placeholder='Nhập số điện thoại'
                            defaultCountry="VN"
                            value={phone}
                            onChange={setPhone} />
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
