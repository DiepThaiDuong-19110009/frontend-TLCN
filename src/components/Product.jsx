import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Row } from 'react-bootstrap'
import Rating from '../components/Rating'

const Product = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`} className='d-flex justify-content-center align-items-center' style={{ textDecoration: 'none', color: 'black' }}>
            <Card style={{ border: 'none', borderRadius: '0px' }}>
                <Card.Img src={product.photo} alt={product.name} variant='top' style={{ width: '80%', margin: '0 auto' }} />
                <Card.Body>
                    <Card.Title as='h6' style={{ minHeight: '40px' }}>
                        <p className='my-3'>{product.name}</p>
                    </Card.Title>
                    {
                        product.reviews?.length !== undefined &&
                        <Card.Text as='p'>
                            <Rating value={product.rating} text={`(${product.reviews?.length} đánh giá)`} />
                        </Card.Text>
                    }
                    <Row className='d-flex justify-content-between'>
                        <Card.Text as='h7' className='d-flex justify-content-between align-items-center' style={{ width: 'auto' }} >
                            <p className='my-0' style={{ color: 'red', fontSize: '18px' }}>{product.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                        </Card.Text>
                        <Link className='mx-0' style={{ color: 'black', textDecoration: 'none', width: 'auto', margin: '0 auto' }} to={`/product/${product._id}`}>
                            <Card.Title as='p' style={{ width: 'auto', color: 'green' }} className='my-0 py-0'>
                                Chi tiết
                            </Card.Title>
                        </Link>
                    </Row>
                </Card.Body>
            </Card >
        </Link>
    )
}

export default Product