import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from '../components/Rating'

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded shadow p-3 mb-5 bg-white rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.photo} alt={product.name} variant='top' />
            </Link>
            <Card.Body>
                <Card.Text as='p'>
                    <Rating value={product.quantity} text={`${product.quantity} đánh giá`} />
                </Card.Text>
                <Link style={{ color: 'black' }} to={`/product/${product._id}`}>
                    <Card.Title as='h5'>
                        <p>{product.name}</p>
                    </Card.Title>
                </Link>
                <Card.Text as='h5' className='text-danger'>
                    Giá: {product.price} VNĐ / kg
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product