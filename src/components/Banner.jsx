import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Banner = () => {
  return (
    <Row className='mx-0'>
      <Col xl={3} >
        <img className='w-100' src="https://img.freepik.com/premium-vector/meat-shop-banner-with-meat-products-vector-illustration_53562-9894.jpg?w=2000" alt="banner" />
      </Col>
      <Col xl={3} >
        <img className='w-100' src="https://thumbs.dreamstime.com/b/vegetables-fruits-market-sketch-color-poster-fresh-organic-veggie-apple-pumpkin-natural-vegetarian-cauliflower-broccoli-112459555.jpg" alt="banner" />
      </Col>
      <Col xl={3} >
        <img className='w-100' src="https://i.pinimg.com/originals/76/c5/56/76c55615e10bcc1ea196ace17e4c2c14.jpg" alt="banner" />
      </Col>
      <Col xl={3} >
        <img className='w-100' src="https://i.pinimg.com/originals/0a/c3/db/0ac3dbf6f00da227b4ac38c680fc9b73.png" alt="banner" />
      </Col>
    </Row>
  )
}

export default Banner