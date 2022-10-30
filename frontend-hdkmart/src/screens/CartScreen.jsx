import { React, useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form, Container } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFormCart } from '../actions/cartActions'

const CartScreen = () => {
  let location = useLocation();
  const productId = useParams().id
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  console.log('==', cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity))
    }
  }, [dispatch, productId, quantity])

  // Comfirm Remove

  const removeFromCartHandler = (id) => {
    dispatch(removeFormCart(id))
  }

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate('/login')
    } else {
      navigate('/shipping')
    }
  }

  return (
    <Container>
      <Row>
        <Col md={8}>
          <h1>Giỏ hàng</h1>
          <Link to='/' className='btn btn-primary my-3'>Tiếp tục mua hàng</Link>
          {cartItems.length === 0 ? <Message>Giỏ hàng trống <Link to='/'>Mua hàng</Link></Message> :
            <ListGroup variant='flush'>
              {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3} className='d-flex align-items-center'>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2} className='d-flex align-items-center'>{(item.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</Col>
                    <Col md={2} className='d-flex align-items-center'>
                      <Form.Control as='select' value={item.count} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                        {
                          [...Array(item.quantity).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                          ))
                        }
                      </Form.Control>
                    </Col>
                    <Col md={2} className='d-flex align-items-center'>
                      <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Tổng sản phẩm: ({cartItems.reduce((acc, item) => acc + item.count, 0)}) Sản phẩm</h2>
                Tổng tiền: {cartItems.reduce((acc, item) => acc + item.count * item.price, 0).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-center py-3">
                <Button type='button' variant="success" className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                  Tiếp tục
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CartScreen