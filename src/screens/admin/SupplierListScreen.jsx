import { React, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col, Modal } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip'
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

    // Init Data
    // const arrSupplier = []
    // const InitData = () => {
    //     suppliers?.forEach(supplier => {
    //         arrSupplier.push(supplier)
    //     })
    // }
    // InitData()

    //Delete user
    const deleteHandler = (supplierId) => {
        dispatch(deleteSupplier(supplierId))
        setShow(false)
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
        <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px' }} className='py-4 px-5'>
            <Row className='align-items-center'>
                <Row>
                    <Col>
                        <h5>Danh sách nhà cung cấp</h5>
                    </Col>
                </Row>
                <Col>
                    <h6>Tổng số lượng: {suppliers?.length} nhà cung cấp</h6>
                </Col>
                <Col className='d-flex justify-content-end'>
                    <Button variant="outline-success" className='my-3' onClick={createSupplierHandler}>
                        <i style={{ marginRight: '5px' }} className='fas fa-plus'></i> Thêm nhà cung cấp
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
                                <th>Tên nhà cung cấp</th>
                                {/* <th className='text-center'>Ngày tạo</th> */}
                                <th className='text-center'>Thao tác</th>
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
                                    <td className='d-flex justify-content-center'>
                                        <Link data-tip data-for="tip1" to={`/admin/supplier/${supplier._id}/detail`}>
                                            <Button variant='info' className='btn-sm'>
                                                <i style={{ color: 'white' }} className="fas fa-info-circle"></i>
                                            </Button>
                                        </Link>
                                        <ReactTooltip id="tip1" place="top" effect="solid">
                                            Chi tiết
                                        </ReactTooltip>

                                        <Link data-tip data-for="tip2" className='px-2' to={`/admin/supplier/${supplier._id}/edit`}>
                                            <Button variant='secondary' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </Link>
                                        <ReactTooltip id="tip2" place="top" effect="solid">
                                            Chỉnh sửa
                                        </ReactTooltip>

                                        {/* <Button disabled data-tip data-for="tip3" onClick={() => handleShow(supplier._id)} variant='danger' className='btn-sm'>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                        <ReactTooltip id="tip3" place="top" effect="solid">
                                            Xóa
                                        </ReactTooltip> */}
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