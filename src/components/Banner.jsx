import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <Row className='mx-0 px-0 d-flex justify-content-between'>
      <Col xl={4} className='my-1 px-0'>
        <Card className="bg-dark text-white" style={{ borderRadius: '0px' }}>
          <Card.Img src="https://res.cloudinary.com/dkzuyi8fq/image/upload/v1670151647/110558_fnyksq.jpg" alt="Hải sản" />
          <Card.ImgOverlay>
            <Card.Title className='p-2 m-0' style={{ background: 'rgba(99, 99, 99, 0.5)' }}>Cá hồi</Card.Title>
            <Card.Text className='p-2' style={{ background: 'rgba(99, 99, 99, 0.5)' }}>
              <p>Trong khẩu phần ăn cá hồi chiếm khoảng 85-113 gam cho 200 calo. Đây là loại cá rất ít chất béo bão hòa
                đồng thời là nguồn protein tốt.</p>
              <Link to='/product/634ab866b64f40f80f75354a' style={{ textDecoration: 'none', width: 'auto' }}>
                <strong style={{ color: 'white' }}>Mua ngay</strong>
              </Link>
            </Card.Text>
          </Card.ImgOverlay>
        </Card>
      </Col>
      <Col xl={4} className='my-1 px-0' >
        <Card className="bg-dark text-white" style={{ borderRadius: '0px' }}>
          <Card.Img src="https://res.cloudinary.com/dkzuyi8fq/image/upload/v1670151743/Thi%E1%BA%BFt-k%E1%BA%BF-kh%C3%B4ng-t%C3%AAn-28-9_slwxnc.png" alt="Rau củ" />
          <Card.ImgOverlay>
            <Card.Title className='p-2 m-0' style={{ background: 'rgba(99, 99, 99, 0.5)' }}>Cà rốt</Card.Title>
            <Card.Text className='p-2' style={{ background: 'rgba(99, 99, 99, 0.5)' }}>
              <p>Cà rốt là một loại rau củ tốt cho sức khỏe, với độ giòn, vị ngon và chứa rất nhiều beta carotene,
                chất xơ, vitamin K1, kali cũng như chất chống oxy hóa.</p>
              <Link to='/product/6340fe5d642d3366418d8d6f' style={{ textDecoration: 'none', width: 'auto' }}>
                <strong style={{ color: 'white' }}>Mua ngay</strong>
              </Link>
            </Card.Text>
          </Card.ImgOverlay>
        </Card>
      </Col>
      <Col xl={4} className='my-1 px-0'>
        <Card className="bg-dark text-white" style={{ borderRadius: '0px' }}>
          <Card.Img src="https://res.cloudinary.com/dkzuyi8fq/image/upload/v1670151685/beef-steak-food-photography-recipe-idea-FKJ9GVN-900x500_tzvw99.jpg" alt="Thịt" />
          <Card.ImgOverlay>
            <Card.Title className='p-2 m-0' style={{ background: 'rgba(99, 99, 99, 0.5)' }}>Thịt heo</Card.Title>
            <Card.Text className='p-2' style={{ background: 'rgba(99, 99, 99, 0.5)' }}>
              <p>Thịt heo giúp đóng góp vào cơ thể rất nhiều loại vitamin và khoáng chất khác nhau như photpho,
                kali, nicaxin, vitamin B6, vitamin B12, kẽm...</p>
              <Link to='/product/633554ca0e4d6f99a67693c9' style={{ textDecoration: 'none', width: 'auto' }}>
                <strong style={{ color: 'white' }}>Mua ngay</strong>
              </Link>
            </Card.Text>
          </Card.ImgOverlay>
        </Card>
      </Col>
    </Row>
  )
}

export default Banner