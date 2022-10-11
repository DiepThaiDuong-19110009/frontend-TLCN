import { React, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin
    console.log('==', error);

    let location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
            window.location.reload()
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1 className='d-flex justify-content-center py-3'>Đăng nhập</h1>
            {error && <Message variant='danger'>Vui lòng kiểm tra lại thông tin đăng nhập</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} >
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='Nhập email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='py-3'>
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type='password' placeholder='Nhập mật khẩu' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className='d-flex justify-content-center py-3'>
                    <Link to='/forgotpassword'>Quên mật khẩu?</Link>
                </Form.Group>
                <Form.Group className='d-flex justify-content-center py-3'>
                    <Button type='submit' variant='primary'>Đăng nhập</Button>
                </Form.Group>
            </Form>
            <Row>
                <Col className='d-flex justify-content-center py-3'>
                    Bạn chưa có tài khoản?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Đăng ký</Link>
                    {/* <Link to='/register'>Đăng ký</Link> */}
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen