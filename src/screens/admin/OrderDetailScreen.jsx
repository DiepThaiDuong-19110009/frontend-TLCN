import { React, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Col, Row, Card, Accordion } from 'react-bootstrap'
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import { listOrderDetails } from '../../actions/orderActions';

const OrderDetailScreen = () => {
    const [isCopied, setIsCopied] = useState(false);

    const orderId = useParams().id
    console.log('==', orderId)

    const dispatch = useDispatch()

    const { loading, error, order } = useSelector(state => state.orderDetails)
    console.log('==', order)


    useEffect(() => {
        dispatch(listOrderDetails(orderId))
    }, [dispatch, orderId])

    // Copy Text
    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    return (
        <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px' }} className='px-5'>
            <Link to='/admin/userlist' className='btn btn-light mt-3'>Quay lại</Link>
            <FormContainer>
                <h5 className='d-flex justify-content-center py-3'>Chi tiết thông tin đơn hàng</h5>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                    (
                        <Card className='mb-5'>
                            <Card.Header>
                                <Row>
                                    <h6>ID đơn hàng</h6>
                                    <Row>
                                        <p className='mx-0' style={{ width: 'auto' }}>{order._id}</p>
                                        <CopyToClipboard text={order._id} onCopy={onCopyText}>
                                            <span className='px-0' style={{ width: 'auto', cursor: 'pointer' }}>{isCopied ? "Copied!" : <i className="fas fa-copy"></i>}</span>
                                        </CopyToClipboard>
                                    </Row>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <div>
                                    <Row>
                                        <Col>
                                            <h6>Tên người nhận</h6>
                                            <p>{order.user.name}</p>
                                        </Col>
                                        <Col>
                                            <h6>Trạng thái đơn hàng</h6>
                                            <p>{order.status}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <h6>Email người nhận</h6>
                                        <p>{order.user.email}</p>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h6>Số điện thoại</h6>
                                            <p>{order.user.phone}</p>
                                        </Col>
                                        <Col>
                                            <h6>Địa chỉ giao hàng</h6>
                                            <p>{order.user.address}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h6>Tổng thanh toán</h6>
                                            <p>{order.total?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                        </Col>
                                        <Col>
                                            <h6>Phương thức thanh toán</h6>
                                            <p>{order.method}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <h6>Tổng số lượng sản phẩm</h6>
                                        <p>{order.amount}</p>
                                    </Row>
                                    <Row>
                                        <h6>Chi tiết đơn hàng</h6>
                                        <Accordion defaultActiveKey="0">
                                            <Accordion.Item eventKey="1" className='p-0 mb-3 mt-1'>
                                                <Accordion.Header className='p-0'>Xem chi tiết</Accordion.Header>
                                                <Accordion.Body>
                                                    {
                                                        order.products?.map(product => (
                                                            <Row>
                                                                <Col>
                                                                    <h6>Tên sản phẩm</h6>
                                                                    <p>{product?.name}</p>
                                                                </Col>
                                                                <Col>
                                                                    <h6>Đơn giá</h6>
                                                                    <p>{product.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                                                </Col>
                                                                <Col>
                                                                    <h6>Số lượng</h6>
                                                                    <p>{product.count}</p>
                                                                </Col>
                                                                <Col>
                                                                    <h6>Thành tiền</h6>
                                                                    <p>{(product.price * product.count)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                                                </Col>
                                                            </Row>
                                                        ))
                                                    }
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h6>Ngày đặt hàng</h6>
                                            <Row>
                                                <Col xl={5}>
                                                    <p>Ngày: {order.user.createdAt?.slice(0, 10)}</p>
                                                </Col>
                                                <Col>
                                                    <p>Vào lúc: {order.user.createdAt?.slice(11, 19)}</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <h6>Cập nhật lần cuối</h6>
                                            <Row>
                                                <Col xl={5}>
                                                    <p>Ngày: {order.user.updatedAt?.slice(0, 10)}</p>
                                                </Col>
                                                <Col>
                                                    <p>Vào lúc: {order.user.updatedAt?.slice(11, 19)}</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </Card.Body>
                        </Card>
                    )}
            </FormContainer>
        </div>
    )
}

export default OrderDetailScreen