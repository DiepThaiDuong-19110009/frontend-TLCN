import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col, Modal, DropdownButton, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { listSupplier, createSupplier, deleteSupplier } from '../../actions/supplierActions'

const SupplierListScreen = () => {
    const dispatch = useDispatch()

    const supplierDelete = useSelector(state => state.supplierDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = supplierDelete

    const supplierCreate = useSelector(state => state.supplierCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createSuppliers } = supplierCreate

    const { loading, error, suppliers } = useSelector(state => state.supplierList)
    console.log('==', suppliers)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo.user.isAdmin) {
            navigate('/login')
        }
        else {
            dispatch(listSupplier())
        }
        //eslint-disable-next-line 
    }, [dispatch, navigate, userInfo, successCreate, successDelete, createSuppliers])

    const createSupplierHandler = () => {
        dispatch(createSupplier())
        window.location.reload()
    }

    //Delete user
    const deleteHandler = (supplierId) => {
        dispatch(deleteSupplier(supplierId))
        setShow(false)
    }

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
                        <h3>Danh sách nhà cung cấp</h3>
                    </Col>
                    <Col className='d-flex justify-content-end align-items-center'>
                        <Button variant="outline-secondary" onClick={loadpage} className='d-flex justify-content-center align-items-center'>
                            <i className="fas fa-redo-alt"></i>
                            <p className='my-0 mx-3'>Tải lại</p>
                        </Button>
                    </Col>
                </Row>
                <Col>
                    <h6>Tổng số lượng: {suppliers?.length} nhà cung cấp</h6>
                </Col>
                <Col className='d-flex justify-content-end'>
                    <Button style={{ background: 'green', border: 'none' }} className='my-3' onClick={createSupplierHandler}>
                        <i className='fas fa-plus'></i> Thêm danh mục
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                (
                    <Table bordered responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th className='text-center'>#</th>
                                <th className='text-center'>Tên nhà cung cấp</th>
                                {/* <th className='text-center'>Ngày tạo</th> */}
                                <th className='text-center'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers?.reverse().map((supplier, index) => (
                                <tr key={supplier._id}>
                                    <td className='text-center'>
                                        <strong>
                                            {index + 1}
                                        </strong>
                                    </td>
                                    <td>{supplier.name}</td>
                                    <td className='d-flex justify-content-around'>
                                        <DropdownButton variant="outline-primary" id="dropdown-basic-button" title="Hành động">
                                            <Dropdown.Item className='d-flex justify-content-between align-items-center' href={`/admin/supplier/${supplier._id}/edit`}>
                                                <Button variant='secondary' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                                <p className='my-0'>Chỉnh sửa</p>
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleShow(supplier._id)} className='d-flex justify-content-between align-items-center'>
                                                <Button variant='danger' className='btn-sm'>
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
                    <Modal.Title>Xóa nhà cung cấp</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa nhà cung cấp này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={() => deleteHandler(idDelete)}>Xóa nhà cung cấp</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SupplierListScreen