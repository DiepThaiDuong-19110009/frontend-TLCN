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
        if (newPassword.trim().length === 0|| oldPassword.trim().length === 0) {
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
                    {
                        newPassword.trim().length !== 0 &&
                        <div className='mt-1'>
                            <p className='my-0 mb-1' >*Sử dụng các ký tự tăng độ bảo mật: ABC123!@#</p>
                            {
                                level <= 33 && <p>Độ bảo mật: <span style={{color: 'red'}}>Yếu</span></p>
                            }
                            {
                                (level > 33 && level <= 66) && <p>Độ bảo mật: <span style={{color: '#f5b800'}}>Trung bình</span></p>
                            }
                            {
                                level > 66 && <p>Độ bảo mật: <span style={{color: 'green'}}>Cao</span></p>
                            }
                            <ProgressBar style={{ height: '5px' }} className='mb-3'>
                                {
                                    level <= 33 && <ProgressBar variant="danger" now={level} key={1} />
                                }
                                {
                                    (level > 33 && level <= 66) && <ProgressBar variant="warning" now={level} key={2} />
                                }
                                {
                                    level > 66 && <ProgressBar variant="success" now={level} key={3} />
                                }
                            </ProgressBar>
                        </div>
                    }
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
                    <Form.Group className='d-flex justify-content-between pb-5 pt-4' >
                        <Button style={{ width: '100%' }} type='submit' variant='success'>Đổi mật khẩu</Button>
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
