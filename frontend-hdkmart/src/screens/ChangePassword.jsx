import { React, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

const ChangePassword = () => {
    const submitHandler = () => {

    }

    return (
        <FormContainer>
            <h1 className='d-flex justify-content-center py-3'>Thay đổi mật khẩu</h1>
            {/* {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />} */}
            <Form onSubmit={submitHandler} >
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='Nhập email' ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='py-3'>
                    <Form.Label>Mật khẩu cũ</Form.Label>
                    <Form.Control type='password' placeholder='Nhập mật khẩu' ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Mật khẩu mới</Form.Label>
                    <Form.Control type='password' placeholder='Nhập mật khẩu' ></Form.Control>
                </Form.Group>
                <Form.Group className='d-flex justify-content-center py-3'>
                    <Button type='submit' variant='primary'>Lưu mật khẩu mới</Button>
                </Form.Group>
            </Form>
        </FormContainer>
    )
}

export default ChangePassword