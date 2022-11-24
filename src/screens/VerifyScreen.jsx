import { React, useEffect } from 'react'
import {  useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { verify } from '../actions/userActions'

const VerifyScreen = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const userId = useParams().id

    const userVerify = useSelector(state => state.userVerify)
    const { success } = userVerify

    useEffect(() => {
        if (success) {
            navigate('/login')
            window.location.reload()
        }
    }, [navigate, success])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(verify(userId))
    }

    return (
        <Row className='px-3 mx-0 d-flex justify-content-center align-items-center'>
            <Col xl={4} md={5} sm={7} style={{ background: '#f5f5f5', margin: '20px', padding: '0 40px', borderRadius: '20px' }} className='shadow rounded'>
                <h3 className='d-flex justify-content-center pt-5 pb-3'>Xác thực tài khoản</h3>
                <Form onSubmit={submitHandler} className='pb-5'>
                    <Form.Group className='d-flex justify-content-center pt-3'>
                        <Button style={{ width: '100%' }} type='submit' variant='success'>Xác thực</Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    )
}

export default VerifyScreen
