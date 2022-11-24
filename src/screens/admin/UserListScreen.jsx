import { React, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Table, Button, Row, Col, Modal } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { listUsers, updateUser } from '../../actions/userActions'

const UserListScreen = () => {
    const dispatch = useDispatch()
    const [filter, setFilter] = useState('Tất cả')

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
    const { success: successUpdate } = userUpdate

    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo && userInfo.user.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, successUpdate, userInfo])

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
  
  const deleteHandler = (userId) => {
        dispatch(updateUser({ _id: userId, status: 0 }))
        setShow(false)
    }
    const [idDelete, setIdDelete] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setIdDelete(id)
    }

    //Unlock user
    const unlockHandler = (userId) => {
        dispatch(updateUser({ _id: userId, status: 1 }))
        setShowUnlock(false)
    }
    const [idUnlock, setIdUnlock] = useState('')
    const [showUnlock, setShowUnlock] = useState(false);
    const handleCloseUnlock = () => setShowUnlock(false);
    const handleShowUnlock = (id) => {
        setShowUnlock(true);
        setIdUnlock(id)
    }

    return (
        <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px' }} className='py-4 px-5'>
            <Row className='align-items-center'>
                <Row>
                    <Col>
                        <h5>Danh sách người dùng</h5>
                    </Col>
                </Row>
                <Col>
                    <h6 className='py-3'>Tổng số lượng: {arrFilterUser.length} người dùng ({filter})</h6>
                </Col>
                <Col className='d-flex justify-content-end align-items-center'>
                    <p className='my-0 mx-3'>Lọc người dùng</p>
                    <select style={{ border: '2px solid gray', borderRadius: '5px' }} value={filter} onChange={(e) => setFilter(e.target.value)}>
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
                                <th>Tên người dùng</th>
                                <th>Email</th>
                                <th className='text-end'>Số điện thoại</th>
                                <th>Địa chỉ</th>
                                <th className='text-center'>Admin</th>
                                <th className='text-center'>Trạng thái</th>
                                <th className='text-center'>Thao tác</th>
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
                                        <td className='text-end'>{user.phone}</td> :
                                        <td className='text-end'>Chưa cập nhật</td>
                                    }
                                    {user.address ?
                                        <td>{user.address}</td> :
                                        <td>Chưa cập nhật</td>
                                    }
                                    <td className='text-center'>
                                        {user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td className='text-center'>
                                        {user.status === 0 ? (
                                            <p>Khóa</p>
                                        ) : (
                                            <p>Hoạt động</p>
                                        )}
                                    </td>
                                    <td className='d-flex justify-content-center'>
                                        <Link data-tip data-for="tip1" to={`/admin/user/${user._id}/detail`}>
                                            <Button variant='info' className='btn-sm'>
                                                <i style={{ color: 'white' }} className="fas fa-info-circle"></i>
                                            </Button>
                                        </Link>
                                        <ReactTooltip id="tip1" place="top" effect="solid">
                                            Chi tiết
                                        </ReactTooltip>

                                        {/* <Link data-tip data-for="tip2" className='px-2' to={`/admin/user/${user._id}/edit`}>
                                            <Button variant='secondary' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </Link>
                                        <ReactTooltip id="tip2" place="top" effect="solid">
                                            Chỉnh sửa 
                                        </ReactTooltip> */}

                                        <Button disabled={(user.isAdmin || user.status === 0) ? 'true' : ''} data-tip data-for="tip3" onClick={() => handleShow(user._id)} variant='danger' className='btn-sm mx-2'>
                                            <i className='fas fa-lock'></i>
                                        </Button>
                                        <ReactTooltip id="tip3" place="top" effect="solid">
                                            Khóa
                                        </ReactTooltip>
                                        <Button disabled={(user.isAdmin || user.status === 1) ? 'true' : ''} data-tip data-for="tip4" onClick={() => handleShowUnlock(user._id)} variant='success' className='btn-sm'>
                                            <i className='fas fa-unlock'></i>
                                        </Button>
                                        <ReactTooltip id="tip4" place="top" effect="solid">
                                            Mở khóa
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
                    <Modal.Title>Khóa người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn khóa người dùng này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={() => deleteHandler(idDelete)}>Đồng ý</Button>
                </Modal.Footer>
            </Modal>

            {/* Unlock user */}
            <Modal
                show={showUnlock}
                onHide={handleCloseUnlock}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Mở khóa người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn mở khóa người dùng này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUnlock}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={() => unlockHandler(idUnlock)}>Đồng ý</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UserListScreen
