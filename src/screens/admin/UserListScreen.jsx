import { React, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Table, Button, Row, Col, Modal } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip'
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

    // Alert
    const [idDelete, setIdDelete] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setIdDelete(id)
    }

    return (
        <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px' }} className='py-5 px-5'>
            <Row className='align-items-center'>
                <Row>
                    <Col>
                        <h3>Danh sách người dùng</h3>
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
                                    <td className='d-flex justify-content-center'>
                                        <Link data-tip data-for="tip1" to={`/admin/user/${user._id}/edit`}>
                                            <Button variant='info' className='btn-sm'>
                                                <i style={{ color: 'white' }} className="fas fa-info-circle"></i>
                                            </Button>
                                        </Link>
                                        <ReactTooltip id="tip1" place="top" effect="solid">
                                            Chi tiết thông tin người dùng
                                        </ReactTooltip>

                                        <Link data-tip data-for="tip2" className='px-2' to={`/admin/user/${user._id}/edit`}>
                                            <Button variant='secondary' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </Link>
                                        <ReactTooltip id="tip2" place="top" effect="solid">
                                            Chỉnh sửa thông tin người dùng
                                        </ReactTooltip>

                                        <Button disabled data-tip data-for="tip3" onClick={() => handleShow(user._id)} variant='danger' className='btn-sm'>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                        <ReactTooltip id="tip3" place="top" effect="solid">
                                            Xóa người dùng
                                        </ReactTooltip>
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