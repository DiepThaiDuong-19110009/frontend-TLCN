import { React, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Form, Row, Card, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import { getUserDetails, updateUser } from '../../actions/userActions'
import { USER_UPDATE_RESET } from '../../constants/userConstants'

const UserEditScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const userId = useParams().id

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails)
    const { error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
            window.location.reload()
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, navigate, userId, user, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }

    return (
        <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px' }} className='px-5'>
            <Link to='/admin/userlist' style={{ textDecoration: 'none' }}>
                <Button variant="outline-success" className='my-3 d-flex justify-content-center align-items-center'>
                    <i className="fas fa-chevron-left"></i>
                    <p className='my-0' style={{marginLeft: '10px'}}>Quay lại</p>
                </Button>
            </Link>
            <FormContainer>
                <h5 className='d-flex justify-content-center py-3'>Chỉnh sửa thông tin người dùng</h5>
                {loadingUpdate ? <Loader /> : errorUpdate ? <Message variant='danger'>{error}</Message> :
                    (
                        <Card className='mb-5'>
                            <Card.Header className='py-0 pt-3'>
                                <Row>
                                    <h6>ID người dùng</h6>
                                    <Row>
                                        <p className='mx-0' style={{ width: 'auto' }}>{user._id}</p>
                                    </Row>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <div>
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='username'>
                                            <Form.Label>Tên người dùng</Form.Label>
                                            <Form.Control type='name' placeholder='Nhập tên người dùng' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='email' className='py-3'>
                                            <Form.Label>Email <i style={{ color: 'red' }} className='fas fa-exclamation-circle'></i></Form.Label>
                                            <Form.Control disabled={user.isAdmin ? "true" : ""} type='email' placeholder='Nhập email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='isadmin'>
                                            <Form.Check disabled={user.isAdmin ? "true" : ""} style={{ color: 'red' }} type="checkbox" label='Cấp quyền quản trị viên' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
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

export default UserEditScreen
