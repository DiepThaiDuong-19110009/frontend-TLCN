import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Row } from 'react-bootstrap'
import Rating from '../components/Rating'

const Product = ({ product }) => {
    return (
        <Card className='mb-5 p-3 rounded shadow bg-white rounded'>
            <Link to={`/product/${product._id}`} className='d-flex justify-content-center align-items-center'>
                <Card.Img src={product.photo} alt={product.name} variant='top' style={{ width: '80%', margin: '0 auto' }} />
            </Link>
            <Card.Body>
                <Card.Text as='p'>
                    <Rating value={product.rating} text={`${product.reviews?.length} đánh giá`} />
                </Card.Text>
                <Link style={{ color: 'black', textDecoration: 'none' }} to={`/product/${product._id}`}>
                    <Card.Title as='h6'>
                        <p className='my-3'>{product.name}</p>
                    </Card.Title>
                </Link>
                <Row className='d-flex justify-content-between'>
                    <Card.Text as='h7' className='text-danger my-0 py-0' style={{ width: 'auto' }} >
                        Giá: {product.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                    </Card.Text>
                    <Link style={{ color: 'black', textDecoration: 'none', width: 'auto', margin: '0' }} to={`/product/${product._id}`}>
                        <Card.Title as='p' style={{ width: 'auto', color: 'green' }} className='my-0 py-0'>
                            Xem chi tiết
                        </Card.Title>
                    </Link>
                </Row>
            </Card.Body>
        </Card >
    )
}

export default Product