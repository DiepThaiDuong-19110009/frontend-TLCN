import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <Row className='mx-0'>
      <Col xl={4} className='my-1'>
        <Card className="bg-dark text-white">
          <Card.Img src="https://www.studytienganh.vn/upload/2022/02/110558.jpg" alt="Hải sản" />
          <Card.ImgOverlay>
            <Card.Title>Cá hồi</Card.Title>
            <Card.Text>
            Trong khẩu phần ăn cá hồi chiếm khoảng 85-113 gam cho 200 calo. Đây là loại cá rất ít chất béo bão hòa đồng thời là nguồn protein tốt.
            </Card.Text>
            <Card.Text>
              <Link to='/product/634ab866b64f40f80f75354a' style={{ textDecoration: 'none', width: 'auto' }}>
                <strong style={{color: 'white' }}>Mua ngay</strong>
              </Link>
            </Card.Text>
          </Card.ImgOverlay>
        </Card>
      </Col>
      <Col xl={4} className='my-1' >
        <Card className="bg-dark text-white">
          <Card.Img src="https://songkhoe.medplus.vn/wp-content/uploads/2019/09/Thi%E1%BA%BFt-k%E1%BA%BF-kh%C3%B4ng-t%C3%AAn-28-9.png" alt="Rau củ" />
          <Card.ImgOverlay>
            <Card.Title>Cà rốt</Card.Title>
            <Card.Text>
            Cà rốt là một loại rau củ tốt cho sức khỏe, với độ giòn, vị ngon và chứa rất nhiều beta carotene, chất xơ, vitamin K1, kali cũng như chất chống oxy hóa.
            </Card.Text>
            <Card.Text>
              <Link to='/product/6340fe5d642d3366418d8d6f' style={{ textDecoration: 'none', width: 'auto' }}>
                <strong style={{color: 'white' }}>Mua ngay</strong>
              </Link>
            </Card.Text>
          </Card.ImgOverlay>
        </Card>
      </Col>
      <Col xl={4} className='my-1'>
        <Card className="bg-dark text-white">
          <Card.Img src="https://tejedasmarkets.com/wp-content/uploads/2019/08/beef-steak-food-photography-recipe-idea-FKJ9GVN-900x500.jpg" alt="Thịt" />
          <Card.ImgOverlay>
            <Card.Title>Thịt heo</Card.Title>
            <Card.Text>
              Thịt heo giúp đóng góp vào cơ thể rất nhiều loại vitamin và khoáng chất khác nhau như photpho, kali, nicaxin, vitamin B6, vitamin B12, kẽm...
            </Card.Text>
            <Card.Text>
              <Link to='/product/633554ca0e4d6f99a67693c9' style={{ textDecoration: 'none', width: 'auto' }}>
                <strong style={{color: 'white' }}>Mua ngay</strong>
              </Link>
            </Card.Text>
          </Card.ImgOverlay>
        </Card>
      </Col>
    </Row>
  )
}

export default Banner