import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col, Dropdown, DropdownButton, Accordion } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { deleteOrder, getOrder, updateOrder } from '../../actions/orderActions'

const OrderListScreen = () => {
  const [filter, setFilter] = useState('Tất cả')
  const dispatch = useDispatch()

  const { loading, error, orders } = useSelector(state => state.orderList)
  // console.log('==', orders)

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const navigate = useNavigate();

  useEffect(() => {
    //dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo.user.isAdmin) {
      navigate('/login')
    }
    else {
      dispatch(getOrder())
    }
    //eslint-disable-next-line 
  }, [dispatch, navigate, userInfo])

  //Delete user
  const deleteHandler = (categoryId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này không?')) {
      dispatch(deleteOrder(categoryId))
      window.location.reload()
    }
  }

  // Load Status
  const LoadStatus = () => {
    orders.forEach(item => {
      if (item.status === "PROCESSING") {
        dispatch(updateOrder({ _id: item._id, status: 'Chờ xác nhận' }))
      }
    })
  }

  LoadStatus()

  // Filter Status
  const arrFilterOrder = []
  const FilterStatus = (status) => {
    orders.filter(x => {
      if (x.status === status) {
        arrFilterOrder.push(x)
      } else if (status === 'Tất cả') {
        arrFilterOrder.push(x)
      }
    })
  }

  FilterStatus(filter)
  // console.log('==', filter)
  // console.log('==', arrFilterOrder)

  // load page
  const loadpage = () => {
    window.location.reload(false)
  }

  return (
    <div style={{ overflowY: 'scroll', height: '100vh', width: '100%', fontSize: '14px' }} className='py-5 px-5'>
      <Row className='align-items-center pb-4'>
        <Row>
          <Col>
            <h3 className='pb-4'>Danh sách đơn hàng</h3>
          </Col>
          <Col className='d-flex justify-content-end align-items-center'>
            <Button variant="outline-secondary" onClick={loadpage} className='d-flex justify-content-center align-items-center'>
              <i className="fas fa-redo-alt"></i>
              <p className='my-0 mx-3'>Tải lại</p>
            </Button>
          </Col>
        </Row>
        <Col>
          <h6>Tổng số lượng: {arrFilterOrder.length} đơn hàng ({filter})</h6>
        </Col>
        <Col className='d-flex justify-content-end align-items-center'>
          <p className='my-0 mx-3'>Lọc đơn hàng</p>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>Tất cả</option>
            <option>Chờ xác nhận</option>
            <option>Đã xác nhận</option>
            <option>Đang giao hàng</option>
            <option>Giao hàng thành công</option>
            <option>Đã hủy</option>
          </select>
        </Col>
      </Row>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        (
          <Table bordered responsive className='table-sm'>
            <thead>
              <tr>
                <th className='text-center'>#</th>
                <th className='text-center'>Người đặt hàng</th>
                <th className='text-center'>Giỏ hàng</th>
                <th className='text-center'>Ngày đặt</th>
                <th className='text-center'>Địa chỉ giao hàng</th>
                <th className='text-center'>Trạng thái</th>
                <th className='text-center'>Tổng thanh toán</th>
                <th className='text-center'>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {arrFilterOrder.reverse().map((order, index) => (
                <tr key={order._id}>
                  <td className='text-center'>
                    <strong>{index + 1}</strong>
                  </td>
                  <td className='text-center'>{order.user.name}</td>
                  <td className='text-center'>
                    <Accordion className='py-0 px-0' defaultActiveKey="1">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header className='py-0 px-0'>Xem chi tiết</Accordion.Header>
                        <Accordion.Body>
                          {order.products.map((product, index) => (
                            <Table>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Tên sản phẩm</th>
                                  <th>Số lượng</th>
                                  <th>Thành tiền</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{product.name}</td>
                                  <td>{product.count}</td>
                                  <td>{`${(product.count * product.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}`}</td>
                                </tr>
                              </tbody>
                            </Table>
                          ))}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </td>
                  <td className='text-center'>{order.createdAt.slice(0, 10)}</td>
                  <td className='text-center'>{order.address}</td>
                  {
                    order.status === 'PROCESSING' ? <td className='text-center'>Chờ xác nhận</td> : <td className='text-center'>{order.status}</td>
                  }
                  <td className='text-center'>{order.total}</td>
                  <td className='d-flex justify-content-around'>
                    <DropdownButton variant="outline-primary" id="dropdown-basic-button" title="Hành động">
                      <Dropdown.Item className='d-flex justify-content-between align-items-center' href={`/admin/order/${order._id}/edit`}>
                        <Button variant='secondary' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                        <p className='my-0'>Chỉnh sửa</p>
                      </Dropdown.Item>
                      {/* <Dropdown.Item onClick={() => handleShow(order._id)} className='d-flex justify-content-between align-items-center'>
                        <Button variant='danger' className='btn-sm'>
                          <i className='fas fa-trash'></i>
                        </Button>
                        <p className='my-0'>Xóa</p>
                      </Dropdown.Item> */}
                    </DropdownButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      {arrFilterOrder.length === 0 ? <p className='text-center'>Không có đơn hàng nào ở trạng thái ({filter})</p> : <p></p>}
    </div>
  )
}

export default OrderListScreen