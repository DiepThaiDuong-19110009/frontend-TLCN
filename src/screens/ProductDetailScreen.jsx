import { React, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, Card, Button, Form, Container } from 'react-bootstrap'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import 'react-medium-image-zoom/dist/styles.css'
import Zoom from 'react-medium-image-zoom'
import Rate from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, createCommentProduct } from '../actions/productActions'
import { addToCart } from '../actions/cartActions';
import { getOrder } from '../actions/orderActions';

const ProductDetailScreen = () => {
    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')
    const [alert, setAlert] = useState('')

    const navigate = useNavigate();

    const productId = useParams().id
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const orderList = useSelector(state => state.orderList)
    const { orders } = orderList

    let arrOrder = []
    const getOrderById = () => {
        orders?.forEach(item => {
            if (item?.user?._id === userInfo?.user?._id && item.status === 'DONE') {
                arrOrder.push(item)
            }
        });
    }
    getOrderById()

    let arrCheckIdProduct = []
    const checkIdProduct = (arrOrder) => {
        arrOrder?.forEach(item => {
            item?.products?.forEach(product => {
                if (product.product === productId) {
                    arrCheckIdProduct.push(product)
                }
            })
        });
    }
    checkIdProduct(arrOrder)

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    let stock = product?.supplier?.quantityImport - product.sold
    const arrStock = []
    for (let i = 1; i <= stock; i++) {
        arrStock.push(i)
    }

    useEffect(() => {
        dispatch(getOrder())
        dispatch(listProductDetails(productId))
        window.scrollTo(0, 0)
    }, [dispatch, productId])

    const addToCartHandler = () => {
        let check = false
        cartItems.forEach(x => {
            if (x.product === productId) {
                x.count += quantity
                dispatch(addToCart(productId, x.count))
                navigate(`/cart/${productId}?qty=${x.count}`)
                check = true
            }
        })
        if (check === false) {
            dispatch(addToCart(productId, quantity))
            navigate(`/cart/${productId}?qty=${quantity}`)
        }
    }

    const submitComment = () => {
        const commentProduct = { user: userInfo.user._id, rating, comment }
        if (comment === '') {
            setAlert('Vui lòng thêm nội dung đánh giá')
        }
        else if (userInfo) {
            dispatch(createCommentProduct(productId, commentProduct))
            window.location.reload()
        }
    }

    // Add to cart
    const increaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber >= product.quantity) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }

    const decreaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber <= 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty)
    }

    const viewComment = () => {
        window.location.href = '#comment'
    }

    return (
        <Container style={{ background: '#ffffff' }} className='pt-2'>
            <Link to='/product' style={{ textDecoration: 'none' }} className='d-flex'>
                <Button variant="outline-success" className='mt-3 d-flex justify-content-center align-items-center'>
                    <i className="fas fa-chevron-left"></i>
                    <p className='my-0' style={{ marginLeft: '10px' }}>Quay lại</p>
                </Button>
            </Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                <Row style={{ width: 'auto', margin: '0 auto' }} className='d-flex justify-content-evenly py-0'>
                    <Col md={4}>
                        <Zoom>
                            <Image
                                alt="That Wanaka Tree, New Zealand by Laura Smetsers"
                                src={product.photo}
                                width="400"
                                fluid
                                style={{ background: '#f3f3f3' }}
                            />
                        </Zoom>
                    </Col>
                    <Col md={8}>
                        <Card style={{ width: '100%', border: 'none' }}>
                            <Card.Body>
                                <Card.Title><h5>{product.name}</h5></Card.Title>
                                <Card.Subtitle className="my-3 text-muted"><p>Nhà cung cấp: {product.supplier?.id?.name}</p></Card.Subtitle>
                                <Card.Text className='d-flex justify-content-between'>
                                    <div>
                                        Giá: <strong style={{ color: 'red', fontSize: '20px' }}>{product.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</strong>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <Rate value={product.rating} />
                                        <p className='my-0' style={{ cursor: 'pointer' }} onClick={viewComment}>(Xem {product.reviews?.length} đánh giá)</p>
                                        <p className='my-0 mx-2'> | </p>
                                        <p className='my-0'>Đã bán <strong>{product.sold}</strong></p>
                                    </div>
                                </Card.Text>
                                <Card.Text>
                                    <h6 className='my-2' style={{ fontSize: '15px' }}>Mô tả sản phẩm:</h6>
                                    <p>{product.description}</p>
                                </Card.Text>
                                <Card.Text>
                                    Trạng thái: {(product.quantity) > 0 ? <strong style={{ color: 'green' }}>Còn hàng</strong> : <strong style={{ color: 'red' }}>Hết hàng</strong>}
                                </Card.Text>
                                <Row className='d-flex justify-content-between align-items-center'>
                                    <Col xl={2} className='d-flex justify-content-center align-items-center mt-3'>
                                        <h6 className='my-0'>Số lượng:</h6>
                                    </Col>
                                    <Col xl={4} className='d-flex justify-content-center align-items-center mt-3'>
                                        <Row className="d-flex justify-content-between">
                                            <Button disabled={quantity === 1 ? 'true' : ''} className='py-0' variant="outline-success" style={{ width: '40px', height: '40px', fontSize: '20px' }} onClick={decreaseQty}>-</Button>
                                            <input style={{ width: '80px', height: '40px' }} type="number" className="form-control count text-center mx-2" value={quantity} readOnly />
                                            <Button disabled={quantity === product.quantity ? 'true' : ''} className='py-0' variant="outline-success" style={{ width: '40px', height: '40px', fontSize: '20px' }} onClick={increaseQty}>+</Button>
                                        </Row>
                                    </Col>
                                    <Col xl={6} className='d-flex justify-content-center align-items-center mt-3'>
                                        <Button className='py-2' onClick={addToCartHandler} variant="success" type='button' disabled={product.quantity === 0}>
                                            <div className='d-flex justify-content-between'>
                                                <i className="fas fa-cart-arrow-down" style={{ fontSize: '25px', marginRight: '10px' }}></i>
                                                <p className='my-0'>Thêm vào giỏ hàng</p>
                                            </div>
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>}
            <Row id="comment" className='mb-2'>
                <h5 className='pt-5 pb-3'>Đánh giá sản phẩm ({product.reviews?.length})</h5>
                {
                    (userInfo && arrCheckIdProduct?.length > 0) ? <Form>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend" className='py-3'>
                                Vui lòng chọn đánh giá
                            </Typography>
                            <Rating
                                name="Rating Label"
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                            />
                        </Box>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <p style={{ color: 'red' }}>{alert}</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Bình luận của bạn về sản phẩm</Form.Label>
                            <Form.Control placeholder='Viết bình luận của bạn' value={comment} onChange={(e) => setComment(e.target.value)} as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Button onClick={submitComment}>Đăng bình luận</Button>
                        </Form.Group>
                    </Form>
                        :
                        <p>Vui lòng mua hàng và thanh toán thành công sản phẩm, bạn sẽ được mở khóa đánh giá.</p>
                }
                <Row className='pt-3 d-flex align-items-center justify-content-end'>
                    <h4 className='pb-4'>Các bình luận</h4>
                    {product.reviews?.length === 0 ?
                        <p>Chưa có bình luận nào</p>
                        :
                        product.reviews?.reverse().map((review) => (
                            <Row>

                                <Row className='px-0'>
                                    <Col>
                                        <h6>{review.user.name}</h6>
                                    </Col>
                                    <Col className='d-flex align-items-center justify-content-end'>
                                        <h6 className='my-0 mx-3'>Đã đánh giá: </h6>
                                        <Rate value={review.rating} />
                                    </Col>
                                </Row>
                                <Row className='px-0'>
                                    <Col>
                                        <p className='pb-4'>{review.comment}</p>
                                    </Col>
                                    {/* <Col className='d-flex align-items-center justify-content-end'>
                                        <p style={{color: 'gray'}} className='pb-4'>Ngày đăng: {review.createAt}</p>
                                    </Col> */}
                                </Row>
                            </Row>
                        ))
                    }
                </Row>
            </Row>
        </Container>
    )
}

export default ProductDetailScreen
