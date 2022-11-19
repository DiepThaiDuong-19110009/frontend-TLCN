import { React, useEffect, useState } from 'react'
import { Row, Col, Container, ListGroup, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts, listCategory } from '../actions/productActions'
import Slider from '../components/Slider'
import Search from '../components/Search'


const ProductScreen = () => {
  const [data, setData] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [loadMore, setLoadMore] = useState(12)

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList
  // console.log('==', products);

  const categoryList = useSelector(state => state.categoryList)
  const { categories } = categoryList
  // console.log('==', categories);

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
    setLoadMore(loadMore => loadMore = 6)
    window.location.href = '#productlist'
    arrProductGetCateId.length = 0
    getProductByCategotyId(products, id)
    setData(arrProductGetCateId)
    setShowAll(false)
  }

  const showAllProduct = () => {
    window.location.href = '#productlist'
    setShowAll(true)
  }

  //Load more
  const loadMoreOnClick = () => {
    setLoadMore(loadMore => loadMore + 6)
  }

  const collapseOnClick = () => {
    setLoadMore(loadMore => loadMore = 6)
  }

  return (
    <div style={{background: '#f5f5f5'}}>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        <Container className='pt-3' style={{background: '#f5f5f5'}}>
          <Row>
            <Col>
              <ListGroup as="ul" style={{borderRadius: '0px'}}>
                <ListGroup.Item style={{ background: 'green', display: 'flex', alignItems: 'center'}}>
                  <i style={{ fontSize: '16px', color: '#f2f2f2', marginRight: '3%' }} class="fas fa-bars"></i>
                  <h6 className='text-light my-2'>Danh mục sản phẩm</h6>
                </ListGroup.Item>
                <ListGroup.Item style={{fontSize: '14px'}} className='hoverCate' onClick={showAllProduct} >Tất cả sản phẩm</ListGroup.Item>
                {categories.map(category => (
                  <ListGroup.Item style={{fontSize: '14px'}} className='hoverCate' key={category._id} onClick={getCategoryId(category._id)} as="li">{category.name}</ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col className='h-100' md={9} >
              <Slider />
            </Col>
          </Row>
          <Row id='productlist'>
            <Col sm={0} md={0} lg={8} xl={8}>
              <h5 className='mt-5 mb-4'>Danh sách sản phẩm</h5>
            </Col>
          </Row>
          <Row className="py-3 px-3">
            <Row>
              <Col sm={0} md={0} lg={4} xl={4} className='d-flex justify-content-center align-item'>
                {/* <p className='mb-4 mt-3'>Sắp xếp</p> */}
                {/* <DropdownButton id="dropdown-item-button" title="Dropdown button">
                  <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
                  <Dropdown.Item as="button">Action</Dropdown.Item>
                  <Dropdown.Item as="button">Another action</Dropdown.Item>
                  <Dropdown.Item as="button">Something else</Dropdown.Item>
                </DropdownButton> */}
              </Col>
            </Row>
            {showAll === false ? (data.slice(0, loadMore).map(product => (
              <Col key={product.id} sm={0} md={0} lg={4} xl={2} className='px-1 pb-2'>
                <Product product={product} />
              </Col>
            ))) : (
              products.slice(0, loadMore).map(product => (
                <Col key={product.id} sm={0} md={0} lg={4} xl={2} className='px-1 pb-2'>
                  <Product product={product} />
                </Col>
              ))
            )}
            <Row className='my-3'>
              {
                (loadMore >= ((showAll === false) ? data.length : products.length))
                  ?
                  <Col className='d-flex justify-content-center'>
                    <Button className='w-25' variant="outline-primary" onClick={collapseOnClick}>Thu gọn</Button>
                  </Col>
                  :
                  <Col className='d-flex justify-content-center'>
                    <Button className='w-25' variant="outline-primary" onClick={loadMoreOnClick}>Xem thêm</Button>
                  </Col>
              }
            </Row>
          </Row>
        </Container>}
    </div >
  )
}

export default ProductScreen