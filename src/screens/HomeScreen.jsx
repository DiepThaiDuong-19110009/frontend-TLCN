import { React, useEffect } from 'react'
import { Row, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Slider from '../components/Slider'
import Search from '../components/Search'
import Introduce from '../components/Introduce'
import TopProduct from '../components/TopProduct'

const HomeScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <Container>
      <Row>
        <Search />
      </Row>
      <Row>
        <Slider />
      </Row>
      <Row style={{ border: 'solid 2px #dddddd', borderRadius: '5px' }} className='py-4 my-5'>
        <Introduce />
      </Row>
      <Row>
        <TopProduct />
      </Row>
    </Container>
  )
}

export default HomeScreen