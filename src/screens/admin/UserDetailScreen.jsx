import { React, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Col, Row, Card, Button } from 'react-bootstrap'
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import { getUserDetails } from '../../actions/userActions';

const UserDetailScreen = () => {
    const [isCopied, setIsCopied] = useState(false);

    const userId = useParams().id
    console.log('==', userId)

    const dispatch = useDispatch()

    const { loading, error, user } = useSelector(state => state.userDetails)
    console.log('==', user)


    useEffect(() => {
        dispatch(getUserDetails(userId))
    }, [dispatch, userId])

    // Copy Text
    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    return (
        <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px' }} className='px-5'>
            <Link to='/admin/userlist' style={{ textDecoration: 'none' }}>
                <Button variant="outline-success" className='my-3 d-flex justify-content-center align-items-center'>
                    <i className="fas fa-chevron-left"></i>
                    <p className='my-0' style={{marginLeft: '10px'}}>Quay lại</p>
                </Button>
            </Link>
            <FormContainer>
                <h5 className='d-flex justify-content-center py-3'>Chi tiết thông tin người dùng</h5>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                    (
                        <Card className='mb-5'>
                            <Card.Header className='py-0 pt-3'>
                                <Row>
                                    <h6>ID người dùng</h6>
                                    <Row>
                                        <p className='mx-0' style={{ width: 'auto' }}>{user._id}</p>
                                        <CopyToClipboard text={user._id} onCopy={onCopyText}>
                                            <span className='px-0' style={{ width: 'auto', cursor: 'pointer' }}>{isCopied ? "Copied!" : <i className="fas fa-copy"></i>}</span>
                                        </CopyToClipboard>
                                    </Row>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <div>
                                    <Row>
                                        <Col>
                                            <h6>Tên người dùng</h6>
                                            <p>{user.name}</p>
                                        </Col>
                                        <Col>
                                            <h6>Quản trị viên</h6>
                                            {
                                                (user.isAdmin === true) ? <p>Có</p> : <p>Không</p>
                                            }
                                        </Col>
                                    </Row>
                                    <Row>
                                        <h6>Email người dùng</h6>
                                        <p>{user.email}</p>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h6>Số điện thoại</h6>
                                            {
                                                user.phone ? <p>{user.phone}</p> : <p>Chưa cập nhật</p>
                                            }
                                        </Col>
                                        <Col>
                                            <h6>Địa chỉ</h6>
                                            {
                                                user.address ? <p>{user.address}</p> : <p>Chưa cập nhật</p>
                                            }
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h6>Ngày tạo</h6>
                                            <Row>
                                                <Col xl={5}>
                                                    <p>Ngày: {user.createdAt?.slice(0, 10)}</p>
                                                </Col>
                                                <Col>
                                                    <p>Vào lúc: {user.createdAt?.slice(11, 19)}</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <h6>Cập nhật lần cuối</h6>
                                            <Row>
                                                <Col xl={5}>
                                                    <p>Ngày: {user.updatedAt?.slice(0, 10)}</p>
                                                </Col>
                                                <Col>
                                                    <p>Vào lúc: {user.updatedAt?.slice(11, 19)}</p>
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

export default UserDetailScreen