import { React, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Table, Button, Row, Col, Modal } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { createCategory, deleteCategory, listCategory } from '../../actions/productActions'

const CategoryListScreen = () => {
    const dispatch = useDispatch()

    const categoryDelete = useSelector(state => state.categoryDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = categoryDelete

    const categoryCreate = useSelector(state => state.categoryCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createCategorys } = categoryCreate

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
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createCategorys])

    const createCategoryHandler = () => {
        dispatch(createCategory())
        window.location.reload()
    }

    // Init Data
    const arrCategory = []
    const InitData = () => {
        categories?.forEach(category => {
            arrCategory.push(category)
        })
    }
    InitData()

    //Delete user
    const deleteHandler = (categoryId) => {
        dispatch(deleteCategory(categoryId))
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
                        <h5>Danh sách danh mục sản phẩm</h5>
                    </Col>
                </Row>
                <Col>
                    <h6>Tổng số lượng: {categories.length} danh mục</h6>
                </Col>
                <Col className='d-flex justify-content-end'>
                    <Button variant="outline-success" className='my-3' onClick={createCategoryHandler}>
                        <i style={{marginRight: '5px'}} className='fas fa-plus'></i> Thêm danh mục
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
                                <th className='text-center'>Tên danh mục sản phẩm</th>
                                <th className='text-center'>Ngày tạo</th>
                                <th className='text-center'>Cập nhật lần cuối</th>
                                <th className='text-center'>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrCategory.reverse().map((category, index) => (
                                <tr key={category._id}>
                                    <td className='text-center'>
                                        <strong>
                                            {index + 1}
                                        </strong>
                                    </td>
                                    <td>{category.name}</td>
                                    <td className='text-center'>{category.createdAt.slice(0, 10)}</td>
                                    <td className='text-center'>{category.updatedAt.slice(0, 10)}</td>
                                    <td className='d-flex justify-content-center'>
                                        <Link data-tip data-for="tip1" to={`/admin/category/${category._id}/detail`}>
                                            <Button variant='info' className='btn-sm'>
                                                <i style={{ color: 'white' }} className="fas fa-info-circle"></i>
                                            </Button>
                                        </Link>
                                        <ReactTooltip id="tip1" place="top" effect="solid">
                                            Chi tiết thông tin danh mục sản phẩm
                                        </ReactTooltip>

                                        <Link data-tip data-for="tip2" className='px-2' to={`/admin/category/${category._id}/edit`}>
                                            <Button variant='secondary' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </Link>
                                        <ReactTooltip id="tip2" place="top" effect="solid">
                                            Chỉnh sửa thông tin danh mục sản phẩm
                                        </ReactTooltip>

                                        <Button disabled data-tip data-for="tip3" onClick={() => handleShow(category._id)} variant='danger' className='btn-sm'>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                        <ReactTooltip id="tip3" place="top" effect="solid">
                                            Xóa danh mục sản phẩm
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