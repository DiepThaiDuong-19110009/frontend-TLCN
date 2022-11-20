import { React, useEffect } from 'react'
import { Row, Container, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Slider from '../components/Slider'
import Search from '../components/Search'
import Introduce from '../components/Introduce'
import TopProduct from '../components/TopProduct'
import Banner from '../components/Banner'

const HomeScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <Container className='pt-4' style={{ background: '#f5f5f5' }}>
      <Row className='mx-0'>
        <Col xl={12}>
          <Slider />
        </Col>
        {/* <Col xl={4} >
          <Banner />
        </Col> */}
      </Row>
      <Row style={{ border: 'solid 2px #dddddd', borderRadius: '5px' }} className='py-4 my-5'>
        <Introduce />
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