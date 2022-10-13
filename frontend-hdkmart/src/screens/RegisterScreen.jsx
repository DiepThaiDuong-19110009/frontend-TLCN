import { React, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    let location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/'

    // Check showpassword
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };


    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
            window.location.reload()
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Mật khẩu không trùng khớp')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1 className='d-flex justify-content-center py-3'>Đăng ký</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>Tài khoản đã tồn tại</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='username'>
                    <Form.Label>Tên người dùng</Form.Label>
                    <Form.Control type='name' placeholder='Nhập tên người dùng' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email' className='py-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='Nhập email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type={passwordShown ? "text" : "password"} placeholder='Nhập mật khẩu' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword' className='py-3'>
                    <Form.Label>Nhập lại mật khẩu</Form.Label>
                    <Form.Control type={passwordShown ? "text" : "password"} placeholder='Nhập lại mật khẩu' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form>
                        <div key='default-checkbox' className="mb-3">
                            <Form.Check
                                type='checkbox'
                                id='default-checkbox'
                                label='Hiển thị mật khẩu'
                                onClick={togglePasswordVisiblity}
                            />
                        </div>
                    </Form>
                </Form.Group>
                <Form.Group className='d-flex justify-content-center py-3'>
                    <Button type='submit' variant='primary'>Đăng ký</Button>
                </Form.Group>
            </Form>

            <Row>
                <Col className='d-flex justify-content-center py-3'>
                    Bạn đã có tài khoản?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Đăng nhập</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen