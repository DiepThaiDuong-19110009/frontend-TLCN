import { React, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Row, Col, Button, Form, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userActions'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin
    console.log('==', error)

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
    }, [navigate, userInfo, error])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
        if (email.trim().length === 0 || password.trim().length === 0) {
            setMessage("Vui lòng điền đủ thông tin")
        } else if (error === 404) {
            setMessage("Tài khoản không tồn tại")
        } else if (error === 401) {
            setMessage("Mật khẩu không chính xác")
        } else if (error === 400) {
            setMessage("Tài khoản đã bị vô hiệu hóa")
        } else {
            setMessage('')
        }
    }
    // console.log('==', error);

    return (
        <Row className='px-3 mx-0 d-flex justify-content-center align-items-center'>
            <Col xl={4} md={5} sm={7} style={{ background: '#f5f5f5', margin: '20px', padding: '0 40px', borderRadius: '20px' }} className='shadow rounded'>
                <h3 className='d-flex justify-content-center pt-5 pb-3'>Đăng nhập</h3>
                <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>
                {loading && <Loader />}
                <Form onSubmit={submitHandler} >
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Nhập email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password' className='pt-4 pb-3'>
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control type={passwordShown ? "text" : "password"} placeholder='Nhập mật khẩu' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className='d-flex justify-content-between'>
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
                        <Link style={{ textDecoration: 'none', color: 'green' }} to='/forgotpassword'>Quên mật khẩu?</Link>
                    </Form.Group>
                    <Form.Group className='d-flex justify-content-center pt-3'>
                        <Button style={{ width: '100%' }} type='submit' variant='success'>Đăng nhập</Button>
                    </Form.Group>
                    {/* <Form.Group className='d-flex justify-content-center pt-3'>
                        <p className='textCenter'>Hoặc</p>
                    </Form.Group>
                    <Form.Group className='d-flex justify-content-center align-items-center py-2 shadow-sm rounded' style={{ width: '100%', background: 'white', margin: '10px 0 20px 0', borderRadius: '30px', cursor: 'pointer' }}>
                        <a style={{ textDecoration: 'none', color: 'black' }} href="http://localhost:5000/auth/google" variant="light">
                            <Image style={{ width: '25px', height: '25px', marginRight: '15px' }} src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png'></Image>
                            Đăng nhập với Google
                        </a>
                    </Form.Group> */}
                </Form>
                <Row>
                    <Col className='d-flex justify-content-center py-4'>
                        Bạn chưa có tài khoản?{' '}
                        <Link style={{ textDecoration: 'none', color: 'green', marginLeft: '5px' }} to='/register'>
                            <strong>Đăng ký</strong>
                        </Link>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default LoginScreen