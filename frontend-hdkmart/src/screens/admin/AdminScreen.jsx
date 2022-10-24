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
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="cate">Quản lý danh mục sản phẩm</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="pro">Quản lý sản phẩm</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="user">Quản lý người dùng</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="order">Quản lý đơn hàng</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
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
  );
}

export default AdminScreen;