import { React, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card, Container, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrders, resetCart, setTotalOrderPayPal } from '../actions/orderActions'

const PlaceOrderScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const totalPayPal = useSelector(state => state.totalPayPal)
    const { total } = totalPayPal
    // console.log('==total', total)

    const cart = useSelector(state => state.cart)
    // console.log('==', cart)
    const { cartItems, shippingAddress } = cart

    // Calculate price
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.count, 0)
    cart.shippingPrice = cart.itemsPrice < 500000 ? 0 : 10000
    cart.taxPrice = Number((0.02 * cart.itemsPrice).toFixed(2))
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice

    // Order
    const createOrder = useSelector(state => state.orderCreate)
    const { success } = createOrder

    useEffect(() => {
        if (success && cart.paymentMethod === 'Tiền mặt') {
            navigate('/ordersuccess')
            dispatch(resetCart())
        } else if (success && cart.paymentMethod === 'PayPal'){
            dispatch(resetCart())
        }

        //eslint-disable-next-line
    }, [navigate, success])

    let count = 0;
    cartItems.forEach(element => {
        count += element.count
    })

    let method = ''
    cart.paymentMethod === 'Tiền mặt' ? method = 'COD' : method = 'PAYPAL'

    const order = {
        products: cartItems,
        amount: count,
        address: shippingAddress.address + ', ' + shippingAddress.city + ', ' + shippingAddress.country,
        method: method,
        total: cart.totalPrice,
        user: userInfo.user
    }

    // console.log('==>>>>>>>>>>>>>>>>>>', order)

    const placeOrderHandler = () => {
        dispatch(createOrders(order))
    }

    // Payment PayPal
    const handlerPayPal = () => {
        dispatch(createOrders(order))
        dispatch(setTotalOrderPayPal(cart.totalPrice))
    }

    return (
        <Container>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <h3 className='d-flex justify-content-center pb-3'>Đặt hàng</h3>
                <p className='d-flex justify-content-center pb-4'>Vui lòng kiểm tra đầy đủ thông tin trước khi tiến hành thanh toán</p>
            </Row>
            <Row>
                <Col md={8}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3 className='my-3'>Thông tin người nhận</h3>
                            <p>
                                <strong>Tên người nhận: </strong>
                                {userInfo.user.name}
                            </p>
                            <p>
                                <strong>Địa chỉ giao hàng: </strong>
                                {cart.shippingAddress.address}{', '}
                                {cart.shippingAddress.city}{', '}
                                {cart.shippingAddress.country}
                            </p>
                            <p>
                                <strong>Số điện thoại nhận hàng: </strong>
                                {cart.shippingAddress.phone}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3 className='my-3'>Phương thức thanh toán</h3>
                            <p>Thanh toán bằng: <strong>{cart.paymentMethod}</strong></p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Chi tiết đơn hàng</h3>
                            {cart.cartItems.length === 0 ? <Message>Giỏ hàng trống</Message> :
                                (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={3}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col className='d-flex align-items-center'>
                                                        <Link className='px-3' style={{ textDecoration: 'none', color: 'black' }} to={`/product/${item.product}`}>
                                                            <strong>{item.name}</strong>
                                                        </Link>
                                                    </Col>
                                                    <Col className='d-flex align-items-center' md={5}>
                                                        {item.count} x {item.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })} = {(item.count * item.price)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Tổng thanh toán</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tổng tiền hàng</Col>
                                    <Col>{(cart.itemsPrice).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Chi phí giao hàng</Col>
                                    <Col>{(cart.shippingPrice).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</Col>
                                </Row>
                            </ListGroup.Item>
                            {/* <ListGroup.Item>
                                <Row>
                                    <Col>Thuế (5%)</Col>
                                    <Col>{(cart.taxPrice).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</Col>
                                </Row>
                            </ListGroup.Item> */}
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tổng thanh toán</Col>
                                    <Col>{(cart.totalPrice).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</Col>
                                </Row>
                            </ListGroup.Item>
                            {/* <ListGroup.Item>{error && <Message>{error}</Message>}</ListGroup.Item> */}
                            <ListGroup.Item className='d-flex justify-content-center py-4'>
                                {
                                    cart.paymentMethod === 'Tiền mặt' ?
                                        <Button style={{ width: '100%' }} type='button' className='btn-success' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Thanh toán</Button> :
                                        <Button onClick={handlerPayPal} style={{ background: 'white', border: '1px solid gray', borderRadius: '10px' }} className='shadow-sm d-flex justify-content-center align-items-center p-3'>
                                            <Image style={{ height: '50px' }} src='https://quyetdao.com/wp-content/uploads/2019/04/paypal-logo.png' alt='paypal'></Image>
                                            <h5 className='my-0 mx-3' style={{ color: 'black' }}>Thanh toán</h5>
                                        </Button>
                                }
                                {/* action='http://localhost:5000/api/pay' */}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default PlaceOrderScreen