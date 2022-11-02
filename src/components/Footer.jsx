import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <Container className='py-5'>
      <Row className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <Col xl={9} class="me-5 d-none d-lg-block">
          <span>Theo dõi HDKMart thông qua các mạng xã hội</span>
        </Col>
        <Col>
          <a href="" class="me-4 link-secondary">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="" class="me-4 link-secondary">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="" class="me-4 link-secondary">
            <i class="fab fa-google"></i>
          </a>
          <a href="" class="me-4 link-secondary">
            <i class="fab fa-instagram"></i>
          </a>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="py-3">
            HDKMart
          </h4>
          <p>
            Đến với HDKMart, bạn luôn tìm được các sản phẩm tươi và sạch, đảm bảo an toàn vệ sinh thực phậm. Cảm ơn bạn đã tin tưởng chúng tôi.
          </p>
        </Col>
        <Col>
          <h4 className="py-3">
            Sản phẩm nổi bật
          </h4>
          <p>
            <a href="#!" className="text-success">Hải sản</a>
          </p>
          <p>
            <a href="#!" className="text-success">Rau, củ</a>
          </p>
          <p>
            <a href="#!" className="text-success">Trái cây</a>
          </p>
          <p>
            <a href="#!" className="text-success">Thịt</a>
          </p>
        </Col>
        <Col>
          <h4 className="py-3">
            Cam kết của chúng tôi
          </h4>
          <p>
            <a href="#!" class="text-success">An toàn</a>
          </p>
          <p>
            <a href="#!" class="text-success">Nhanh chóng</a>
          </p>
          <p>
            <a href="#!" class="text-success">Chất lượng</a>
          </p>
          <p>
            <a href="#!" class="text-success">Nhiệt tình</a>
          </p>
        </Col>
        <Col>
          <h4 className="py-3">Liên hệ</h4>
          <p><i class="fas fa-home me-3 text-secondary"></i>Số 1, Võ Văn Ngân, TP. HCM</p>
          <p>
            <i class="fas fa-envelope me-3 text-secondary"></i>
            HDKMart@example.com
          </p>
          <p><i class="fas fa-phone me-3 text-secondary"></i> + 84 902 356 123</p>
          <p><i class="fas fa-print me-3 text-secondary"></i> + 84 933 671 222</p>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center py-3'>
          © 2022 Copyright:
          <a href="#"> HDKMart</a>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer