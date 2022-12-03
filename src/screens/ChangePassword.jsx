import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Row, Col, ProgressBar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { changePassword } from '../actions/userActions'

const ChangePassword = () => {
    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const userChangePassword = useSelector(state => state.userChangePassword)
    const { loading, userChangePass } = userChangePassword

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    useEffect(() => {
        if (userChangePass) {
            navigate('/')
        }
    }, [navigate, userChangePass])

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
    checkLevel(newPassword)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(changePassword(email, oldPassword, newPassword))
        if (email.trim().length === 0 || newPassword.trim().length === 0 || oldPassword.trim().length === 0) {
            setMessage('Vui lòng điền đủ thông tin')
        } else if (newPassword === oldPassword) {
            setMessage('Mật khẩu mới không được trùng mật khẩu cũ')
        }
    }

    return (
        <Row className='px-3 mx-0 d-flex justify-content-center align-items-center'>
            <Col xl={4} md={5} sm={7} style={{ background: '#f5f5f5', margin: '20px', padding: '0 40px', borderRadius: '20px' }} className='shadow rounded'>
                <h3 className='d-flex justify-content-center py-3'>Thay đổi mật khẩu</h3>
                <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>
                {loading && <Loader />}
                <Form onSubmit={submitHandler} >
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Nhập email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password' className='py-3'>
                        <Form.Label>Mật khẩu cũ</Form.Label>
                        <Form.Control type={passwordShown ? "text" : "password"} placeholder='Nhập mật khẩu cũ' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Mật khẩu mới</Form.Label>
                        <Form.Control type={passwordShown ? "text" : "password"} placeholder='Nhập mật khẩu mới' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className='py-2'>
                        <Form>
                            <div key='default-checkbox'>
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
                            <p style={{fontSize: '12px'}}><i style={{ color: (newPassword.length < 8 || newPassword.length > 20 ? 'red' : 'green'), fontSize: "15px" }} class="fa fa-check-circle" aria-hidden="true"></i> Lớn hơn 8 và nhỏ hơn 20 ký tự</p>
                            <p style={{fontSize: '12px'}}><i style={{ color: (!newPassword.match(/[A-Z]/) ? 'red' : 'green'), fontSize: "15px" }} class="fa fa-check-circle" aria-hidden="true"></i> Ít nhất 1 ký tự viết HOA</p>
                            <p style={{fontSize: '12px'}}><i style={{ color: (!newPassword.match(/[a-z]/) ? 'red' : 'green'), fontSize: "15px" }} class="fa fa-check-circle" aria-hidden="true"></i> Ít nhất 1 ký tự viết THƯỜNG</p>
                            <p style={{fontSize: '12px'}}><i style={{ color: (!newPassword.match(/[\`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/) ? 'red' : 'green'), fontSize: "15px" }} class="fa fa-check-circle" aria-hidden="true"></i> Ít nhất 1 ký tự đặc biệt</p>
                            <p style={{fontSize: '12px'}}><i style={{ color: (!newPassword.match(/[\d]/) ? 'red' : 'green'), fontSize: "15px" }} class="fa fa-check-circle" aria-hidden="true"></i> Ít nhất 1 ký tự số</p>
                        </Form.Group>
                    <Form.Group className='d-flex justify-content-between pb-5 pt-4' >
                        <Button disabled={((newPassword.length < 8 || newPassword.length > 20) || !newPassword.match(/[A-Z]/) || !newPassword.match(/[a-z]/) || !newPassword.match(/[\`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/) || !newPassword.match(/[\d]/)) ? 'true' : ''} style={{ width: '100%' }} type='submit' variant='success'>Đổi mật khẩu</Button>
                    </Form.Group>
                </Form>
            </Col>
            <Row>
                <Link to='/' className='px-3 mx-0 d-flex justify-content-center align-items-center' style={{ textDecoration: 'none', color: 'green', marginLeft: '5px' }}>
                    <strong>Quay lại</strong>
                </Link>
            </Row>
        </Row>
    )
}

export default ChangePassword
