import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Form, ProgressBar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, success } = userRegister

    // Check showpassword
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    // useEffect(() => {
    //     if (userInfo) {
    //         check = true
    //     }
    // }, [userInfo])

    //Check level Password
    let level = 0
    var i = 0;
    var character = '';
    const checkLevel = (password) => {
        while (i <= password.length) {
            character = password.charAt(i);
            if (!isNaN(character * 1)) {
                level += 5
            } else {
                if (character === character.toUpperCase()) {
                    level += 10
                }
                if (character === character.toLowerCase()) {
                    level += 3
                }
            }
            i++;
        }
    }
    checkLevel(password)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(register(name, email, password))
        if (name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
            setMessage("Vui lòng điền đủ thông tin")
        } else if (error) {
            setMessage("Tài khoản đã tồn tại")
            setEmail('')
        }
    }

    return (
        <Row className='px-3 mx-0 d-flex justify-content-center align-items-center'>
            {!success ?
                <Col xl={4} md={5} sm={7} style={{ background: '#f5f5f5', margin: '20px', padding: '0 40px', borderRadius: '20px' }} className='shadow rounded'>
                    <h3 className='d-flex justify-content-center pt-5 pb-3'>Đăng ký</h3>
                    <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>
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
                        <Form.Group controlId='password' className='pb-1'>
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control type={passwordShown ? "text" : "password"} placeholder='Nhập mật khẩu' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='mt-2'>
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
                        <Form.Group className='py-3'>
                            <p style={{fontSize: '12px'}}><i style={{ color: (password.length < 8 || password.length > 20 ? 'red' : 'green'), fontSize: "15px" }} class="fa fa-check-circle" aria-hidden="true"></i> Lớn hơn 8 và nhỏ hơn 20 ký tự</p>
                            <p style={{fontSize: '12px'}}><i style={{ color: (!password.match(/[A-Z]/) ? 'red' : 'green'), fontSize: "15px" }} class="fa fa-check-circle" aria-hidden="true"></i> Ít nhất 1 ký tự viết HOA</p>
                            <p style={{fontSize: '12px'}}><i style={{ color: (!password.match(/[a-z]/) ? 'red' : 'green'), fontSize: "15px" }} class="fa fa-check-circle" aria-hidden="true"></i> Ít nhất 1 ký tự viết THƯỜNG</p>
                            <p style={{fontSize: '12px'}}><i style={{ color: (!password.match(/[\`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/) ? 'red' : 'green'), fontSize: "15px" }} class="fa fa-check-circle" aria-hidden="true"></i> Ít nhất 1 ký tự đặc biệt</p>
                            <p style={{fontSize: '12px'}}><i style={{ color: (!password.match(/[\d]/) ? 'red' : 'green'), fontSize: "15px" }} class="fa fa-check-circle" aria-hidden="true"></i> Ít nhất 1 ký tự số</p>
                        </Form.Group>
                        <Form.Group className='d-flex justify-content-center pt-3'>
                            <Button disabled={((password.length < 8 || password.length > 20) || !password.match(/[A-Z]/) || !password.match(/[a-z]/) || !password.match(/[\`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/) || !password.match(/[\d]/)) ? 'true' : ''} style={{ width: '100%' }} type='submit' variant='success'>Đăng ký</Button>
                        </Form.Group>
                        {/* <Form.Group className='d-flex justify-content-center pt-3'>
                        <p className='textCenter'>Hoặc</p>
                    </Form.Group>
                    <Form.Group className='d-flex justify-content-center align-items-center py-2 shadow-sm rounded' style={{ width: '100%', background: 'white', margin: '10px 0 20px 0', borderRadius: '30px', cursor: 'pointer' }}>
                        <a style={{ textDecoration: 'none', color: 'black' }} href="http://localhost:5000/auth/google" variant="light">
                            <Image style={{ width: '25px', height: '25px', marginRight: '15px' }} src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png'></Image>
                            Đăng ký với Google
                        </a>
                    </Form.Group> */}
                    </Form>

                    <Row>
                        <Col className='d-flex justify-content-center py-4'>
                            Bạn đã có tài khoản?{' '}
                            <Link style={{ textDecoration: 'none', color: 'green', marginLeft: '5px' }} to='/login'>
                                <strong>Đăng nhập</strong>
                            </Link>
                        </Col>
                    </Row>
                </Col> :
                <Row className='d-flex justify-content-center align-items-center'>
                    <p style={{ background: '#ffffff', width: 'auto' }} className='d-flex justify-content-center align-items-center my-5 py-5 px-5'>Vui lòng kiểm tra Email để hoàn tất đăng ký!!!</p>
                </Row>
            }
        </Row>
    )
}

export default RegisterScreen
