import { React, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { listUsers, deleteUser } from '../../actions/userActions'

const UserListScreen = () => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList
    // console.log('==', users)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo && userInfo.user.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }
        //eslint-disable-next-line 
    }, [dispatch, navigate, successDelete, userInfo])

    //Delete user
    const deleteHandler = (userId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
            dispatch(deleteUser(userId))
        }
    }

    return (
        <>
            <h1>Danh sách người dùng</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th className='text-center'>ID</th>
                                <th className='text-center'>Tên người dùng</th>
                                <th className='text-center'>Email</th>
                                <th className='text-center'>Admin</th>
                                <th className='text-center'>Ngày tạo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.reverse().map(user => (
                                <tr key={user._id}>
                                    <td className='text-center'>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td><a href={`mailto: ${user.email}`}>{user.email}</a></td>
                                    <td className='text-center'>
                                        {user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td className='text-center'>{user.createdAt}</td>
                                    <td className='d-flex justify-content-around'>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button variant='secondary' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button disabled={user.isAdmin ? "true" : ""} variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </>
    )
}

export default UserListScreen