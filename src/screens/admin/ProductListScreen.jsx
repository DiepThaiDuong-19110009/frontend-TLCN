import { React, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { listProducts, createProduct } from '../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'

const ProductListScreen = () => {
    const dispatch = useDispatch()
    const [filter, setFilter] = useState('Tất cả')

    const categoryList = useSelector(state => state.categoryList)
    const { categories } = categoryList

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

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
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct])

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    // const deleteHandler = (idDelete) => {
    //     dispatch(deleteProduct(idDelete))
    //     setShow(false)
    // }

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
        products?.forEach(product => {
            if (product.category._id === idCategory) {
                arrFilterProduct.push(product)
            } else if (!idCategory) {
                arrFilterProduct.push(product)
            }
        })
    }
    checkFilter()

    // Alert
    // const [idDelete, setIdDelete] = useState('')
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = (id) => {
    //     setShow(true);
    //     setIdDelete(id)
    // }

    return (
        <div style={{ overflowY: 'scroll', height: '100%', width: '100%', fontSize: '14px' }} className='py-4 px-5'>
            <Row className='align-items-center py-0' id="productAdmin" >
                <Row>
                    <Col>
                        <h5>Danh sách sản phẩm</h5>
                    </Col>
                </Row>
                <Col>
                    <h6>Tổng số lượng: {arrFilterProduct.length} sản phẩm ({filter})</h6>
                </Col>
                <Col className='d-flex justify-content-end align-items-center'>
                    <p className='my-0 mx-3'>Lọc sản phẩm</p>
                    <select style={{border: '2px solid gray', borderRadius: '5px'}} value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option>Tất cả</option>
                        {categories.map(cate => (
                            <option>{cate.name}</option>
                        ))}
                    </select>
                </Col>
                <Col className='d-flex justify-content-end'>
                    <Button variant="outline-success" className='my-3' onClick={createProductHandler}>
                        <i style={{ marginRight: '5px' }} className='fas fa-plus'></i> Thêm sản phẩm
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
                                <th>Tên sản phẩm</th>
                                <th>Nhà cung cấp</th>
                                <th>Danh mục</th>
                                <th className='text-end'>Giá nhập</th>
                                <th className='text-end'>Giá bán</th>
                                <th className='text-end'>Số lượng nhập</th>
                                <th className='text-end'>Đã bán</th>
                                <th className='text-end'>Tồn kho</th>
                                <th className='text-center'>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrFilterProduct.reverse().map((product, index) => (
                                <tr key={product._id}>
                                    <td className='text-center'>
                                        <strong>{index + 1}</strong>
                                    </td>
                                    <td className='text-center'><img style={{ width: '50px' }} src={product.photo} alt={product.name} /></td>
                                    <td>{product.name}</td>
                                    <td>{product.supplier?.id?.name}</td>
                                    <td>{product.category.name}</td>
                                    <td className='text-end'>{product.supplier?.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                                    <td className='text-end'>{product.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                                    <td className='text-end'>{product.supplier?.quantityImport}</td>
                                    <td className='text-end'>{product.sold}</td>
                                    <td className='text-end'>{product.quantity}</td>
                                    <td className='d-flex justify-content-center'>
                                        <Link data-tip data-for="tip1" to={`/admin/product/${product._id}/detail`}>
                                            <Button variant='info' className='btn-sm'>
                                                <i style={{ color: 'white' }} className="fas fa-info-circle"></i>
                                            </Button>
                                        </Link>
                                        <ReactTooltip id="tip1" place="top" effect="solid">
                                            Chi tiết
                                        </ReactTooltip>

                                        <Link data-tip data-for="tip2" className='px-2' to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='secondary' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </Link>
                                        <ReactTooltip id="tip2" place="top" effect="solid">
                                            Chỉnh sửa
                                        </ReactTooltip>

                                        {/* <Button disabled data-tip data-for="tip3" onClick={() => handleShow(product._id)} variant='danger' className='btn-sm'>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                        <ReactTooltip id="tip3" place="top" effect="solid">
                                            Xóa sản phẩm
                                        </ReactTooltip> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            {/* <Modal
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
            </Modal> */}
        </div>
    )
}

export default ProductListScreen
