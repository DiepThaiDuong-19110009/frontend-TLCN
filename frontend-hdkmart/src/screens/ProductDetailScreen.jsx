import { React, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form, Container } from 'react-bootstrap'
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
            <Link to='/' className='btn btn-light my-3'>Quay lại</Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                <Row>
                    <Col md={5}>
                        <Image src={product.photo} alt={product.name} fluid />
                    </Col>
                    <Col md={4}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item className='d-flex justify-content-between align-items-center'>
                                <Rating value={product.rating} text={`${product.reviews?.length} đánh giá`} />
                                <p className='my-0' style={{ cursor: 'pointer' }} onClick={viewComment}>Xem đánh giá</p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Giá: {product.price} VNĐ
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Mô tả sản phẩm: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Giá:</Col>
                                        <Col>
                                            <strong>{product.price} VNĐ</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Trạng thái:</Col>
                                        <Col>
                                            {product.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.quantity > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Số lượng</Col>
                                            <Col>
                                                <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.quantity).keys()].map(x => (
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}

                                <ListGroup.Item className='text-center'>
                                    <Button onClick={addToCartHandler} className='btn btn-success' type='button' disabled={product.quantity === 0}>Thêm vào giỏ hàng</Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>}
            <Row>
                <h4 id="comment" className='pb-4'>Đánh giá sản phẩm ({product.reviews?.length})</h4>
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
                        <Form.Control value={comment} onChange={(e) => setComment(e.target.value)} as="textarea" rows={3} />
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