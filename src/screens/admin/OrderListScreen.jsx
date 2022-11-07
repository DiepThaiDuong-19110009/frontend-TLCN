import { React, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col, Modal, Accordion } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { deleteOrder, getOrder, updateOrder } from '../../actions/orderActions'

const OrderListScreen = () => {
  const [filter, setFilter] = useState('ALL')
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

  // Filter Status
  const arrFilterOrder = []
  const FilterStatus = (status) => {
    orders.filter(x => {
      if (x.status === status) {
        arrFilterOrder.push(x)
      } else if (status === 'ALL') {
        arrFilterOrder.push(x)
      }
    })
  }

  FilterStatus(filter)
  // console.log('==', filter)
  // console.log('==', arrFilterOrder)

  // Alert
  const [idDelete, setIdDelete] = useState('')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setIdDelete(id)
  }

  return (
    <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px' }} className='py-4 px-5'>
      <Row className='align-items-center pb-4'>
        <Row>
          <Col>
            <h5 className='pb-4'>Danh sách đơn hàng</h5>
          </Col>
        </Row>
        <Col>
          <h6>Tổng số lượng: {arrFilterOrder.length} đơn hàng ({filter})</h6>
        </Col>
        <Col className='d-flex justify-content-end align-items-center'>
          <p className='my-0 mx-3'>Lọc đơn hàng</p>
          <select style={{border: '2px solid gray', borderRadius: '5px'}} value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>ALL</option>
            <option>PROCESSING</option>
            <option>CONFIRMED</option>
            <option>DELIVERING</option>
            <option>DONE</option>
            <option>CANCEL</option>
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
                <th className='text-center'>Địa chỉ giao hàng</th>
                <th className='text-center'>Trạng thái</th>
                <th className='text-center'>Tổng thanh toán</th>
                <th className='text-center'>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {arrFilterOrder.reverse().map((order, index) => (
                <tr key={order._id}>
                  <td className='text-center'>
                    <strong>{index + 1}</strong>
                  </td>
                  <td className='text-center'>{order.user?.name}</td>
                  <td className='text-center'>{order.address}</td>
                  {/* {
                    order.status === 'PROCESSING' ? <td className='text-center'>Chờ xác nhận</td> : <td className='text-center'>{order.status}</td>
                  } */}
                  <td className='text-center'>{order.status}</td>
                  <td className='text-center'>{order.total?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                  <td className='d-flex justify-content-center'>
                    <Link data-tip data-for="tip1" to={`/admin/order/${order._id}/detail`}>
                      <Button variant='info' className='btn-sm'>
                        <i style={{ color: 'white' }} className="fas fa-info-circle"></i>
                      </Button>
                    </Link>
                    <ReactTooltip id="tip1" place="top" effect="solid">
                      Chi tiết thông tin đơn hàng
                    </ReactTooltip>

                    <Link data-tip data-for="tip2" className='px-2' to={`/admin/order/${order._id}/edit`}>
                      <Button variant='secondary' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </Link>
                    <ReactTooltip id="tip2" place="top" effect="solid">
                      Chỉnh sửa thông tin đơn hàng
                    </ReactTooltip>

                    <Button disabled data-tip data-for="tip3" onClick={() => handleShow(order._id)} variant='danger' className='btn-sm'>
                      <i className='fas fa-trash'></i>
                    </Button>
                    <ReactTooltip id="tip3" place="top" effect="solid">
                      Xóa đơn hàng
                    </ReactTooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      {arrFilterOrder.length === 0 ? <p className='text-center'>Không có đơn hàng nào ở trạng thái ({filter})</p> : <p></p>}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xóa nhà cung cấp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa nhà cung cấp này không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="danger" onClick={() => deleteHandler(idDelete)}>Xóa nhà cung cấp</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default OrderListScreen