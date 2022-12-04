import { React, useEffect } from 'react'
import { Row, Container, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Slider from '../components/Slider'
import TopProduct from '../components/TopProduct'
import Banner from '../components/Banner'

const HomeScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <Container className='pt-4' style={{ background: '#f5f5f5' }}>
      <div className="marquee me-4 d-flex align-items-center mb-3" style={{ background: 'green' }}>
        <div style={{ color: '#f5f5f5' }}>
          <span>Kính chào quý khách đã đến với cửa hàng thực phẩm sạch HDKMart. 
            Nơi cung cấp các sản phẩm tươi ngon và an toàn vệ sinh thực phẩm.</span>
            <span>Kính chào quý khách đã đến với cửa hàng thực phẩm sạch HDKMart. 
            Nơi cung cấp các sản phẩm tươi ngon và an toàn vệ sinh thực phẩm.</span>
        </div>
      </div>
      <Row className='mx-0 mb-3'>
        <Col xl={12}>
          <Slider />
        </Col>
        {/* <Col xl={4} >
          <Banner />
        </Col> */}
      </Row>
      <Row className='mx-0'>
        <Banner />
      </Row>
      <Row style={{ background: '#f5f5f5' }}>
        <TopProduct />
      </Row>
    </Container>
  )
}

export default HomeScreen