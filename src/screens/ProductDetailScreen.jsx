import { React, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, Card, Button, Form, Container } from 'react-bootstrap'
import 'react-medium-image-zoom/dist/styles.css'
import Zoom from 'react-medium-image-zoom'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, createCommentProduct } from '../actions/productActions'

const ProductDetailScreen = () => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')
    // console.log('==', comment);

    const navigate = useNavigate();

    const productId = useParams().id
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    console.log('==', userInfo);
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    // console.log('==', product.reviews);

    useEffect(() => {
        dispatch(listProductDetails(productId))
    }, [dispatch, productId])

    //Event add to cart
    const addToCartHandler = () => {
        navigate(`/cart/${productId}?qty=${qty}`)
    }

    // submit Comment
    const submitComment = () => {
        const commentProduct = { user: userInfo.user._id, rating, comment }
        // console.log('==', commentProduct)
        if (userInfo) {
            dispatch(createCommentProduct(productId, commentProduct))
            window.location.reload()
        }
    }

    // view Comment
    const viewComment = () => {
        window.location.href = '#comment'
    }
    return (
        <Container>
            <Link to='/product' style={{ textDecoration: 'none' }}>
                <Button variant="outline-success" className='my-5 d-flex justify-content-center align-items-center'>
                    <i className="fas fa-chevron-left"></i>
                    <p className='my-0' style={{marginLeft: '10px'}}>Quay lại</p>
                </Button>
            </Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                <Row style={{ width: 'auto', margin: '0 auto' }} className='d-flex justify-content-evenly'>
                    <Col md={5}>
                        <Zoom>
                            <Image
                                alt="That Wanaka Tree, New Zealand by Laura Smetsers"
                                src={product.photo}
                                width="500"
                                fluid
                                style={{ background: '#f3f3f3' }}
                            />
                        </Zoom>
                    </Col>
                    <Col md={5}>
                        <Card style={{ width: '100%', border: 'none' }}>
                            <Card.Body>
                                <Card.Title><h4>{product.name}</h4></Card.Title>
                                <Card.Subtitle className="my-3 text-muted"><h6>Nhà cung cấp: {product.supplier?.id?.name}</h6></Card.Subtitle>
                                <Card.Text className='d-flex justify-content-between'>
                                    <Rating value={product.rating} text={`${product.reviews?.length} đánh giá`} />
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <i className="fas fa-pen mx-2"></i>
                                        <p className='my-0' style={{ cursor: 'pointer' }} onClick={viewComment}>viết đánh giá</p>
                                    </div>
                                </Card.Text>
                                <Card.Text>
                                    Giá: <strong style={{ color: 'red', fontSize: '20px' }}>{product.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</strong>
                                </Card.Text>
                                <Card.Text>
                                    <h6 className='my-2' style={{ fontSize: '18px' }}>Mô tả sản phẩm:</h6> {product.description}
                                </Card.Text>
                                <Card.Text>
                                    Trạng thái: {product.quantity > 0 ? <strong style={{ color: 'green' }}>Còn hàng</strong> : <strong style={{ color: 'red' }}>Hết hàng</strong>}
                                </Card.Text>
                                <Card.Text className='d-flex justify-content-between'>
                                    <div>
                                        <p>Chọn số lượng:</p>
                                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                            {
                                                [...Array(product.quantity).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                ))
                                            }
                                        </Form.Control>
                                    </div>
                                    <Button onClick={addToCartHandler} variant="success" type='button' disabled={product.quantity === 0}>
                                        <i className="fas fa-cart-arrow-down" style={{ fontSize: '25px' }}></i>
                                        <p className='my-0'>Thêm vào giỏ hàng</p>
                                    </Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* <Col md={3}>
                        <Card>
                            
                        </Card>
                    </Col> */}
                </Row>}
            <Row id="comment">
                <h4 className='pt-5 pb-3'>Đánh giá sản phẩm ({product.reviews?.length})</h4>
                {userInfo && <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Đánh giá</Form.Label>
                        <Form.Select value={rating} onChange={(e) => setRating(e.target.value)} aria-label="Default select example">
                            <option value={5}>5 Sao</option>
                            <option value={4}>4 Sao</option>
                            <option value={3}>3 Sao</option>
                            <option value={2}>2 Sao</option>
                            <option value={1}>1 Sao</option>
                        </Form.Select>
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                       <p style={{color: 'red'}}>*Vui lòng viết bình luận của bạn</p>
                    </Form.Group> */}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Bình luận của bạn về sản phẩm</Form.Label>
                        <Form.Control placeholder='Viết bình luận của bạn' value={comment} onChange={(e) => setComment(e.target.value)} as="textarea" rows={3} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Button onClick={submitComment}>Đăng bình luận</Button>
                    </Form.Group>
                </Form>}
                <Row className='pt-3 d-flex align-items-center justify-content-end'>
                    <h4 className='pb-4'>Các bình luận</h4>
                    {product.reviews?.length === 0 ?
                        <p>Chưa có bình luận nào</p>
                        :
                        product.reviews?.reverse().map((review) => (
                            <Row className='px-0'>
                                <Col>
                                    <h6>{review.user.name}</h6>
                                </Col>
                                <Col className='d-flex align-items-center justify-content-end'>
                                    <h6 className='my-0 mx-3'>Đã đánh giá: </h6>
                                    <Rating value={review.rating} />
                                </Col>
                                <p className='pb-4'>{review.comment}</p>
                            </Row>
                        ))
                    }
                </Row>
            </Row>
        </Container>
    )
}

export default ProductDetailScreen