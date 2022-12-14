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
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createCategorys])

    const createCategoryHandler = () => {
        dispatch(createCategory())
        window.location.reload()
    }

    const arrCategory = []
    const InitData = () => {
        categories?.forEach(category => {
            arrCategory.push(category)
        })
    }
    InitData()

    const deleteHandler = (categoryId) => {
        dispatch(deleteCategory(categoryId))
        setShow(false)
    }

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
                        <h5>Danh s??ch danh m???c s???n ph???m</h5>
                    </Col>
                </Row>
                <Col>
                    <h6>T???ng s??? l?????ng: {categories.length} danh m???c</h6>
                </Col>
                <Col className='d-flex justify-content-end'>
                    <Button variant="outline-success" className='my-3' onClick={createCategoryHandler}>
                        <i style={{marginRight: '5px'}} className='fas fa-plus'></i> Th??m danh m???c
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
                                <th>T??n danh m???c s???n ph???m</th>
                                <th className='text-center'>Ng??y t???o</th>
                                <th className='text-center'>C???p nh???t l???n cu???i</th>
                                <th className='text-center'>Thao t??c</th>
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
                                            Chi ti???t
                                        </ReactTooltip>

                                        <Link data-tip data-for="tip2" className='px-2' to={`/admin/category/${category._id}/edit`}>
                                            <Button variant='secondary' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </Link>
                                        <ReactTooltip id="tip2" place="top" effect="solid">
                                            Ch???nh s???a
                                        </ReactTooltip>

                                        {/* <Button disabled data-tip data-for="tip3" onClick={() => handleShow(category._id)} variant='danger' className='btn-sm'>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                        <ReactTooltip id="tip3" place="top" effect="solid">
                                            X??a danh m???c s???n ph???m
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
                    <Modal.Title>X??a danh m???c</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    B???n c?? ch???c ch???n mu???n x??a danh m???c n??y kh??ng?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        H???y
                    </Button>
                    <Button variant="danger" onClick={() => deleteHandler(idDelete)}>X??a danh m???c</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CategoryListScreen
