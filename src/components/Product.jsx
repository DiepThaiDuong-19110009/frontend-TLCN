import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from '../components/Rating'

const Product = ({ product }) => {
    return (
        <Card className='mb-5 p-3 rounded shadow bg-white rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.photo} alt={product.name} variant='top' />
            </Link>
            <Card.Body>
                <Card.Text as='p'>
                    <Rating value={product.rating} text={`${product.reviews?.length} đánh giá`} />
                </Card.Text>
                <Link style={{ color: 'black', textDecoration: 'none' }} to={`/product/${product._id}`}>
                    <Card.Title as='h6'>
                        <p>{product.name}</p>
                    </Card.Title>
                </Link>
                <Card.Text as='h6'>
                    Nhà cung cấp: {product.supplier?.id?.name}
                </Card.Text><br />
                <Card.Text as='h7' className='text-danger'>
                    Giá: {product.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                </Card.Text>
            </Card.Body>
        </Card >
    )
}

export default Product