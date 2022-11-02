import { React, useEffect, useState } from 'react'
import { Row, Col, Container, ListGroup, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts, listCategory } from '../actions/productActions'

const TopProduct = () => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <div>
            <h3>Sản phẩm nổi bật</h3>
            <Row id='productlist' style={{ border: 'solid 2px #f2f2f2', borderRadius: '10px' }} className="py-3 px-3 my-5">
               {/* (products.slice(0, 4).map(product => (
                <Col key={product.id} sm={0} md={0} lg={4} xl={3}>
                    <Product product={product} />)
                </Col>)) */}
                <form action='http://localhost:5000/api/pay' method='post'>
                    <button>OK luon!</button>
                </form>
            </Row>
        </div>
    )
}

export default TopProduct