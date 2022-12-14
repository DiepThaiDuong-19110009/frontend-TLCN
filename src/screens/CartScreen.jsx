import { React, useEffect, useState } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form, Container, Modal } from 'react-bootstrap'
import { addToCart, removeFormCart } from '../actions/cartActions'

const CartScreen = () => {
  let location = useLocation();
  const productId = useParams().id
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity))
    }
    //eslint-disable-next-line 
  }, [dispatch])

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate('/login')
    } else {
      navigate('/shipping')
    }
  }

  const increaseQty = (id, count, quantity) => {
    const newQty = count + 1;
    if (newQty > quantity) return;
    dispatch(addToCart(id, newQty))
  }

  const decreaseQty = (id, count) => {
    const newQty = count - 1;
    if (newQty <= 0) return;
    dispatch(addToCart(id, newQty))

  }

  const removeFromCartHandler = (id) => {
    dispatch(removeFormCart(id))
    setShowAlert(false)
  }
  const [idProduct, setIdProduct] = useState('')
  const [showAlert, setShowAlert] = useState(false);
  const handleCloseAlert = () => setShowAlert(false);
  const handleDeleteProduct = (id) => {
    setShowAlert(true);
    setIdProduct(id)
  }

  return (
    <Container style={{ background: '#f5f5f5' }}>
      <Row className='mx-0 mt-3'>
        <Col md={8} className='px-0'>
          {/* <Link to='/product'>
            <Button className='mb-5' variant="outline-success">Tiếp tục mua hàng</Button>
          </Link> */}
          {cartItems.length === 0 ?
            <Row className='pb-1 d-flex justify-content-center align-items-center'>
              <Image style={{ width: '30%' }} src='https://anhbatay.com/assets/img/empty-cart.png' />
              <Row className='p-1 d-flex justify-content-center align-items-center'>
                Giỏ hàng trống
              </Row>
              <Row>
                <Link style={{ textDecoration: 'none', color: 'green' }} className='p-1 d-flex justify-content-center align-items-center' to='/product'>Mua hàng ngay</Link>
              </Row>
            </Row> :
            <ListGroup variant='flush'>
              <Row id='table-cart' style={{ background: 'white', borderBottom: '4px solid #f5f5f5' }} className='py-2 mx-0'>
                <Col xl={1}></Col>
                <Col xl={4} className='d-flex align-items-center justify-content-center'><strong>SẢN PHẨM</strong></Col>
                <Col xl={2} className='d-flex align-items-center justify-content-center'><strong>GIÁ</strong></Col>
                <Col xl={2} className='d-flex align-items-center justify-content-center'><strong>SỐ LƯỢNG</strong></Col>
                <Col xl={3} className='d-flex align-items-center justify-content-center'><strong>TỔNG CỘNG</strong></Col>
              </Row>
              {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row style={{ background: 'white' }}>
                    <Col md={1} className='d-flex align-items-center justify-content-center'>
                      <Button type='button' variant='danger' onClick={() => handleDeleteProduct(item.product)}>
                        <i className='fas fa-minus'></i>
                      </Button>
                    </Col>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={2} className='d-flex align-items-center justify-content-center'>
                      <Link style={{ textDecoration: 'none', color: 'black' }} to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2} className='d-flex align-items-center justify-content-center'>{(item.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</Col>
                    <Col md={2} className='d-flex align-items-center justify-content-center'>
                      <Row className="d-flex justify-content-between">
                        <Form.Group className="d-flex justify-content-between" >
                          <Button disabled={item.count === 1 ? 'true' : ''} className='py-0' variant="outline-success" style={{ width: '40px', height: '40px', fontSize: '20px' }} onClick={() => decreaseQty(item.product, item.count)}>-</Button>
                          <input style={{ width: '50px', height: '40px' }} type='text' inputmode="decimal" className="form-control text-center mx-1" value={item.count} readOnly></input>
                          <Button disabled={item.count === item.quantity ? 'true' : ''} className='py-0' variant="outline-success" style={{ width: '40px', height: '40px', fontSize: '20px' }} onClick={() => increaseQty(item.product, item.count, item.quantity)}>+</Button>
                        </Form.Group>
                      </Row>
                    </Col>
                    <Col md={3} className='d-flex align-items-center justify-content-center'>
                      {(item.count * item.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          }
          {
            cartItems.length !== 0 &&
            <Link to='/product' style={{ color: 'green', textDecoration: 'none' }}>
              <Button variant="outline-success" style={{ width: 'auto' }} className='my-3'>
                <i className="fas fa-arrow-left me-2"></i>
                Tiếp tục mua hàng
              </Button>
            </Link>
          }
        </Col>
        <Col md={4}>
          <Card style={{ border: 'none', borderRadius: '0px' }}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <div style={{ background: 'white', borderBottom: '4px solid #f5f5f5' }} className='d-flex align-items-center py-1 my-0'><strong>TỔNG GIỎ HÀNG</strong></div>
                <h6 className='py-3'>Tổng sản phẩm: ({cartItems.reduce((acc, item) => acc + item.count, 0)}) Sản phẩm</h6>
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
      </Row >
      {/* Unlock user */}
      < Modal
        show={showAlert}
        onHide={handleCloseAlert}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xóa sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa sản phẩm này không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAlert}>
            Hủy
          </Button>
          <Button variant="danger" onClick={() => removeFromCartHandler(idProduct)}>Đồng ý</Button>
        </Modal.Footer>
      </Modal >
    </Container >
  )
}

export default CartScreen
