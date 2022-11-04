import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col, Modal, DropdownButton, Dropdown, Accordion } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { listProducts, deleteProduct, createProduct } from '../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'

const ProductListScreen = () => {
    const dispatch = useDispatch()
    const [filter, setFilter] = useState('Tất cả')

    const categoryList = useSelector(state => state.categoryList)
    const { categories } = categoryList

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList
    // console.log('==', products)

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const navigate = useNavigate();

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if (!userInfo.user.isAdmin) {
            navigate('/login')
        }
        else {
            dispatch(listProducts())
        }
        //eslint-disable-next-line 
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct])

    // Create product
    const createProductHandler = () => {
        dispatch(createProduct())
    }

    //Delete product
    const deleteHandler = (idDelete) => {
        dispatch(deleteProduct(idDelete))
        setShow(false)
    }

    //filter Product
    let idCategory = ''
    const getIdCategory = () => {
        categories.forEach(cate => {
            if (cate.name === filter) {
                idCategory = cate._id
            }
        })
    }
    getIdCategory()

    const arrFilterProduct = []
    const checkFilter = () => {
        products.forEach(product => {
            if (product.category._id === idCategory) {
                arrFilterProduct.push(product)
            } else if (!idCategory) {
                arrFilterProduct.push(product)
            }
        })
    }
    checkFilter()

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

    // console.log('==', idDelete);

    return (
        <div style={{ overflowY: 'scroll', height: '100vh', width: '100%', fontSize: '14px' }} className='py-5 px-5'>
            <Row className='align-items-center py-0' id="productAdmin" >
                <Row>
                    <Col>
                        <h3>Danh sách sản phẩm</h3>
                    </Col>
                    <Col className='d-flex justify-content-end align-items-center'>
                        <Button variant="outline-secondary" onClick={loadpage} className='d-flex justify-content-center align-items-center'>
                            <i className="fas fa-redo-alt"></i>
                            <p className='my-0 mx-3'>Tải lại</p>
                        </Button>
                    </Col>
                </Row>
                <Col>
                    <h6>Tổng số lượng: {arrFilterProduct.length} sản phẩm ({filter})</h6>
                </Col>
                <Col className='d-flex justify-content-end align-items-center'>
                    <p className='my-0 mx-3'>Lọc sản phẩm</p>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option>Tất cả</option>
                        {categories.map(cate => (
                            <option>{cate.name}</option>
                        ))}
                    </select>
                </Col>
                <Col className='d-flex justify-content-end'>
                    <Button style={{ background: 'green', border: 'none' }} className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Thêm sản phẩm
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                (
                    <Table bordered responsive>
                        <thead>
                            <tr>
                                <th className='text-center'>#</th>
                                <th className='text-center'>Hình ảnh</th>
                                <th className='text-center'>Tên sản phẩm</th>
                                <th className='text-center'>Nhà cung cấp</th>
                                <th className='text-center'>Mô tả</th>
                                <th className='text-center'>Giá sản phẩm</th>
                                <th className='text-center'>Danh mục</th>
                                <th className='text-center'>Số lượng</th>
                                <th className='text-center'>Đã bán</th>
                                {/* <th className='text-center'>Ngày tạo</th> */}
                                <th className='text-center'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrFilterProduct.reverse().map((product, index) => (
                                <tr key={product._id}>
                                    <td className='text-center'>
                                        <strong>{index + 1}</strong>
                                    </td>
                                    <td className='text-center'><img style={{ width: '50px' }} src={product.photo} alt={product.name} /></td>
                                    <td className='text-center'>{product.name}</td>
                                    <td className='text-center'>{product._id}</td>
                                    <td>
                                        <Accordion className='py-0 px-0' defaultActiveKey="1">
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header className='py-0 px-0'>Xem chi tiết</Accordion.Header>
                                                <Accordion.Body>
                                                    {product.description}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </td>
                                    <td className='text-center'>{product.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                                    <td className='text-center'>{product.category.name}</td>
                                    <td className='text-center'>{product.quantity}</td>
                                    <td className='text-center'>{product.sold}</td>
                                    {/* <td className='text-center'>{product.createdAt}</td> */}
                                    <td className='d-flex justify-content-around'>
                                        <DropdownButton style={{ fontSize: '14px' }} variant="outline-primary" id="dropdown-basic-button" title="Hành động">
                                            <Dropdown.Item className='d-flex justify-content-between align-items-center' href={`/admin/product/${product._id}/edit`}>
                                                <Button variant='secondary' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                                <p className='my-0'>Chỉnh sửa</p>
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleShow(product._id)} className='d-flex justify-content-between align-items-center'>
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
                    <Modal.Title>Xóa sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa sản phẩm này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={() => deleteHandler(idDelete)}>Xóa sản phẩm</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ProductListScreen