import { React, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
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
        <div style={{ overflowY: 'scroll', height: '100vh', width: '100%', fontSize: '14px' }} className='py-5 px-5'>
            <Link to='/admin/orderlist' className='btn btn-light my-3'>Quay lại</Link>
            <FormContainer>
                <h1 className='d-flex justify-content-center py-3'>Chỉnh sửa trạng thái đơn hàng</h1>
                {loadingUpdate ? <Loader /> : errorUpdate ? <Message variant='danger'>{error}</Message> :
                    (
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
                    )}
            </FormContainer>
        </div>
    )
}

export default OrderEditScreen