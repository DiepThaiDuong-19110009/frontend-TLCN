import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { forgotPassword } from '../actions/userActions'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const userForgotPassword = useSelector(state => state.userForgotPassword)
    const { loading, error, userForgotPass } = userForgotPassword

    useEffect(() => {
        if (userForgotPass) {
            navigate('/login')
            window.location.reload()
        }
        //eslint-disable-next-line 
    }, [navigate, userForgotPass])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(forgotPassword(email))
    }

    return (
        <Row className='p-4 d-flex justify-content-center align-items-center'>
            <Col xl={4} md={5} sm={7} style={{ background: '#f5f5f5', margin: '20px', padding: '0 40px', borderRadius: '20px' }} className='shadow rounded'>
                <h3 className='d-flex justify-content-center py-3'>Quên mật khẩu</h3>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>Vui lòng nhập Email</p>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler} >
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Nhập email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className='d-flex justify-content-center py-4'>
                        <Button style={{ width: '100%' }} type='submit' variant='success'>Gửi</Button>
                    </Form.Group>
                </Form>
            </Col>
            <Row>
                <Link to='/login' className='px-3 mx-0 d-flex justify-content-center align-items-center' style={{ textDecoration: 'none', color: 'green', marginLeft: '5px' }}>
                    <strong>Quay lại</strong>
                </Link>
            </Row>
        </Row>
    )
}

export default ForgotPassword
