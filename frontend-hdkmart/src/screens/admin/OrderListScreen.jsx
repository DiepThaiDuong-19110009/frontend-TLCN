import { React, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { deleteOrder, getOrder } from '../../actions/orderActions'

const OrderListScreen = () => {
  const dispatch = useDispatch()

  const { loading, error, orders } = useSelector(state => state.orderList)
  // console.log('==', orders)

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // let arrOrder = []
  // const getOrderById = () => {
  //     orders.forEach(item => {
  //         if (item.user._id === userInfo.user._id) {
  //             arrOrder.push(item)
  //         }
  //     });
  // }
  //     getOrderById()

  // const userDelete = useSelector(state => state.userDelete)
  // const { success: successDelete } = userDelete

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

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Danh sách các đơn hàng</h1>
        </Col>
      </Row>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th className='text-center'>#</th>
                <th className='text-center'>Tên người đặt hàng</th>
                <th className='text-center'>Danh sách sản phẩm</th>
                <th className='text-center'>Ngày đặt</th>
                <th className='text-center'>Địa chỉ giao hàng</th>
                <th className='text-center'>Trạng thái</th>
                <th className='text-center'>Tổng thanh toán</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.reverse().map(order => (
                <tr key={order._id}>
                  <td className='text-center'>{orders.length}</td>
                  <td className='text-center'>{order.user.name}</td>
                  <td className='text-center'>
                    <DropdownButton id="dropdown-basic-button" title="Chi tiết">
                      {order.products.map(product => (
                        <Dropdown.Item>
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
                                  <td>{order.products.length}</td>
                                  <td>{product.name}</td>
                                  <td>{product.count}</td>
                                  <td>{`${(product.count * product.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}`}</td>
                                </tr>
                            </tbody>
                          </Table>
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </td>
                  <td className='text-center'>{order.createdAt}</td>
                  <td className='text-center'>{order.address}</td>
                  <td className='text-center'>{order.status}</td>
                  <td className='text-center'>{order.total}</td>
                  <td className='d-flex justify-content-around'>
                    <LinkContainer to={`/admin/order/${order._id}/edit`}>
                      <Button variant='secondary' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(order._id)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
    </>
  )
}

export default OrderListScreen