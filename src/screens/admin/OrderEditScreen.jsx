import { React, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Form, Col, Row, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import { listOrderDetails, updateOrder } from '../../actions/orderActions'
import { ORDER_UPDATE_RESET } from '../../constants/orderConstants'

const OrderEditScreen = () => {
    const [status, setStatus] = useState('')
    // console.log('==', status)

    const orderId = useParams().id
    // console.log('==', orderId)

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const { error, order } = useSelector(state => state.orderDetails)
    console.log('==', order)

    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector(state => state.orderUpdate)

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: ORDER_UPDATE_RESET })
            navigate('/admin/orderlist')
            window.location.reload()
        } else {
            if (order._id !== orderId) {
                dispatch(listOrderDetails(orderId))
            } else {
                setStatus(order.status)
            }
        }
    }, [dispatch, navigate, orderId, order, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('==status', status);
        dispatch(updateOrder(orderId, status))
    }

    return (
        <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px' }} className='px-5'>
            <Link to='/admin/orderlist' style={{ textDecoration: 'none' }}>
                <Button variant="outline-success" className='my-3 d-flex justify-content-center align-items-center'>
                    <i className="fas fa-chevron-left"></i>
                    <p className='my-0' style={{ marginLeft: '10px' }}>Quay lại</p>
                </Button>
            </Link>
            <FormContainer>
                <h5 className='d-flex justify-content-center py-3'>Chỉnh sửa trạng thái đơn hàng</h5>
                {loadingUpdate ? <Loader /> : errorUpdate ? <Message variant='danger'>{error}</Message> :
                    (
                        <Card className='mb-5'>
                            <Card.Header className='py-0 pt-3'>
                                <Row>
                                    <h6>ID đơn hàng</h6>
                                    <Row>
                                        <p className='mx-0' style={{ width: 'auto' }}>{order._id}</p>
                                    </Row>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <div>
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='productname'>
                                            <Form.Label>Trạng thái đơn hàng</Form.Label>
                                            <Form.Select className='mb-3' size="sm" value={status} onChange={(e) => setStatus(e.target.value)}>
                                                <option>PROCESSING</option>
                                                <option>CONFIRMED</option>
                                                <option>DELIVERING</option>
                                                <option>DONE</option>
                                                <option>CANCEL</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className='d-flex justify-content-center py-3'>
                                            <Button type='submit' variant='primary'>Cập nhật</Button>
                                        </Form.Group>
                                    </Form>
                                </div>
                            </Card.Body>
                        </Card>
                    )}
            </FormContainer>
        </div>
    )
}

export default OrderEditScreen