import { React, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrders, resetCart } from '../actions/orderActions'

const PlaceOrderScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const cart = useSelector(state => state.cart)
    const { cartItems, shippingAddress } = cart

    const formatPrice = (n) => {
        return n.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }

    // Calculate price
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.count, 0)
    cart.shippingPrice = cart.itemsPrice < 500000 ? 0 : 10000
    cart.taxPrice = Number((0.02 * cart.itemsPrice).toFixed(2))
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

    // Order
    const createOrder = useSelector(state => state.orderCreate)
    const { order, success, error } = createOrder

    useEffect(() => {
        if (success) {
            navigate('/ordersuccess')
            dispatch(resetCart())
        }

        //eslint-disable-next-line
    }, [navigate, success])

    let count = 0;
    cartItems.forEach(element => {
        count += element.count
     })

    const placeOrderHandler = () => {
        dispatch(createOrders({
            products: cartItems,
            amount: count,
            address: shippingAddress.address + ', ' + shippingAddress.city + ', ' + shippingAddress.country,
            status: "Not processed",
            total: cart.totalPrice,
            user: userInfo.user
        }))
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Đặt hàng</h2>
                            <p>
                                <strong>Tên người nhận: </strong>
                                {userInfo.user.name}
                            </p>
                            <p>
                                <strong>Địa chỉ: </strong>
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
                            <h2>Phương thức thanh toán</h2>
                            <strong>Thanh toán bằng: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Chi tiết đơn hàng</h2>
                            {cart.cartItems.length === 0 ? <Message>Giỏ hàng trống</Message> :
                                (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={2}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col className='d-flex align-items-center'>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col className='d-flex align-items-center' md={5}>
                                                        {item.count} x {item.price} VNĐ = {item.count * item.price} VNĐ
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
                                    <Col>{formatPrice(cart.itemsPrice)} VNĐ</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Chi phí giao hàng</Col>
                                    <Col>{formatPrice(cart.shippingPrice)} VNĐ</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Thuế (5%)</Col>
                                    <Col>{formatPrice(cart.taxPrice)} VNĐ</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tổng thanh toán</Col>
                                    <Col>{formatPrice(cart.totalPrice)} VNĐ</Col>
                                </Row>
                            </ListGroup.Item>
                            {/* <ListGroup.Item>{error && <Message>{error}</Message>}</ListGroup.Item> */}
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Thanh toán</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen