import { React, useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col, Modal } from 'react-bootstrap'
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
        //dispatch({ type: PRODUCT_CREATE_RESET })
        if (!userInfo.user.isAdmin) {
            navigate('/login')
        }
        // if (successCreate) {
        //     navigate(`/admin/productlist`)
        // } 
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
        <>
            <Row className='align-items-center'>
                <Row>
                    <Col>
                        <h1>Danh sách danh mục sản phẩm</h1>
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.reverse().map((category, index) => (
                                <tr key={category._id}>
                                    <td className='text-center'>{index + 1}</td>
                                    <td>{category.name}</td>
                                    <td className='text-center'>{category.createdAt.slice(0, 10)}</td>
                                    <td className='d-flex justify-content-around'>
                                        <LinkContainer to={`/admin/category/${category._id}/edit`}>
                                            <Button variant='secondary' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => handleShow(category._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
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
        </>
    )
}

export default CategoryListScreen