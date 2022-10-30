import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import CategoryListScreen from './CategoryListSceen';
import OrderListScreen from './OrderListScreen';
import ProductListScreen from './ProductListScreen';
import UserListScreen from './UserListScreen';

function AdminScreen() {
  return (
    <Row className='mx-0 px-0'>
      <Row className='text-success px-5 py-3 d-flex align-items-center shadow-sm bg-white rounded' >
        <strong className='px-0 mx-0' style={{ fontSize: '25px', width: 'auto' }}>HDKMart</strong>
        <span className='py-0 my-0' style={{ fontSize: '25px', fontStyle: 'italic', width: 'auto' }}>Admin</span>
      </Row>
      <Tab.Container id="left-tabs-example" defaultActiveKey="cate">
        <Row className='px-0 mx-0'>
          <Col sm={2} className='px-0 mx-0'>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="cate" className='d-flex align-items-center'>
                  <i className="fas fa-list mx-3"></i>
                  <p className='my-0'>Quản lý danh mục</p>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="pro" className='d-flex align-items-center'>
                  <i className="fas fa-boxes mx-3"></i>
                  <p className='my-0'>Quản lý sản phẩm</p>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="user" className='d-flex align-items-center'>
                  <i className="fas fa-users mx-3"></i>
                  <p className='my-0'>Quản lý người dùng</p>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="order" className='d-flex align-items-center'>
                  <i className="fas fa-cart-arrow-down mx-3"></i>
                  <p className='my-0'>Quản lý đơn hàng</p>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="statistic" className='d-flex align-items-center'>
                  <i className="fas fa-chart-line mx-3"></i>
                  <p className='my-0'>Thống kê</p>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9} style={{ margin: '0 auto' }}>
            <Tab.Content>
              <Tab.Pane eventKey="cate">
                <CategoryListScreen />
              </Tab.Pane>
              <Tab.Pane eventKey="pro">
                <ProductListScreen />
              </Tab.Pane>
              <Tab.Pane eventKey="user">
                <UserListScreen />
              </Tab.Pane>
              <Tab.Pane eventKey="order">
                <OrderListScreen />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Row>
  );
}

export default AdminScreen;