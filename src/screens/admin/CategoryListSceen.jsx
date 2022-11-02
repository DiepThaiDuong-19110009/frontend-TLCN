import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col, Modal, DropdownButton, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { createCategory, deleteCategory, listCategory } from '../../actions/productActions'

const CategoryListScreen = () => {
    const dispatch = useDispatch()

    const categoryDelete = useSelector(state => state.categoryDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = categoryDelete

    const categoryCreate = useSelector(state => state.categoryCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = categoryCreate

    const categoryList = useSelector(state => state.categoryList)
    const { loading, error, categories } = categoryList
    // console.log('==', categories)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo.user.isAdmin) {
            navigate('/login')
        }
        else {
            dispatch(listCategory())
        }
        //eslint-disable-next-line 
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createCategory])

    const createCategoryHandler = () => {
        dispatch(createCategory())
        window.location.reload()
    }

    //Delete user
    const deleteHandler = (categoryId) => {
        dispatch(deleteCategory(categoryId))
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
                        <h3>Danh sách danh mục sản phẩm</h3>
                    </Col>
                    <Col className='d-flex justify-content-end align-items-center'>
                        <Button variant="outline-secondary" onClick={loadpage} className='d-flex justify-content-center align-items-center'>
                            <i className="fas fa-redo-alt"></i>
                            <p className='my-0 mx-3'>Tải lại</p>
                        </Button>
                    </Col>
                </Row>
                <Col>
                    <h6>Tổng số lượng: {categories.length} danh mục</h6>
                </Col>
                <Col className='d-flex justify-content-end'>
                    <Button style={{ background: 'green', border: 'none' }} className='my-3' onClick={createCategoryHandler}>
                        <i className='fas fa-plus'></i> Thêm danh mục
                    </Button>
                </Col>
            </Row>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                (
                    <Table bordered responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th className='text-center'>#</th>
                                <th className='text-center'>Tên danh mục sản phẩm</th>
                                <th className='text-center'>Ngày tạo</th>
                                <th className='text-center'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.reverse().map((category, index) => (
                                <tr key={category._id}>
                                    <td className='text-center'>
                                        <strong>
                                            {index + 1}
                                        </strong>
                                    </td>
                                    <td>{category.name}</td>
                                    <td className='text-center'>{category.createdAt.slice(0, 10)}</td>
                                    <td className='d-flex justify-content-around'>
                                        <DropdownButton variant="outline-primary" id="dropdown-basic-button" title="Hành động">
                                            <Dropdown.Item className='d-flex justify-content-between align-items-center' href={`/admin/category/${category._id}/edit`}>
                                                <Button variant='secondary' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                                <p className='my-0'>Chỉnh sửa</p>
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleShow(category._id)} className='d-flex justify-content-between align-items-center'>
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
                    <Modal.Title>Xóa danh mục</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa danh mục này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={() => deleteHandler(idDelete)}>Xóa danh mục</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CategoryListScreen