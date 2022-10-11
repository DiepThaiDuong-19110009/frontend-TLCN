import { React, useEffect, useState } from 'react'
import { Row, Col, Container, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts, listCategory } from '../actions/productActions'
import Slider from '../components/Slider'
import Search from '../components/Search'
import Paginations from '../components/Pagination'


const HomeScreen = () => {
  const [data, setData] = useState([])
  const [showAll, setShowAll] = useState(true)

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  const categoryList = useSelector(state => state.categoryList)
  const { categories } = categoryList

  useEffect(() => {
    dispatch(listProducts())
    dispatch(listCategory())
  }, [dispatch])

  let arrProductGetCateId = []

  const getProductByCategotyId = (product, id) => {
    product.forEach(pro => {
      if (pro.category._id === id) {
        arrProductGetCateId.push(pro)
      }
    });
  }

  const getCategoryId = (id) => e => {
    arrProductGetCateId.length = 0
    getProductByCategotyId(products, id)
    setData(arrProductGetCateId)
    setShowAll(false)
  }

  const showAllProduct = () => {
    setShowAll(true)
  }

  return (
    <div>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        < Container >
          <Row>
            <Search />
          </Row>
          <Row>
            <Col>
              <ListGroup as="ul">
                <ListGroup.Item style={{ background: 'green', display: 'flex', alignItems: 'center' }}>
                  <i style={{ fontSize: '20px', color: '#f2f2f2', marginRight: '3%' }} class="fas fa-bars"></i>
                  <h5 className='text-light my-2'>Danh mục sản phẩm</h5>
                </ListGroup.Item>
                <ListGroup.Item className='hoverCate' onClick={showAllProduct} >Tất cả sản phẩm</ListGroup.Item>
                {categories.map(category => (
                  <ListGroup.Item className='hoverCate' key={category._id} onClick={getCategoryId(category._id)} as="li">{category.name}</ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col className='h-100' md={9} >
              <Slider />
            </Col>
          </Row>
          <Row className="py-5">
            {showAll === false ? (data.map(product => (
              <Col key={product.id} sm={0} md={0} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))) : (
              products.map(product => (
                <Col key={product.id} sm={0} md={0} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))
            )}
          </Row>
          <Row>
            <Paginations />
          </Row>
        </Container>}
    </div >
  )
}

export default HomeScreen