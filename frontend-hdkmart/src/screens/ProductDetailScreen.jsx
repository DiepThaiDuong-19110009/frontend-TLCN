import { React, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productActions'

const ProductDetailScreen = () => {
    const [qty, setQty] = useState(1)

    const navigate = useNavigate();

    const productId = useParams().id
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    // setImg(...product.images)
    // console.log('==', product.images);

    useEffect(() => {
        dispatch(listProductDetails(productId))
    }, [dispatch, productId])

    //Event add to cart
    const addToCartHandler = () => {
        navigate(`/cart/${productId}?qty=${qty}`)
    }

    return (
        <>
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
                            <ListGroup.Item>
                                <Rating value={product.sold} text={`${product.quantity} đánh giá`} />
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
        </>
    )
}

export default ProductDetailScreen