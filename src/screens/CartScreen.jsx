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
      <Row className='py-5 mx-0'>
        <Row style={{ background: '#f2f2f2', borderRadius: '10px' }} className='mb-5'>
          <h3 className='p-3 d-flex justify-content-center align-items-center'>Giỏ hàng</h3>
        </Row>
        <Col md={8} className='px-0'>
          <Link to='/product'>
            <Button className='mb-5' variant="outline-success">Tiếp tục mua hàng</Button>
          </Link>
          {cartItems.length === 0 ?
            <Row className='pb-1 d-flex justify-content-center align-items-center'>
              <Image style={{ width: '30%' }} src='https://anhbatay.com/assets/img/empty-cart.png' />
              <Row className='p-1 d-flex justify-content-center align-items-center'>
                Giỏ hàng trống
              </Row>
              <Row>
                <Link style={{textDecoration: 'none', color: 'green'}} className='p-1 d-flex justify-content-center align-items-center' to='/product'>Mua hàng ngay</Link>
              </Row>
            </Row> :
            <ListGroup variant='flush'>
              {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={3}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3} className='d-flex align-items-center'>
                      <Link style={{ textDecoration: 'none', color: 'black' }} to={`/product/${item.product}`}>{item.name}</Link>
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
                    <Col md={1} className='d-flex align-items-center'>
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
                <h4 className='py-3'>Tổng sản phẩm: ({cartItems.reduce((acc, item) => acc + item.count, 0)}) Sản phẩm</h4>
                Tổng tiền: <strong style={{ color: 'red', fontSize: '20px' }}>{cartItems.reduce((acc, item) => acc + item.count * item.price, 0).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</strong>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-center py-3">
                <Button style={{ width: '100%' }} type='button' variant="success" className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                  Tiến hành thanh toán
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