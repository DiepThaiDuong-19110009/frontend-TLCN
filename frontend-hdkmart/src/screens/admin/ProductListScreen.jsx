import { React, useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { listProducts, deleteProduct, createProduct } from '../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'

const ProductListScreen = () => {
    const dispatch = useDispatch()
    const [filter, setFilter] = useState('')

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
        // if (successCreate) {
        //     navigate(`/admin/productlist`)
        // }
         else {
            dispatch(listProducts())
        }
        //eslint-disable-next-line 
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct])

    // Create product
    const createProductHandler = () => {
        dispatch(createProduct())
    }

    //Delete user
    const deleteHandler = (productId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
            dispatch(deleteProduct(productId))
        }
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
            } else if(!idCategory) {
                arrFilterProduct.push(product)
            }
        })
    }
    checkFilter()

    return (
        <>
            <Row className='align-items-center' id="productAdmin">
                <Row>
                    <Col>
                        <h1>Danh sách sản phẩm</h1>
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
                    <Button style={{background: 'green', border: 'none'}} className='my-3' onClick={createProductHandler}>
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
                    <Table bordered responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th className='text-center'>#</th>
                                <th className='text-center'>Hình ảnh</th>
                                <th className='text-center'>Tên sản phẩm</th>
                                <th className='text-center'>Nhà cung cấp</th>
                                <th className='text-center'>Mô tả</th>
                                <th className='text-center'>Giá (Đơn vị VNĐ)</th>
                                <th className='text-center'>Danh mục</th>
                                <th className='text-center'>Số lượng</th>
                                <th className='text-center'>Đã bán</th>
                                {/* <th className='text-center'>Ngày tạo</th> */}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrFilterProduct.reverse().map((product, index) => (
                                <tr key={product._id}>
                                    <td className='text-center'>{index + 1}</td>
                                    <td className='text-center'><img style={{ width: '50px' }} src={product.photo} alt={product.name} /></td>
                                    <td className='text-center'>{product.name}</td>
                                    <td className='text-center'>{product.supplier}</td>
                                    <td style={{ maxWidth: '500px' }}>{product.description}</td>
                                    <td className='text-center'>{product.price}</td>
                                    <td className='text-center'>{product.category.name}</td>
                                    <td className='text-center'>{product.quantity}</td>
                                    <td className='text-center'>{product.sold}</td>
                                    {/* <td className='text-center'>{product.createdAt}</td> */}
                                    <td className='d-flex justify-content-around'>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='secondary' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </>
    )
}

export default ProductListScreen