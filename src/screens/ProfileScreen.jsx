import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import MyOrder from '../components/MyOrder'

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile )
    const { success } = userUpdateProfile

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        } else {
            if(!user.name) {
                dispatch(getUserDetails(userInfo.user._id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setPhone(user.phone)
                setAddress(user.address)
            }
        }
        //eslint-disable-next-line 
    }, [dispatch, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUserProfile(user._id, {name, email, phone, address}))
        window.location.reload()
    }

    return (
        <Row className='d-flex justify-content-center mx-0 py-5'>
            <Col md={6}>
                <h3 className='d-flex justify-content-center'>Thông tin người dùng</h3>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Cập nhật thành công</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group className='pb-3' controlId='username'>
                        <Form.Label>Tên người dùng</Form.Label>
                        <Form.Control type='name' placeholder='Nhập tên người dùng' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className='pb-3' controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control disabled type='email' placeholder='Nhập email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className='pb-3' controlId='password'>
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control type='number' placeholder='Nhập số điện thoại' value={phone} onChange={(e) => setPhone(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className='pb-3' controlId='confirmPassword'>
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control type='text' placeholder='Nhập địa chỉ giao hàng' value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className='d-flex justify-content-center py-4'>
                        <Button type='submit' variant='success'>Cập nhật</Button>
                    </Form.Group>
                </Form>
            </Col>
            {/* <Col md={6}>
                <MyOrder />
            </Col> */}
        </Row>
    )
}

export default ProfileScreen
