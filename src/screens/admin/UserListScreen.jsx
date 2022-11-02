import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col, Modal, Dropdown, DropdownButton } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { listUsers, deleteUser } from '../../actions/userActions'

const UserListScreen = () => {
    const dispatch = useDispatch()
    const [filter, setFilter] = useState('Tất cả')

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
        dispatch(deleteUser(userId))
        setShow(false)
    }

    // Filter User
    const arrFilterUser = []
    const FilterUser = (check) => {
        if (check === 'Admin') {
            users.find(x => {
                if (x.isAdmin === true) {
                    arrFilterUser.push(x)
                }
            })
        } else if (check === 'User') {
            users.find(y => {
                if (y.isAdmin === false) {
                    arrFilterUser.push(y)
                }
            })
        } else if (check === 'Tất cả') {
            users?.forEach((user) =>
                arrFilterUser.push(user)
            )
        }
    }

    FilterUser(filter)
    // console.log('==', filter)

    // load page
    const loadpage = () => {
        window.location.reload(false)
    }

    // Alert
    const [idDelete, setIdDelete] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setIdDelete(id)
    }

    return (
        <div style={{ overflowY: 'scroll', height: '100vh', width: '100%', fontSize: '14px' }} className='py-5 px-5'>
            <Row className='align-items-center'>
                <Row>
                    <Col>
                        <h3>Danh sách người dùng</h3>
                    </Col>
                    <Col className='d-flex justify-content-end align-items-center'>
                        <Button variant="outline-secondary" onClick={loadpage} className='d-flex justify-content-center align-items-center'>
                            <i className="fas fa-redo-alt"></i>
                            <p className='my-0 mx-3'>Tải lại</p>
                        </Button>
                    </Col>
                </Row>
                <Col>
                    <h6 className='py-3'>Tổng số lượng: {arrFilterUser.length} người dùng ({filter})</h6>
                </Col>
                <Col className='d-flex justify-content-end align-items-center'>
                    <p className='my-0 mx-3'>Lọc người dùng</p>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option>Tất cả</option>
                        <option>Admin</option>
                        <option>User</option>
                    </select>
                </Col>
            </Row>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                (
                    <Table bordered responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th className='text-center'>#</th>
                                <th className='text-center'>Tên người dùng</th>
                                <th className='text-center'>Email</th>
                                <th className='text-center'>Số điện thoại</th>
                                <th className='text-center'>Địa chỉ</th>
                                <th className='text-center'>Admin</th>
                                <th className='text-center'>Ngày tạo tài khoản</th>
                                <th className='text-center'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrFilterUser.reverse().map((user, index) => (
                                <tr key={user._id}>
                                    <td className='text-center'>
                                        <strong>{index + 1}</strong>
                                    </td>
                                    <td>{user.name}</td>
                                    <td><a href={`mailto: ${user.email}`}>{user.email}</a></td>
                                    {user.phone ?
                                        <td className='text-center'>{user.phone}</td> :
                                        <td className='text-center'>Chưa cập nhật</td>
                                    }
                                    {user.address ?
                                        <td className='text-center'>{user.address}</td> :
                                        <td className='text-center'>Chưa cập nhật</td>
                                    }
                                    <td className='text-center'>
                                        {user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td className='text-center'>{user.createdAt.slice(0, 10)}</td>
                                    <td className='d-flex justify-content-around'>
                                        <DropdownButton variant="outline-primary" id="dropdown-basic-button" title="Hành động">
                                            <Dropdown.Item className='d-flex justify-content-between align-items-center' href={`/admin/user/${user._id}/edit`}>
                                                <Button variant='secondary' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                                <p className='my-0'>Chỉnh sửa</p>
                                            </Dropdown.Item>
                                            <Dropdown.Item disabled={user.isAdmin ? "true" : ""} onClick={() => handleShow(user._id)} className='d-flex justify-content-between align-items-center'>
                                                <Button disabled={user.isAdmin ? "true" : ""} variant='danger' className='btn-sm'>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                                <p className='my-0'>Xóa</p>
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xóa người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa người dùng này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={() => deleteHandler(idDelete)}>Xóa người dùng</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UserListScreen