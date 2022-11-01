import { React, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import { getUserDetails, updateUser } from '../../actions/userActions'
import { USER_UPDATE_RESET } from '../../constants/userConstants'

const UserEditScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const userId = useParams().id

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails)
    const { error, user } = userDetails
    // console.log('==', user)

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/')
            window.location.reload()
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, navigate, userId, user, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }

    return (
        <div style={{ overflowY: 'scroll', height: '100vh', width: '100%', fontSize: '14px' }} className='py-5 px-5'>
            <Link to='/admin/userlist' className='btn btn-light my-3'>Quay lại</Link>
            <FormContainer>
                <h1 className='d-flex justify-content-center py-3'>Chỉnh sửa thông tin người dùng</h1>
                {loadingUpdate ? <Loader /> : errorUpdate ? <Message variant='danger'>{error}</Message> :
                    (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='username'>
                                <Form.Label>Tên người dùng</Form.Label>
                                <Form.Control type='name' placeholder='Nhập tên người dùng' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='email' className='py-3'>
                                <Form.Label>Email <i style={{ color: 'red' }} className='fas fa-exclamation-circle'></i></Form.Label>
                                <Form.Control type='email' placeholder='Nhập email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='isadmin'>
                                <Form.Check style={{ color: 'red' }} type="checkbox" label='Cấp quyền quản trị viên' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
                            </Form.Group>
                            <Form.Group className='d-flex justify-content-center py-3'>
                                <Button type='submit' variant='primary'>Cập nhật</Button>
                            </Form.Group>
                        </Form>
                    )}
            </FormContainer>
        </div>
    )
}

export default UserEditScreen